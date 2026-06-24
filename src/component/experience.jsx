import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../utils/cn";
import ODF from "../assets/images/ODF.png";

export const Experience = () => {
  const experiences = [
    {
      role: "Intern Frontend Developer",
      company: "Da Nang Technology Agency",
      date: "May 2025 - July 2025",
      logo: ODF,
      duties: [
        "Design and develop website interfaces for business clients using WordPress.",
        "Customize themes and plugins and create landing pages according to the project's requirements.",
        "Support editing CSS and JavaScript to optimize the interface and user experience.",
        "Update SEO content, optimize page loading speed, and check responsive display.",
        "Coordinate with the backend to complete the website.",
      ],
    },
    // Add more experiences here to test timeline
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-20 relative z-10" ref={ref}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          >
            What I have done so far
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Work Experience.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Animated Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute top-0 w-full h-full bg-primary"
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceItem = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col md:flex-row items-center gap-8 w-full",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Date (Mobile vs Desktop) */}
      <div className={cn("w-full md:w-1/2 flex", isEven ? "md:justify-start" : "md:justify-end")}>
        <div className="md:hidden text-primary font-medium mb-2">{exp.date}</div>
      </div>

      {/* Center Icon */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-dark border-2 border-primary shadow-[0_0_15px_rgba(14,77,164,0.5)] z-10">
        <img 
          src={exp.logo} 
          alt={exp.company} 
          className="w-8 h-8 object-contain rounded-full bg-white p-1" 
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Content Card */}
      <div className={cn(
        "w-full md:w-1/2 pl-12 md:pl-0 flex flex-col",
        isEven ? "md:items-end md:pr-12 md:text-right" : "md:items-start md:pl-12"
      )}>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors w-full group relative overflow-hidden"
        >
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <h3 className="text-2xl font-bold text-white mb-1 relative z-10">{exp.role}</h3>
          <p className="text-white/60 font-medium mb-4 relative z-10">{exp.company}</p>
          <div className="hidden md:block text-primary font-medium text-sm mb-4 relative z-10">{exp.date}</div>

          <ul className={cn("space-y-3 relative z-10", isEven ? "md:text-right" : "")}>
            {exp.duties.map((duty, i) => (
              <li key={i} className="text-white/70 text-sm leading-relaxed flex items-start gap-2">
                <span className="text-primary mt-1 shrink-0">•</span>
                <span className="flex-1 text-left">{duty}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};
