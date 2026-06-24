import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

export const Contact = () => {
  const formspreeEndpoint = "https://formspree.io/f/xreyndrl";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formspreeEndpoint) throw new Error("Missing VITE_FORMSPREE_ENDPOINT");

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio contact from ${formData.name}`,
        }),
      });

      if (!response.ok) throw new Error("Formspree request failed");

      setFeedback("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFeedback(""), 3000);
    } catch (error) {
      setFeedback(`Failed to send message.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative z-10 min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm mb-2"
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Contact Me.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Let's talk about your project</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                I'm currently available to take on new projects, so feel free to send me a message about anything that you want to run past me.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <ContactInfoItem icon={<Mail />} title="Email" detail="nduymanh11@gmail.com" />
              <ContactInfoItem icon={<Phone />} title="Phone" detail="+84 372 326 419" />
              <ContactInfoItem icon={<MapPin />} title="Location" detail="Da Nang, Vietnam" />
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex flex-col gap-6 relative group overflow-hidden">
              {/* Form Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Name Input */}
              <div className="relative z-10">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-5 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                />
                <label 
                  htmlFor="name"
                  className="absolute text-white/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-dark/80 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4 rounded-full"
                >
                  Your Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative z-10">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full px-5 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors"
                  placeholder=" "
                />
                <label 
                  htmlFor="email"
                  className="absolute text-white/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-dark/80 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4 rounded-full"
                >
                  Your Email
                </label>
              </div>

              {/* Message Input */}
              <div className="relative z-10">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="block w-full px-5 py-4 bg-transparent border-2 border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-colors resize-none custom-scrollbar"
                  placeholder=" "
                />
                <label 
                  htmlFor="message"
                  className="absolute text-white/50 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-dark/80 px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-6 peer-placeholder-shown:top-10 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4 rounded-full"
                >
                  Your Message
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative z-10 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(14,77,164,0.4)] disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                {loading ? "Sending..." : "Send Message"}
              </button>

              {feedback && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "text-center text-sm font-medium z-10",
                    feedback.includes("success") ? "text-green-400" : "text-red-400"
                  )}
                >
                  {feedback}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const ContactInfoItem = ({ icon, title, detail }) => (
  <div className="flex items-center gap-4 group">
    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
      {icon}
    </div>
    <div>
      <p className="text-white/50 text-sm mb-1">{title}</p>
      <p className="text-white font-medium text-lg">{detail}</p>
    </div>
  </div>
);
