import React from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Mail, Phone, Code2, Briefcase, Award } from "lucide-react";
import { cn } from "../utils/cn";

export const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          >
            Introduction
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Overview.
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Main About Card (Spans 2 cols) */}
          <motion.div 
            variants={item}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-bold mb-4 text-white">My Journey</h3>
            <p className="text-white/70 leading-relaxed text-lg">
              I design and build modern web experiences that are both visually
              appealing and highly functional. As a Frontend Developer and UI/UX
              Designer, I focus on creating responsive interfaces, clean user
              flows, and smooth interactions that deliver real value to users.
              Constantly learning and adapting to new technologies to build better products.
            </p>
          </motion.div>

          {/* Location & Contact Info */}
          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="flex-1 group relative rounded-3xl bg-white/5 border border-white/10 p-6 flex items-start gap-4 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Location</p>
                <p className="font-medium text-white/90">Da Nang, VN</p>
              </div>
            </div>
            <div className="flex-1 group relative rounded-3xl bg-white/5 border border-white/10 p-6 flex items-start gap-4 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-full bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-1">Education</p>
                <p className="font-medium text-white/90">FPT Polytechnic</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={item} className="group relative rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-8 flex flex-col items-center justify-center text-center hover:shadow-[0_0_30px_rgba(14,77,164,0.3)] transition-all duration-500">
            <Briefcase className="text-primary mb-4" size={32} />
            <h4 className="text-4xl font-bold text-white mb-2">3+</h4>
            <p className="text-white/70 font-medium">Years Experience</p>
          </motion.div>

          <motion.div variants={item} className="group relative rounded-3xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 p-8 flex flex-col items-center justify-center text-center hover:shadow-[0_0_30px_rgba(212,236,255,0.2)] transition-all duration-500">
            <Code2 className="text-secondary mb-4" size={32} />
            <h4 className="text-4xl font-bold text-white mb-2">10+</h4>
            <p className="text-white/70 font-medium">Projects Built</p>
          </motion.div>

          <motion.div variants={item} className="group relative rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 p-8 flex flex-col items-center justify-center text-center hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500">
            <Award className="text-purple-400 mb-4" size={32} />
            <h4 className="text-4xl font-bold text-white mb-2">5+</h4>
            <p className="text-white/70 font-medium">Certificates</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
