import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(false);
  const [section, setSection]   = useState("home");

  const SECTIONS = ["home", "about", "skills", "projects", "experience", "contact"];
  const COLORS = {
    home:       ["#6366f1", "#a855f7"],
    about:      ["#a855f7", "#06b6d4"],
    skills:     ["#06b6d4", "#22c55e"],
    projects:   ["#22c55e", "#f59e0b"],
    experience: ["#f59e0b", "#ec4899"],
    contact:    ["#ec4899", "#6366f1"],
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(pct);
      setVisible(scrollTop > 80);

      // Active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && scrollTop >= el.offsetTop - 200) {
          setSection(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [c1, c2] = COLORS[section] || COLORS.home;

  return (
    <>
      <style>{`
        .scroll-bar-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 9999;
          height: 3px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .scroll-bar-wrap.visible { opacity: 1; }

        .scroll-bar-fill {
          height: 100%;
          border-radius: 0 99px 99px 0;
          transition: width 0.1s linear, background 0.8s ease;
          position: relative;
        }
        .scroll-bar-fill::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 10px; height: 10px;
          border-radius: 50%;
          background: inherit;
          box-shadow: 0 0 10px currentColor;
        }

        /* Pct badge */
        .scroll-pct-badge {
          position: fixed;
          bottom: 32px;
          right: 28px;
          z-index: 9998;
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column;
          font-size: 11px; font-weight: 700;
          font-family: 'Clash Display', sans-serif;
          color: #f8fafc;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .scroll-pct-badge.visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .scroll-pct-svg {
          position: absolute; inset: 0;
        }
        .scroll-pct-track {
          fill: none;
          stroke: rgba(255,255,255,0.06);
          stroke-width: 3;
        }
        .scroll-pct-fill {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.1s linear, stroke 0.8s ease;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        .scroll-pct-num {
          position: relative; z-index: 1;
          font-size: 11px; font-weight: 700;
          line-height: 1;
        }
        .scroll-pct-badge:hover {
          transform: scale(1.1);
        }

        /* Back to top trigger */
        .back-top-hint {
          position: absolute;
          bottom: -17px; left: 50%;
          transform: translateX(-50%);
          font-size: 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
        }
      `}</style>

      {/* Top bar */}
      <div className={`scroll-bar-wrap ${visible ? "visible" : ""}`}>
        <div
          className="scroll-bar-fill"
          style={{
            width:      `${progress}%`,
            background: `linear-gradient(90deg, ${c1}, ${c2})`,
            boxShadow:  `0 0 8px ${c1}88`,
          }}
        />
      </div>

      {/* Circular badge + back to top */}
      <div
        className={`scroll-pct-badge ${visible ? "visible" : ""}`}
        style={{ background: "rgba(3,7,18,0.85)", backdropFilter: "blur(12px)", border: `1px solid rgba(255,255,255,0.08)` }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
      >
        <svg className="scroll-pct-svg" viewBox="0 0 52 52">
          {/* track */}
          <circle className="scroll-pct-track" cx="26" cy="26" r="22" />
          {/* fill */}
          <circle
            className="scroll-pct-fill"
            cx="26" cy="26" r="22"
            stroke={`url(#sg-${section})`}
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
          />
          <defs>
            <linearGradient id={`sg-${section}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={c1} />
              <stop offset="100%" stopColor={c2} />
            </linearGradient>
          </defs>
        </svg>

        <span className="scroll-pct-num">{Math.round(progress)}%</span>
        <span className="back-top-hint">↑ top</span>
      </div>
    </>
  );
}
