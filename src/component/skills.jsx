import React from "react";
import "../assets/css/skills.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import { SiJavascript, SiTypescript, SiFigma, SiMysql } from "react-icons/si";

export const Skills = () => {
  const skills = [
    {
      name: "HTML",
      detail: "Standard Markup Language",
      icon: <FaHtml5 className="text-orange-500 text-2xl" />,
    },
    {
      name: "CSS",
      detail: "Style Sheet Language",
      icon: <FaCss3Alt className="text-blue-500 text-2xl" />,
    },
    {
      name: "JavaScript",
      detail: "Web Scripting Language",
      icon: <SiJavascript className="text-yellow-400 text-2xl" />,
    },
    {
      name: "TypeScript",
      detail: "Typed JavaScript",
      icon: <SiTypescript className="text-sky-500 text-2xl" />,
    },
    {
      name: "React",
      detail: "UI Library",
      icon: <FaReact className="text-cyan-400 text-2xl" />,
    },
    {
      name: "Figma",
      detail: "Design Tool",
      icon: <SiFigma className="text-pink-500 text-2xl" />,
    },
    {
      name: "MySQL",
      detail: "Database Management",
      icon: <SiMysql className="text-blue-500 text-2xl" />,
    },
    {
      name: "Node.js",
      detail: "JS Runtime",
      icon: <FaNodeJs className="text-green-500 text-2xl" />,
    },
    {
      name: "GitHub",
      detail: "Version Control",
      icon: <FaGithub className="text-gray-200 text-2xl" />,
    },
  ];

  return (
    <section className="skills-section reveal-on-scroll">
      <div className="skills-head">
        <p className="skills-sub">Tools & Stack</p>
        <h2 className="skills-title">What I Use</h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <div>
              <p className="skill-name">{skill.name}</p>
              <p className="skill-info">{skill.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
