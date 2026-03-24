import React, { useState, useEffect, useRef } from "react";
import "../assets/css/project.css";
import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.png";

const projectData = [
  {
    id: 1,
    title: "NoteurGoals",
    description:
      "Goal management app with reusable components, state management, and realtime goal tracking.",
    tech: ["React.js", "Bootstrap", "Axios", "REST API"],
    image: project1,
    link: "#",
  },
  {
    id: 2,
    title: "Quizzes",
    description:
      "Online quiz app with topic selection, question workflow, and result computation using JSON Server.",
    tech: ["HTML", "CSS", "JavaScript", "JSON Server"],
    image: project2,
    link: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Responsive personal portfolio that showcases projects, skills, and engagement with smooth transitions.",
    tech: ["React", "Tailwind", "Vite", "CSS Animations"],
    image: project3,
    link: "#",
  },
];

export const ArcSlider = () => {
  const [active, setActive] = useState(2);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-play logic
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % projectData.length);
      }, 5000);
    };

    startAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Reset auto-play on interaction
  const resetAutoPlay = () => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % projectData.length);
    }, 5000);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projectData.length);
    resetAutoPlay();
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projectData.length) % projectData.length);
    resetAutoPlay();
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div className="reveal-on-scroll">
      <div className="project-head">
        <h2 className="project-sub">FEATURED WORKS</h2>
        <h1 className="project-title">My Projects</h1>
      </div>
      <section
        className="arc-slider"
        aria-label="Project arc carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={containerRef}
      >
        <button
          onClick={handlePrev}
          className="nav left"
          aria-label="Previous project"
        >
          <span>&lt;</span>
        </button>

        <div className="arc-container">
          {projectData.map((item, index) => {
            // Normalize indices around the active item
            let rawOffset = index - active;
            if (rawOffset < -Math.floor(projectData.length / 2))
              rawOffset += projectData.length;
            if (rawOffset > Math.floor(projectData.length / 2))
              rawOffset -= projectData.length;

            const step = (Math.PI * 2) / projectData.length;
            const circlePosition = rawOffset * step;

            const radius = 500;
            const x = Math.sin(circlePosition) * radius;
            const z = Math.cos(circlePosition) * radius - radius * 0.5;
            const y = Math.sin(circlePosition * 0.85) * 16;

            const absOffset = Math.abs(rawOffset);
            const opacity = Math.max(0.25, 1 - absOffset * 0.18);
            const scale = index === active ? 1.22 : 0.88;
            const rotateY = circlePosition * (180 / Math.PI) * 0.4;

            return (
              <article
                key={item.id}
                className={`arc-card${index === active ? " active" : ""}`}
                style={{
                  transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: 100 - Math.round(absOffset),
                  opacity,
                }}
                onClick={() => {
                  setActive(index);
                  resetAutoPlay();
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActive(index);
                    resetAutoPlay();
                  }
                }}
              >
                <div className="card-inner">
                  <div
                    className="img"
                    // style={{ backgroundImage: `url(${item.image})` }}
                    aria-hidden="true"
                  >
                    <img src={item.image} alt={`${item.title} screenshot`} />
                  </div>

                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p className="tech">Tech: {item.tech?.join(" • ")}</p>
                    <a href={item.link} className="project-link">
                      View details
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="nav right"
          aria-label="Next project"
        >
          <span>&gt;</span>
        </button>
      </section>
    </div>
  );
};
