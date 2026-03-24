import { useEffect } from "react";
import "./App.css";
import { Navbar } from "./component/navbar";
import { Hero } from "./component/hero";
import { About } from "./component/about";
import { Experience } from "./component/experience";
import { Skills } from "./component/skills";
import { ArcSlider } from "./component/project";
import { Contact } from "./component/contact";
function App() {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!revealElements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-[#0a0a0f]">
        {/* Wave SVG */}
        <svg
          className="fixed absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#gradient)"
            d="M0,400 C300,600 900,200 1440,400 L1440,0 L0,0 Z"
            className="blur-[100px] opacity-70"
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#7b2cff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 text-white p-10">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Skills />
          <ArcSlider />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
