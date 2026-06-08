import { useEffect, useRef, useState } from "react";

import Images from "../assets/Image";

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

const DETAILS = [
  { label: "Name",          value: "Mohulnath R" },
  { label: "Date of Birth", value: "November 19, 2001" },
  { label: "Email",         value: "mohulnath005@gmail.com" },
  { label: "Phone",         value: "+91 93607 12225" },
  { label: "Location",      value: "Chennai, Tamil Nadu" },
  { label: "Native",        value: "Theni District" },
  { label: "Available",     value: "Full-time · Freelance" },
];

function StatItem({ target, suffix, label, inView }) {
  const count = useCountUp(target, inView);
  return (
    <div className="stat-item">
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef,   statsInView]   = useInView(0.3);

  return (
    <>
      <style>{`
        .about-section {
          --accent:    #6366f1;
          --accent2:   #a855f7;
          --fg:        #f8fafc;
          --fg2:       #94a3b8;
          --bg:        #030712;
          --bg2:       #0f0f1a;
          --card-bg:   rgba(255,255,255,0.03);
          --border:    rgba(255,255,255,0.07);
          --font-head: 'Clash Display', sans-serif;
          --font-body: 'Inter', sans-serif;
          position: relative;
          background: var(--bg);
          padding: 40px;
          overflow: hidden;
          font-family: var(--font-body);
        }
        .about-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .about-blob-1 { width:500px; height:500px; background:rgba(99,102,241,0.08); top:-100px; left:-150px; }
        .about-blob-2 { width:400px; height:400px; background:rgba(168,85,247,0.06); bottom:-80px; right:-100px; }
        .about-label { text-align:center; margin-bottom:16px; position:relative; z-index:1; }
        .about-label span {
          font-size:11px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase;
          color:var(--accent); border:1px solid rgba(99,102,241,0.3); padding:5px 16px; border-radius:99px;
        }
        .about-heading {
          font-family:var(--font-head); font-size:clamp(36px,5vw,60px); font-weight:700;
          color:var(--fg); text-align:center; letter-spacing:-0.03em; margin-bottom:72px;
          line-height:1.1; position:relative; z-index:1;
        }
        .about-heading .hl {
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .about-grid {
          position:relative; z-index:1; max-width:1100px; margin:0 auto;
          display:grid; grid-template-columns:360px 1fr; gap:64px; align-items:start;
        }
        .about-photo-wrap {
          position:relative; display:flex; flex-direction:column; align-items:center;
          opacity:0; transform:translateX(-40px);
          transition:opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1);
        }
        .about-photo-wrap.in { opacity:1; transform:translateX(0); }
        .about-photo-frame { position:relative; width:300px; height:370px; }
        .bracket { position:absolute; width:28px; height:28px; border-color:var(--accent); border-style:solid; opacity:0.6; }
        .bracket-tl { top:-8px;    left:-8px;  border-width:2px 0 0 2px; border-radius:4px 0 0 0; }
        .bracket-tr { top:-8px;    right:-8px; border-width:2px 2px 0 0; border-radius:0 4px 0 0; }
        .bracket-bl { bottom:-8px; left:-8px;  border-width:0 0 2px 2px; border-radius:0 0 0 4px; }
        .bracket-br { bottom:-8px; right:-8px; border-width:0 2px 2px 0; border-radius:0 0 4px 0; }
        .about-photo {
          width:300px; height:370px; object-fit:cover; object-position:top;
          border-radius:24px; border:2px solid rgba(99,102,241,0.25);
          animation:aboutFloat 4s ease-in-out infinite;
          filter:brightness(1.05) saturate(1.05); display:block;
        }
        @keyframes aboutFloat {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        .about-photo-glow {
          position:absolute; inset:30px;
          background:radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%);
          filter:blur(24px); z-index:-1; border-radius:50%;
          animation:aboutFloat 4s ease-in-out infinite;
        }
        .about-exp-badge {
          position:absolute; top:24px; right:-24px;
          background:rgba(10,10,25,0.92); backdrop-filter:blur(14px);
          border:1px solid rgba(99,102,241,0.4); border-radius:14px;
          padding:12px 16px; text-align:center;
          animation:aboutFloat 4s ease-in-out infinite 0.5s; z-index:2;
        }
        .exp-num { font-family:var(--font-head); font-size:26px; font-weight:700; color:var(--accent); line-height:1; }
        .exp-lbl { font-size:10px; color:var(--fg2); text-transform:uppercase; letter-spacing:0.1em; margin-top:3px; }
        .about-award-badge {
          position:absolute; bottom:24px; left:-24px;
          background:rgba(10,10,25,0.92); backdrop-filter:blur(14px);
          border:1px solid rgba(168,85,247,0.4); border-radius:14px;
          padding:10px 14px; display:flex; align-items:center; gap:8px;
          animation:aboutFloat 4s ease-in-out infinite 1s; z-index:2;
        }
        .award-icon { font-size:20px; line-height:1; }
        .award-text { font-size:11px; color:var(--fg); font-weight:500; }
        .award-sub  { font-size:10px; color:var(--fg2); }
        .about-right {
          opacity:0; transform:translateX(40px);
          transition:opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }
        .about-right.in { opacity:1; transform:translateX(0); }
        .about-bio {
          font-size:15px; color:var(--fg2); line-height:1.85; margin-bottom:32px;
          border-left:2px solid rgba(99,102,241,0.4); padding-left:20px;
        }
        .about-bio .hl { color:var(--accent); font-weight:500; }
        .about-details { display:grid; grid-template-columns:1fr 1fr; gap:12px 20px; margin-bottom:36px; }
        .detail-item {
          display:flex; flex-direction:column; gap:3px; padding:12px 16px;
          background:var(--card-bg); border:1px solid var(--border); border-radius:10px;
          transition:border-color 0.2s, background 0.2s;
        }
        .detail-item:hover { border-color:rgba(99,102,241,0.35); background:rgba(99,102,241,0.05); }
        .detail-label { font-size:10px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:var(--accent); }
        .detail-value { font-size:13px; color:var(--fg); }
        .about-btns { display:flex; gap:14px; flex-wrap:wrap; }
        .btn-primary {
          font-family:var(--font-body); font-size:14px; font-weight:500;
          padding:13px 28px; border-radius:99px; border:none;
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          color:#fff; cursor:pointer; text-decoration:none; display:inline-block;
          transition:transform 0.2s, box-shadow 0.2s;
          animation:glowPulse 2.5s ease-in-out infinite;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(99,102,241,0.5); }
        @keyframes glowPulse {
          0%,100% { box-shadow:0 0 10px rgba(99,102,241,0.3); }
          50%     { box-shadow:0 0 26px rgba(99,102,241,0.7); }
        }
        .btn-outline {
          font-family:var(--font-body); font-size:14px; font-weight:500;
          padding:12px 28px; border-radius:99px; border:1px solid rgba(99,102,241,0.4);
          background:transparent; color:var(--fg); cursor:pointer;
          text-decoration:none; display:inline-block; transition:all 0.2s;
        }
        .btn-outline:hover { border-color:var(--accent); background:rgba(99,102,241,0.1); transform:translateY(-2px); }
        .about-stats {
          position:relative; z-index:1; max-width:1100px; margin:35px auto 0; padding:0 40px;
          display:grid; grid-template-columns:repeat(4,1fr); gap:1px;
          background:var(--border); border:1px solid var(--border); border-radius:20px; overflow:hidden;
          opacity:0; transform:translateY(30px); transition:opacity 0.8s ease, transform 0.8s ease;
        }
        .about-stats.in { opacity:1; transform:translateY(0); }
        .stat-item {
          background:var(--bg2); padding:32px 24px;
          display:flex; flex-direction:column; align-items:center; gap:6px; transition:background 0.2s;
        }
        .stat-item:hover { background:rgba(99,102,241,0.06); }
        .stat-num {
          font-family:var(--font-head); font-size:44px; font-weight:700; line-height:1;
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .stat-label { font-size:13px; color:var(--fg2); text-align:center; }
        @media (max-width:900px) {
          .about-grid { grid-template-columns:1fr; text-align:center; gap:48px; }
          .about-photo-wrap { align-items:center; }
          .about-bio { border-left:none; padding-left:0; border-top:2px solid rgba(99,102,241,0.4); padding-top:16px; }
          .about-btns { justify-content:center; }
          .about-stats { grid-template-columns:repeat(2,1fr); }
          .about-exp-badge   { right:10px; }
          .about-award-badge { left:10px; }
        }
        @media (max-width:480px) {
          .about-grid  { padding:0 20px; }
          .about-stats { padding:0 20px; margin:48px 20px 0; }
          .about-details { grid-template-columns:1fr; }
        }
      `}</style>

      <section className="about-section" id="about" ref={sectionRef}>
        <div className="about-blob about-blob-1" />
        <div className="about-blob about-blob-2" />

        <div className="about-label"><span>Who I Am</span></div>

        <h2 className="about-heading">About <span className="hl">Me</span></h2>

        <div className="about-grid">
          {/* Photo */}
          <div className={`about-photo-wrap ${sectionInView ? "in" : ""}`}>
            <div className="about-photo-frame">
              <div className="bracket bracket-tl" />
              <div className="bracket bracket-tr" />
              <div className="bracket bracket-bl" />
              <div className="bracket bracket-br" />
              <div className="about-photo-glow" />
              <img
                src={Images.myimage}
                alt="Mohulnath R"
                className="about-photo"
              />
              <div className="about-exp-badge">
                <div className="exp-num">1+</div>
                <div className="exp-lbl">Years Exp</div>
              </div>
              <div className="about-award-badge">
                <div className="award-icon">🏅</div>
                <div>
                  <div className="award-text">Trusted by Clients</div>
                  <div className="award-sub">Freelance & Real Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`about-right ${sectionInView ? "in" : ""}`}>
            <p className="about-bio">
              I'm a <span className="hl">Full Stack Web Developer</span> with a
              passion for crafting scalable, user-centric applications. Currently
              working at <span className="hl">Shine Nexa Technology</span>,
              Chennai — building responsive websites using{" "}
              <span className="hl">MERN Stack, WordPress & SEO</span>. I thrive
              on solving complex problems and continuously learning emerging
              technologies to deliver impactful digital solutions.
            </p>

            <div className="about-details">
              {DETAILS.map((d, i) => (
                <div
                  className="detail-item"
                  key={i}
                  style={{
                    opacity:    sectionInView ? 1 : 0,
                    transform:  sectionInView ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${0.3 + i * 0.07}s, transform 0.5s ease ${0.3 + i * 0.07}s`,
                  }}
                >
                  <span className="detail-label">{d.label}</span>
                  <span className="detail-value">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="about-btns">
              <a href="https://drive.google.com/file/d/1tt6XCF5mhy7f4sQJXV2q3QMEeH9aslgw/view?usp=drive_link" target="_blank" rel="noreferrer" className="btn-primary">
                Download CV
              </a>
              <a href="#contact" className="btn-outline">Let's Talk</a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`about-stats ${statsInView ? "in" : ""}`} ref={statsRef}>
          <StatItem target={8}  suffix="+" label="Live Projects"          inView={statsInView} />
          <StatItem target={1}  suffix="+" label="Years Experience"       inView={statsInView} />
          <StatItem target={10} suffix="+" label="Happy Clients"          inView={statsInView} />
          <StatItem target={1}  suffix=""  label="Best Performance Medal" inView={statsInView} />
        </div>
      </section>
    </>
  );
}
