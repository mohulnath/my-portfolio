import { useEffect, useState, useRef } from "react";

const LINKS = [
  { label: "Home",       href: "#home",       icon: "⌂" },
  { label: "About",      href: "#about",      icon: "◎" },
  { label: "Skills",     href: "#skills",     icon: "◈" },
  { label: "Experience", href: "#experience", icon: "◆" },
  { label: "Projects",   href: "#projects",   icon: "◉" },
  { label: "Contact",    href: "#contact",    icon: "◇" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [pillStyle,  setPillStyle]  = useState({});
  const [mounted,    setMounted]    = useState(false);
  const navLinksRef = useRef(null);
  const linkRefs    = useRef({});

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sy   = window.scrollY;
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight - winH;
      setScrolled(sy > 40);

      // If at very top, always Home
      if (sy < 50) { setActive("home"); return; }

      const sections = LINKS.map(l => l.href.replace("#", ""));
      let current = "home";
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is considered active when its top has crossed 40% of viewport
        if (rect.top <= winH * 0.4) {
          current = sections[i];
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const updatePill = (key) => {
    const el = linkRefs.current[key];
    const container = navLinksRef.current;
    if (!el || !container) return;
    const eBounds = el.getBoundingClientRect();
    const cBounds = container.getBoundingClientRect();
    setPillStyle({
      left:  eBounds.left - cBounds.left,
      width: eBounds.width,
      opacity: 1,
    });
  };

  const clearPill = () => {
    const activeKey = active;
    const el = linkRefs.current[activeKey];
    const container = navLinksRef.current;
    if (!el || !container) { setPillStyle({ opacity: 0 }); return; }
    const eBounds = el.getBoundingClientRect();
    const cBounds = container.getBoundingClientRect();
    setPillStyle({
      left:  eBounds.left - cBounds.left,
      width: eBounds.width,
      opacity: 1,
    });
  };

  useEffect(() => { clearPill(); }, [active]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
      

        :root {
          --c-bg:        #04060f;
          --c-accent1:   #6d6aff;
          --c-accent2:   #b06dff;
          --c-accent3:   #00d4ff;
          --c-fg:        #f0f0ff;
          --c-muted:     rgba(200,200,240,0.45);
          --c-glass:     rgba(8,10,28,0.72);
          --c-border:    rgba(255,255,255,0.07);
          --nav-h:       68px;
          --font-display:'Clash Display', sans-serif;
          --font-body:   'Inter', sans-serif;
        }

        /* ─── Nav shell ─── */
        .xnav {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          height: var(--nav-h);
          display:flex; align-items:center; justify-content:space-between;
          padding:0 40px;
          font-family: var(--font-body);
          transition: all .5s cubic-bezier(.22,1,.36,1);
          opacity: 0; transform: translateY(-16px);
        }
        .xnav.xmounted {
          opacity: 1; transform: translateY(0);
        }
        .xnav.xscrolled {
          height: 60px;
          background: var(--c-glass);
          backdrop-filter: blur(28px) saturate(1.6);
          -webkit-backdrop-filter: blur(28px) saturate(1.6);
          border-bottom: 1px solid var(--c-border);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.03),
                      0 8px 48px rgba(0,0,0,.5),
                      0 0 80px rgba(109,106,255,0.04);
        }

        /* Animated top-edge glow line when scrolled */
        .xnav.xscrolled::after {
          content:'';
          position:absolute; top:0; left:10%; right:10%; height:1px;
          background: linear-gradient(90deg, transparent, var(--c-accent1), var(--c-accent2), var(--c-accent3), transparent);
          opacity:.35;
          animation: glowEdge 3s ease-in-out infinite alternate;
        }
        @keyframes glowEdge {
          from { opacity:.2; filter:blur(0px); }
          to   { opacity:.5; filter:blur(1px); }
        }

        /* ─── Logo ─── */
        .xlogo {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 800;
          letter-spacing: -.04em;
          display: flex; align-items: center;
          cursor: pointer; user-select: none;
          text-decoration: none;
          position: relative;
          transition: transform .3s;
        }
        .xlogo:hover { transform: scale(1.04); }

        .xlogo-text {
          color: var(--c-fg);
          background: linear-gradient(135deg, #e8e8ff 30%, #a8a4ff 60%, #7b78ff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .xlogo-dot {
          font-size: 28px; line-height: 1;
          background: linear-gradient(135deg, var(--c-accent1), var(--c-accent2), var(--c-accent3));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: dotPop 2.8s ease-in-out infinite;
          display: inline-block;
        }
        @keyframes dotPop {
          0%,100% { transform: scale(1) translateY(0); filter: brightness(1); }
          50%      { transform: scale(1.25) translateY(-2px); filter: brightness(1.5); }
        }

        /* Logo bracket decorations */
        .xlogo::before {
          content: '[';
          font-family: var(--font-body);
          font-size: 14px; font-weight: 300;
          color: var(--c-accent1);
          opacity: 0;
          margin-right: -4px;
          transition: opacity .3s, transform .3s;
          transform: translateX(4px);
        }
        .xlogo::after {
          content: ']';
          font-family: var(--font-body);
          font-size: 14px; font-weight: 300;
          color: var(--c-accent1);
          opacity: 0;
          margin-left: -2px;
          transition: opacity .3s, transform .3s;
          transform: translateX(-4px);
        }
        .xlogo:hover::before { opacity: .7; transform: translateX(0); }
        .xlogo:hover::after  { opacity: .7; transform: translateX(0); }

        /* ─── Desktop links ─── */
        .xlinks-wrap {
          position: absolute; left:50%; transform: translateX(-50%);
          display: flex; align-items: center;
        }

        .xlinks {
          position: relative;
          display: flex; align-items: center; gap: 0;
          list-style: none; margin: 0; padding: 6px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 99px;
          backdrop-filter: blur(8px);
        }

        /* Sliding background pill */
        .xpill {
          position: absolute;
          top: 6px; height: calc(100% - 12px);
          border-radius: 99px;
          background: linear-gradient(135deg, rgba(109,106,255,.22), rgba(176,109,255,.18));
          border: 1px solid rgba(109,106,255,.3);
          box-shadow: 0 0 16px rgba(109,106,255,.2),
                      inset 0 1px 0 rgba(255,255,255,.08);
          transition: left .35s cubic-bezier(.22,1,.36,1),
                      width .35s cubic-bezier(.22,1,.36,1),
                      opacity .2s;
          pointer-events: none;
          will-change: left, width;
        }

        .xlink {
          font-size: 13px; font-weight: 400;
          color: var(--c-muted);
          background: none; border: none;
          padding: 8px 16px;
          border-radius: 99px;
          cursor: pointer;
          font-family: var(--font-body);
          white-space: nowrap;
          transition: color .25s;
          position: relative; z-index: 1;
          letter-spacing: .01em;
        }
        .xlink:hover { color: var(--c-fg); }
        .xlink.xactive {
          color: var(--c-fg);
          font-weight: 500;
        }

        /* ─── Right controls ─── */
        .xright {
          display: flex; align-items: center; gap: 10px;
        }

        /* Status chip */
        .xstatus {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 400; letter-spacing: .03em;
          color: rgba(180,255,200,.65);
          font-family: var(--font-body);
          padding: 5px 12px;
          border-radius: 99px;
          background: rgba(40,255,120,.04);
          border: 1px solid rgba(40,255,120,.12);
          white-space: nowrap;
        }
        .xstatus-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #3dff88;
          box-shadow: 0 0 6px #3dff88, 0 0 12px rgba(61,255,136,.4);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 6px #3dff88; }
          50%      { transform: scale(1.3); box-shadow: 0 0 10px #3dff88, 0 0 20px rgba(61,255,136,.5); }
        }

        /* Resume btn */
        .xresume {
          font-family: var(--font-body);
          font-size: 12px; font-weight: 500;
          padding: 7px 16px; border-radius: 99px;
          border: 1px solid rgba(109,106,255,.3);
          background: transparent;
          color: rgba(180,178,255,.8);
          cursor: pointer; text-decoration: none;
          display: inline-block;
          transition: all .25s;
          letter-spacing: .02em;
        }
        .xresume:hover {
          background: rgba(109,106,255,.1);
          border-color: rgba(109,106,255,.6);
          color: #e0deff;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(109,106,255,.2);
        }

        /* Hire Me CTA */
        .xcta {
          font-family: var(--font-display);
          font-size: 13px; font-weight: 700;
          padding: 9px 24px;
          border-radius: 99px; border: none;
          position: relative; overflow: hidden;
          cursor: pointer; text-decoration: none;
          display: inline-block;
          color: #fff;
          letter-spacing: .02em;
          background: linear-gradient(135deg, #6d6aff 0%, #9d4bff 50%, #6d6aff 100%);
          background-size: 200% auto;
          transition: background-position .5s, transform .25s, box-shadow .25s;
          box-shadow: 0 0 20px rgba(109,106,255,.35),
                      0 4px 12px rgba(0,0,0,.3);
        }
        /* Shimmer layer */
        .xcta::before {
          content:'';
          position:absolute; top:0; left:-100%; width:60%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent);
          transition: left .5s;
          transform: skewX(-20deg);
        }
        /* Border glow ring */
        .xcta::after {
          content:'';
          position:absolute; inset:-1px;
          border-radius: 99px;
          background: linear-gradient(135deg, #6d6aff, #b06dff, #00d4ff, #6d6aff);
          background-size: 300% auto;
          z-index: -1;
          opacity: 0;
          transition: opacity .3s;
          animation: borderSpin 3s linear infinite;
        }
        @keyframes borderSpin {
          to { background-position: 300% center; }
        }
        .xcta:hover::before { left: 140%; }
        .xcta:hover::after  { opacity: 1; }
        .xcta:hover {
          background-position: right center;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 32px rgba(109,106,255,.6),
                      0 8px 24px rgba(0,0,0,.4);
        }

        /* ─── Hamburger ─── */
        .xham {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
        }
        .xham-l {
          width: 20px; height: 1.5px;
          background: rgba(200,200,240,.6);
          border-radius: 99px;
          transition: all .35s cubic-bezier(.22,1,.36,1);
        }
        .xham.open { border-color: rgba(109,106,255,.4); background: rgba(109,106,255,.08); }
        .xham.open .xham-l:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--c-accent1); }
        .xham.open .xham-l:nth-child(2) { opacity:0; transform: scaleX(0); }
        .xham.open .xham-l:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--c-accent1); }

        /* ─── Mobile menu ─── */
        .xmenu {
          position:fixed; top:64px; left:10px; right:10px;
          background: rgba(6,8,22,0.96);
          backdrop-filter: blur(32px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          padding: 12px;
          display: flex; flex-direction: column; gap: 2px;
          transform: translateY(-16px) scale(.97);
          opacity:0; pointer-events:none;
          transition: transform .4s cubic-bezier(.22,1,.36,1), opacity .3s;
          z-index:997;
          box-shadow: 0 32px 64px rgba(0,0,0,.7),
                      0 0 0 1px rgba(109,106,255,.05),
                      inset 0 1px 0 rgba(255,255,255,.04);
          overflow: hidden;
        }
        /* Top accent line in mobile menu */
        .xmenu::before {
          content:'';
          position:absolute; top:0; left:20%; right:20%; height:1px;
          background: linear-gradient(90deg, transparent, var(--c-accent1), var(--c-accent2), transparent);
          opacity:.4;
        }
        .xmenu.open {
          transform: translateY(0) scale(1);
          opacity:1; pointer-events:all;
        }

        .xmlink {
          font-size: 14px; font-weight: 400;
          color: rgba(200,200,240,.55);
          background: none; border: none;
          padding: 13px 16px;
          border-radius: 14px;
          cursor: pointer; text-align: left;
          font-family: var(--font-body);
          display: flex; align-items: center; justify-content: space-between;
          opacity:0; transform: translateX(-12px);
          transition: color .2s, background .2s, opacity .35s, transform .35s;
        }
        .xmenu.open .xmlink { opacity:1; transform: translateX(0); }
        .xmenu.open .xmlink:nth-child(1) { transition-delay:.03s; }
        .xmenu.open .xmlink:nth-child(2) { transition-delay:.07s; }
        .xmenu.open .xmlink:nth-child(3) { transition-delay:.11s; }
        .xmenu.open .xmlink:nth-child(4) { transition-delay:.15s; }
        .xmenu.open .xmlink:nth-child(5) { transition-delay:.19s; }
        .xmenu.open .xmlink:nth-child(6) { transition-delay:.23s; }
        .xmlink:hover  { color:#f0f0ff; background: rgba(109,106,255,.08); }
        .xmlink.xactive { color: var(--c-accent1); background: rgba(109,106,255,.1); font-weight:500; }
        .xmlink-r { display:flex; align-items:center; gap:8px; font-size:11px; color:rgba(255,255,255,.18); }

        .xmdiv { height:1px; background: rgba(255,255,255,.05); margin:6px 0; }

        .xmbtns {
          display:flex; gap:8px; padding:4px 0 2px;
          opacity:0; transform: translateY(8px);
          transition: opacity .3s .27s, transform .3s .27s;
        }
        .xmenu.open .xmbtns { opacity:1; transform:translateY(0); }
        .xmresume {
          flex:1; font-family:var(--font-body); font-size:13px; font-weight:500;
          padding:12px; border-radius:14px;
          border:1px solid rgba(109,106,255,.25);
          background:transparent; color:rgba(180,178,255,.8);
          cursor:pointer; text-align:center; text-decoration:none; display:block;
          transition:background .2s, color .2s;
        }
        .xmresume:hover { background:rgba(109,106,255,.1); color:#e0deff; }
        .xmcta {
          flex:1; font-family:var(--font-display); font-size:13px; font-weight:700;
          padding:12px; border-radius:14px; border:none;
          background: linear-gradient(135deg, var(--c-accent1), var(--c-accent2));
          color:#fff; cursor:pointer; text-align:center; text-decoration:none; display:block;
          box-shadow: 0 0 16px rgba(109,106,255,.3);
        }

        @media (max-width:960px) {
          .xlinks-wrap { display:none; }
          .xresume     { display:none; }
          .xstatus     { display:none; }
        }
        @media (max-width:768px) {
          .xcta { display:none; }
          .xham { display:flex; }
          .xnav { padding:0 20px; }
        }
      `}</style>

     

      {/* Navbar */}
      <nav className={`xnav${scrolled ? " xscrolled" : ""}${mounted ? " xmounted" : ""}`}>

        {/* Logo */}
        <div className="xlogo" onClick={() => handleNav("#home")}>
          <span className="xlogo-text"> Mohulnath </span>
          <span className="xlogo-dot">.</span>
        </div>

        {/* Desktop links */}
        <div className="xlinks-wrap">
          <ul
            className="xlinks"
            ref={navLinksRef}
            onMouseLeave={clearPill}
          >
            {/* Sliding pill */}
            <div
              className="xpill"
              style={{
                left:    pillStyle.left  ?? 0,
                width:   pillStyle.width ?? 0,
                opacity: pillStyle.opacity ?? 0,
              }}
            />
            {LINKS.map((l) => {
              const key = l.href.replace("#", "");
              return (
                <li key={l.label}>
                  <button
                    ref={el => linkRefs.current[key] = el}
                    className={`xlink${active === key ? " xactive" : ""}`}
                    onClick={() => handleNav(l.href)}
                    onMouseEnter={() => { setHoveredLink(key); updatePill(key); }}
                  >
                    {l.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right side */}
        <div className="xright">
          <div className="xstatus">
            <span className="xstatus-dot" />
            Available
          </div>
          <a
            href="https://drive.google.com/file/d/1tt6XCF5mhy7f4sQJXV2q3QMEeH9aslgw/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="xresume"
          >
            Resume ↗
          </a>
          <a
            href="#contact"
            className="xcta"
            onClick={e => { e.preventDefault(); handleNav("#contact"); }}
          >
            Hire Me
          </a>
          <button
            className={`xham${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className="xham-l" />
            <span className="xham-l" />
            <span className="xham-l" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`xmenu${menuOpen ? " open" : ""}`}>
        {LINKS.map((l) => {
          const key = l.href.replace("#", "");
          return (
            <button
              key={l.label}
              className={`xmlink${active === key ? " xactive" : ""}`}
              onClick={() => handleNav(l.href)}
            >
              <span>{l.label}</span>
              <span className="xmlink-r">
                <span style={{ fontSize: 10, opacity: .3 }}>→</span>
              </span>
            </button>
          );
        })}
        <div className="xmdiv" />
        <div className="xmbtns">
          <a
            href="/Mohulnath_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="xmresume"
          >
            Resume ↗
          </a>
          <a
            href="#contact"
            className="xmcta"
            onClick={e => { e.preventDefault(); handleNav("#contact"); setMenuOpen(false); }}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
}