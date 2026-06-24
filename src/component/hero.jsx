import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import profile from "../assets/images/profile.jpg";

export const Hero = () => {
  const roles = ["Fullstack Developer", "UI/UX Designer", "Sortware Engineer"];
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
          if (index === current.length) setDeleting(true);
        } else {
          setText(current.substring(0, index - 1));
          setIndex(index - 1);
          if (index === 0) {
            setDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      deleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [index, deleting, roleIndex]);

  // 3D Tilt Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for work
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            NGUYEN DUY <br /> MANH
          </h1>

          <h2 className="text-2xl md:text-3xl text-secondary font-medium h-10 mb-6">
            {text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[3px] h-[1.2em] bg-primary align-middle ml-1"
            />
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Crafting premium, modern web experiences with a focus on UI/UX,
            performance, and clean code architecture.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Mail size={20} />
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right: 3D Tilt Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative perspective-1000 flex justify-center lg:justify-end z-10"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/10 p-2 shadow-2xl backdrop-blur-sm cursor-none"
          >
            {/* Card Inner */}
            <div
              style={{ transform: "translateZ(50px)" }}
              className="relative w-full h-full rounded-[1.75rem] overflow-hidden"
            >
              <img
                src={profile}
                alt="Nguyen Duy Manh"
                className="w-full h-full object-cover object-center scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

              <motion.div
                style={{ transform: "translateZ(80px)" }}
                className="absolute bottom-0 left-0 w-full p-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-white/80 font-medium">Online</span>
                </div>
                <p className="text-white font-bold text-2xl">@StephM205</p>
              </motion.div>
            </div>

            {/* Glow Behind */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
