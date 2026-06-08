import { useEffect, useRef, useState } from "react";

// ── Intersection Observer hook ──────────────────────────────────────────────
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

// ── Tab icon SVGs ────────────────────────────────────────────────────────────
const TAB_ICONS = {
  "All Skills": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  ),
  "Frontend": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  "Backend": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  "Database": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  "CMS & Platforms": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>
    </svg>
  ),
  "SEO & Marketing": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  "AI & Automation": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  "Tools": (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

const TABS = ["All Skills","Frontend","Backend","Database","CMS & Platforms","SEO & Marketing","AI & Automation","Tools"];

// ── Skills data ──────────────────────────────────────────────────────────────
const SKILLS = [
  { name:"HTML5",            sub:"Semantic Markup",       cat:"Frontend",        color:"#e34f26",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#e34f26"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg> },
  { name:"CSS3",             sub:"Advanced Styling",      cat:"Frontend",        color:"#1572b6",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#1572b6"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53z"/></svg> },
  { name:"JavaScript",       sub:"ES6+ Core Language",    cat:"Frontend",        color:"#f7df1e",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f7df1e"><path d="M0 0h24v24H0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179z"/></svg> },
  { name:"React.js",         sub:"UI Framework",          cat:"Frontend",        color:"#61dafb",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#61dafb"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.292zM5.178 12.008c.086.28.18.559.28.836-.1.278-.194.558-.28.837C4.007 13.386 2.8 12.808 2.8 12.008c0-.802 1.207-1.38 2.378-1.673zm1.019-6.884c1.018 0 2.513.813 4.105 2.292-.69.72-1.376 1.54-2.036 2.446-1.1.117-2.145.298-3.105.534-.109-.495-.197-.98-.251-1.44-.225-1.87.063-3.322.728-3.704.152-.083.333-.128.559-.128zM6.2 12.004c.484-1.053 1.036-2.073 1.646-3.038.61.966 1.16 1.985 1.645 3.038-.485 1.053-1.035 2.072-1.645 3.038-.61-.966-1.16-1.985-1.646-3.038zm5.604 5.668c.69-.72 1.375-1.54 2.035-2.447 1.1-.117 2.145-.298 3.106-.534.109.495.197.98.251 1.44.226 1.87-.063 3.322-.728 3.704-.152.083-.333.128-.559.128-1.018 0-2.513-.813-4.105-2.291zm4.919-4.83c.1-.278.194-.558.28-.837.896.293 2.103.871 2.103 1.671 0 .801-1.207 1.38-2.378 1.673-.086-.28-.18-.559-.28-.837.1-.277.194-.557.28-.836zm-1.019 6.884c-1.018 0-2.513-.813-4.105-2.292.69-.72 1.376-1.54 2.036-2.446 1.1.117 2.145.298 3.105.534.109.495.197.98.251 1.44.225 1.87-.063 3.322-.728 3.704-.152.083-.333.128-.559.128z"/></svg> },
  { name:"Bootstrap",        sub:"CSS Framework",         cat:"Frontend",        color:"#7952b3",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#7952b3"><path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.956v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.325-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186C2.603 3.637 3.616 2.438 4.985 2.438h14.032c1.37 0 2.382 1.199 2.337 2.498-.043 1.249.012 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.355-2.479-2.626v-.087c1.264-.422 1.999-1.332 1.999-2.539 0-1.828-1.352-2.917-3.653-2.917H8.074v11.709h3.99c2.568 0 4.009-1.093 4.009-3.54z"/></svg> },
  { name:"Responsive Design", sub:"Mobile First",         cat:"Frontend",        color:"#06b6d4",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { name:"Node.js",          sub:"Runtime",               cat:"Backend",         color:"#339933",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68C2.99 6.729 2.936 6.825 2.936 6.921v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.275-.924 1.604l-8.794 5.078A1.876 1.876 0 0 1 11.998 24z"/></svg> },
  { name:"Express.js",       sub:"Web Framework",         cat:"Backend",         color:"#aaaaaa",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#aaa"><path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 12.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/></svg> },
  { name:"PHP",              sub:"Server-side",           cat:"Backend",         color:"#777bb4",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#777bb4"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.311 1.607H3.59l1.090-5.611h2.768c.787 0 1.374.19 1.763.57.39.38.516.964.378 1.747a2.498 2.498 0 0 1-.45 1.070 2.219 2.219 0 0 1-.398.402zm4.155-.878l-.248 1.285c-.17.875-.31 1.418-.42 1.628-.175.328-.5.492-.973.492h-.77l.977-5.027h1.07c.355 0 .607.075.753.226.148.15.196.396.146.73l-.535 2.666zm3.924-.621h-.939l-.517 2.648h.838c.555 0 .969-.105 1.241-.314.272-.21.455-.559.55-1.049.092-.47.051-.802-.124-.995-.176-.193-.523-.29-1.049-.29z"/></svg> },
  { name:"REST API",         sub:"API Integration",       cat:"Backend",         color:"#ff6c37",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ff6c37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { name:"MongoDB",          sub:"NoSQL Database",        cat:"Database",        color:"#47a248",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#47a248"><path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/></svg> },
  { name:"WordPress",        sub:"CMS Platform",          cat:"CMS & Platforms", color:"#21759b",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#21759b"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.003 1.5c2.913 0 5.536 1.138 7.49 2.99L4.49 19.487A10.453 10.453 0 0 1 1.5 12c0-5.799 4.701-10.5 10.497-10.5zm0 21c-2.914 0-5.537-1.138-7.491-2.99L19.51 4.513A10.453 10.453 0 0 1 22.5 12c0 5.799-4.701 10.5-10.503 10.5z"/></svg> },
  { name:"Elementor",        sub:"Page Builder",          cat:"CMS & Platforms", color:"#92003b",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#92003b"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM9.6 16.8H7.2V7.2h2.4zm7.2 0h-6v-2.4h6zm0-4.8h-6V9.6h6z"/></svg> },
  { name:"WooCommerce",      sub:"E-Commerce",            cat:"CMS & Platforms", color:"#96588a",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#96588a"><path d="M22.627 0H1.372C.614 0 0 .614 0 1.373v21.254C0 23.386.614 24 1.372 24h21.255C23.386 24 24 23.386 24 22.627V1.373C24 .614 23.386 0 22.627 0zM7.5 15.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM19.5 9l-1.5 6H6L4.5 6H3V4.5h3l1.5 7.5h9l1.5-6h1.5z"/></svg> },
  { name:"SEO Optimization", sub:"Search Ranking",        cat:"SEO & Marketing", color:"#4285f4",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { name:"On-Page SEO",      sub:"Content Optimization",  cat:"SEO & Marketing", color:"#34a853",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { name:"Technical SEO",    sub:"Site Performance",      cat:"SEO & Marketing", color:"#fbbc04",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { name:"Generative AI",    sub:"LLM Integration",       cat:"AI & Automation", color:"#a855f7",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { name:"AI Chatbot Dev",   sub:"Conversational AI",     cat:"AI & Automation", color:"#06b6d4",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { name:"Prompt Engineering",sub:"AI Prompting",         cat:"AI & Automation", color:"#f59e0b",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
  { name:"Git & GitHub",     sub:"Version Control",       cat:"Tools",           color:"#f05032",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f05032"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { name:"VS Code",          sub:"Code Editor",           cat:"Tools",           color:"#007acc",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#007acc"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.06V4.94a1.5 1.5 0 0 0-.85-1.353zm-5.146 14.861L10.826 12l7.178-5.448z"/></svg> },
  { name:"Figma",            sub:"UI Design",             cat:"Tools",           color:"#f24e1e",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#f24e1e"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.587-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038zm4.587 15.019c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019z"/></svg> },
  { name:"Postman",          sub:"API Testing",           cat:"Tools",           color:"#ff6c37",
    icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff6c37"><path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.453-4.453a.86.86 0 1 0-1.177-1.177l-4.453 4.453-.308-.307 4.453-4.453a1.72 1.72 0 0 1 2.354 0l.307.307a1.718 1.718 0 0 1-.183 2.543v-.207zm-8.586 4.738l.921.921-1.668 1.022-1.022-1.023zm-.921 2.217l1.464 1.463-1.364.768-.906-.906zm3.342.921l-1.463-1.463.92-1.769 1.023 1.022-1.022 1.023 1.463 1.462zm-3.649-1.464l1.463 1.463-1.021 1.023-.921-.921zm-1.132 2.1l.921.921-.568.306-.659-.659zm9.277-5.867a.43.43 0 1 1-.86 0 .43.43 0 0 1 .86 0z"/></svg> },
];

// ── Arrow icon ────────────────────────────────────────────────────────────────
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── SkillCard component ───────────────────────────────────────────────────────
function SkillCard({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`sk-card ${hovered ? "hov" : ""}`}
      style={{
        animationDelay: `${index * 0.04}s`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s ease ${index * 0.04}s, transform 0.45s ease ${index * 0.04}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shine sweep */}
      <div className="sk-card-shine" />

      {/* Left color accent bar */}
      <div
        className="sk-card-accent"
        style={{
          background: skill.color,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      />

      {/* Icon box */}
      <div
        className="sk-icon"
        style={{
          background: hovered ? `${skill.color}22` : "rgba(255,255,255,0.05)",
          borderColor: hovered ? `${skill.color}55` : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 0 14px ${skill.color}33` : "none",
          transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
        }}
      >
        {skill.icon}
      </div>

      {/* Info */}
      <div className="sk-info">
        <div
          className="sk-name"
          style={{ color: hovered ? "#fff" : "#f1f5f9", transition: "color 0.2s" }}
        >
          {skill.name}
        </div>
        <div className="sk-sub">{skill.sub}</div>
      </div>

      {/* Arrow */}
      <div
        className="sk-arr"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-6px)",
          color: skill.color,
          transition: "opacity 0.2s, transform 0.2s, color 0.2s",
        }}
      >
        <ArrowIcon />
      </div>
    </div>
  );
}

// ── Main Skills component ────────────────────────────────────────────────────
export default function Skills() {
  const [secRef, secInView] = useInView(0.05);
  const [activeTab, setActiveTab] = useState("All Skills");

  const filtered = activeTab === "All Skills"
    ? SKILLS
    : SKILLS.filter(s => s.cat === activeTab);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        .skills-section {
          --navy:     #080c18;
          --navy2:    #0d1220;
          --navy3:    #121828;
          --purple:   #7c3aed;
          --purple2:  #a78bfa;
          --cyan:     #06b6d4;
          --cyan2:    #67e8f9;
          --border:   rgba(124,58,237,0.15);
          --fg:       #f1f5f9;
          --fg2:      #94a3b8;
          --fg3:      #475569;
          --font:     'DM Sans', sans-serif;
          --font-h:   'Clash Display', sans-serif;
          position: relative;
          background: var(--navy);
          padding: 40px;
          overflow: hidden;
          font-family: var(--font);
        }

        /* Background blobs */
        .sk-bg-blob {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(120px); z-index: 0;
        }
        .sk-bg-blob-1 {
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
          top: -150px; left: -80px;
        }
        .sk-bg-blob-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }
        /* Dot grid */
        .sk-dot-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(rgba(148,163,184,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%);
        }

        /* Header */
        .sk-header {
  position: relative;
  z-index: 1;
  margin: 0 auto 50px;
  max-width: 900px;
  text-align: center;
}
        .sk-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 14px;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.28);
          border-radius: 99px;
          font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--purple2);
          margin-bottom: 20px;
        }
        .sk-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--purple2);
          animation: skPulse 2s ease-in-out infinite;
        }
        @keyframes skPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(1.5); }
        }
        .sk-title {
          font-family: var(--font-h);
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800; color: var(--fg);
          letter-spacing: -0.03em; line-height: 1.08;
          margin-bottom: 12px;
        }
        .sk-title .g {
          background: linear-gradient(130deg, var(--purple2) 0%, var(--cyan2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      .sk-subtitle {
  font-size: 14.5px;
  color: var(--fg2);
  line-height: 1.65;
  max-width: 600px;
  margin: 0 auto;
}
       .sk-tabs-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}
        .sk-tab {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          font-family: var(--font);
          font-size: 12.5px; font-weight: 500;
          color: var(--fg2);
          cursor: pointer;
          transition: all 0.22s;
          white-space: nowrap;
        }
        .sk-tab:hover {
          background: rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.35);
          color: var(--purple2);
          transform: translateY(-1px);
        }
        .sk-tab.active {
          background: linear-gradient(135deg, #6d28d9, var(--purple));
          border-color: transparent;
          color: #fff;
          box-shadow: 0 4px 16px rgba(109,40,217,0.35);
        }

        /* Count line */
        .sk-count {
  position: relative;
  z-index: 1;
  font-size: 12px;
  color: var(--fg3);
  margin-bottom: 20px;
  text-align: center;
}
        .sk-count span { color: var(--purple2); font-weight: 600; }

        /* Grid */
        .sk-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 10px;
          padding:0px 40px;
        }

        /* Card */
        .sk-card {
          position: relative;
          display: flex; align-items: center; gap: 12px;
          padding: 15px 14px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          cursor: default;
          overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .sk-card.hov {
          border-color: rgba(124,58,237,0.4);
          background: rgba(124,58,237,0.055);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(124,58,237,0.15);
        }
        /* Left accent bar */
        .sk-card-accent {
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 2.5px; border-radius: 0 2px 2px 0;
        }
        /* Shine */
        .sk-card-shine {
          position: absolute; top: 0; left: -100%;
          width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent);
          transition: left 0.55s ease;
          pointer-events: none;
        }
        .sk-card.hov .sk-card-shine { left: 160%; }

        /* Icon */
        .sk-icon {
          width: 40px; height: 40px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative; z-index: 1;
        }

        /* Info */
        .sk-info { flex: 1; min-width: 0; position: relative; z-index: 1; }
        .sk-name {
          font-size: 13.5px; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 2px;
        }
        .sk-sub { font-size: 11px; color: var(--fg3); font-weight: 500; }

        /* Arrow */
        .sk-arr { flex-shrink: 0; position: relative; z-index: 1; }

        @media (max-width: 768px) {
          .skills-section { padding: 52px 20px 60px; }
          .sk-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .sk-grid { grid-template-columns: 1fr; 
    padding: 0px 30px;}
        }
      `}</style>

      <section className="skills-section" id="skills" ref={secRef}>
        {/* Backgrounds */}
        <div className="sk-dot-grid" />
        <div className="sk-bg-blob sk-bg-blob-1" />
        <div className="sk-bg-blob sk-bg-blob-2" />

        {/* Header */}
        <div
          className="sk-header"
          style={{
            opacity: secInView ? 1 : 0,
            transform: secInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="sk-badge">
            <span className="sk-badge-dot" />
            My Expertise
          </div>
          <h2 className="sk-title">
            Technical <span className="g">Skills</span>
          </h2>
          <p className="sk-subtitle">
            Filter by category to explore my stack — built for performance, crafted with precision.
          </p>
        </div>

        {/* Tabs */}
        <div className="sk-tabs-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`sk-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {TAB_ICONS[tab]}
              {tab}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="sk-count">
          Showing <span>{filtered.length}</span> skill{filtered.length !== 1 ? "s" : ""}
          {activeTab !== "All Skills" ? ` in ${activeTab}` : ""}
        </div>

        {/* Grid */}
        <div className="sk-grid">
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={i}
              inView={secInView}
            />
          ))}
        </div>
      </section>
    </>
  );
}