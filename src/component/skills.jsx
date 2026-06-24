import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import { SiJavascript, SiTypescript, SiFigma, SiMysql, SiTailwindcss, SiBootstrap } from "react-icons/si";

export const Skills = () => {
  const innerOrbit = [
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-sky-400" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  ];

  const outerOrbit = [
    { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "Figma", icon: <SiFigma className="text-pink-500" /> },
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
  ];

  return (
    <section id="skills" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          >
            Tools & Stack
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Skill Orbit.
          </motion.h2>
        </div>

        <div className="relative w-full max-w-[600px] aspect-square mx-auto flex items-center justify-center">
          
          {/* Core */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute z-30 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_40px_rgba(14,77,164,0.4)]"
          >
            <span className="text-white font-bold text-xl">Core</span>
          </motion.div>

          {/* Inner Orbit */}
          <div className="absolute inset-[25%] rounded-full border border-white/5 border-dashed" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[25%] z-20"
          >
            {innerOrbit.map((skill, i) => {
              const angle = (i * 360) / innerOrbit.length;
              return (
                <div
                  key={skill.name}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <OrbitIcon skill={skill} reverseDuration={20} />
                </div>
              );
            })}
          </motion.div>

          {/* Outer Orbit */}
          <div className="absolute inset-0 rounded-full border border-white/5 border-dashed" />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 z-10"
          >
            {outerOrbit.map((skill, i) => {
              const angle = (i * 360) / outerOrbit.length;
              return (
                <div
                  key={skill.name}
                  className="absolute w-full h-full"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <OrbitIcon skill={skill} reverseDuration={35} reverseDirection={true} />
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const OrbitIcon = ({ skill, reverseDuration, reverseDirection = false }) => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <motion.div
        animate={{ rotate: reverseDirection ? 360 : -360 }}
        transition={{ duration: reverseDuration, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <motion.div 
          whileHover={{ scale: 1.3 }}
          className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg cursor-pointer hover:bg-white/10 transition-colors"
        >
          {skill.icon}
        </motion.div>
        
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark/90 border border-white/10 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap">
          {skill.name}
        </div>
      </motion.div>
    </div>
  );
};
