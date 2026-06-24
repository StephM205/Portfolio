import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../utils/cn";

export const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menu = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Highlight active section based on scroll
      const sections = menu.map(m => m.label.toLowerCase());
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(section.charAt(0).toUpperCase() + section.slice(1));
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-6 max-w-5xl flex justify-center">
          <nav
            className={cn(
              "flex items-center gap-8 px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-md border",
              isScrolled
                ? "bg-dark/60 border-white/10 shadow-lg shadow-black/20"
                : "bg-transparent border-transparent"
            )}
          >
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {menu.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActive(item.label)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    active === item.label ? "text-primary font-semibold" : "text-white/70 hover:text-white"
                  )}>
                    {item.label}
                  </span>
                  
                  {active === item.label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {menu.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setActive(item.label);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-3xl font-bold border-b border-white/10 pb-4",
                  active === item.label ? "text-primary" : "text-white/60"
                )}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
