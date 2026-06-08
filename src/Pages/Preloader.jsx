import { useEffect, useState } from "react";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | reveal | done
  const [letters] = useState(["M", "O", "H", "U", "L"]);
  const [letterVisible, setLetterVisible] = useState([]);

  useEffect(() => {
    // Animate letters in
    letters.forEach((_, i) => {
      setTimeout(() => {
        setLetterVisible((prev) => [...prev, i]);
      }, i * 100);
    });

    document.body.style.overflow = "hidden";

    // Progress bar
    let prog = 0;
    const speeds = [
      { target: 30, delay: 15 },
      { target: 70, delay: 25 },
      { target: 100, delay: 18 },
    ];

    let currentPhase = 0;
    const tick = () => {
      const sp = speeds[currentPhase];
      if (!sp) return;
      if (prog < sp.target) {
        prog += 1;
        setProgress(prog);
        setTimeout(tick, sp.delay);
      } else {
        currentPhase++;
        if (currentPhase < speeds.length) setTimeout(tick, 80);
        else {
          // reveal start — onDone உடனே call பண்ணு (site unblur ஆகும்)
          setTimeout(() => {

            window.scrollTo(0, 0);
          
            document.body.style.overflow = "auto";
          
            setPhase("reveal");
          
            onDone?.();
          
          }, 200);
          // slide animation முடிஞ்சதும் DOM remove
          setTimeout(() => setPhase("done"), 1000);
        }
      }
    };
    setTimeout(tick, 400);
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&display=swap');

        .preloader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #030712;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          transition: transform 1s cubic-bezier(0.76, 0, 0.24, 1),
                      opacity 0.4s ease;
        }
        .preloader.reveal {
          transform: translateY(-100%);
          opacity: 0;
        }

        /* Grid bg */
        .pre-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
        }

        /* Blobs */
        .pre-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
        }
        .pre-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%);
          top: -100px; left: -150px;
          animation: preFloat 7s ease-in-out infinite;
        }
        .pre-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%);
          bottom: -80px; right: -100px;
          animation: preFloat 9s ease-in-out infinite reverse;
        }
        @keyframes preFloat {
          0%,100%{ transform: translateY(0); }
          50%{ transform: translateY(-30px); }
        }

        /* Center content */
        .pre-center { position: relative; z-index: 1; text-align: center; }

        /* Logo letters */
        .pre-logo {
          display: flex; gap: 6px; justify-content: center;
          margin-bottom: 10px;
        }
        .pre-letter {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(52px, 10vw, 88px);
          font-weight: 700;
          line-height: 1;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .pre-letter.visible { opacity: 1; transform: translateY(0); }

        /* Dot after name */
        .pre-dot {
          font-family: 'Clash Display', sans-serif;
          font-size: clamp(52px, 10vw, 88px);
          font-weight: 700;
          color: #06b6d4;
          line-height: 1;
          opacity: 0;
          transition: opacity 0.5s ease 0.5s;
        }
        .pre-dot.visible { opacity: 1; }

        /* Subtitle */
        .pre-sub {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 48px;
          opacity: 0;
          transition: opacity 0.6s ease 0.6s;
        }
        .pre-sub.visible { opacity: 1; }

        /* Progress bar */
        .pre-progress-wrap {
          width: min(340px, 70vw);
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
          margin-bottom: 16px;
        }
        .pre-progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, #6366f1, #a855f7, #06b6d4);
          background-size: 200% 100%;
          transition: width 0.1s linear;
          animation: progressShimmer 2s linear infinite;
          position: relative;
        }
        @keyframes progressShimmer {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        /* Progress glow */
        .pre-progress-fill::after {
          content: '';
          position: absolute;
          right: 0; top: -3px;
          width: 16px; height: 8px;
          background: radial-gradient(circle, rgba(255,255,255,0.8), transparent 70%);
          border-radius: 50%;
        }

        /* Progress num */
        .pre-num {
          font-family: 'Clash Display', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          letter-spacing: 0.1em;
          display: flex; justify-content: space-between;
          width: min(340px, 70vw);
        }
        .pre-num span {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Scan line effect */
        .pre-scanline {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(99,102,241,0.015) 2px,
            rgba(99,102,241,0.015) 4px
          );
          pointer-events: none;
        }

        /* Corner brackets */
        .pre-bracket {
          position: absolute;
          width: 24px; height: 24px;
          border-color: rgba(99,102,241,0.3);
          border-style: solid;
          opacity: 0;
          animation: bracketFade 0.6s ease 0.8s forwards;
        }
        @keyframes bracketFade { to { opacity: 1; } }
        .pre-bracket-tl { top: 40px; left: 40px; border-width: 2px 0 0 2px; }
        .pre-bracket-tr { top: 40px; right: 40px; border-width: 2px 2px 0 0; }
        .pre-bracket-bl { bottom: 40px; left: 40px; border-width: 0 0 2px 2px; }
        .pre-bracket-br { bottom: 40px; right: 40px; border-width: 0 2px 2px 0; }

        @media (max-width: 480px) {
          .pre-bracket { display: none; }
        }
      `}</style>

      <div className={`preloader ${phase === "reveal" ? "reveal" : ""}`}>
        <div className="pre-grid" />
        <div className="pre-blob pre-blob-1" />
        <div className="pre-blob pre-blob-2" />
        <div className="pre-scanline" />

        {/* Corner brackets */}
        <div className="pre-bracket pre-bracket-tl" />
        <div className="pre-bracket pre-bracket-tr" />
        <div className="pre-bracket pre-bracket-bl" />
        <div className="pre-bracket pre-bracket-br" />

        <div className="pre-center">
          {/* Logo */}
          <div className="pre-logo">
            {letters.map((l, i) => (
              <span key={i} className={`pre-letter ${letterVisible.includes(i) ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                {l}
              </span>
            ))}
            <span className={`pre-dot ${letterVisible.length >= letters.length ? "visible" : ""}`}>.</span>
          </div>

          {/* Subtitle */}
          <div className={`pre-sub ${letterVisible.length >= letters.length ? "visible" : ""}`}>
            Full Stack Developer
          </div>

          {/* Progress */}
          <div className="pre-progress-wrap">
            <div className="pre-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="pre-num">
            <span>Loading portfolio</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </>
  );
}