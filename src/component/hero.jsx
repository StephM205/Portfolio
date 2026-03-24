import React, { useState, useEffect } from "react";
import "../assets/css/hero.css";
import { HeroCard } from "./heroCard";

export const Hero = () => {
  const roles = ["Frontend Developer", "UI/UX Designer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.substring(0, index + 1));
          setIndex(index + 1);

          if (index === current.length) {
            setDeleting(true);
          }
        } else {
          setText(current.substring(0, index - 1));
          setIndex(index - 1);

          if (index === 0) {
            setDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      deleting ? 50 : 100
    ); // tốc độ gõ/xóa

    return () => clearTimeout(timeout);
  }, [index, deleting, roleIndex]);

  return (
    <section className="hero-container reveal-on-scroll" id="home">
      {/* LEFT */}
      <div className="hero-left">
        <p className="hero-sub">Hello, I'm</p>

        <h1 className="hero-title">
          <span>NGUYEN DUY</span>
          <span>MANH</span>
        </h1>

        <h2 className="hero-role">
          {text}
          <span className="cursor">|</span>
        </h2>

        <p className="hero-desc">
          Frontend Developer & UI/UX Designer crafting modern web experiences.
        </p>
      </div>

      <HeroCard />
    </section>
  );
};
