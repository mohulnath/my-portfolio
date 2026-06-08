import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
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

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

function SkillBar({ label, value, color, inView, delay = 0 }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>{label}</span>
        <span style={{ fontSize: 11, color, fontFamily: "var(--font-head)", fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: inView ? `${value}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  );
}

const Icons = {
  laptop: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M0 21h24"/><path d="M9 17l1 4M15 17l-1 4"/></svg>),
  rocket: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C12 2 7 7 7 13a5 5 0 0 0 10 0c0-6-5-11-5-11z"/><path d="M9 13a3 3 0 0 0 6 0"/><path d="M7 13l-3 3 2 2 3-2"/><path d="M17 13l3 3-2 2-3-2"/></svg>),
  atom: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></svg>),
  video: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="15" height="12" rx="2"/><path d="M17 10l5-3v10l-5-3V10z"/></svg>),
  building: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V7l6-4v18M9 7H5v14M15 11h2M15 15h2M9 11h.01M9 15h.01"/></svg>),
  certificate: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>),
  book: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>),
  school: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M9 21V9l3-6 3 6v12M12 3v6M5 21V12a2 2 0 0 1 2-2h0M19 21V12a2 2 0 0 0-2-2h0"/></svg>),
  briefcase: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>),
  award: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>),
  code: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>),
  chevron: (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>),
  calendar: (<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>),
  mapPin: (<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
};

const EXPERIENCES = [
  {
    role: "Web Developer",
    company: "Shine Nexa Technology",
    icon: "laptop",
    type: "Full-time",
    period: "Sep 2025 – Present",
    duration: "7 mos",
    location: "Chennai, Tamil Nadu",
    current: true,
    color: "#818cf8",
    glow: "rgba(129,140,248,0.18)",
    points: [
      "Website development using HTML, CSS, JavaScript, React & WordPress",
      "WordPress theme customization, content updates & basic SEO tasks",
      "Support digital marketing & AI-related activities for website improvement",
      "Collaborate with team to enhance UI, performance & website quality",
    ],
    tags: ["React.js", "WordPress", "SEO", "JavaScript"],
    skills: [
      { label: "React.js", value: 88 },
      { label: "WordPress", value: 75 },
      { label: "SEO", value: 65 },
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    icon: "rocket",
    type: "Freelance",
    period: "Apr 2025 – Aug 2025",
    duration: "5 mos",
    location: "Chennai, Tamil Nadu",
    current: false,
    color: "#c084fc",
    glow: "rgba(192,132,252,0.15)",
    points: [
      "Built websites for friends, relatives & small businesses",
      "Designed responsive websites using HTML, CSS, JS, Bootstrap & React.js",
      "Handled complete website development from design to deployment",
      "Solved real-world layout, responsiveness & browser compatibility issues",
    ],
    tags: ["HTML", "CSS", "Bootstrap", "React.js"],
    skills: [
      { label: "Responsive Design", value: 90 },
      { label: "Bootstrap", value: 80 },
      { label: "Deployment", value: 70 },
    ],
  },
  {
    role: "Frontend Developer (React.js)",
    company: "Code99 IT Academy",
    icon: "atom",
    type: "Internship",
    period: "Apr 2025 – Jun 2025",
    duration: "3 mos",
    location: "Chennai, Tamil Nadu",
    current: false,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.14)",
    points: [
      "Selected as one of four members for real-time website project",
      "Contributed as Frontend Developer using React.js & JSX",
      "Built reusable components — Navbar, Forms, Student Stories",
      "Awarded Best Performance Medal for outstanding performance",
    ],
    tags: ["React.js", "JSX", "CSS", "Teamwork"],
    skills: [
      { label: "Component Design", value: 85 },
      { label: "JSX / React", value: 82 },
      { label: "Teamwork", value: 95 },
    ],
  },
  {
    role: "Video Editor & Creative Designer",
    company: "Self-Employed",
    icon: "video",
    type: "Freelance",
    period: "Jul 2024 – Nov 2024",
    duration: "5 mos",
    location: "Chennai, Tamil Nadu",
    current: false,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
    points: [
      "Edited & delivered videos for clients and digital platforms",
      "Designed posters & creatives for social media promotions",
      "Managed 'Exploration Maker' travel content page",
      "Creative background motivated transition into web development",
    ],
    tags: ["Video Editing", "Poster Design", "Content Creation"],
    skills: [
      { label: "Video Editing", value: 85 },
      { label: "Poster Design", value: 78 },
      { label: "Content Strategy", value: 70 },
    ],
  },
];

const EDUCATION = [
  {
    degree: "B.Sc Electronics & Communication Systems",
    institution: "KSG College of Arts and Science",
    university: "Bharathiar University, Coimbatore",
    period: "Nov 2021 – Jun 2024",
    grade: "First Class",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.18)",
    icon: "building",
    points: [
      "Gained foundational knowledge in Communication Systems & electronics",
      "Participated in technical paper presentations & project exhibitions",
      "Developed problem-solving skills & technical communication",
      "Worked on academic projects improving practical understanding",
    ],
    tags: ["Electronics", "Communication", "Problem Solving"],
    skills: [
      { label: "Electronics", value: 78 },
      { label: "Problem Solving", value: 85 },
      { label: "Technical Writing", value: 70 },
    ],
  },
  {
    degree: "Full-Stack Web Development",
    institution: "Code99 IT Academy",
    university: "Professional Certification · Chennai",
    period: "Nov 2024 – Mar 2025",
    grade: "Best Performance Award",
    color: "#c084fc",
    glow: "rgba(192,132,252,0.15)",
    icon: "certificate",
    points: [
      "Hands-on coding sessions, mini & real-time project development",
      "Built responsive web apps using modern frontend & backend tech",
      "Applied web development concepts in real-world scenarios",
      "Awarded Best Performance Award for outstanding performance",
    ],
    tags: ["HTML", "CSS", "JavaScript", "React.js", "Node.js"],
    skills: [
      { label: "Full-Stack Dev", value: 88 },
      { label: "React.js", value: 85 },
      { label: "Node.js", value: 72 },
    ],
  },
  {
    degree: "HSC (Class 11 & 12)",
    institution: "State Board of Tamil Nadu",
    university: "Higher Secondary Education",
    period: "2018 – 2019",
    grade: "Completed",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.14)",
    icon: "book",
    points: [
      "Specialization in Computer Applications",
      "Covered programming basics, software tools & IT fundamentals",
      "Strong foundation in logical thinking & problem solving",
      "Active participation in school-level academic competitions",
    ],
    tags: ["Computer Science", "Mathematics", "Physics"],
    skills: [
      { label: "Computer Basics", value: 80 },
      { label: "Mathematics", value: 75 },
      { label: "Logic & Reasoning", value: 82 },
    ],
  },
  {
    degree: "SSLC (Class 10)",
    institution: "State Board of Tamil Nadu",
    university: "High School · Tamil Nadu",
    period: "2016 – 2017",
    grade: "Completed",
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
    icon: "school",
    points: [
      "Completed SSLC from Tamil Nadu State Board",
      "Built strong foundational knowledge across core subjects",
      "Active participation in academic & extracurricular activities",
      "Developed discipline, focus & academic consistency",
    ],
    tags: ["Mathematics", "Science", "English"],
    skills: [
      { label: "Mathematics", value: 82 },
      { label: "Science", value: 78 },
      { label: "English", value: 74 },
    ],
  },
];

function GridCard({ item, index, inView, isEdu }) {
  const [hovered, setHovered] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  return (
    <div
      className={`gc-row ${inView ? "in" : ""}`}
      style={{ "--delay": `${index * 0.1}s` }}
    >
      <div
        className={`gc-card ${hovered ? "hov" : ""}`}
        style={{ "--c": item.color, "--glow": item.glow }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="gc-card-shine" />
        <div className="gc-card-bar" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}44, transparent)` }} />

        <div
          className="gc-icon-badge"
          style={{ background: item.glow, border: `1px solid ${item.color}35`, color: item.color }}
        >
          {Icons[item.icon]}
        </div>

        <div className="gc-head">
          <div className="gc-head-left">
            <h3 className="gc-role" style={{ "--c": item.color }}>
              {isEdu ? item.degree : item.role}
            </h3>
            <div className="gc-company-row">
              <span className="gc-company-dot" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
              <span className="gc-company">{isEdu ? item.institution : item.company}</span>
            </div>
            {isEdu && (
              <div className="gc-univ" style={{ color: item.color + "bb" }}>{item.university}</div>
            )}
          </div>
          <div className="gc-badges">
            {!isEdu && (
              <span className="gc-badge" style={{ background: `${item.color}18`, color: item.color, borderColor: `${item.color}40` }}>
                {item.type}
              </span>
            )}
            {!isEdu && item.current && (
              <span className="gc-live">
                <span className="gc-live-dot" />
                Live
              </span>
            )}
            <span className="gc-badge-alt" style={{ background: `${item.color}12`, color: item.color, borderColor: `${item.color}30` }}>
              {isEdu ? item.grade : item.duration}
            </span>
          </div>
        </div>

        <div className="gc-meta">
          <span className="gc-meta-chip">
            {Icons.calendar}
            {item.period}
          </span>
          {!isEdu && (
            <span className="gc-meta-chip">
              {Icons.mapPin}
              {item.location}
            </span>
          )}
        </div>

        <div className="gc-divider" style={{ background: `linear-gradient(90deg, ${item.color}60, transparent)` }} />

        <ul className="gc-points">
          {item.points.map((p, i) => (
            <li
              key={i}
              className="gc-point"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(14px)",
                transition: `opacity 0.45s ease ${index * 0.1 + 0.25 + i * 0.07}s, transform 0.45s ease ${index * 0.1 + 0.25 + i * 0.07}s`,
              }}
            >
              <span className="gc-point-bullet" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}80` }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="gc-tags">
          {item.tags.map((t, i) => (
            <span
              key={i}
              className="gc-tag"
              style={{ background: `${item.color}14`, color: item.color, borderColor: `${item.color}35` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="gc-skill-section">
          <button
            className="gc-skill-toggle"
            style={{ color: item.color, borderColor: `${item.color}35`, background: `${item.color}10` }}
            onClick={() => setShowSkills(v => !v)}
          >
            <span className="gc-skill-toggle-label">Proficiency</span>
            <span
              className="gc-skill-toggle-arrow"
              style={{ transform: showSkills ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              {Icons.chevron}
            </span>
          </button>
          <div
            className="gc-skill-body"
            style={{
              maxHeight: showSkills ? `${item.skills.length * 52}px` : "0px",
              opacity: showSkills ? 1 : 0,
            }}
          >
            <div style={{ paddingTop: 10 }}>
              {item.skills.map((s, i) => (
                <SkillBar
                  key={i}
                  label={s.label}
                  value={s.value}
                  color={item.color}
                  inView={inView && showSkills}
                  delay={i * 0.12}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceEducation() {
  const [active, setActive] = useState("experience");
  const [secRef, secInView] = useInView(0.05);
  const [gridRef, gridInView] = useInView(0.03);
  const mouse = useMouseParallax();
  const data = active === "experience" ? EXPERIENCES : EDUCATION;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .ee-section {
          --font-head: 'Clash Display', 'Syne', sans-serif;
          --font-body: 'Syne', sans-serif;
          --accent:  #818cf8;
          --accent2: #c084fc;
          --fg:      #f1f5f9;
          --fg2:     #94a3b8;
          --fg3:     #475569;
          --bg:      #020611;
          --border:  rgba(255,255,255,0.06);
          --border2: rgba(255,255,255,0.11);
          position: relative;
          background: var(--bg);
          padding: 40px;
          overflow: hidden;
          font-family: var(--font-body);
        }

        .ee-bg-noise {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.6;
        }
        .ee-bg-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(129,140,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,140,248,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black, transparent);
        }
        .ee-blob {
          position: absolute; border-radius: 50%; filter: blur(90px);
          pointer-events: none; z-index: 0; animation: blobDrift 18s ease-in-out infinite;
        }
        .ee-blob-1 {
          width: 500px; height: 500px; top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%);
          animation-duration: 22s;
        }
        .ee-blob-2 {
          width: 400px; height: 400px; top: 40%; right: -120px;
          background: radial-gradient(circle, rgba(192,132,252,0.07), transparent 70%);
          animation-duration: 26s; animation-delay: -8s;
        }
        .ee-blob-3 {
          width: 350px; height: 350px; bottom: 80px; left: 30%;
          background: radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%);
          animation-duration: 20s; animation-delay: -14s;
        }
        @keyframes blobDrift {
          0%,100% { transform: translate(0,0) scale(1); }
          33%     { transform: translate(30px,-40px) scale(1.05); }
          66%     { transform: translate(-20px,25px) scale(0.96); }
        }
        .ee-blob-mouse {
          position: absolute; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(129,140,248,0.06), transparent 70%);
          filter: blur(80px); pointer-events: none; z-index: 0;
          top: 50%; left: 50%;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }

        .ee-label {
          text-align: center; margin-bottom: 18px; position: relative; z-index: 1;
        }
        .ee-label-pill {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent);
          border: 1px solid rgba(129,140,248,0.25);
          background: rgba(129,140,248,0.06);
          padding: 6px 18px; border-radius: 99px;
          backdrop-filter: blur(8px);
        }
        .ee-label-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent); box-shadow: 0 0 8px var(--accent);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

        .ee-heading {
          font-family: var(--font-head);
          font-size: clamp(32px, 5.5vw, 68px);
          font-weight: 800; color: var(--fg);
          text-align: center; letter-spacing: -0.04em; line-height: 1.05;
          margin-bottom: 40px; position: relative; z-index: 1;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .ee-heading.in { opacity: 1; transform: translateY(0); }
        .ee-heading .hl {
          background: linear-gradient(135deg, var(--accent), var(--accent2), #22d3ee);
          background-size: 200% 200%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: headGrad 6s ease infinite;
        }
        @keyframes headGrad {
          0%  { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100%{ background-position: 0% 50% }
        }

        .ee-toggle {
          display: flex; justify-content: center; margin-bottom: 56px;
          position: relative; z-index: 1;
        }
        .ee-toggle-track {
          display: flex;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border2);
          border-radius: 99px; padding: 5px; gap: 4px;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .ee-tab {
          font-family: var(--font-body);
          font-size: 13px; font-weight: 500;
          padding: 11px 30px; border-radius: 99px; border: none;
          cursor: pointer; color: var(--fg2);
          background: transparent;
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
          display: flex; align-items: center; gap: 9px;
          position: relative; overflow: hidden;
          white-space: nowrap;
        }
        .ee-tab::before {
          content: '';
          position: absolute; inset: 0; border-radius: 99px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          opacity: 0; transition: opacity 0.35s;
        }
        .ee-tab.active { color: #fff; box-shadow: 0 6px 28px rgba(129,140,248,0.45); }
        .ee-tab.active::before { opacity: 1; }
        .ee-tab-icon, .ee-tab span { position: relative; z-index: 1; }

        /* ── 2-COLUMN GRID (desktop default) ── */
        .ee-grid {
          position: relative; z-index: 1;
          max-width: 980px; margin: 0 auto; padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        .gc-row {
          opacity: 0; transform: translateY(32px);
          transition:
            opacity  0.65s ease var(--delay, 0s),
            transform 0.65s cubic-bezier(0.16,1,0.3,1) var(--delay, 0s);
          display: flex;
          flex-direction: column;
        }
        .gc-row.in { opacity: 1; transform: translateY(0); }

        .gc-card {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.028), rgba(255,255,255,0.01));
          border: 1px solid var(--border);
          border-radius: 20px; padding: 24px 22px 20px;
          transition: border-color 0.35s, background 0.35s, box-shadow 0.35s, transform 0.35s;
          cursor: default;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .gc-card.hov {
          border-color: rgba(255,255,255,0.14);
          background: linear-gradient(135deg, rgba(255,255,255,0.042), rgba(255,255,255,0.015));
          box-shadow:
            0 22px 65px rgba(0,0,0,0.48),
            0 0 0 1px rgba(255,255,255,0.07),
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 0 55px var(--glow);
          transform: translateY(-4px);
        }

        .gc-card-shine {
          position: absolute; inset: 0; border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        .gc-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2.5px;
          border-radius: 20px 20px 0 0; opacity: 0.85;
        }

        .gc-icon-badge {
          position: absolute; top: 20px; left: 20px;
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
        }
        .gc-card.hov .gc-icon-badge {
          transform: scale(1.18) rotate(10deg);
          box-shadow: 0 0 22px var(--glow);
        }

        .gc-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 10px; margin-bottom: 11px;
          padding-left: 50px;
        }
        .gc-head-left { flex: 1; min-width: 0; }
        .gc-role {
          font-family: var(--font-head);
          font-size: 14.5px; font-weight: 700; color: var(--fg);
          line-height: 1.25; margin-bottom: 5px; letter-spacing: -0.02em;
          background: linear-gradient(90deg, #f1f5f9, var(--c, #818cf8));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .gc-company-row { display: flex; align-items: center; gap: 7px; margin-bottom: 3px; }
        .gc-company-dot {
          width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
          animation: cdotpulse 2.5s ease-in-out infinite;
        }
        @keyframes cdotpulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.45)} }
        .gc-company {
          font-size: 12px; color: var(--fg2); font-weight: 400;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gc-univ { font-size: 10.5px; color: var(--fg3); margin-top: 2px; padding-left: 13px; }

        .gc-badges { display: flex; flex-direction: column; gap: 5px; align-items: flex-end; flex-shrink: 0; }
        .gc-badge {
          font-family: var(--font-body);
          font-size: 10px; font-weight: 500; letter-spacing: 0.05em;
          padding: 3px 10px; border-radius: 99px; border: 1px solid; white-space: nowrap;
        }
        .gc-live {
          display: flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 99px;
          background: rgba(34,197,94,0.1); color: #4ade80;
          border: 1px solid rgba(34,197,94,0.2);
          white-space: nowrap;
        }
        .gc-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 6px #4ade80;
          animation: livePulse 1.8s ease-in-out infinite;
        }
        @keyframes livePulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
        .gc-badge-alt {
          font-size: 10px; font-weight: 500; padding: 3px 10px;
          border-radius: 99px; border: 1px solid; white-space: nowrap;
        }

        .gc-meta {
          display: flex; align-items: center; gap: 7px;
          flex-wrap: wrap; margin-bottom: 13px;
          padding-left: 50px;
        }
        .gc-meta-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--fg3);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          padding: 3px 10px; border-radius: 99px;
        }
        .gc-meta-chip svg { opacity: 0.5; flex-shrink: 0; }

        .gc-divider { height: 1px; margin-bottom: 13px; border-radius: 99px; }

        .gc-points {
          list-style: none; padding: 0; margin: 0 0 13px;
          display: flex; flex-direction: column; gap: 7px;
        }
        .gc-point {
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 12px; color: var(--fg2); line-height: 1.72;
          font-family: 'Syne', sans-serif; font-weight: 500;
        }
        .gc-point-bullet {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
          margin-top: 7px; transition: transform 0.2s;
        }
        .gc-point:hover .gc-point-bullet { transform: scale(1.7); }

        .gc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .gc-tag {
          font-size: 10.5px; font-weight: 500; padding: 3px 10px;
          border-radius: 99px; border: 1px solid; letter-spacing: 0.03em;
          transition: all 0.22s; cursor: default;
        }
        .gc-tag:hover { filter: brightness(1.45); transform: translateY(-2px) scale(1.06); }

        .gc-skill-section {
          padding-top: 13px; border-top: 1px solid rgba(255,255,255,0.05);
          margin-top: auto;
        }
        .gc-skill-toggle {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 6px 12px; border-radius: 99px;
          border: 1px solid; cursor: pointer;
          font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          font-family: var(--font-body);
          transition: background 0.25s, filter 0.25s;
        }
        .gc-skill-toggle:hover { filter: brightness(1.3); }
        .gc-skill-toggle-label { flex: 1; text-align: left; }
        .gc-skill-toggle-arrow {
          display: flex; align-items: center;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .gc-skill-body {
          overflow: hidden;
          transition: max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE FIXES
        ══════════════════════════════════════════ */

        /* Tablet: switch to single column */
        @media (max-width: 900px) {
          .ee-grid {
            grid-template-columns: 1fr;
            max-width: 580px;
          }
        }

        /* Mobile: padding, font, tab adjustments */
        @media (max-width: 600px) {
          .ee-section {
            padding: 28px 40px 36px;
          }
          .ee-heading {
            font-size: clamp(26px, 7.5vw, 40px);
            margin-bottom: 24px;
            letter-spacing: -0.03em;
          }
          .ee-toggle {
            margin-bottom: 36px;
          }
          .ee-toggle-track {
            padding: 4px;
            gap: 3px;
          }
          .ee-tab {
            padding: 10px 20px;
            font-size: 12px;
            gap: 7px;
          }
          .gc-card {
            padding: 20px 16px 16px;
            border-radius: 16px;
          }
          .gc-icon-badge {
            width: 34px; height: 34px;
            top: 18px; left: 16px;
          }
          .gc-head {
            padding-left: 46px;
          }
          .gc-meta {
            padding-left: 0;
            margin-top: 4px;
          }
          .gc-role {
            font-size: 13.5px;
          }
          .gc-company {
            font-size: 11px;
          }
          /* Badges row instead of column on mobile */
          .gc-badges {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-end;
            align-items: center;
            gap: 4px;
          }
          .gc-badge, .gc-live, .gc-badge-alt {
            font-size: 9.5px;
            padding: 2.5px 8px;
          }
          .gc-point {
            font-size: 11.5px;
          }
          .gc-tag {
            font-size: 10px;
            padding: 2.5px 8px;
          }
          .ee-label-pill {
            font-size: 10px;
            padding: 5px 14px;
            letter-spacing: 0.15em;
          }
        }

        /* Small phones */
        @media (max-width: 400px) {
          .ee-section {
            padding: 22px 23px 30px;
          }
          .ee-tab {
            padding: 9px 14px;
            font-size: 11.5px;
            gap: 6px;
          }
          .ee-tab-icon svg {
            width: 16px; height: 16px;
          }
          .gc-card {
            padding: 18px 14px 14px;
            border-radius: 14px;
          }
          .gc-icon-badge {
            width: 30px; height: 30px;
            top: 16px; left: 14px;
          }
          .gc-icon-badge svg {
            width: 15px; height: 15px;
          }
          .gc-head {
            padding-left: 42px;
          }
          .gc-role {
            font-size: 13px;
          }
          .gc-meta-chip {
            font-size: 10px;
            padding: 2.5px 8px;
          }
          .gc-point {
            font-size: 11px;
            gap: 7px;
          }
        }
      `}</style>

      <section className="ee-section" id="experience" ref={secRef}>
        <div className="ee-bg-noise" />
        <div className="ee-bg-grid" />
        <div className="ee-blob ee-blob-1" />
        <div className="ee-blob ee-blob-2" />
        <div className="ee-blob ee-blob-3" />
        <div
          className="ee-blob-mouse"
          style={{ transform: `translate(calc(-50% + ${mouse.x * 40}px), calc(-50% + ${mouse.y * 40}px))` }}
        />

        <div className="ee-label">
          <span className="ee-label-pill">
            <span className="ee-label-dot" />
            My Journey
          </span>
        </div>

        <h2 className={`ee-heading ${secInView ? "in" : ""}`}>
          Experience &amp; <span className="hl">Education</span>
        </h2>

        <div className="ee-toggle">
          <div className="ee-toggle-track">
            <button
              className={`ee-tab ${active === "experience" ? "active" : ""}`}
              onClick={() => setActive("experience")}
            >
              <span className="ee-tab-icon">{Icons.briefcase}</span>
              <span>Experience</span>
            </button>
            <button
              className={`ee-tab ${active === "education" ? "active" : ""}`}
              onClick={() => setActive("education")}
            >
              <span className="ee-tab-icon">{Icons.school}</span>
              <span>Education</span>
            </button>
          </div>
        </div>

        <div className="ee-grid" ref={gridRef} key={active}>
          {data.map((item, i) => (
            <GridCard
              key={i}
              item={item}
              index={i}
              inView={gridInView}
              isEdu={active === "education"}
            />
          ))}
        </div>
      </section>
    </>
  );
}