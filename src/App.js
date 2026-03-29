import { useState, useEffect, useRef } from "react";

/* ─── TOKENS ─── */
const C = {
  bg:"#0a0a0f", surface:"#111118", border:"rgba(255,255,255,0.07)",
  accent:"#C084FC", accentDim:"#7c3aed", text:"#f0eef5", muted:"#6b6880", subtle:"#1c1a26",
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
  { title:"House-of-Art E-Commerce", desc:"A dynamic online platform where Artisans showcase and sell authentic handmade art and crafts. Connects creators with a global audience, highlighting traditional craftsmanship.", tags:["Vue.js","Laravel","PostgreSQL"], image:"/e-commerce.jpeg", github:"https://github.com/OTMANE215/House-of-Art", year:"2026" },
  { title:"Mail Management App", desc:"Web application for managing incoming and outgoing mail, built with React.js and Laravel to digitize and optimize administrative processes.", tags:["React","MySQL","Laravel"], image:"/imgSTAGE.png", github:"https://github.com/noura8887777/mail-management", year:"2025" },
  { title:"EventFlex Website", desc:"Allows users to create and manage events, handle participants, organize sessions, and improve communication through a simple and intuitive interface.", tags:["Laravel","Inertia.js","MySQL"], image:"/imgPFE.png", github:"https://github.com/noura8887777/Event-Flex-project", year:"2025" },
];
const certificates = [
  { title:"CSS Essentials",              issuer:"Cisco", year:"2025", image:"/css.png" },
  { title:"HTML Essentials",             issuer:"Cisco", year:"2025", image:"/html.png" },
  { title:"Introduction to Modern AI",   issuer:"Cisco", year:"2025", image:"/ia.png" },
  { title:"Python Essentials 1 and 2",   issuer:"Cisco", year:"2024", image:"/python.png" },
  { title:"JavaScript Essentials 1 & 2", issuer:"Cisco", year:"2025", image:"/js.png" },
];

/* ─── LOGO ─── */
const NouraLogo = ({ size = 44 }) => (
  <svg width={size * 2.4} height={size} viewBox="0 0 210 80" fill="none">
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

/* ─── HOOKS ─── */
function useWindowSize() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}
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

/* ─── REVEAL ─── */
const Reveal = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, visible] = useReveal();
  const t = { up:"translateY(28px)", down:"translateY(-28px)", left:"translateX(-28px)", right:"translateX(28px)" };
  return (
    <div ref={ref} style={{ opacity:visible?1:0, transform:visible?"translateZ(0)":(t[dir]||"translateY(28px)"), transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`, willChange:visible?"auto":"opacity, transform", ...style }}>
      {children}
    </div>
  );
};

/* ─── SECTION HEADING ─── */
const SectionHeading = ({ label, title, accent }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom:"3rem" }}>
      <p style={{ fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.accent, fontWeight:600, marginBottom:"0.6rem", fontFamily:sans, opacity:visible?1:0, transform:visible?"none":"translateY(10px)", transition:"all 0.5s ease" }}>— {label}</p>
      <h2 style={{ fontSize:"clamp(1.6rem, 4vw, 2.5rem)", fontWeight:700, color:C.text, lineHeight:1.15, fontFamily:"Georgia, serif", opacity:visible?1:0, transform:visible?"none":"translateY(16px)", transition:"all 0.6s ease 0.1s" }}>
        {title} <span style={{ color:C.accent }}>{accent}</span>
      </h2>
      <div style={{ width:visible?36:0, height:1, background:C.accent, marginTop:"1rem", opacity:0.6, transition:"width 0.8s ease 0.3s" }}/>
    </div>
  );
};

/* ─── PARTICLES ─── */
const ParticleCanvas = ({ count = 45 }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const particles = Array.from({ length: count }, () => ({
      x:Math.random()*W, y:Math.random()*H,
      r:Math.random()*1.4+0.3, vx:(Math.random()-0.5)*0.28, vy:(Math.random()-0.5)*0.28, o:Math.random()*0.4+0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(192,132,252,${p.o})`; ctx.fill();
      });
      for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(192,132,252,${0.06*(1-d/110)})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    const onR=()=>{ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    window.addEventListener("resize",onR);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",onR); };
  }, [count]);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}/>;
};

/* ─── TYPEWRITER ─── */
const Typewriter = ({ words, speed=90, pause=2000 }) => {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => { const t = setInterval(()=>setBlink(b=>!b),530); return ()=>clearInterval(t); },[]);
  useEffect(() => {
    const word = words[wIdx]; let timeout;
    if (!deleting && cIdx <= word.length) { setDisplay(word.slice(0,cIdx)); timeout = setTimeout(()=>setCIdx(c=>c+1), speed); }
    else if (!deleting && cIdx > word.length) { timeout = setTimeout(()=>setDeleting(true), pause); }
    else if (deleting && cIdx >= 0) { setDisplay(word.slice(0,cIdx)); timeout = setTimeout(()=>setCIdx(c=>c-1), speed/2); }
    else { setDeleting(false); setWIdx(w=>(w+1)%words.length); setCIdx(0); }
    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words, speed, pause]);
  return <span style={{ color:C.accent }}>{display}<span style={{ opacity:blink?1:0, transition:"opacity 0.1s" }}>|</span></span>;
};

/* ─── MAGNETIC BUTTON ─── */
const MagneticBtn = ({ children, onClick, primary, fullWidth }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.3}px,${(e.clientY-r.top-r.height/2)*0.3}px)`;
  };
  const onLeave = () => { ref.current.style.transform = "none"; };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ padding:"0.82rem 2rem", border:primary?"none":`1px solid ${C.border}`, background:primary?C.accent:"transparent", color:primary?"#000":C.text, fontSize:"0.75rem", fontWeight:primary?700:400, cursor:"pointer", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans, borderRadius:"2px", transition:"transform 0.2s, box-shadow 0.2s, border-color 0.2s", width:fullWidth?"100%":"auto" }}
      onMouseEnter={e=>{ if(primary) e.currentTarget.style.boxShadow=`0 0 28px ${C.accent}66`; else e.currentTarget.style.borderColor=C.accent; }}
      onFocus={()=>{}}
    >{children}</button>
  );
};

/* ─── STAT COUNTER ─── */
const StatCounter = ({ num, suffix="", label, visible }) => {
  const count = useCounter(parseInt(num), visible);
  return (
    <div style={{ opacity:visible?1:0, transform:visible?"none":"translateY(20px)", transition:"all 0.7s ease" }}>
      <div style={{ fontSize:"2rem", fontWeight:700, color:C.accent, fontFamily:"Georgia, serif", lineHeight:1 }}>{count}{suffix}</div>
      <div style={{ fontSize:"0.62rem", color:C.muted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:sans, marginTop:"0.3rem" }}>{label}</div>
    </div>
  );
};

/* ─── HAMBURGER MENU ─── */
const HamburgerMenu = ({ open, setOpen, scrollTo, active }) => {
  const links = ["home","skills","projects","certificates","contact"];
  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:"4px", padding:"0.4rem 0.6rem", cursor:"pointer", display:"flex", flexDirection:"column", gap:"4px" }}>
        {[0,1,2].map(i => <span key={i} style={{ display:"block", width:20, height:1.5, background:open&&i===1?"transparent":C.accent, transition:"all 0.3s", transform:open?(i===0?"rotate(45deg) translate(4px,4px)":i===2?"rotate(-45deg) translate(4px,-4px)":"none"):"none" }}/>)}
      </button>
      {open && (
        <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, background:"rgba(10,10,15,0.97)", zIndex:99, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2.5rem" }}>
          <button onClick={()=>setOpen(false)} style={{ position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"none", color:C.muted, fontSize:"1.4rem", cursor:"pointer" }}>✕</button>
          {links.map(s => (
            <button key={s} onClick={()=>{ scrollTo(s); setOpen(false); }} style={{ background:"none", border:"none", color:active===s?C.accent:C.text, fontSize:"1.5rem", fontWeight:600, cursor:"pointer", fontFamily:"Georgia, serif", textTransform:"capitalize", letterSpacing:"0.05em" }}>{s}</button>
          ))}
          <a href="/CV_NOURA_EL-JAMMAL_.pdf" download style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.8rem 2rem", background:C.accent, color:"#000", borderRadius:"2px", fontFamily:sans, fontSize:"0.8rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", textDecoration:"none" }}>
            ↓ Download CV
          </a>
        </div>
      )}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const w = useWindowSize();
  const isMobile  = w < 768;
  const isTablet  = w >= 768 && w < 1100;
  const isDesktop = w >= 1100;
  const secPad = isMobile ? "5rem 1.5rem" : isTablet ? "6rem 2.5rem" : "8rem 4rem";

  const [active, setActive]               = useState("home");
  const [scrolled, setScrolled]           = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredCert, setHoveredCert]     = useState(null);
  const [heroVisible, setHeroVisible]     = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const cursorRingRef = useRef(null);
  const cursorDotRef  = useRef(null);
  const [statsRef, statsVisible] = useReveal(0.3);

  useEffect(() => { const t = setTimeout(()=>setHeroVisible(true),100); return ()=>clearTimeout(t); }, []);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Smooth cursor — desktop only */
  useEffect(() => {
    if (isMobile) return;
    let cx = window.innerWidth/2, cy = window.innerHeight/2, rx = cx, ry = cy;
    const move = (e) => { cx=e.clientX; cy=e.clientY; };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      rx+=(cx-rx)*0.12; ry+=(cy-ry)*0.12;
      if(cursorRingRef.current){ cursorRingRef.current.style.left=rx+"px"; cursorRingRef.current.style.top=ry+"px"; }
      if(cursorDotRef.current){ cursorDotRef.current.style.left=cx+"px"; cursorDotRef.current.style.top=cy+"px"; }
      raf=requestAnimationFrame(animate);
    };
    animate();
    return ()=>{ window.removeEventListener("mousemove",move); cancelAnimationFrame(raf); };
  }, [isMobile]);

  const scrollTo = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); };

  return (
    <div style={{ fontFamily:"Georgia, serif", background:C.bg, color:C.text, overflowX:"hidden", cursor:isMobile?"auto":"none" }}>

      {/* Custom cursor — desktop only */}
      {!isMobile && <>
        <div ref={cursorRingRef} style={{ position:"fixed", width:28, height:28, borderRadius:"50%", border:`1.5px solid ${C.accent}`, pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)" }}/>
        <div ref={cursorDotRef}  style={{ position:"fixed", width:5, height:5, borderRadius:"50%", background:C.accent, pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)" }}/>
      </>}

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, width:"100%", zIndex:100, background:scrolled?"rgba(10,10,15,0.96)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?`1px solid ${C.border}`:"none", transition:"all 0.4s ease", display:"flex", justifyContent:"space-between", alignItems:"center", padding:isMobile?"0.9rem 1.5rem":"1.1rem 4rem", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(-20px)" }}>

        <div style={{ cursor:"pointer" }} onClick={()=>scrollTo("home")} onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <NouraLogo size={isMobile?26:32}/>
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display:"flex", gap:"2.2rem", alignItems:"center" }}>
            {["home","skills","projects","certificates","contact"].map((s,i) => (
              <button key={s} onClick={()=>scrollTo(s)} style={{ background:"none", border:"none", color:active===s?C.accent:C.muted, fontSize:"0.75rem", cursor:"pointer", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans, transition:"color 0.2s, transform 0.2s", paddingBottom:"2px", borderBottom:active===s?`1px solid ${C.accent}`:"1px solid transparent", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(-10px)", transitionDelay:`${0.4+i*0.07}s` }}
                onMouseEnter={e=>{ if(active!==s){ e.currentTarget.style.color=C.text; e.currentTarget.style.transform="translateY(-2px)"; }}}
                onMouseLeave={e=>{ if(active!==s){ e.currentTarget.style.color=C.muted; e.currentTarget.style.transform="none"; }}}
              >{s}</button>
            ))}
            {/* Download CV — nav */}
            <a href="/CV_NOURA_EL-JAMMAL_.pdf" download style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", padding:"0.42rem 1rem", border:`1px solid ${C.accent}55`, background:`${C.accent}11`, color:C.accent, fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", fontFamily:sans, borderRadius:"2px", textDecoration:"none", transition:"all 0.25s", opacity:heroVisible?1:0, transitionDelay:"0.75s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=C.accent; e.currentTarget.style.color="#000"; e.currentTarget.style.boxShadow=`0 0 18px ${C.accent}55`; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=`${C.accent}11`; e.currentTarget.style.color=C.accent; e.currentTarget.style.boxShadow="none"; }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CV
            </a>
            <button onClick={()=>scrollTo("contact")} style={{ padding:"0.45rem 1.3rem", border:`1px solid ${C.accent}`, background:"transparent", color:C.accent, fontSize:"0.72rem", fontWeight:500, cursor:"pointer", fontFamily:sans, letterSpacing:"0.12em", textTransform:"uppercase", borderRadius:"2px", transition:"all 0.25s", opacity:heroVisible?1:0, transitionDelay:"0.85s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=C.accent; e.currentTarget.style.color="#000"; e.currentTarget.style.boxShadow=`0 0 20px ${C.accent}55`; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.accent; e.currentTarget.style.boxShadow="none"; }}
            >Hire Me</button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && <HamburgerMenu open={menuOpen} setOpen={setMenuOpen} scrollTo={scrollTo} active={active}/>}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:isMobile?"0 1.5rem":isTablet?"0 2.5rem":"0 4rem" }}>
        <ParticleCanvas count={isMobile?20:45}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`, backgroundSize:"64px 64px", opacity:0.28, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"10%", right:"10%", width:isMobile?300:700, height:isMobile?300:700, borderRadius:"50%", background:C.accentDim, opacity:0.05, filter:"blur(140px)", pointerEvents:"none", animation:"pulse 5s ease-in-out infinite" }}/>

        <div style={{ zIndex:1, maxWidth:isDesktop?680:"100%", paddingTop:isMobile?"90px":"110px", paddingBottom:"80px", width:"100%" }}>

          {/* Badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.3rem 0.85rem", border:`1px solid ${C.border}`, borderRadius:"2px", marginBottom:"1.8rem", background:C.surface, opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(20px)", transition:"all 0.6s ease 0.1s" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", display:"inline-block", boxShadow:"0 0 8px #4ade80", animation:"blink 2s ease-in-out infinite" }}/>
            <span style={{ fontSize:isMobile?"0.6rem":"0.65rem", letterSpacing:"0.14em", color:C.muted, textTransform:"uppercase", fontFamily:sans }}>Available for opportunities</span>
          </div>

          <h1 style={{ fontSize:"clamp(3rem,10vw,6rem)", fontWeight:700, lineHeight:1.0, marginBottom:"0.4rem", fontFamily:"Georgia, serif", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(30px)", transition:"all 0.7s ease 0.2s" }}>
            Noura
          </h1>
          <div style={{ fontSize:"clamp(0.55rem, 1.5vw, 0.7rem)", letterSpacing:"0.2em", color:C.muted, textTransform:"uppercase", fontFamily:sans, marginBottom:"1.2rem", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(15px)", transition:"all 0.7s ease 0.28s" }}>
            El-Jammal
          </div>

          <h2 style={{ fontSize:"clamp(0.95rem,3vw,1.45rem)", fontWeight:300, color:C.muted, marginBottom:"1.6rem", fontFamily:sans, letterSpacing:"0.06em", minHeight:"2rem", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(20px)", transition:"all 0.7s ease 0.35s" }}>
            <Typewriter words={["Junior Full-Stack Developer","React & Vue Specialist","Laravel & PHP Developer","Open to New Opportunities"]} speed={80} pause={2200}/>
          </h2>

          <p style={{ color:C.muted, maxWidth:isMobile?"100%":"480px", lineHeight:1.95, fontSize:isMobile?"0.88rem":"0.93rem", marginBottom:"2.5rem", fontFamily:sans, fontWeight:300, opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(20px)", transition:"all 0.7s ease 0.5s" }}>
            I build modern web applications — from pixel-perfect interfaces to robust server-side systems. Seeking my first professional role within a team that values clean code and continuous growth.
          </p>

          {/* CTA Buttons */}
          <div style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateY(20px)", transition:"all 0.7s ease 0.65s" }}>
            <MagneticBtn primary onClick={()=>scrollTo("projects")} fullWidth={isMobile}>View Projects</MagneticBtn>
            <MagneticBtn onClick={()=>scrollTo("contact")} fullWidth={isMobile}>Get in Touch</MagneticBtn>
            {/* Download CV Button */}
            <a href="/CV_NOURA_EL-JAMMAL_.pdf" download="CV_Noura_El-Jammal.pdf"
              style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.5rem", padding:"0.82rem 1.8rem", border:`1px solid ${C.accent}55`, background:`${C.accent}11`, color:C.accent, fontSize:"0.75rem", fontWeight:600, cursor:"pointer", letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans, borderRadius:"2px", textDecoration:"none", transition:"all 0.25s", width:isMobile?"100%":"auto" }}
              onMouseEnter={e=>{ e.currentTarget.style.background=C.accent; e.currentTarget.style.color="#000"; e.currentTarget.style.boxShadow=`0 0 25px ${C.accent}55`; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=`${C.accent}11`; e.currentTarget.style.color=C.accent; e.currentTarget.style.boxShadow="none"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download CV
            </a>
          </div>

          {/* Stats */}
          <div ref={statsRef} style={{ display:"flex", gap:isMobile?"2rem":"3.5rem", marginTop:isMobile?"3rem":"4rem", paddingTop:isMobile?"2rem":"3rem", borderTop:`1px solid ${C.border}`, opacity:heroVisible?1:0, transition:"all 0.7s ease 0.8s", flexWrap:"wrap" }}>
            <StatCounter num={3} suffix="+" label="Projects"       visible={statsVisible}/>
            <StatCounter num={9} suffix="+" label="Technologies"   visible={statsVisible}/>
            <StatCounter num={5}             label="Certifications" visible={statsVisible}/>
          </div>
        </div>

        {/* Code block — desktop only */}
        {isDesktop && (
          <div style={{ position:"absolute", right:"4rem", top:"50%", transform:"translateY(-50%)", pointerEvents:"none", userSelect:"none", opacity:heroVisible?1:0, transition:"opacity 0.8s ease 1s", width:310, borderRadius:"10px", overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}>
            <div style={{ background:"#1e1e2e", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"0.55rem 1rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", gap:"0.35rem" }}>
                {["#ff5f57","#febc2e","#28c840"].map(col=><span key={col} style={{ width:10, height:10, borderRadius:"50%", background:col, display:"inline-block" }}/>)}
              </div>
              <span style={{ fontSize:"0.6rem", color:"rgba(255,255,255,0.28)", fontFamily:sans }}>developer.js</span>
              <span style={{ width:36 }}/>
            </div>
            <div style={{ background:"#13131f", padding:"1.1rem 0 1.3rem" }}>
              {[
                { ln:1,  tokens:[{c:"#c792ea",v:"const "},{c:"#82aaff",v:"developer"},{c:"#cdd6f4",v:" = {"}] },
                { ln:2,  tokens:[{c:"#6c7086",v:"  // Junior Full-Stack"}] },
                { ln:3,  tokens:[{c:"#cdd6f4",v:"  "},{c:"#89dceb",v:"name"},{c:"#cdd6f4",v:":  "},{c:"#a6e3a1",v:'"Noura El-Jammal"'},{c:"#cdd6f4",v:","}] },
                { ln:4,  tokens:[{c:"#cdd6f4",v:"  "},{c:"#89dceb",v:"role"},{c:"#cdd6f4",v:":  "},{c:"#a6e3a1",v:'"Fullstack"'},{c:"#cdd6f4",v:","}] },
                { ln:5,  tokens:[{c:"#cdd6f4",v:"  "},{c:"#89dceb",v:"stack"},{c:"#cdd6f4",v:": ["}] },
                { ln:6,  tokens:[{c:"#a6e3a1",v:'    "React"'},{c:"#cdd6f4",v:", "},{c:"#a6e3a1",v:'"Vue.js"'},{c:"#cdd6f4",v:","}] },
                { ln:7,  tokens:[{c:"#a6e3a1",v:'    "Laravel"'},{c:"#cdd6f4",v:", "},{c:"#a6e3a1",v:'"PHP"'}] },
                { ln:8,  tokens:[{c:"#cdd6f4",v:"  ],"}] },
                { ln:9,  tokens:[{c:"#cdd6f4",v:"  "},{c:"#89dceb",v:"available"},{c:"#cdd6f4",v:": "},{c:"#fab387",v:"true"}] },
                { ln:10, tokens:[{c:"#cdd6f4",v:"};"}] },
              ].map((line,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"baseline", padding:"0 1rem", opacity:heroVisible?1:0, transform:heroVisible?"none":"translateX(14px)", transition:`opacity 0.45s ease ${1.1+i*0.07}s, transform 0.45s ease ${1.1+i*0.07}s` }}>
                  <span style={{ minWidth:22, fontSize:"0.62rem", color:"rgba(255,255,255,0.16)", fontFamily:"'Courier New', monospace", textAlign:"right", marginRight:"1rem", lineHeight:2 }}>{line.ln}</span>
                  <span style={{ fontFamily:"'Courier New', monospace", fontSize:"0.73rem", lineHeight:2, whiteSpace:"nowrap" }}>
                    {line.tokens.map((tok,j)=><span key={j} style={{ color:tok.c }}>{tok.v}</span>)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ background:"#C084FC", padding:"0.18rem 1rem", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:"0.56rem", color:"#000", fontFamily:sans, fontWeight:600 }}>JavaScript</span>
              <span style={{ fontSize:"0.56rem", color:"#000", fontFamily:sans }}>UTF-8</span>
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        {!isMobile && (
          <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem", opacity:heroVisible?0.35:0, transition:"opacity 1s ease 1.2s" }}>
            <span style={{ fontSize:"0.56rem", letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:sans, color:C.muted }}>scroll</span>
            <div style={{ width:1, height:36, background:`linear-gradient(${C.accent}, transparent)`, animation:"scrollLine 1.8s ease-in-out infinite" }}/>
          </div>
        )}
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:secPad, position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <SectionHeading label="Expertise" title="Technical" accent="Skills"/>
          {["Frontend","Backend","Database"].map((cat,ci)=>(
            <Reveal key={cat} delay={ci*120}>
              <div style={{ display:"flex", flexDirection:isMobile?"column":"row", alignItems:isMobile?"flex-start":"center", gap:isMobile?"0.8rem":"2.5rem", paddingBottom:"1.4rem", marginBottom:"1.4rem", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:isMobile?"auto":80, fontSize:"0.62rem", letterSpacing:"0.18em", textTransform:"uppercase", color:C.accent, fontFamily:sans, flexShrink:0, fontWeight:600 }}>{cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {skills.filter(s=>s.cat===cat).map((s,si)=>(
                    <Reveal key={s.name} delay={ci*80+si*50} dir="right">
                      <span style={{ padding:"0.28rem 0.85rem", border:`1px solid ${C.border}`, borderRadius:"2px", fontSize:isMobile?"0.75rem":"0.8rem", color:C.text, fontFamily:sans, background:C.surface, letterSpacing:"0.03em", transition:"all 0.25s", cursor:"default", display:"block" }}
                        onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.accent; e.currentTarget.style.background="#1a1228"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 6px 20px ${C.accent}33`; }}
                        onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; e.currentTarget.style.background=C.surface; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
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
      <section id="projects" style={{ padding:secPad, background:C.surface }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeading label="Work" title="Selected" accent="Projects"/>
          <div style={{ border:`1px solid ${C.border}` }}>
            {projects.map((p,i)=>(
              <Reveal key={p.title} delay={i*120}>
                <div onMouseEnter={()=>setHoveredProject(i)} onMouseLeave={()=>setHoveredProject(null)}
                  style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1.2fr":"1fr 1.5fr", borderBottom:i<projects.length-1?`1px solid ${C.border}`:"none", background:hoveredProject===i?"#13131e":"transparent", transition:"background 0.4s", minHeight:isMobile?0:200, overflow:"hidden" }}
                >
                  <div style={{ overflow:"hidden", position:"relative", height:isMobile?200:"auto" }}>
                    <img src={p.image} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease", transform:hoveredProject===i?"scale(1.05)":"scale(1)" }}/>
                    <div style={{ position:"absolute", inset:0, background:hoveredProject===i?"linear-gradient(to right, rgba(124,58,237,0.12) 0%, transparent 60%)":"linear-gradient(to right, rgba(10,10,15,0.3) 0%, rgba(17,17,24,0.8) 100%)", transition:"all 0.5s", pointerEvents:"none" }}/>
                    <div style={{ position:"absolute", bottom:10, left:10, background:"rgba(10,10,15,0.75)", backdropFilter:"blur(8px)", border:`1px solid ${C.border}`, borderRadius:"3px", padding:"0.18rem 0.55rem", fontSize:"0.58rem", color:C.muted, fontFamily:sans, letterSpacing:"0.1em" }}>{p.year}</div>
                  </div>
                  <div style={{ padding:isMobile?"1.4rem":"2rem 2.5rem", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <h3 style={{ fontSize:isMobile?"1rem":"1.12rem", fontWeight:600, fontFamily:"Georgia, serif", color:C.text, marginBottom:"0.6rem" }}>{p.title}</h3>
                      <p style={{ color:C.muted, fontSize:isMobile?"0.82rem":"0.84rem", lineHeight:1.85, fontFamily:sans, fontWeight:300, marginBottom:"1.2rem" }}>{p.desc}</p>
                      <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                        {p.tags.map(t=>(
                          <span key={t} style={{ fontSize:"0.58rem", padding:"0.16rem 0.55rem", border:`1px solid ${C.border}`, borderRadius:"2px", color:C.muted, fontFamily:sans, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.2s" }}
                            onMouseEnter={e=>{ e.currentTarget.style.borderColor=C.accent; e.currentTarget.style.color=C.accent; }}
                            onMouseLeave={e=>{ e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}
                          >{t}</span>
                        ))}
                      </div>
                    </div>
                    <a href={p.github} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", marginTop:"1.4rem", color:C.accent, fontSize:"0.7rem", fontWeight:600, fontFamily:sans, letterSpacing:"0.14em", textTransform:"uppercase", textDecoration:"none", transition:"all 0.25s", width:"fit-content" }}
                      onMouseEnter={e=>{ e.currentTarget.style.gap="1rem"; e.currentTarget.style.textShadow=`0 0 20px ${C.accent}`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.gap="0.5rem"; e.currentTarget.style.textShadow="none"; }}
                    >View on GitHub →</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      <section id="certificates" style={{ padding:secPad }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <SectionHeading label="Credentials" title="My" accent="Certificates"/>
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":isTablet?"repeat(3,1fr)":"repeat(5,1fr)", gap:"1.2rem" }}>
            {certificates.map((cert,i)=>(
              <Reveal key={i} delay={i*100} dir="up" style={{ height:isMobile?200:260 }}>
                <div onMouseEnter={()=>setHoveredCert(i)} onMouseLeave={()=>setHoveredCert(null)} style={{ width:"100%", height:"100%", perspective:"1000px", cursor:"default" }}>
                  <div style={{ position:"relative", width:"100%", height:"100%", transformStyle:"preserve-3d", transition:"transform 0.7s cubic-bezier(0.4,0.2,0.2,1)", transform:hoveredCert===i?"rotateY(180deg)":"rotateY(0deg)" }}>
                    {/* FRONT */}
                    <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", borderRadius:"10px", overflow:"hidden", border:`1px solid ${C.border}`, boxShadow:hoveredCert===i?`0 0 30px ${C.accent}33, 0 20px 60px rgba(0,0,0,0.5)`:"0 4px 24px rgba(0,0,0,0.3)", transition:"box-shadow 0.4s", background:C.subtle }}>
                      {cert.image
                        ? <img src={cert.image} alt={cert.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                        : <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg, #13101e, #1e1530, #13101e)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.6rem" }}>
                            <div style={{ fontSize:"2rem", opacity:0.3 }}>📜</div>
                            <div style={{ fontSize:"0.58rem", color:C.muted, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:sans }}>Certificate</div>
                          </div>
                      }
                    </div>
                    {/* BACK */}
                    <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden", transform:"rotateY(180deg)", borderRadius:"10px", overflow:"hidden", border:`1px solid ${C.accent}55`, background:"linear-gradient(135deg, #0f0a1a, #1a0f2e, #0f0a1a)", boxShadow:`0 0 40px ${C.accent}44, 0 0 80px ${C.accentDim}22`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"1.2rem", textAlign:"center", gap:"0.7rem" }}>
                      <div style={{ width:52, height:52, borderRadius:"50%", border:`1.5px solid ${C.accent}66`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 20px ${C.accent}44, inset 0 0 20px ${C.accent}11` }}>
                        <span style={{ fontSize:"1.4rem" }}>🏆</span>
                      </div>
                      <div style={{ fontSize:"0.58rem", letterSpacing:"0.22em", textTransform:"uppercase", fontFamily:sans, color:C.accent, fontWeight:700 }}>{cert.issuer}</div>
                      <div style={{ fontSize:isMobile?"0.7rem":"0.76rem", color:C.text, fontFamily:"Georgia, serif", lineHeight:1.55, fontWeight:600 }}>{cert.title}</div>
                      <div style={{ padding:"0.2rem 0.8rem", border:`1px solid ${C.accent}55`, borderRadius:"20px", fontSize:"0.56rem", color:C.accent, fontFamily:sans, letterSpacing:"0.1em", background:`${C.accent}11` }}>{cert.year}</div>
                      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:1, height:22, background:`linear-gradient(${C.accent}66, transparent)` }}/>
                      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:1, height:22, background:`linear-gradient(transparent, ${C.accent}66)` }}/>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:secPad, background:C.surface }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <SectionHeading label="Contact" title="Let's" accent="Connect"/>
          <Reveal>
            <p style={{ color:C.muted, fontSize:isMobile?"0.88rem":"0.93rem", lineHeight:2, fontFamily:sans, fontWeight:300, marginBottom:"2.5rem", maxWidth:460 }}>
              I'm actively seeking my first professional role. Whether it's a full-time position, freelance project, or internship — I'd be glad to hear from you.
            </p>
          </Reveal>
          <div style={{ border:`1px solid ${C.border}` }}>
            {[
              { icon:"✉",  label:"Email",    value:"nouraeljammal7@gmail.com",                     href:"mailto:nouraeljammal7@gmail.com" },
              { icon:"in", label:"LinkedIn", value:"linkedin.com/in/noura-el-jammal-54762034b",    href:"https://www.linkedin.com/in/noura-el-jammal-54762034b" },
              { icon:"⌥",  label:"GitHub",   value:"github.com/noura-el-jammal",                      href:"https://github.com/noura-el-jammal" },
              { icon:"📞", label:"Phone",    value:"+212 711 879 085",                              href:"tel:+212711879085" },
            ].map((item,i,arr)=>(
              <Reveal key={item.label} delay={i*80}>
                <a href={item.href} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"1.2rem", padding:isMobile?"1rem 1.2rem":"1.3rem 1.8rem", borderBottom:i<arr.length-1?`1px solid ${C.border}`:"none", textDecoration:"none", background:C.bg, transition:"all 0.25s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#14131f"; e.currentTarget.style.paddingLeft=isMobile?"1.6rem":"2.2rem"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=C.bg; e.currentTarget.style.paddingLeft=isMobile?"1.2rem":"1.8rem"; }}
                >
                  <span style={{ width:26, height:26, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.62rem", color:C.accent, fontFamily:sans, fontWeight:700, flexShrink:0, borderRadius:"2px", transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=C.accent; e.currentTarget.style.color="#000"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.accent; }}
                  >{item.icon}</span>
                  <span style={{ fontSize:"0.6rem", color:C.muted, letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:sans, width:isMobile?55:70, flexShrink:0 }}>{item.label}</span>
                  <span style={{ fontSize:isMobile?"0.75rem":"0.83rem", color:C.text, fontFamily:sans, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.value}</span>
                  <span style={{ marginLeft:"auto", color:C.accent, fontSize:"0.85rem", flexShrink:0 }}>→</span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div style={{ marginTop:"2rem", padding:"1.3rem 1.8rem", borderLeft:`2px solid ${C.accent}`, background:C.bg, border:`1px solid ${C.border}`, borderLeftColor:C.accent }}>
              <p style={{ color:C.muted, fontSize:"0.8rem", fontFamily:sans, fontWeight:300, lineHeight:1.9, margin:0 }}>
                Open to <span style={{ color:C.text }}>full-time positions</span>, <span style={{ color:C.text }}>freelance projects</span>, and <span style={{ color:C.text }}>internships</span>. Based in <span style={{ color:C.text }}>Fez, Morocco</span> · Remote-friendly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:isMobile?"1.4rem 1.5rem":"1.8rem 4rem", borderTop:`1px solid ${C.border}`, display:"flex", flexDirection:isMobile?"column":"row", justifyContent:"space-between", alignItems:"center", gap:"1rem" }}>
        <NouraLogo size={isMobile?22:26}/>
        <span style={{ fontSize:"0.62rem", color:C.muted, fontFamily:sans, letterSpacing:"0.08em", textAlign:isMobile?"center":"right" }}>© 2025 Noura El-Jammal · Full-Stack Developer</span>
      </footer>

      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.accentDim}; }
        @keyframes pulse { 0%,100%{opacity:0.05;} 50%{opacity:0.08;} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes scrollLine { 0%{transform:scaleY(0);transform-origin:top;opacity:1;} 50%{transform:scaleY(1);transform-origin:top;opacity:1;} 100%{transform:scaleY(1);transform-origin:bottom;opacity:0;} }
      `}</style>
    </div>
  );
}