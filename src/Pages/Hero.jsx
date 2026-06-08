import { useEffect, useRef, useState } from "react";

import Images from "../assets/Image";

const ROLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "React.js Developer",
  "WordPress Developer",
];

export default function Hero() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [visible, setVisible] = useState(false);

  // Vanta 3D background
  useEffect(() => {
    const tryVanta = () => {
      if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          color: 0x6366f1,
          backgroundColor: 0x030712,
          points: 10,
          maxDistance: 20,
          spacing: 18,
          showDots: true,
        });
      }
    };
    const timer = setTimeout(tryVanta, 300);
    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // Trigger entrance animations
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  // Magnetic button
  const useMagnetic = () => {
    const ref = useRef(null);
    const handleMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    };
    const handleLeave = () => {
      if (ref.current) ref.current.style.transform = "translate(0,0)";
    };
    return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
  };

  const magHire = useMagnetic();
  const magWork = useMagnetic();

  const cls = (base, delay = 0) =>
    `${base} ${visible ? "anim-in" : "anim-out"}`;

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        /* ── Reset & base ── */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Fonts ── */
        :root {
          --font-head: 'Sora', sans-serif;
          --font-body: 'Inter', sans-serif;
          --accent: #6366f1;
          --accent2: #a855f7;
          --fg: #f8fafc;
          --fg2: #94a3b8;
          --bg: #030712;
        }

        /* ── Hero wrapper ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--bg);
          font-family: var(--font-body);
        }

        /* ── Vanta canvas ── */
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        /* ── Noise grain overlay ── */
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
        }

        /* ── Radial accent glow ── */
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── Content ── */
        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 40px;
          max-width: 1100px;
          width: 100%;
         
        }

        /* ── Left: text ── */
        .hero-left { flex: 1; }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(99,102,241,0.35);
          padding: 6px 14px;
          border-radius: 99px;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }

        .hero-tag::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: blink 1.4s ease-in-out infinite;
        }

        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-name {
           font-family: 'Clash Display', sans-serif;
          font-size: clamp(48px, 7vw, 88px);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin-bottom: 4px;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1s cubic-bezier(0.77,0,0.18,1);
        }

        .hero-name.anim-in {
          clip-path: inset(0 0% 0 0);
        }

        .hero-name-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-role-wrap {
            font-family: 'Clash Display', sans-serif;
          font-size: clamp(18px, 2.8vw, 28px);
          font-weight: 500;
          color: var(--fg2);
          margin-bottom: 20px;
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.9s, transform 0.7s ease 0.9s;
        }

        .hero-role-wrap.anim-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: var(--accent);
          margin-left: 3px;
          vertical-align: middle;
          animation: cursorBlink 0.7s step-end infinite;
        }

        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-tagline {
          font-size: 15px;
          color: var(--fg2);
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 40px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 1.1s, transform 0.7s ease 1.1s;
        }

        .hero-tagline.anim-in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-tagline span {
          color: var(--accent);
          font-weight: 500;
        }

        /* ── Buttons ── */
        .hero-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 1.3s, transform 0.7s ease 1.3s;
        }

        .hero-btns.anim-in {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-primary {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          padding: 14px 32px;
          border-radius: 99px;
          border: none;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s;
          animation: glowPulse 2.5s ease-in-out infinite;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          box-shadow: 0 0 32px rgba(99,102,241,0.6);
        }

        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 10px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 28px rgba(99,102,241,0.75); }
        }

        .btn-outline {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          padding: 13px 32px;
          border-radius: 99px;
          border: 1px solid rgba(99,102,241,0.5);
          background: transparent;
          color: var(--fg);
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-outline:hover {
          border-color: var(--accent);
          background: rgba(99,102,241,0.1);
        }

        /* ── Social links ── */
        .hero-socials {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          opacity: 0;
          transition: opacity 0.7s ease 1.5s;
        }

        .hero-socials.anim-in { opacity: 1; }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fg2);
          text-decoration: none;
          font-size: 16px;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }

        .social-link:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-3px);
        }

        

        /* ── Right: photo ── */
     /* ── Right: photo REDESIGN ── */
.hero-right {
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s ease 0.5s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s;
}
.hero-right.anim-in {
  opacity: 1;
  transform: translateX(0);
}
.photo-outer {
  position: relative;
  width: 420px;
  height: 420px;
   display: flex;
  align-items: center;
  justify-content: center;
    overflow: visible;
}
.dot-ring {
  position: absolute;
  inset: -100px;
  width: calc(100% + 200px);
  height: calc(100% + 200px);
  z-index: 0;
  animation: rotateSlow 20s linear infinite;
}
.hex-svg {
  position: absolute;
  inset: -50px;
  width: calc(100% + 100px);
  height: calc(100% + 100px);
  animation: rotateSlow 12s linear infinite;
}
.hex-svg-rev {
  position: absolute;
  inset: -72px;
  width: calc(100% + 144px);
  height: calc(100% + 144px);
  animation: rotateSlow 18s linear infinite reverse;
  opacity: 0.5;
}
@keyframes rotateSlow { to { transform: rotate(360deg); } }
.photo-blob {
  position: relative;
  width: 420px;
  height: 420px;
  border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
  overflow: hidden;
  border: 3px solid rgba(99,102,241,0.45);
  animation: morphBlob 8s ease-in-out infinite, floatY 4s ease-in-out infinite;
  z-index: 2;
}
@keyframes morphBlob {
  0%,100% { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
  25%     { border-radius: 45% 55% 40% 60% / 60% 40% 55% 45%; }
  50%     { border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }
  75%     { border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; }
}
@keyframes floatY {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-14px); }
}
.photo-blob img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  filter: brightness(1.05);
}
.glow-behind {
  position: absolute;
  inset: 10px;
  border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
  background: radial-gradient(circle, rgba(99,102,241,0.35), rgba(168,85,247,0.2) 50%, transparent 75%);
  filter: blur(22px);
  z-index: 1;
  animation: morphBlob 8s ease-in-out infinite, floatY 4s ease-in-out infinite;
}
.corner-accent {
  position: absolute;
  width: 28px;
  height: 28px;
  z-index: 5;
}
.corner-accent.tl { top: -14px; left: -14px; border-top: 3px solid #6366f1; border-left: 3px solid #6366f1; border-radius: 6px 0 0 0; }
.corner-accent.tr { top: -14px; right: -14px; border-top: 3px solid #a855f7; border-right: 3px solid #a855f7; border-radius: 0 6px 0 0; }
.corner-accent.bl { bottom: -14px; left: -14px; border-bottom: 3px solid #a855f7; border-left: 3px solid #a855f7; border-radius: 0 0 0 6px; }
.corner-accent.br { bottom: -14px; right: -14px; border-bottom: 3px solid #6366f1; border-right: 3px solid #6366f1; border-radius: 0 0 6px 0; }
.photo-badge {
  position: absolute;
  bottom: -8px;
  right: -24px;
  background: rgba(8,8,22,0.92);
  border: 1px solid rgba(99,102,241,0.5);
  border-radius: 14px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  animation: floatY 4s ease-in-out infinite 0.8s;
}
.badge-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  flex-shrink: 0;
  animation: blink 1.4s ease-in-out infinite;
}
.badge-text { font-size: 12px; font-weight: 600; color: var(--fg); white-space: nowrap; }
.badge-sub { font-size: 10px; color: var(--fg2); }
.xp-badge {
  position: absolute;
  top: -8px;
  left: -32px;
  background: rgba(8,8,22,0.92);
  border: 1px solid rgba(168,85,247,0.45);
  border-radius: 14px;
  padding: 10px 16px;
  z-index: 10;
  animation: floatY 4s ease-in-out infinite 1.4s;
  text-align: center;
}
.xp-num { font-size: 20px; font-weight: 800; color: #a855f7; line-height: 1; }
.xp-label { font-size: 10px; color: var(--fg2); white-space: nowrap; }

@media (max-width: 768px) {
  .photo-outer { width: 260px; height: 260px; }
  .photo-blob { width: 260px; height: 260px; }
}



        /* ── Scroll indicator ── */
        .scroll-hint {
        cursor: pointer;
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          opacity: 0;
        }

        .scroll-hint.anim-in {
  opacity: 1;
  transition: opacity 0.7s ease;
}

        .scroll-hint span {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--fg2);
        }

        .scroll-mouse {
          width: 22px;
          height: 36px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 99px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        .scroll-dot {
          width: 3px;
          height: 8px;
          background: var(--accent);
          border-radius: 99px;
          animation: scrollDot 1.6s ease-in-out infinite;
        }

        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-content {
            flex-direction: column-reverse;
            text-align: center;
            gap: 40px;
            padding: 100px 24px 60px;
          }
          .photo-frame, .photo-img { width: 220px; height: 220px; }
          .hero-btns { justify-content: center; }
          .hero-socials { justify-content: center; }
          .hero-tagline { margin: 0 auto 40px; }
          .photo-badge { right: 0; bottom: 0; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero" id="home">
        <div className="hero-bg" ref={vantaRef} />
        <div className="hero-glow" />

        <div className="hero-content">
          {/* Left — Text */}
          <div className="hero-left">
            {/* Tag */}
            <div className={`hero-tag ${visible ? "anim-in" : ""}`}
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
              Available for work
            </div>

            {/* Name reveal */}
            <h1 className={`hero-name ${visible ? "anim-in" : ""}`}
              style={{ transitionDelay: "0.3s" }}>
              Hi, I'm{" "}
              <span className="hero-name-accent">Mohulnath</span>
            </h1>

            {/* Typewriter role */}
            <div className={`hero-role-wrap ${visible ? "anim-in" : ""}`}>
              {displayed}
              <span className="hero-cursor" />
            </div>

            {/* Tagline */}
            <p className={`hero-tagline ${visible ? "anim-in" : ""}`}>
              Building <span>pixel-perfect</span>, blazing-fast web apps from{" "}
              <span>Chennai</span>. MERN Stack · WordPress · SEO — delivering
              solutions that look great and perform even better.
            </p>

            {/* Buttons */}
            <div className={`hero-btns ${visible ? "anim-in" : ""}`}>
              <a
                href="#contact"
                className="btn-primary"
                {...magHire}
              >
                Hire Me
              </a>
              <a
                href="#projects"
                className="btn-outline"
                {...magWork}
              >
                View My Work
              </a>
              <a
                href="https://drive.google.com/file/d/1tt6XCF5mhy7f4sQJXV2q3QMEeH9aslgw/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Download CV
              </a>
            </div>

            {/* Socials */}
            <div className={`hero-socials ${visible ? "anim-in" : ""}`}>

              {/* GitHub */}
              <a
                href="https://github.com/mohulnath"
                target="_blank"
                rel="noreferrer"
                className="social-link github"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/mohulnath"
                target="_blank"
                rel="noreferrer"
                className="social-link linkedin"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:mohulnath005@gmail.com"
                className="social-link email"
                title="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/mohulnath/"
                target="_blank"
                rel="noreferrer"
                className="social-link instagram"
                title="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Right — Photo */}
  {/* Right — Photo */}
<div className={`hero-right ${visible ? "anim-in" : ""}`}>
  <div className="photo-outer">

    {/* Outer dashed dot ring */}
    <div className="dot-ring">
      <svg width="404" height="404" viewBox="0 0 404 404" fill="none">
        <circle cx="202" cy="202" r="196" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx="202" cy="14" r="3.5" fill="#6366f1" opacity="0.9"/>
        <circle cx="202" cy="390" r="3.5" fill="#a855f7" opacity="0.9"/>
        <circle cx="14" cy="202" r="3.5" fill="#6366f1" opacity="0.7"/>
        <circle cx="390" cy="202" r="3.5" fill="#a855f7" opacity="0.7"/>
        <circle cx="63" cy="63" r="2.5" fill="#6366f1" opacity="0.5"/>
        <circle cx="341" cy="63" r="2.5" fill="#a855f7" opacity="0.5"/>
        <circle cx="63" cy="341" r="2.5" fill="#a855f7" opacity="0.5"/>
        <circle cx="341" cy="341" r="2.5" fill="#6366f1" opacity="0.5"/>
      </svg>
    </div>

    {/* Outer hex */}
    <svg className="hex-svg-rev" viewBox="0 0 376 376" fill="none">
      <path d="M188 8 L355 101 L355 275 L188 368 L21 275 L21 101 Z"
        stroke="rgba(168,85,247,0.3)" strokeWidth="1" strokeDasharray="6 10" fill="none"/>
    </svg>

    {/* Inner hex */}
    <svg className="hex-svg" viewBox="0 0 344 344" fill="none">
      <path d="M172 8 L328 90 L328 254 L172 336 L16 254 L16 90 Z"
        stroke="rgba(99,102,241,0.55)" strokeWidth="1.5" strokeDasharray="3 6" fill="none"/>
      <circle cx="172" cy="8" r="4" fill="#6366f1"/>
      <circle cx="328" cy="90" r="4" fill="#6366f1"/>
      <circle cx="328" cy="254" r="4" fill="#6366f1"/>
      <circle cx="172" cy="336" r="4" fill="#6366f1"/>
      <circle cx="16" cy="254" r="4" fill="#6366f1"/>
      <circle cx="16" cy="90" r="4" fill="#6366f1"/>
    </svg>

    {/* Glow */}
    <div className="glow-behind" />

    {/* Blob photo */}
    <div className="photo-blob">
      <img src={Images.myimage} alt="Mohulnath R" />
    </div>

    {/* Corner brackets */}
    <div className="corner-accent tl" />
    <div className="corner-accent tr" />
    <div className="corner-accent bl" />
    <div className="corner-accent br" />

    {/* Open to work badge */}
    <div className="photo-badge">
      <div className="badge-dot" />
      <div>
        <div className="badge-text">Open to work</div>
        <div className="badge-sub">Full time · Freelance</div>
      </div>
    </div>

    {/* XP badge */}
    <div className="xp-badge">
      <div className="xp-num">1+</div>
      <div className="xp-label">Years exp.</div>
    </div>

  </div>
</div>
</div>
      

        {/* Scroll hint */}

        {/* Scroll hint */}
        <div
          className={`scroll-hint ${visible ? "anim-in" : ""}`}
          onClick={handleScroll}
        >
          <div className="scroll-mouse">
            <div className="scroll-dot" />
          </div>
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}


