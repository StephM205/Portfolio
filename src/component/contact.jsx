import React, { useState } from "react";
import "../assets/css/contact.css";
import { PlanetCanvas } from "./planetCanvas";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate email sending (replace with actual backend endpoint)
      console.log("Form data:", formData);
      setFeedback("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setFeedback("");
      }, 3000);
    } catch {
      setFeedback("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section reveal-on-scroll" id="contact">
      <div className="contact-container">
        {/* Left side - Form */}
        <div className="contact-form-wrapper">
          <div className="contact-head">
            <h2 className="contact-sub">GET IN TOUCH</h2>
            <h1 className="contact-title">Contact.</h1>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="What's your name?"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="What's your email?"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="What do you want to say?"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>

            {feedback && <p className="feedback">{feedback}</p>}
          </form>
        </div>

        {/* Right side - Decoration */}
        <div className="contact-decoration">
          <PlanetCanvas />
          <p className="planet-hint"></p>
        </div>
      </div>
    </section>
  );
};
