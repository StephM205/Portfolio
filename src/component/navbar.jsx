import React, { useState } from "react";
import "../assets/css/navbar.css";

export const Navbar = () => {
  const [active, setActive] = useState("Home");

  const menu = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="nav-wrapper">
      {/* Glow */}
      <div className="nav-glow"></div>

      {/* Navbar */}
      <nav className="nav-container">
        {menu.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.label)}
            className={`nav-item ${active === item.label ? "active" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
