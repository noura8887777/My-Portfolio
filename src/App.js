import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TOKENS ─── */
const C = {
  bg: "#0a0a0f", surface: "#111118", border: "rgba(255,255,255,0.07)",
  accent: "#C084FC", accentDim: "#7c3aed", text: "#f0eef5", muted: "#6b6880", subtle: "#1c1a26",
};
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/* ─── DATA ─── */
const skills = [
  { name:"React", cat:"Frontend" }, { name:"Vue.js", cat:"Frontend" },
  { name:"TypeScript", cat:"Frontend" }, { name:"JavaScript", cat:"Frontend" },
  { name:"Laravel", cat:"Backend" }, { name:"PHP", cat:"Backend" }, { name:"Node.js", cat:"Backend" },
  { name:"PostgreSQL", cat:"Database" }, { name:"MySQL", cat:"Database" }, { name:"MongoDB", cat:"Database" },
];
const projects = [
  { title:"House-of-Art E-Commerce web site", desc:"FeatA dynamic online platform where Artisana showcases and sells authentic handmade art and crafts from talented artisans. It connects creators with a global audience, highlighting traditional craftsmanship, rich cultural stories, and unique artistic pieces.ures cart, authentication, and payment integration.", tags:["Vue.js","Laravel","PostgreSQL"], image:"/e-commerce.jpeg", github:"https://github.com/OTMANE215/House-of-Art", year:"2026" },
  { title:"mail management web application", desc:"Web application for managing incoming and outgoing mail, built with React.js and Laravel to digitize and optimize administrative processes.", tags:["React","MySQL","Laravel"], image:"/imgSTAGE.png", github:"https://github.com/noura8887777/mail-management", year:"2025" },
  { title:"EventFlex web site", desc:"EventFlex  allows users to create and manage events, handle participants, organize sessions, and improve communication through a simple and intuitive interface..", tags:["Laravel","inertia.js","MySQL"], image:"/imgPFE.png", github:"https://github.com/noura8887777/Event-Flex-project", year:"2025" },
];
const certificates = [
  { title:"CSS Essentials", issuer:"Cisco",   year:"2025", image:"/css.png" },
  { title:"HTML Essentials",            issuer:"Cisco",   year:"2025", image:"/html.png" },
  { title:"Introduction to Modern AI",     issuer:"Cisco", year:"2025", image:"/ia.png" },
  { title:"Python Essentials 1 and 2",            issuer:"Cisco", year:"2024", image:"/python.png" },
  { title:"JavaScript Essentials 1 and 2",                issuer:"Cisco",   year:"2025", image:"/js.png" },
];

/* ─── LOGO ─── */
const NouraLogo = ({ size = 44 }) => (
  <svg width={size*2.4} height={size} viewBox="0 0 210 80" fill="none">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="80" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ddb8fb"/><stop offset="100%" stopColor="#9333ea"/>
      </linearGradient>
    </defs>
    <path d="M14 68 L14 12 L44 52 L44 12" stroke="#7c3aed" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.35"/>
    <path d="M14 68 L14 12 L44 52 L44 12" stroke="url(#lg1)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="12" r="4.5" fill="#ddb8fb"/>
    <circle cx="14" cy="68" r="4.5" fill="#ddb8fb"/>
    <circle cx="44" cy="12" r="4.5" fill="#ddb8fb"/>
    <circle cx="44" cy="68" r="4.5" fill="#ddb8fb"/>
    <text x="60" y="55" fill="#e8d5fc" fontSize="31" fontWeight="600" fontFamily="Georgia, serif" letterSpacing="2">Noura</text>
  </svg>
);

/* ─── HOOK: scroll reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── HOOK: counter ─── */
function useCounter(target, visible, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return count;
}

/* ─── REVEAL WRAPPER ─── */
const Reveal = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, visible] = useReveal();
  const transforms = { up:"translateY(32px)", down:"translateY(-32px)", left:"translateX(-32px)", right:"translateX(32px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateZ(0)" : (transforms[dir] || "translateY(32px)"),
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      willChange: visible ? "auto" : "opacity, transform",
      ...style,
    }}>
      {children}
    </div>
  );
};

/* ─── SECTION HEADING ─── */
const SectionHeading = ({ label, title, accent }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom:"3.5rem" }}>
      <p style={{ fontSize:"0.68rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.accent, fontWeight:600, marginBottom:"0.7rem", fontFamily:sans, opacity:visible?1:0, transform:visible?"none":"translateY(12px)", transition:"all 0.5s ease" }}>
        — {label}
      </p>
      <h2 style={{ fontSize:"clamp(1.8rem, 4vw, 2.5rem)", fontWeight:700, color:C.text, lineHeight:1.15, fontFamily:"Georgia, serif", opacity:visible?1:0, transform:visible?"none":"translateY(18px)", transition:"all 0.6s ease 0.1s" }}>
        {title} <span style={{ color:C.accent }}>{accent}</span>
      </h2>
      <div style={{ width: visible ? 36 : 0, height:1, background:C.accent, marginTop:"1.2rem", opacity:0.6, transition:"width 0.8s ease 0.3s" }} />
    </div>
  );
};

/* ─── PARTICLE CANVAS ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,132,252,${p.o})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(192,132,252,${0.07 * (1 - dist/120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}/>;
};

/* ─── TYPEWRITER ─── */
const Typewriter = ({ words, speed = 100, pause = 1800 }) => {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkT = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(blinkT);
  }, []);

  useEffect(() => {
    const word = words[wIdx];
    let timeout;
    if (!deleting && cIdx <= word.length) {
      setDisplay(word.slice(0, cIdx));
      timeout = setTimeout(() => setCIdx(c => c + 1), speed);
    } else if (!deleting && cIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && cIdx >= 0) {
      setDisplay(word.slice(0, cIdx));
      timeout = setTimeout(() => setCIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWIdx(w => (w + 1) % words.length);
      setCIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words, speed, pause]);

  return (
    <span style={{ color:C.accent }}>
      {display}<span style={{ opacity: blink ? 1 : 0, transition:"opacity 0.1s" }}>|</span>
    </span>
  );
};

/* ─── MAGNETIC BUTTON ─── */
const MagneticBtn = ({ children, onClick, primary }) => {
  const btnRef = useRef(null);
  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px,${dy}px)`;
  };
  const handleMouseLeave = () => { btnRef.current.style.transform = "none"; };
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding:"0.85rem 2.2rem", border: primary ? "none" : `1px solid ${C.border}`,
        background: primary ? C.accent : "transparent",
        color: primary ? "#000" : C.text,
        fontSize:"0.75rem", fontWeight: primary ? 700 : 400, cursor:"pointer",
        letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans,
        borderRadius:"2px", transition:"transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s",
      }}
      onMouseEnter={e => {
        if (primary) e.currentTarget.style.boxShadow = `0 0 30px ${C.accent}66`;
        else e.currentTarget.style.borderColor = C.accent;
      }}
      onFocus={() => {}}
    >
      {children}
    </button>
  );
};

/* ─── STAT COUNTER ─── */
const StatCounter = ({ num, suffix = "", label, visible }) => {
  const target = parseInt(num);
  const count = useCounter(target, visible);
  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition:"all 0.7s ease" }}>
      <div style={{ fontSize:"2.2rem", fontWeight:700, color:C.accent, fontFamily:"Georgia, serif", lineHeight:1 }}>{count}{suffix}</div>
      <div style={{ fontSize:"0.65rem", color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:sans, marginTop:"0.3rem" }}>{label}</div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredCert, setHoveredCert] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const cursorRingRef = useRef(null);
  const cursorDotRef  = useRef(null);
  const [statsRef, statsVisible] = useReveal(0.3);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    let rx = cx, ry = cy;
    const move = (e) => { cx = e.clientX; cy = e.clientY; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      rx += (cx - rx) * 0.12;
      ry += (cy - ry) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = rx + "px";
        cursorRingRef.current.style.top  = ry + "px";
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = cx + "px";
        cursorDotRef.current.style.top  = cy + "px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };

  return (
    <div style={{ fontFamily:"Georgia, serif", background:C.bg, color:C.text, overflowX:"hidden", cursor:"none" }}>

      {/* ── Custom cursor ── */}
      <div ref={cursorRingRef} style={{ position:"fixed", width:28, height:28, borderRadius:"50%", border:`1.5px solid ${C.accent}`, pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)" }}/>
      <div ref={cursorDotRef}  style={{ position:"fixed", width:5, height:5, borderRadius:"50%", background:C.accent, pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)" }}/>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed", top:0, width:"100%", zIndex:100,
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition:"all 0.4s ease",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"1.1rem 4rem",
        opacity: heroVisible ? 1 : 0,
        transform: heroVisible ? "none" : "translateY(-20px)",
      }}>
        <div style={{ cursor:"pointer", transition:"opacity 0.2s" }} onClick={() => scrollTo("home")}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <NouraLogo size={32}/>
        </div>
        <div style={{ display:"flex", gap:"2.2rem", alignItems:"center" }}>
          {["home","skills","projects","certificates","contact"].map((s, i) => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background:"none", border:"none",
              color: active === s ? C.accent : C.muted,
              fontSize:"0.75rem", cursor:"pointer",
              letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans,
              transition:"color 0.2s, transform 0.2s",
              paddingBottom:"2px",
              borderBottom: active === s ? `1px solid ${C.accent}` : "1px solid transparent",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(-10px)",
              transitionDelay: `${0.4 + i * 0.07}s`,
            }}
              onMouseEnter={e => { if (active !== s) { e.currentTarget.style.color = C.text; e.currentTarget.style.transform = "translateY(-2px)"; }}}
              onMouseLeave={e => { if (active !== s) { e.currentTarget.style.color = C.muted; e.currentTarget.style.transform = "none"; }}}
            >{s}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            padding:"0.45rem 1.3rem", border:`1px solid ${C.accent}`,
            background:"transparent", color:C.accent,
            fontSize:"0.72rem", fontWeight:500, cursor:"pointer",
            fontFamily:sans, letterSpacing:"0.12em", textTransform:"uppercase",
            borderRadius:"2px", transition:"all 0.25s",
            opacity: heroVisible ? 1 : 0, transitionDelay:"0.8s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#000"; e.currentTarget.style.boxShadow = `0 0 20px ${C.accent}55`; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; e.currentTarget.style.boxShadow = "none"; }}
          >Hire Me</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"0 4rem" }}>
        <ParticleCanvas/>
        {/* Grid texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"64px 64px", opacity:0.3, pointerEvents:"none" }}/>
        {/* Ambient glow */}
        <div style={{ position:"absolute", top:"10%", right:"10%", width:700, height:700, borderRadius:"50%", background:C.accentDim, opacity:0.05, filter:"blur(140px)", pointerEvents:"none",
          animation:"pulse 5s ease-in-out infinite" }}/>

        <div style={{ zIndex:1, maxWidth:680, paddingTop:"100px", paddingBottom:"80px" }}>
          {/* Status badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:"0.5rem",
            padding:"0.35rem 0.9rem", border:`1px solid ${C.border}`, borderRadius:"2px",
            marginBottom:"2.5rem", background:C.surface,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(20px)",
            transition:"all 0.6s ease 0.1s",
          }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 8px #4ade80", animation:"blink 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:"0.68rem", letterSpacing:"0.15em", color:C.muted, textTransform:"uppercase", fontFamily:sans }}>Available for opportunities</span>
          </div>

          <h1 style={{
            fontSize:"clamp(3.5rem, 8vw, 6rem)", fontWeight:700, lineHeight:1.0, marginBottom:"0.5rem",
            fontFamily:"Georgia, serif",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)",
            transition:"all 0.7s ease 0.2s",
          }}>
            Noura
          </h1>

          <h2 style={{
            fontSize:"clamp(1rem, 2.5vw, 1.5rem)", fontWeight:300, color:C.muted, marginBottom:"2rem",
            fontFamily:sans, letterSpacing:"0.08em", minHeight:"2rem",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)",
            transition:"all 0.7s ease 0.35s",
          }}>
            <Typewriter words={["Junior Full-Stack Developer", "React & Vue Specialist", "Laravel & PHP Developer", "Open to New Opportunities"]} speed={80} pause={2200}/>
          </h2>

          <p style={{
            color:C.muted, maxWidth:480, lineHeight:2, fontSize:"0.95rem", marginBottom:"3rem",
            fontFamily:sans, fontWeight:300,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)",
            transition:"all 0.7s ease 0.5s",
          }}>
            I build modern web applications — from pixel-perfect interfaces to robust server-side systems. Seeking my first professional role within a team that values clean code and continuous growth.
          </p>

          <div style={{
            display:"flex", gap:"1rem",
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)",
            transition:"all 0.7s ease 0.65s",
          }}>
            <MagneticBtn primary onClick={() => scrollTo("projects")}>View Projects</MagneticBtn>
            <MagneticBtn onClick={() => scrollTo("contact")}>Get in Touch</MagneticBtn>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{
            display:"flex", gap:"3.5rem", marginTop:"4.5rem", paddingTop:"3rem",
            borderTop:`1px solid ${C.border}`,
            opacity: heroVisible ? 1 : 0, transition:"all 0.7s ease 0.8s",
          }}>
            <StatCounter num={3} suffix="+" label="Projects" visible={statsVisible}/>
            <StatCounter num={9} suffix="+" label="Technologies" visible={statsVisible}/>
            <StatCounter num={5} label="Certifications" visible={statsVisible}/>
          </div>
        </div>

        {/* Code decoration */}
        <div style={{
          position:"absolute", right:"5rem", top:"50%", transform:"translateY(-50%)",
          pointerEvents:"none", userSelect:"none",
          opacity: heroVisible ? 1 : 0, transition:"opacity 0.8s ease 1s",
          width:320,
          borderRadius:"10px",
          overflow:"hidden",
          boxShadow:"0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        }}>
          {/* Title bar */}
          <div style={{
            background:"#1e1e2e",
            borderBottom:"1px solid rgba(255,255,255,0.06)",
            padding:"0.6rem 1rem",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{ display:"flex", gap:"0.35rem" }}>
              {["#ff5f57","#febc2e","#28c840"].map(col => (
                <span key={col} style={{ width:10, height:10, borderRadius:"50%", background:col, display:"inline-block" }}/>
              ))}
            </div>
            <span style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.3)", fontFamily:sans, letterSpacing:"0.06em" }}>developer.js</span>
            <span style={{ width:40 }}/>
          </div>

          {/* Code area */}
          <div style={{ background:"#13131f", padding:"1.2rem 0 1.4rem" }}>
            {[
              { ln:1,  tokens:[{ c:"#c792ea", v:"const " }, { c:"#82aaff", v:"developer" }, { c:"#cdd6f4", v:" = {" }] },
              { ln:2,  tokens:[{ c:"#6c7086", v:"  // Full-Stack Developer" }] },
              { ln:3,  tokens:[{ c:"#cdd6f4", v:"  " }, { c:"#89dceb", v:"name" }, { c:"#cdd6f4", v:":    " }, { c:"#a6e3a1", v:'"Noura"' }, { c:"#cdd6f4", v:"," }] },
              { ln:4,  tokens:[{ c:"#cdd6f4", v:"  " }, { c:"#89dceb", v:"role" }, { c:"#cdd6f4", v:":    " }, { c:"#a6e3a1", v:'"Fullstack"' }, { c:"#cdd6f4", v:"," }] },
              { ln:5,  tokens:[{ c:"#cdd6f4", v:"  " }, { c:"#89dceb", v:"stack" }, { c:"#cdd6f4", v:":   [" }] },
              { ln:6,  tokens:[{ c:"#a6e3a1", v:'    "React"' }, { c:"#cdd6f4", v:", " }, { c:"#a6e3a1", v:'"Vue.js"' }, { c:"#cdd6f4", v:"," }] },
              { ln:7,  tokens:[{ c:"#a6e3a1", v:'    "Laravel"' }, { c:"#cdd6f4", v:", " }, { c:"#a6e3a1", v:'"PHP"' }] },
              { ln:8,  tokens:[{ c:"#cdd6f4", v:"  ]," }] },
              { ln:9,  tokens:[{ c:"#cdd6f4", v:"  " }, { c:"#89dceb", v:"available" }, { c:"#cdd6f4", v:": " }, { c:"#fab387", v:"true" }] },
              { ln:10, tokens:[{ c:"#cdd6f4", v:"};" }] },
            ].map((line, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"baseline",
                padding:"0 1rem",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateX(14px)",
                transition:`opacity 0.45s ease ${1.1 + i * 0.07}s, transform 0.45s ease ${1.1 + i * 0.07}s`,
              }}>
                {/* Line number */}
                <span style={{
                  minWidth:24, fontSize:"0.65rem", color:"rgba(255,255,255,0.18)",
                  fontFamily:"'Courier New', monospace", textAlign:"right",
                  marginRight:"1.2rem", lineHeight:2,
                }}>{line.ln}</span>
                {/* Tokens */}
                <span style={{ fontFamily:"'Courier New', monospace", fontSize:"0.76rem", lineHeight:2, whiteSpace:"nowrap" }}>
                  {line.tokens.map((tok, j) => (
                    <span key={j} style={{ color:tok.c }}>{tok.v}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div style={{
            background:"#C084FC", padding:"0.2rem 1rem",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <span style={{ fontSize:"0.58rem", color:"#000", fontFamily:sans, fontWeight:600, letterSpacing:"0.06em" }}>JavaScript</span>
            <span style={{ fontSize:"0.58rem", color:"#000", fontFamily:sans, letterSpacing:"0.04em" }}>UTF-8</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem",
          opacity: heroVisible ? 0.4 : 0, transition:"opacity 1s ease 1.2s",
        }}>
          <span style={{ fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:sans, color:C.muted }}>scroll</span>
          <div style={{ width:1, height:40, background:`linear-gradient(${C.accent}, transparent)`, animation:"scrollLine 1.8s ease-in-out infinite" }}/>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"8rem 4rem", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <SectionHeading label="Expertise" title="Technical" accent="Skills"/>
          {["Frontend","Backend","Database"].map((cat, ci) => (
            <Reveal key={cat} delay={ci * 120}>
              <div style={{ display:"flex", alignItems:"center", gap:"2.5rem", paddingBottom:"1.6rem", marginBottom:"1.6rem", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:80, fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.muted, fontFamily:sans, flexShrink:0 }}>{cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {skills.filter(s => s.cat === cat).map((s, si) => (
                    <Reveal key={s.name} delay={ci * 100 + si * 60} dir="right">
                      <span style={{
                        padding:"0.3rem 0.9rem", border:`1px solid ${C.border}`, borderRadius:"2px",
                        fontSize:"0.8rem", color:C.text, fontFamily:sans,
                        background:C.surface, letterSpacing:"0.03em",
                        transition:"all 0.25s", cursor:"default", display:"block",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; e.currentTarget.style.background = "#1a1228"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 6px 20px ${C.accent}33`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; e.currentTarget.style.background = C.surface; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                      >{s.name}</span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"8rem 4rem", background:C.surface }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeading label="Work" title="Selected" accent="Projects"/>
          <div style={{ border:`1px solid ${C.border}` }}>
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 150}>
                <div
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    display:"grid", gridTemplateColumns:"1fr 1.5fr",
                    borderBottom: i < projects.length - 1 ? `1px solid ${C.border}` : "none",
                    background: hoveredProject === i ? "#13131e" : "transparent",
                    transition:"background 0.4s",
                    minHeight:200, overflow:"hidden",
                  }}
                >
                  <div style={{ overflow:"hidden", position:"relative", minHeight:220 }}>
                    <img src={p.image} alt={p.title} style={{
                      width:"100%", height:"100%", objectFit:"cover",
                      filter: "brightness(1)",
                      transition:"all 0.5s ease",
                      transform: hoveredProject === i ? "scale(1.06)" : "scale(1)",
                    }}/>
                    {/* Subtle purple tint overlay */}
                    <div style={{
                      position:"absolute", inset:0,
                      background: hoveredProject === i
                        ? "linear-gradient(to right, rgba(124,58,237,0.15) 0%, transparent 60%)"
                        : "linear-gradient(to right, rgba(10,10,15,0.4) 0%, rgba(17,17,24,0.85) 100%)",
                      transition:"all 0.5s ease",
                    }}/>
                    {/* Year badge on image */}
                    <div style={{
                      position:"absolute", bottom:12, left:12,
                      background:"rgba(10,10,15,0.75)", backdropFilter:"blur(8px)",
                      border:`1px solid ${C.border}`, borderRadius:"3px",
                      padding:"0.2rem 0.6rem",
                      fontSize:"0.6rem", color:C.muted, fontFamily:sans, letterSpacing:"0.1em",
                    }}>{p.year}</div>
                  </div>
                  <div style={{ padding:"2.2rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ marginBottom:"0.7rem" }}>
                        <h3 style={{ fontSize:"1.15rem", fontWeight:600, fontFamily:"Georgia, serif", color:C.text, transition:"color 0.2s" }}>{p.title}</h3>
                      </div>
                      <p style={{ color:C.muted, fontSize:"0.85rem", lineHeight:1.85, fontFamily:sans, fontWeight:300, marginBottom:"1.3rem" }}>{p.desc}</p>
                      <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                        {p.tags.map(t => (
                          <span key={t} style={{
                            fontSize:"0.6rem", padding:"0.18rem 0.6rem",
                            border:`1px solid ${C.border}`, borderRadius:"2px",
                            color:C.muted, fontFamily:sans, letterSpacing:"0.1em", textTransform:"uppercase",
                            transition:"all 0.2s",
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted; }}
                          >{t}</span>
                        ))}
                      </div>
                    </div>
                    <a href={p.github} target="_blank" rel="noreferrer" style={{
                      display:"inline-flex", alignItems:"center", gap:"0.5rem",
                      marginTop:"1.5rem", color:C.accent, fontSize:"0.72rem", fontWeight:600,
                      fontFamily:sans, letterSpacing:"0.14em", textTransform:"uppercase",
                      textDecoration:"none", transition:"all 0.25s", width:"fit-content",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.gap = "1rem"; e.currentTarget.style.textShadow = `0 0 20px ${C.accent}`; }}
                      onMouseLeave={e => { e.currentTarget.style.gap = "0.5rem"; e.currentTarget.style.textShadow = "none"; }}
                    >View on GitHub →</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <section id="certificates" style={{ padding:"8rem 4rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeading label="Credentials" title="My" accent="Certificates"/>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"1.2rem" }}>
            {certificates.map((cert, i) => (
              <Reveal key={i} delay={i * 100} dir="up" style={{ height:200 , width:230}}>
                <div
                  onMouseEnter={() => setHoveredCert(i)}
                  onMouseLeave={() => setHoveredCert(null)}
                  style={{
                    width:"100%", height:"100%",
                    perspective:"1000px",
                    cursor:"default",
                  }}
                >
                  {/* Flip inner */}
                  <div style={{
                    position:"relative", width:"100%", height:"100%",
                    transformStyle:"preserve-3d",
                    transition:"transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
                    transform: hoveredCert === i ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}>

                    {/* ── FRONT ── */}
                    <div style={{
                      position:"absolute", inset:0,
                      backfaceVisibility:"hidden",
                      WebkitBackfaceVisibility:"hidden",
                      borderRadius:"10px",
                      overflow:"hidden",
                      border:`1px solid ${C.border}`,
                      boxShadow: hoveredCert === i ? `0 0 30px ${C.accent}33, 0 20px 60px rgba(0,0,0,0.5)` : "0 4px 24px rgba(0,0,0,0.3)",
                      transition:"box-shadow 0.4s",
                      background:C.subtle,
                    }}>
                      {cert.image
                        ? <img src={cert.image} alt={cert.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                        : <div style={{
                            width:"100%", height:"100%",
                            background:`linear-gradient(135deg, #13101e, #1e1530, #13101e)`,
                            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.6rem",
                          }}>
                            <div style={{ fontSize:"2.5rem", opacity:0.35 }}>📜</div>
                            <div style={{ fontSize:"0.6rem", color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:sans }}>Certificate</div>
                          </div>
                      }
                    </div>

                    {/* ── BACK ── */}
                    <div style={{
                      position:"absolute", inset:0,
                      backfaceVisibility:"hidden",
                      WebkitBackfaceVisibility:"hidden",
                      transform:"rotateY(180deg)",
                      borderRadius:"10px",
                      overflow:"hidden",
                      border:`1px solid ${C.accent}55`,
                      background:`linear-gradient(135deg, #0f0a1a, #1a0f2e, #0f0a1a)`,
                      boxShadow:`0 0 40px ${C.accent}44, 0 0 80px ${C.accentDim}22`,
                      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      padding:"1.5rem 1.2rem",
                      textAlign:"center",
                      gap:"1rem",
                    }}>
                      {/* Glow ring */}
                      <div style={{
                        width:64, height:64, borderRadius:"50%",
                        border:`1.5px solid ${C.accent}66`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:`0 0 20px ${C.accent}44, inset 0 0 20px ${C.accent}11`,
                        marginBottom:"0.2rem",
                      }}>
                        <div style={{ fontSize:"1.6rem" }}>🏆</div>
                      </div>
                      {/* Issuer */}
                      <div style={{
                        fontSize:"0.62rem", letterSpacing:"0.22em", textTransform:"uppercase",
                        fontFamily:sans, color:C.accent, fontWeight:700,
                      }}>{cert.issuer}</div>
                      {/* Title */}
                      <div style={{
                        fontSize:"0.8rem", color:C.text, fontFamily:"Georgia, serif",
                        lineHeight:1.6, fontWeight:600,
                      }}>{cert.title}</div>
                      {/* Year pill */}
                      <div style={{
                        padding:"0.25rem 0.9rem",
                        border:`1px solid ${C.accent}55`,
                        borderRadius:"20px",
                        fontSize:"0.6rem", color:C.accent,
                        fontFamily:sans, letterSpacing:"0.1em",
                        background:`${C.accent}11`,
                      }}>{cert.year}</div>
                      {/* Decorative lines */}
                      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:1, height:30, background:`linear-gradient(${C.accent}66, transparent)` }}/>
                      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:1, height:30, background:`linear-gradient(transparent, ${C.accent}66)` }}/>
                      <div style={{ position:"absolute", left:0, top:"50%", transform:"translateY(-50%)", height:1, width:20, background:`linear-gradient(90deg, ${C.accent}66, transparent)` }}/>
                      <div style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", height:1, width:20, background:`linear-gradient(90deg, transparent, ${C.accent}66)` }}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"8rem 4rem", background:C.surface }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <SectionHeading label="Contact" title="Let's" accent="Connect"/>
          <Reveal>
            <p style={{ color:C.muted, fontSize:"0.95rem", lineHeight:2, fontFamily:sans, fontWeight:300, marginBottom:"3rem", maxWidth:460 }}>
              I'm actively seeking my first professional role. Whether it's a full-time position, freelance project, or internship — I'd be glad to hear from you.
            </p>
          </Reveal>

          <div style={{ border:`1px solid ${C.border}` }}>
            {[
              { icon:"✉", label:"Email",    value:"nouraeljammal7@gmail.com",       href:"mailto:nouraeljammal7@gmail.com" },
              { icon:"in",label:"LinkedIn", value:"https://linkedin.com/in/noura-el-jammal-54762034b", href:"https://linkedin.com/in/noura-el-jammal-54762034b" },
              { icon:"⌥", label:"GitHub",   value:"https://github.com/noura8887777",      href:"https://github.com/noura8887777" },
            ].map((item, i, arr) => (
              <Reveal key={item.label} delay={i * 100}>
                <a href={item.href} target="_blank" rel="noreferrer" style={{
                  display:"flex", alignItems:"center", gap:"1.4rem",
                  padding:"1.3rem 1.8rem",
                  borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none",
                  textDecoration:"none", background:C.bg, transition:"all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#14131f"; e.currentTarget.style.paddingLeft = "2.2rem"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.paddingLeft = "1.8rem"; }}
                >
                  <span style={{ width:26, height:26, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", color:C.accent, fontFamily:sans, fontWeight:700, flexShrink:0, borderRadius:"2px", transition:"all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#000"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
                  >{item.icon}</span>
                  <span style={{ fontSize:"0.65rem", color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:sans, width:72 }}>{item.label}</span>
                  <span style={{ fontSize:"0.85rem", color:C.text, fontFamily:sans }}>{item.value}</span>
                  <span style={{ marginLeft:"auto", color:C.accent, fontSize:"0.9rem", transition:"transform 0.2s" }}>→</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div style={{ marginTop:"2.5rem", padding:"1.4rem 1.8rem", borderLeft:`2px solid ${C.accent}`, background:C.bg, border:`1px solid ${C.border}`, borderLeftColor:C.accent }}>
              <p style={{ color:C.muted, fontSize:"0.82rem", fontFamily:sans, fontWeight:300, lineHeight:1.9, margin:0 }}>
                Open to <span style={{ color:C.text }}>full-time positions</span>, <span style={{ color:C.text }}>freelance projects</span>, and <span style={{ color:C.text }}>internships</span>. Based in Morocco · Remote-friendly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"1.8rem 4rem", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <NouraLogo size={26}/>
        <span style={{ fontSize:"0.65rem", color:C.muted, fontFamily:sans, letterSpacing:"0.08em" }}>© 2024 Noura · Full-Stack Developer</span>
      </footer>

      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.accentDim}; }
        @keyframes pulse {
          0%,100% { transform:scale(1); opacity:0.05; }
          50% { transform:scale(1.08); opacity:0.08; }
        }
        @keyframes blink {
          0%,100% { opacity:1; }
          50% { opacity:0.3; }
        }
        @keyframes scrollLine {
          0% { transform:scaleY(0); transform-origin:top; opacity:1; }
          50% { transform:scaleY(1); transform-origin:top; opacity:1; }
          100% { transform:scaleY(1); transform-origin:bottom; opacity:0; }
        }
      `}</style>
    </div>
  );
}
