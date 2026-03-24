import React, { useRef } from "react";
import "../assets/css/hero.css";
import profile from "../assets/images/profile.jpg";
export const HeroCard = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 25;
    const rotateY = (x - rect.width / 2) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    cardRef.current.style.transform = "rotateX(0) rotateY(0)";
  };

  return (
    <div className="hero-card-wrapper">
      <div className="hero-card-glow"></div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className="hero-card tilt-card"
      >
        <div className="hero-card-inner">
          <img src={profile} alt="profile" className="hero-img" />

          <div className="hero-overlay"></div>

          <div className="hero-card-info">
            <p className="hero-username">@StephM205</p>
            <p className="hero-status">Online</p>

            <button className="hero-btn">Contact Me</button>
          </div>
        </div>
      </div>
    </div>
  );
};
