import { useEffect, useState } from "react";

import Preloader         from "./Pages/Preloader";
import CustomCursor      from "./Pages/CustomCursor";
import ScrollProgressBar from "./Pages/ScrollProgressBar";

import Navbar      from "./Pages/Navbar";
import Hero        from "./Pages/Hero";
import About       from "./Pages/About";
import Skills      from "./Pages/Skills";
import Projects    from "./Pages/Projects";
import Experience  from "./Pages/Experience";
import Contact     from "./Pages/Contact";



function App() {
  const [loaded, setLoaded] = useState(true);

  // useEffect(() => {

  //   window.scrollTo(0, 0);
  
  //   document.body.style.overflow = "hidden";
  
  //   setTimeout(() => {
  
  //     document.body.style.overflow = "auto";
  
  //     window.scrollTo(0, 0);
  
  //   }, 1800);
  
  // }, []);

  return (
    <>
      {/* ── Global smooth scroll ── */}
      <style>{`
        html { scroll-behavior: smooth; }

        /* ── Blur + fade reveal after preloader ── */
        .page-body {
          opacity: 0;
          filter: blur(12px);
          transform: scale(1.01);
          transition:
            opacity   0.9s ease,
            filter    0.9s ease,
            transform 0.9s ease;
        }
        .page-body.loaded {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
        }

        /* ── Smooth section transitions ── */
        section {
          transition: background 0.5s ease;
        }

        /* ── Selection color ── */
        ::selection {
          background: rgba(99,102,241,0.3);
          color: #f8fafc;
        }
      `}</style>

      {/* Preloader — shown until portfolio loads */}
      {/* <Preloader onDone={() => setLoaded(true)} /> */}

      {/* Custom cursor */}
      {/* <CustomCursor /> */}

      {/* Scroll progress bar + back-to-top */}
      {/* {loaded && <ScrollProgressBar />} */}

      {/* Main portfolio */}
      <Navbar />
      <div className={`page-body ${loaded ? "loaded" : ""}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  );
}

export default App;