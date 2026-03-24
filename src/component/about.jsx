import React from "react";
import "../assets/css/about.css";

export const About = () => {
  const infoCards = [
    {
      icon: "📍",
      title: "Location",
      desc: "Da Nang, Vietnam",
    },
    {
      icon: "🎓",
      title: "Studying At",
      desc: "FPT Polytechnic College",
    },
    {
      icon: "✉️",
      title: "Email",
      desc: "nduymanh11@gmail.com",
    },
    {
      icon: "📱",
      title: "Phone",
      desc: "+84 372 326 419",
    },
  ];

  return (
    <section className="about-section reveal-on-scroll" id="about">
      <div className="about-content">
        <div className="about-left">
          <p className="about-sub">Introduction</p>
          <h2 className="about-heading">Overview</h2>
          <p className="about-paragraph">
            I design and build modern web experiences that are both visually
            appealing and highly functional. As a Frontend Developer and UI/UX
            Designer, I focus on creating responsive interfaces, clean user
            flows, and smooth interactions that deliver real value to users.
          </p>
        </div>

        <div className="about-right">
          {infoCards.map((card, index) => (
            <div key={index} className="about-card">
              <span className="about-card-icon">{card.icon}</span>
              <div className="about-card-content">
                <p className="about-card-title">{card.title}</p>
                <p className="about-card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
