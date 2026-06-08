import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// ── EmailJS Credentials ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_i6eeetp";
const EMAILJS_TEMPLATE_ID = "template_ik49pin";
const EMAILJS_PUBLIC_KEY  = "OCrpaq4y2SHPn_KxI";
// ──────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

const CONTACT_INFO = [
  {
    label: "Phone",
    value: "+91 93607 12225",
    href: "tel:+919360712225",
    color: "#6366f1",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    value: "mohulnath005@gmail.com",
    href: "mailto:mohulnath005@gmail.com",
    color: "#a855f7",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Chennai, Tamil Nadu",
    href: "https://maps.google.com/?q=Chennai,Tamil+Nadu",
    color: "#06b6d4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/mohulnath",
    color: "#f0f6fc",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mohulnath",
    color: "#0a66c2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:mohulnath005@gmail.com",
    color: "#ea4335",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const [secRef,  secInView]  = useInView(0.1);
  const [formRef, formInView] = useInView(0.15);

  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY   // ← v4: public key goes here as 4th arg
      );

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      <style>{`
        .contact-section {
          --accent:    #6366f1;
          --accent2:   #a855f7;
          --fg:        #f8fafc;
          --fg2:       #94a3b8;
          --bg:        #030712;
          --bg2:       #0a0a14;
          --border:    rgba(255,255,255,0.07);
          --font-head: 'Clash Display', sans-serif;
          --font-body: 'Inter', sans-serif;
          position: relative;
          background: var(--bg);
          padding: 40px;
          overflow: hidden;
          font-family: var(--font-body);
        }
        .ct-blob {
          position:absolute; border-radius:50%;
          filter:blur(110px); pointer-events:none; z-index:0;
        }
        .ct-blob-1 { width:500px; height:500px; background:rgba(99,102,241,0.08); top:-80px; left:-100px; }
        .ct-blob-2 { width:400px; height:400px; background:rgba(168,85,247,0.06); bottom:0; right:-80px; }
        .ct-label { text-align:center; margin-bottom:16px; position:relative; z-index:1; }
        .ct-label span {
          font-size:11px; font-weight:500; letter-spacing:0.18em; text-transform:uppercase;
          color:var(--accent); border:1px solid rgba(99,102,241,0.3);
          padding:5px 16px; border-radius:99px;
        }
        .ct-heading {
          font-family:var(--font-head); font-size:clamp(36px,5vw,60px); font-weight:700;
          color:var(--fg); text-align:center; letter-spacing:-0.03em;
          margin-bottom:12px; line-height:1.1; position:relative; z-index:1;
        }
        .ct-heading .hl {
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .ct-subhead {
          text-align:center; font-size:14px; color:var(--fg2);
          margin-bottom:50px; position:relative; z-index:1;
        }
        .ct-grid {
          position:relative; z-index:1; max-width:1000px;
          margin:0 auto; padding:0 40px;
          display:grid; grid-template-columns:1fr 1.4fr; gap:48px; align-items:start;
        }
        .ct-info {
          opacity:0; transform:translateX(-30px);
          transition:opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .ct-info.in { opacity:1; transform:translateX(0); }
        .ct-info-title {
          font-family:var(--font-head); font-size:22px; font-weight:600;
          color:var(--fg); margin-bottom:8px;
        }
        .ct-info-desc {
          font-size:13px; color:var(--fg2); line-height:1.7; margin-bottom:32px;
        }
        .ct-cards { display:flex; flex-direction:column; gap:14px; margin-bottom:36px; }
        .ct-card {
          display:flex; align-items:center; gap:14px;
          padding:14px 18px;
          background:rgba(255,255,255,0.02);
          border:1px solid var(--border); border-radius:12px;
          text-decoration:none; transition:all 0.2s;
        }
        .ct-card:hover {
          border-color:rgba(99,102,241,0.35);
          background:rgba(99,102,241,0.05);
          transform:translateX(4px);
        }
        .ct-card-icon {
          width:40px; height:40px; border-radius:10px;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .ct-card-label { font-size:10px; color:var(--fg2); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2px; }
        .ct-card-value { font-size:13px; color:var(--fg); font-weight:500; }
        .ct-social-title {
          font-size:11px; color:var(--fg2); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;
        }
        .ct-socials { display:flex; gap:12px; }
        .ct-social {
          width:44px; height:44px; border-radius:50%;
          border:1px solid var(--border);
          display:flex; align-items:center; justify-content:center;
          text-decoration:none; transition:all 0.2s;
          color:var(--fg2);
        }
        .ct-social:hover {
          border-color:rgba(99,102,241,0.5);
          transform:translateY(-3px);
        }
        .ct-form {
          background:rgba(255,255,255,0.02);
          border:1px solid var(--border); border-radius:20px;
          padding:32px;
          opacity:0; transform:translateX(30px);
          transition:opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .ct-form.in { opacity:1; transform:translateX(0); }
        .ct-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .ct-field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
        .ct-field label {
          font-size:11px; font-weight:500; letter-spacing:0.08em;
          text-transform:uppercase; color:var(--fg2);
        }
        .ct-input, .ct-textarea {
          font-family:var(--font-body); font-size:13px; color:var(--fg);
          background:rgba(255,255,255,0.03);
          border:1px solid var(--border); border-radius:10px;
          padding:12px 16px; outline:none;
          transition:border-color 0.2s, background 0.2s;
          width:100%;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(148,163,184,0.4); }
        .ct-input:focus, .ct-textarea:focus {
          border-color:rgba(99,102,241,0.5);
          background:rgba(99,102,241,0.05);
        }
        .ct-input.err, .ct-textarea.err { border-color:rgba(239,68,68,0.5); }
        .ct-textarea { resize:vertical; min-height:120px; }
        .ct-error { font-size:11px; color:#ef4444; margin-top:-10px; margin-bottom:6px; }
        .ct-submit {
          width:100%; font-family:var(--font-body); font-size:14px; font-weight:500;
          padding:14px; border-radius:99px; border:none;
          background:linear-gradient(135deg, var(--accent), var(--accent2));
          color:#fff; cursor:pointer; margin-top:4px;
          transition:transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .ct-submit:hover:not(:disabled) {
          transform:translateY(-2px);
          box-shadow:0 8px 32px rgba(99,102,241,0.5);
        }
        .ct-submit:disabled { opacity:0.7; cursor:not-allowed; }
        .ct-spinner {
          width:16px; height:16px;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:#fff; border-radius:50%;
          animation:ctSpin 0.7s linear infinite;
        }
        @keyframes ctSpin { to { transform:rotate(360deg); } }
        .ct-status {
          margin-top:14px; padding:12px 16px; border-radius:10px;
          font-size:13px; text-align:center;
          animation:ctFade 0.4s ease;
        }
        @keyframes ctFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .ct-status.success {
          background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e;
        }
        .ct-status.error {
          background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); color:#ef4444;
        }
        .ct-footer {
          position:relative; z-index:1; text-align:center;
          margin-top:40px; padding:28px 40px 0;
          border-top:1px solid var(--border);
        }
        .ct-footer-text { font-size:13px; color:var(--fg2); }
        .ct-footer-text span {
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          font-weight:600;
        }
        @media (max-width:768px) {
          .ct-grid { grid-template-columns:1fr; gap:36px; padding:0px; }
          .ct-form-row { grid-template-columns:1fr; }
          .ct-footer { padding:28px 20px 0; }
        }
      `}</style>

      <section className="contact-section" id="contact" ref={secRef}>
        <div className="ct-blob ct-blob-1" />
        <div className="ct-blob ct-blob-2" />

        <div className="ct-label"><span>Get In Touch</span></div>

        <h2 className="ct-heading"
          style={{
            opacity: secInView ? 1 : 0,
            transform: secInView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          Contact <span className="hl">Me</span>
        </h2>
        <p className="ct-subhead"
          style={{
            opacity: secInView ? 1 : 0,
            transition: "opacity 0.7s ease 0.15s",
          }}
        >
          Have a project in mind? Let's build something amazing together!
        </p>

        <div className="ct-grid" ref={formRef}>

          {/* ── Left: Info ── */}
          <div className={`ct-info ${formInView ? "in" : ""}`}>
            <div className="ct-info-title">Let's Talk</div>
            <p className="ct-info-desc">
              I'm currently available for full-time roles & freelance projects.
              Feel free to reach out — I'll get back to you within 24 hours!
            </p>

            <div className="ct-cards">
              {CONTACT_INFO.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noreferrer" className="ct-card"
                  style={{
                    opacity: formInView ? 1 : 0,
                    transform: formInView ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                  }}
                >
                  <div className="ct-card-icon" style={{ background: `${c.color}18`, color: c.color }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="ct-card-label">{c.label}</div>
                    <div className="ct-card-value">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="ct-social-title">Find me on</div>
            <div className="ct-socials">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="ct-social"
                  style={{ color: s.color }}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className={`ct-form ${formInView ? "in" : ""}`}>
            <div className="ct-form-row">
              <div className="ct-field">
                <label>Your Name</label>
                <input
                  className={`ct-input ${errors.name ? "err" : ""}`}
                  name="name" placeholder="Enter your name"
                  value={form.name} onChange={handleChange}
                />
                {errors.name && <span className="ct-error">{errors.name}</span>}
              </div>
              <div className="ct-field">
                <label>Your Email</label>
                <input
                  className={`ct-input ${errors.email ? "err" : ""}`}
                  name="email" placeholder="you@example.com" type="email"
                  value={form.email} onChange={handleChange}
                />
                {errors.email && <span className="ct-error">{errors.email}</span>}
              </div>
            </div>

            <div className="ct-field">
              <label>Subject</label>
              <input
                className={`ct-input ${errors.subject ? "err" : ""}`}
                name="subject" placeholder="Project Inquiry / Job Opportunity"
                value={form.subject} onChange={handleChange}
              />
              {errors.subject && <span className="ct-error">{errors.subject}</span>}
            </div>

            <div className="ct-field">
              <label>Message</label>
              <textarea
                className={`ct-textarea ${errors.message ? "err" : ""}`}
                name="message" placeholder="Tell me about your project or opportunity..."
                value={form.message} onChange={handleChange}
              />
              {errors.message && <span className="ct-error">{errors.message}</span>}
            </div>

            <button
              className="ct-submit"
              onClick={handleSubmit}
              disabled={status === "sending"}
            >
              {status === "sending"
                ? <><div className="ct-spinner" /> Sending...</>
                : "Send Message"
              }
            </button>

            {status === "success" && (
              <div className="ct-status success">
                ✅ Message sent! I'll get back to you within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="ct-status error">
                ❌ Something went wrong. Please try again or email at mohulnath005@gmail.com
              </div>
            )}
          </div>
        </div>

        <div className="ct-footer">
          <p className="ct-footer-text">
            Designed & Built with love by <span>Mohulnath R</span> · {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </>
  );
}