import { useEffect, useRef, useState, useCallback } from "react";

import images from "../assets/Image";

/* ─── Intersection hook ─── */
function useInView(threshold = 0.1) {
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

/* ─── Animated counter hook ─── */
function useCounter(target, inView, duration = 1800) {
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

/* ─── Data ─── */
const PROJECTS = [
  {
    title: "Health Center Website",
    desc: "A fully responsive health center platform with doctor appointment booking, service listing & patient info sections. Clean UI with smooth interactions.",
    image: images.Project25,
    tags: ["React.js", "CSS", "Bootstrap"],
    category: "Frontend",
    color: "#06b6d4",
    live: "https://health-center-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/health-center",
    featured: false,
  },
  {
    title: "Spotify Clone",
    desc: "A pixel-perfect Spotify clone built with React.js & Tailwind. Features music player UI, playlist layout & trending songs section.",
    image: images.Project20,
    tags: ["React.js", "Tailwind", "Bootstrap"],
    category: "Frontend",
    color: "#1db954",
    live: "https://spotify-clone-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/spotify-clone",
    featured: true,
  },
  {
    title: "Flexwood Furniture Shop",
    desc: "Modern furniture e-commerce website with product grid, cart UI, category filters & responsive layout across all devices.",
    image: images.Project16,
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    color: "#f59e0b",
    live: "https://flexwood-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/flexwood",
    featured: false,
  },
  {
    title: "Code99 IT Academy",
    desc: "Official React.js frontend for Code99 IT Academy — online course showcase, student stories & enrollment platform. Built as a 4-member team live project.",
    image: "/src/assets/Images/code99.jpg",
    tags: ["React.js", "JSX", "CSS"],
    category: "Frontend",
    color: "#6366f1",
    live: "https://code99-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/code99-academy",
    featured: true,
  },
  {
    title: "CrazyCap Website",
    desc: "Smart bottle product website with AOS animations, FontAwesome icons & fully responsive layout. Smooth interactions across all devices.",
    image: images.Project18,
    tags: ["HTML", "CSS", "JavaScript", "AOS"],
    category: "Frontend",
    color: "#ec4899",
    live: "https://crazycap-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/crazycap",
    featured: false,
  },
  {
    title: "Orgain Fresh Shop",
    desc: "Organic food e-commerce store with product listing, category filters, smooth checkout UI & mobile-first responsive design.",
    image: images.Project19,
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    color: "#22c55e",
    live: "https://orgain-mohulnath.netlify.app",
    github: "https://github.com/mohulnath/orgain",
    featured: false,
  },

  {
    title: "Sri Chakra Hospital",
    desc: "Hospital website featuring doctor profiles, speciality departments, appointment booking, patient testimonials & clean healthcare-focused responsive design.",
    image: images.Project21,
    tags: ["WordPress", "CSS", "SEO", "Healthcare"],
    category: "Client Work",
    color: "#ef4444",
    live: "https://srichakrahospital.in/",
    github: "",
    featured: false,
  },
  {
    title: "Sangam Bone Hospital",
    desc: "Professional hospital website for Sangam Bone Hospital. Features doctor profiles, treatment services, appointment booking & patient-friendly responsive layout.",
    image: images.Project1,
    tags: ["WordPress", "CSS", "SEO", "Responsive"],
    category: "Client Work",
    color: "#06b6d4",
    live: "https://sangambonehospital.com/",
    github: "",
    featured: false,
  },

  {
    title: "Sai Madhura Enterprises",
    desc: "Business enterprise website on WordPress with custom theme, service showcase, gallery section & optimized for mobile and search engines.",
    image: images.Project2,
    tags: ["WordPress", "CSS", "SEO", "Theme"],
    category: "Client Work",
    color: "#a855f7",
    live: "https://saimadhuraenterprises.com/",
    github: "",
    featured: false,
  },

  {
    title: "Shine Edux",
    desc: "Educational platform website for Shine Edux with course listings, faculty profiles, student testimonials & modern education-focused responsive design.",
    image: images.Project4,
    tags: ["WordPress", "CSS", "SEO", "Education"],
    category: "Client Work",
    color: "#6366f1",
    live: "https://shineedux.com/",
    github: "",
    featured: false,
  },

  {
    title: "Zensys",
    desc: "Technology company website for Zensys with service pages, portfolio showcase, team section & professional corporate design with smooth animations.",
    image: images.Project3,
    tags: ["WordPress", "CSS", "SEO", "Corporate"],
    category: "Client Work",
    color: "#a855f7",
    live: "https://www.zensys.in/",
    github: "",
    featured: false,
  },

  {
    title: "Buvan Weds Girija",
    desc: "Beautiful wedding website built with WordPress. Features wedding details, couple story, event schedule, photo gallery & RSVP section with elegant design.",
    image: images.Project11,
    tags: ["WordPress", "CSS", "SEO", "Responsive"],
    category: "Client Work",
    color: "#f43f5e",
    live: "https://buvanwedsgirija.in/",
    github: "",
    featured: false,
  },

  {
    title: "Bemaxx",
    desc: "Business website for Bemaxx with product/service showcase, company info, contact forms & fully responsive mobile-first WordPress design.",
    image: images.Project5,
    tags: ["WordPress", "CSS", "SEO", "Responsive"],
    category: "Client Work",
    color: "#f97316",
    live: "https://bemaxx.in/",
    github: "",
    featured: false,
  },

  {
    title: "AVIV MCPL",
    desc: "Corporate business website for AVIV MCPL with service showcase, about section, project portfolio & professional enterprise-grade WordPress design.",
    image: images.Project6,
    tags: ["WordPress", "CSS", "SEO", "Corporate"],
    category: "Client Work",
    color: "#8b5cf6",
    live: "https://avivmcpl.com/",
    github: "",
    featured: false,
  },

  {
    title: "Vasantham Institution",
    desc: "Professional educational institution website built with WordPress. Features course listings, faculty info, admission details & fully responsive layout with custom theme.",
    image: images.Project22,
    tags: ["WordPress", "CSS", "SEO", "Responsive"],
    category: "Client Work",
    color: "#f97316",
    live: "https://vasanthaminstitution.in/",
    github: "",
    featured: false,
  },
  {
    title: "SMOT Career Promotions",
    desc: "Career promotion & consultancy website on WordPress. Includes service pages, contact forms, blog section & SEO optimization for better search visibility.",
    image: images.Project8,
    tags: ["WordPress", "SEO", "CSS", "Responsive"],
    category: "Client Work",
    color: "#0ea5e9",
    live: "https://smotcareerpromotions.com/",
    github: "",
    featured: false,
  },

  {
    title: "Edison Web Solutions",
    desc: "Web solutions agency website built with React.js. Portfolio showcase, service listings, client testimonials & professional design with smooth animations.",
    image: images.Project25,
    tags: ["React.js", "CSS", "JavaScript", "Responsive"],
    category: "Frontend",
    color: "#22c55e",
    live: "https://edisonwebsolutions.in/",
    github: "",
    featured: true,
  },

  {
    title: "Novatura Healthcare",
    desc: "Modern healthcare website with service listings, team profiles, patient resources & clean professional design optimized for search engines.",
    image: images.Project10,
    tags: ["WordPress", "CSS", "SEO", "Healthcare"],
    category: "Client Work",
    color: "#22c55e",
    live: "https://novaturahealthcare.com/",
    github: "",
    featured: false,
  },

  {
    title: "AuthHires",
    desc: "Professional recruitment & staffing agency website. Features job listings, employer & candidate sections, application forms & SEO-optimized content.",
    image: images.Project9,
    tags: ["WordPress", "CSS", "SEO", "Recruitment"],
    category: "Client Work",
    color: "#6366f1",
    live: "https://authhires.com/",
    github: "",
    featured: false,
  },

  {
    title: "Synapse Tanzania",
    desc: "International tech company website based in Tanzania. Features services, case studies, team profiles & multilingual-ready professional corporate design.",
    image: images.Project26,
    tags: ["WordPress", "CSS", "SEO", "International"],
    category: "Client Work",
    color: "#0ea5e9",
    live: "https://synapse.co.tz/",
    github: "",
    featured: false,
  },
  {
    title: "Karthikeyan Groups",
    desc: "Business group website for Karthikeyan Groups with multiple division showcases, company history, leadership team & professional corporate layout.",
    image: images.Project12,
    tags: ["WordPress", "CSS", "SEO", "Corporate"],
    category: "Client Work",
    color: "#f59e0b",
    live: "https://karthikeyangroups.in/",
    github: "",
    featured: false,
  },
  {
    title: "Infinity TOIP",
    desc: "Telecom & IT solutions company website with service listings, technology showcase, client portfolio & lead generation contact forms.",
    image: "/src/assets/Images/infinity.jpg",
    tags: ["WordPress", "CSS", "SEO", "Telecom"],
    category: "Client Work",
    color: "#06b6d4",
    live: "https://infinitytoip.in/",
    github: "",
    featured: false,
  },
  {
    title: "iSolar Energy",
    desc: "Solar energy company website with product catalogue, installation services, energy calculator concept & SEO-optimized green energy focused design.",
    image: images.Project14,
    tags: ["WordPress", "CSS", "SEO", "Energy"],
    category: "Client Work",
    color: "#eab308",
    live: "https://isolarenergy.in/",
    github: "",
    featured: false,
  },
  {
    title: "Mannainarayanasamy",
    desc: "Cultural & religious organization website with event listings, gallery, donation section & community-focused responsive WordPress design.",
    image: images.Project13,
    tags: ["WordPress", "CSS", "SEO", "Responsive"],
    category: "Client Work",
    color: "#f97316",
    live: "https://mannainarayanasamy.com/",
    github: "",
    featured: false,
  },

  {
    title: "Vizi Pavalan",
    desc: "Travel & exploration website for Vizi Pavalan with destination guides, travel stories, photo gallery & engaging content-rich WordPress design.",
    image: "/src/assets/Images/vizipavalan.jpg",
    tags: ["WordPress", "CSS", "SEO", "Travel"],
    category: "Client Work",
    color: "#22c55e",
    live: "https://vizipavalan.com/",
    github: "",
    featured: false,
  },
];

const FILTERS = [
  { label: "All", icon: "⬡" },
  { label: "Client Work", icon: "◆" },
  { label: "Frontend", icon: "◈" },
  { label: "Backend", icon: "◎" },
];

/* ─── Tilt card ─── */
function ProjectCard({ project, inView, delay, index }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (flipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  }, [flipped]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setFlipped(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`pc-wrap ${project.featured ? "pc-featured" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0) scale(1)`
          : "translateY(50px) scale(0.92)",
        transition: inView
          ? `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`
          : "none",
        "--c": project.color,
        "--ci": `${project.color}22`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={handleMouseLeave}
    >
      {project.featured && (
        <div className="pc-featured-badge">★ Featured</div>
      )}

      <div className={`pc-inner ${flipped ? "pc-flipped" : ""}`}>

        {/* ── Front ── */}
        <div className="pc-face pc-front">
          <div className="pc-shine" />
          <div className="pc-accent-line" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

          <div className="pc-img-zone">
            {!imgError ? (
              <img
                src={project.image}
                alt={project.title}
                className="pc-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="pc-img-placeholder">
                <span style={{ fontSize: 36, opacity: 0.3 }}>◈</span>
              </div>
            )}
            <div className="pc-img-veil" style={{ background: `linear-gradient(to top, ${project.color}55 0%, transparent 60%)` }} />
            <span className="pc-badge">{project.category}</span>
          </div>

          <div className="pc-body">
            <h3 className="pc-title">{project.title}</h3>
            <div className="pc-tags">
              {project.tags.slice(0, 3).map((t, i) => (
                <span key={i} className="pc-tag" style={{ color: project.color, borderColor: `${project.color}44` }}>
                  {t}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="pc-tag" style={{ color: "#64748b", borderColor: "#64748b44" }}>
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            <p className="pc-hint">
              <span className="pc-hint-dot" style={{ background: project.color }} />
              Hover to explore
            </p>
          </div>

          {/* Corner number */}
          <span className="pc-index" style={{ color: `${project.color}33` }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* ── Back ── */}
        <div className="pc-face pc-back">
          <div
            className="pc-back-glow"
            style={{ background: `radial-gradient(ellipse at 50% -10%, ${project.color}33 0%, transparent 65%)` }}
          />
          <div className="pc-back-body">
            <div className="pc-back-tag-row">
              <span className="pc-back-category" style={{ color: project.color, borderColor: `${project.color}44` }}>
                {project.category}
              </span>
            </div>
            <h3 className="pc-back-title">{project.title}</h3>
            <div className="pc-back-rule" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />
            <p className="pc-back-desc">{project.desc}</p>
            <div className="pc-back-tags">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="pc-back-chip"
                  style={{ background: `${project.color}18`, color: project.color }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pc-back-actions">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="pc-btn-live"
                style={{ background: `linear-gradient(135deg, ${project.color}ee, ${project.color}99)` }}
                onClick={e => e.stopPropagation()}
              >
                <span>↗</span> Live Demo
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pc-btn-gh"
                  style={{ borderColor: `${project.color}55`, color: project.color }}
                  onClick={e => e.stopPropagation()}
                >
                  <span>⌥</span> GitHub
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Stats bar ─── */
function StatsBar({ inView }) {
  const total = useCounter(25, inView);
  const clients = useCounter(18, inView);
  const frontend = useCounter(6, inView);

  const stats = [
    { value: total, suffix: "+", label: "Total Projects" },
    { value: clients, suffix: "+", label: "Client Sites" },
    { value: frontend, suffix: "", label: "Frontend Builds" },
    { value: 100, suffix: "%", label: "Responsive" },
  ];

  const hundredCount = useCounter(100, inView);

  const allStats = [
    { count: total, suffix: "+", label: "Total Projects" },
    { count: clients, suffix: "+", label: "Client Sites" },
    { count: frontend, suffix: "", label: "Frontend Builds" },
    { count: hundredCount, suffix: "%", label: "Responsive" },
  ];

  return (
    <div className="ps-bar">
      {allStats.map((s, i) => (
        <div key={i} className="ps-item"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
          }}
        >
          <span className="ps-num">{s.count}<span className="ps-suffix">{s.suffix}</span></span>
          <span className="ps-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main ─── */
export default function Projects() {
  const [active, setActive] = useState("All");
  const [headRef, headInView] = useInView(0.3);
  const [statsRef, statsInView] = useInView(0.3);
  const [gridRef, gridInView] = useInView(0.05);
  const [hoveredFilter, setHoveredFilter] = useState(null);

  const CATEGORY_ORDER = { "Client Work": 0, "Frontend": 1, "Backend": 2 };

  const filtered = active === "All"
    ? [...PROJECTS].sort((a, b) => CATEGORY_ORDER[a.category] - CATEGORY_ORDER[b.category])
    : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');

        /* ── Section shell ── */
        .ps-section {
          --a1: #7c3aed;
          --a2: #06b6d4;
          --a3: #f43f5e;
          --fg: #f1f5f9;
          --fg2: #94a3b8;
          --fg3: #475569;
          --bg: #02040a;
          --bg2: #060b14;
          --bg3: #0c1220;
          --border: rgba(255,255,255,0.06);
          --font-h: 'Clash Display', 'Syne', sans-serif;
          --font-b: 'Syne', sans-serif;
          background: var(--bg);
          padding: 20px 40px;
          overflow: hidden;
          position: relative;
          font-family: var(--font-b);
        }

        /* ── Noise texture overlay ── */
        .ps-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none; z-index: 0;
        }

        /* ── Grid lines background ── */
        .ps-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── Ambient glows ── */
        .ps-glow {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          filter: blur(120px);
        }
        .ps-glow-1 {
          width: 600px; height: 600px;
          background: rgba(124,58,237,0.08);
          top: -100px; right: -120px;
        }
        .ps-glow-2 {
          width: 400px; height: 400px;
          background: rgba(6,182,212,0.06);
          bottom: 60px; left: -80px;
        }
        .ps-glow-3 {
          width: 300px; height: 300px;
          background: rgba(244,63,94,0.05);
          top: 40%; left: 40%;
          transform: translate(-50%, -50%);
        }

        /* ── Inner container ── */
        .ps-inner {
          position: relative; z-index: 1;
          max-width: 1160px; margin: 0 auto; padding: 0 40px;
        }

        /* ── Heading ── */
        .ps-heading {
          font-family: var(--font-h);
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: var(--fg);
          text-align: center;
          margin-bottom: 20px;
        }
   
        @keyframes underlineIn {
          to { transform: scaleX(1); }
        }

        .ps-subhead {
          text-align: center; font-size: 15px; color: var(--fg2);
          max-width: 480px; margin: 0 auto 56px; line-height: 1.6;
        }

        /* ── Stats bar ── */
        .ps-bar {
          display: flex; justify-content: center; gap: 0;
          background: rgba(255,255,255,0.025);
          border: 1px solid var(--border);
          border-radius: 16px;
          margin-bottom: 60px;
          overflow: hidden;
        }
        .ps-item {
          flex: 1; padding: 22px 20px; text-align: center;
          position: relative;
        }
        .ps-item:not(:last-child)::after {
          content: '';
          position: absolute; right: 0; top: 20%; bottom: 20%;
          width: 1px; background: var(--border);
        }
        .ps-num {
          font-family: var(--font-h);
          font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #f1f5f9, #94a3b8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; display: block;
        }
        .ps-suffix {
          font-size: 20px;
          background: linear-gradient(135deg, var(--a1), var(--a2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ps-label {
          font-size: 11px; color: var(--fg3); letter-spacing: 0.04em;
          text-transform: uppercase; margin-top: 4px; display: block;
        }

        /* ── Filters ── */
        .ps-filters {
          display: flex; justify-content: center; gap: 8px;
          flex-wrap: wrap; margin-bottom: 60px;
        }
        .ps-filter {
          font-family: var(--font-b); font-size: 13px; font-weight: 500;
          padding: 10px 24px; border-radius: 10px; cursor: pointer;
          border: 1px solid var(--border); background: transparent;
          color: var(--fg2); transition: all 0.2s ease;
          display: flex; align-items: center; gap: 7px;
          position: relative; overflow: hidden;
        }
        .ps-filter::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.05));
          opacity: 0; transition: opacity 0.2s;
        }
        .ps-filter:hover::before { opacity: 1; }
        .ps-filter:hover { border-color: rgba(124,58,237,0.3); color: var(--fg); }
        .ps-filter.ps-active {
          background: linear-gradient(135deg, var(--a1), #5b21b6);
          border-color: transparent; color: #fff;
          box-shadow: 0 0 20px rgba(124,58,237,0.3), 0 4px 16px rgba(124,58,237,0.2);
        }
        .ps-filter-icon {
          font-size: 11px; opacity: 0.7;
        }
        .ps-filter-count {
          font-size: 10px;
          background: rgba(255,255,255,0.15);
          padding: 1px 6px; border-radius: 99px;
        }

        /* ── Grid ── */
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ── Project card ── */
        .pc-wrap {
          height: 400px;
          perspective: 1200px;
          cursor: pointer;
          position: relative;
        }
        .pc-featured::before {
          content: '';
          position: absolute; inset: -1px; border-radius: 18px; z-index: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3));
          pointer-events: none;
        }

        .pc-featured-badge {
          position: absolute; top: -10px; left: 20px; z-index: 20;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          background: linear-gradient(135deg, var(--a1), var(--a2));
          color: #fff; padding: 4px 12px; border-radius: 99px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(124,58,237,0.4);
        }

        .pc-inner {
          width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative; z-index: 1;
        }
        .pc-flipped { transform: rotateY(180deg) !important; }

        .pc-face {
          position: absolute; inset: 0;
          border-radius: 16px; overflow: hidden;
          backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }

        /* Front */
        .pc-front {
          background: var(--bg3);
          border: 1px solid var(--border);
          display: flex; flex-direction: column;
        }
        .pc-shine {
          position: absolute; inset: 0; z-index: 5; pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%);
        }
        .pc-accent-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px; z-index: 6;
        }
        .pc-img-zone {
          position: relative; height: 210px; overflow: hidden;
          background: rgba(124,58,237,0.06);
          flex-shrink: 0;
        }
        .pc-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .pc-wrap:hover .pc-img { transform: scale(1.07); }
        .pc-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(124,58,237,0.1), rgba(6,182,212,0.06));
        }
        .pc-img-veil {
          position: absolute; inset: 0; z-index: 2;
        }
        .pc-badge {
          position: absolute; top: 10px; right: 10px; z-index: 3;
          font-size: 9px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(10px);
          padding: 4px 10px; border-radius: 99px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .pc-body {
          padding: 16px 18px; flex: 1; display: flex; flex-direction: column; gap: 10px;
          position: relative;
        }
        .pc-title {
          font-family: var(--font-h);
          font-size: 15px; font-weight: 700; color: var(--fg);
          line-height: 1.3; letter-spacing: -0.01em;
          margin: 0;
        }
        .pc-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pc-tag {
          font-size: 9px; font-weight: 600; padding: 3px 8px;
          border-radius: 6px; border: 1px solid;
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .pc-hint {
          font-size: 11px; color: var(--fg3); margin-top: auto;
          display: flex; align-items: center; gap: 6px;
        }
        .pc-hint-dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: blink 2s ease infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .pc-index {
          position: absolute; bottom: 12px; right: 16px;
          font-family: var(--font-h); font-size: 36px; font-weight: 800;
          pointer-events: none; user-select: none; line-height: 1;
        }

        /* Back */
        .pc-back {
          background: #07091a;
          border: 1px solid rgba(255,255,255,0.08);
          transform: rotateY(180deg);
          display: flex; flex-direction: column;
        }
        .pc-back-glow {
          position: absolute; inset: 0; pointer-events: none;
        }
        .pc-back-body {
          position: relative; z-index: 1;
          padding: 22px 22px; display: flex;
          flex-direction: column; gap: 11px; height: 100%;
        }
        .pc-back-tag-row { display: flex; }
        .pc-back-category {
          font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 3px 10px; border-radius: 99px;
          border: 1px solid;
        }
        .pc-back-title {
          font-family: var(--font-h);
          font-size: 18px; font-weight: 800; color: var(--fg);
          letter-spacing: -0.02em; line-height: 1.2; margin: 0;
        }
        .pc-back-rule {
          height: 1px; width: 100%; border-radius: 99px; opacity: 0.4;
        }
        .pc-back-desc {
          font-size: 12px; color: var(--fg2); line-height: 1.75; flex: 1;
          overflow: hidden;
          display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;
        }
        .pc-back-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .pc-back-chip {
          font-size: 9px; font-weight: 600; padding: 3px 9px;
          border-radius: 6px; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .pc-back-actions {
          display: flex; gap: 8px; margin-top: auto;
        }
        .pc-btn-live, .pc-btn-gh {
          font-family: var(--font-b); font-size: 12px; font-weight: 600;
          padding: 9px 18px; border-radius: 10px; text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 5px;
        }
        .pc-btn-live {
          color: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .pc-btn-live:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
        .pc-btn-gh {
          background: transparent; border: 1px solid;
        }
        .pc-btn-gh:hover { transform: translateY(-2px); }

        /* ── Empty state ── */
        .ps-empty {
          grid-column: 1/-1; text-align: center;
          padding: 80px 0; color: var(--fg3);
          font-size: 14px;
        }
        .ps-empty span { display: block; font-size: 40px; margin-bottom: 12px; opacity: 0.3; }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr); }
          .ps-inner { padding: 0 24px; }
          .ps-bar { gap: 0; }
          .ps-item { padding: 18px 12px; }
          .ps-num { font-size: 22px; }
        }
        @media (max-width: 580px) {
          .ps-grid { grid-template-columns: 1fr; }
          .pc-wrap { height: 380px; }
          .ps-section { padding: 80px 0 80px; }
          .ps-bar { display: grid; grid-template-columns: 1fr 1fr; }
          .ps-item::after { display: none; }
        }
      `}</style>

      <section className="ps-section" id="projects">
        <div className="ps-grid-bg" />
        <div className="ps-glow ps-glow-1" />
        <div className="ps-glow ps-glow-2" />
        <div className="ps-glow ps-glow-3" />

        <div className="ps-inner">

          {/* Eyebrow */}
          <div
            className="ps-eyebrow"
            ref={headRef}
            style={{
              opacity: headInView ? 1 : 0,
              transition: "opacity 0.7s ease",
            }}
          >
            <div className="ps-eyebrow-line" />
            <span className="ps-eyebrow-text">Portfolio</span>
            <div className="ps-eyebrow-line" />
          </div>

          {/* Heading */}
          <h2
            className="ps-heading"
            style={{
              opacity: headInView ? 1 : 0,
              transform: headInView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            My{" "}
            <span className="ps-heading-accent">Projects</span>
          </h2>

          <p
            className="ps-subhead"
            style={{
              opacity: headInView ? 1 : 0,
              transition: "opacity 0.7s ease 0.25s",
            }}
          >
            Crafted with precision — from pixel-perfect frontends to full client deployments across industries.
          </p>

          {/* Stats */}
          <div ref={statsRef}>
            <StatsBar inView={statsInView} />
          </div>

          {/* Filters */}
          <div className="ps-filters">
            {FILTERS.map((f) => {
              const count = f.label === "All"
                ? PROJECTS.length
                : PROJECTS.filter(p => p.category === f.label).length;
              return (
                <button
                  key={f.label}
                  className={`ps-filter ${active === f.label ? "ps-active" : ""}`}
                  onClick={() => setActive(f.label)}
                >
                  <span className="ps-filter-icon">{f.icon}</span>
                  {f.label}
                  <span className="ps-filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="ps-grid" ref={gridRef}>
            {filtered.length === 0 ? (
              <div className="ps-empty">
                <span>◎</span>
                No projects in this category yet.
              </div>
            ) : (
              filtered.map((p, i) => (
                <ProjectCard
                  key={p.title}
                  project={p}
                  inView={gridInView}
                  delay={Math.min(i * 0.07, 0.5)}
                  index={i}
                />
              ))
            )}
          </div>

        </div>
      </section>
    </>
  );
}
