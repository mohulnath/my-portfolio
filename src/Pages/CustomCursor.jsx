import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [clicked, setClicked]   = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [text, setText]         = useState("");

  const pos    = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const rafId  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Detect hoverable targets
      const el = e.target;
      const isLink = el.closest("a, button, .proj-card-wrap, .sk-tag, .nav-link-btn");
      setHovered(!!isLink);

      // Custom text on specific elements
      if (el.closest(".proj-card-wrap")) setText("View");
      else if (el.closest("a[href*='github']")) setText("Code");
      else if (el.closest("a[href*='netlify']") || el.closest(".proj-link-primary")) setText("Live");
      else if (el.closest(".btn-primary")) setText("Hire");
      else setText("");
    };

    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Smooth ring follow
    const animate = () => {
      const lag = 0.1;
      ring.current.x += (pos.current.x - ring.current.x) * lag;
      ring.current.y += (pos.current.y - ring.current.y) * lag;

      if (dotRef.current) {
        dotRef.current.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ffffff;

box-shadow:
  0 0 10px #6366f1,
  0 0 20px #6366f1;
          pointer-events: none;
          z-index: 99999;
          margin-left: -4px; margin-top: -4px;
          transition:
            width  0.2s cubic-bezier(0.16,1,0.3,1),
            height 0.2s cubic-bezier(0.16,1,0.3,1),
            background 0.2s,
            opacity 0.3s;
          mix-blend-mode: normal;
          will-change: transform;
        }
        .cursor-dot.hovered {
          width: 6px; height: 6px;
          background: #fff;
        }
        .cursor-dot.clicked {
          width: 12px; height: 12px;
        }
        .cursor-dot.hidden { opacity: 0; }

        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(99,102,241,0.6);
          pointer-events: none;
          z-index: 99998;
          margin-left: -18px; margin-top: -18px;
          display: flex; align-items: center; justify-content: center;
          transition:
            width  0.35s cubic-bezier(0.16,1,0.3,1),
            height 0.35s cubic-bezier(0.16,1,0.3,1),
            border-color 0.25s,
            background 0.25s,
            opacity 0.3s;
          will-change: transform;
        }
        .cursor-ring.hovered {
         width: 60px;
height: 60px;

background: rgba(99,102,241,0.12);

border-color: rgba(99,102,241,0.8);

box-shadow:
  0 0 30px rgba(99,102,241,0.35),
  inset 0 0 14px rgba(255,255,255,0.06);
        }
        .cursor-ring.hovered.has-text {
          width: 64px; height: 64px;
          background: rgba(99,102,241,0.15);
          border-color: var(--accent, #6366f1);
        }
        .cursor-ring.clicked {
          width: 28px; height: 28px;
          background: rgba(99,102,241,0.2);
        }
        .cursor-ring.hidden { opacity: 0; }

        .cursor-ring-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          white-space: nowrap;
        }
        .cursor-ring.has-text .cursor-ring-text { opacity: 1; }

        /* Glow trail on dot */
        .cursor-dot::after {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(99,102,241,0.3);
          filter: blur(6px);
          transition: opacity 0.2s;
        }

        @media (hover: none) and (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none !important; }
          * { cursor: auto !important; }
        }
      `}</style>

      <div
        ref={dotRef}
        className={`cursor-dot ${hovered ? "hovered" : ""} ${clicked ? "clicked" : ""} ${!visible ? "hidden" : ""}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? "hovered" : ""} ${clicked ? "clicked" : ""} ${!visible ? "hidden" : ""} ${text ? "has-text" : ""}`}
      >
        <span className="cursor-ring-text">{text}</span>
      </div>
    </>
  );
}
