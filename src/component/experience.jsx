import React from "react";
import "../assets/css/experience.css";
import ODF from "../assets/images/ODF.png";

export const Experience = () => {
  const experiences = [
    {
      role: "Intern Frontend Developer",
      company: "Da Nang Technology Agency",
      date: "May 2025 - July 2025",
      logo: "{ODF}",
      duties: [
        "Design and develop website interfaces for business clients using WordPress.",
        "Customize themes and plugins and create landing pages according to the project's requirements.",
        "Support editing CSS and JavaScript to optimize the interface and user experience.",
        "Update SEO content, optimize page loading speed, and check responsive display.",
        "Coordinate with the backend to complete the website.",
      ],
    },
  ];

  return (
    <section className="experience-section reveal-on-scroll">
      <div className="experience-container">
        <p className="experience-sub">WHAT I HAVE DONE SO FAR</p>
        <h2 className="experience-heading">Work Experience.</h2>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`experience-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              {/* Card */}
              <div className="experience-card">
                <h3 className="experience-role">{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <p className="experience-date">{exp.date}</p>

                <ul className="experience-duties">
                  {exp.duties.map((duty, i) => (
                    <li key={i}>{duty}</li>
                  ))}
                </ul>
              </div>

              {/* Center Badge */}
              <div className="experience-center">
                <div className="experience-badge">
                  <img src={ODF} alt={`${exp.company} Logo`} />
                </div>
              </div>

              {/* Date */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
