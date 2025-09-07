import React, { useState, useEffect, useRef } from "react";

// import "../styles/HeroSection.css";
// import "../styles/MissionVisionSection.css";
// import "../styles/TeamSection.css";
// import "../styles/TestimonialsSection.css";
// import "../styles/ValuesCultureSection.css";
// import "../styles/Footer.css";
// import "../styles/FeatureItem.css";
// import "../styles/VisionCard.css";
import"../styles/AboutUs.css";

import heroBg from "../assets/herobg.jpg"; 
import visionBg from "../assets/visionbg.jpg"; 
import { FiShoppingBag } from "react-icons/fi";
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

/* --------- Reusable Helpers ---------- */
const IntersectionObserverWrapper = ({ children, className = "", threshold = 0.1 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(currentRef);
      }
    }, { threshold });

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${className} ${visible ? "reveal-visible" : "reveal-hidden"}`}>
      {children}
    </div>
  );
};

const VisionCard = ({ title, description, tags, type }) => (
  <div className={`vision-card ${type}`}>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="tags">
      {tags.map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  </div>
);

const FeatureItem = ({ title, description }) => (
  <div className="feature-item">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

/* --------- MAIN ABOUT PAGE ---------- */
const About = () => {
  const handleBookSession = () => alert("Book a Free Session clicked!");

  const testimonials = [
    {
      name: "Rohit",
      role: "Entrepreneur",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRLriBnJWcxgdZ8BVKdexh0zq8SSAjfkD2tA&s",
      feedback: "This platform helped me make smarter investment choices. The insights are practical and easy to apply.",
    },
    {
      name: "Shreya",
      role: "Teacher",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmu94gScW_0hYuRYSGHt9n1_yGXMWfgZAG9Q&s",
      feedback: "Managing my finances used to be stressful, but now I feel more confident and in control of my savings.",
    },
    {
      name: "Tanishq",
      role: "Software Engineer",
      photo: "https://randomuser.me/api/portraits/men/65.jpg",
      feedback: "Clean interface, clear guidance, and actionable advice. It’s become a daily tool for me.",
    },
  ];

  const values = [
    {
      title: "Building Trust Every Step",
      text: "Trust is not a promise,it is a practice. Through transparency, accountability, and unwavering integrity, we cultivate relationships that endure. Every decision we make is guided by the belief that trust is the foundation of long-term success.",
    },
    {
      title: "Innovation Without Limits",
      text: "True innovation is born where curiosity meets courage. We embrace unconventional ideas, challenge outdated assumptions, and continuously experiment. Our vision is to unlock possibilities that redefine what is achievable.",

    },
    {
      title: "Collaboration that Wins",
      text: "Greatness is never achieved in isolation. We believe in the power of collective intelligence, where diverse perspectives spark creativity and shared ambition drives extraordinary outcomes. Collaboration is our competitive advantage.",
//     
    },
    {
      title: "People. Purpose. Progress",
      text:  "Behind every solution lies a human story. We design with empathy, act with compassion, and measure success by the impact we create for people. By putting people at the heart of every decision, we ensure our work makes a difference that lasts.",
    },
//     <section className="values-section">
//   <div className="values-grid">
//     {/* value-box content here */}
//   </div>
// </section>

  ];

  return (
    <div>
      {/* HERO */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg || "https://via.placeholder.com/1200x600"})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title center-title">36x Finance</h1>
            <p className="hero-subtitle">
              Empowering businesses with smarter financial strategies, 
              data-driven insights, and expert guidance helping you grow 
              with clarity, confidence, and long-term stability.
            </p>
            <div className="hero-buttons">
              <button className="btn-green">Contact Us</button>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="mission-vision-section">
        <div className="mission-container">
          <IntersectionObserverWrapper>
            <div className="mission-text">
              <h2>Empowering Financial Futures</h2>
              <p>
              We empower every individual with the knowledge, tools, and confidence to achieve financial clarity. We provide accessible education, 
           actionable insights, and practical strategies to help users make informed decisions. Our goal is to turn financial literacy into a universal right, ensuring no one is left behind in their financial journey.
              </p>
            </div>
          </IntersectionObserverWrapper>
          <IntersectionObserverWrapper>
            <div className="mission-image">
              <img src={heroBg || "https://via.placeholder.com/600x400"} alt="Empowering Financial Futures" />
            </div>
          </IntersectionObserverWrapper>
        </div>

        <div className="vision-container">
          <IntersectionObserverWrapper>
            <div className="vision-image">
              <img src={visionBg || "https://via.placeholder.com/600x400"} alt="Financial Freedom" />
            </div>
          </IntersectionObserverWrapper>
          <IntersectionObserverWrapper>
            <div className="vision-text">
              <h2>Shaping a World of Financial Freedom</h2>
              <p>
              We believe in a world where financial freedom is accessible to everyone, 
              regardless of background. We envision an inclusive platform 
              that bridges the gap between knowledge and opportunity, helping 
             individuals plan for the future, invest wisely, and grow wealth responsibly. 
              Our vision is to inspire confidence and create long-term financial well-being for all.
              </p>
            </div>
          </IntersectionObserverWrapper>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-box-section">
        <div className="intro">
          <h2 className="section-heading">The Principles That Drive Us</h2>
          <p className="section-subtext">
            {/* Our guiding principles go beyond words—they shape how we think, act, and innovate. */}
            Our guiding principles go beyond words they shape how we think, act,
         and innovate. They are the intellectual compass that anchors our
       culture and fuels our pursuit of meaningful progress.
          </p>
        </div>
        <div className="values-grid">
          {values.map((val, index) => (
            <div key={index} className={`value-box ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="content">
                <h3 className="highlight-heading">{val.title}</h3>
                <p>{val.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section">
        <IntersectionObserverWrapper>
          <h2>Meet Our Founder & Financial Strategist</h2>
        </IntersectionObserverWrapper>
        <div className="team-content">
          <img src="https://via.placeholder.com/200" alt="Founder" className="founder-photo" />
          <div className="founder-text">
            <p>
            Hi, I’m the founder of 36x Finance. I created this platform to make financial knowledge a catalyst for better living. Our mission is to empower you with clarity and confidence in your financial decisions. I believe finance should be accessible, understandable, and approachable for everyone, regardless of their background. Join us on this journey to demystify finance together!. Whether it's budgeting, investing, or retirement planning, we are here to guide you every step of the way. Let's embark on this financial journey together!
            </p>
            <button onClick={handleBookSession} className="btn-primary">
              Book a Free Session
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">
        
        <div className="headline-section">
            {/* Headline
    <div className="headline-section"></div> */}
          <h2>Many professionals, entrepreneurs, and investors trust our
              platform to guide smarter financial decisions every day.</h2>
        </div>
        <div className="faces-row">
          {testimonials.map((t, i) => (
            <div key={i} className="face-wrapper">
              <img src={t.photo} alt={t.name} className="face-img" />
              <p className="face-name">{t.name}</p>
              <span className="face-role">{t.role}</span>
              <p className="face-feedback">"{t.feedback}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-company">
              <h1><FiShoppingBag size="32" /> Vinayak Dental EQ</h1>
              <p>Delivering high-quality dental equipment with trust and innovation.</p>
            </div>
            <div className="footer-links">
              <h2>Quick Links</h2>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
            <div>
              <h2>Get in Touch</h2>
              <div className="footer-social">
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
              <div className="footer-contact">
                <div><FaMapMarkerAlt /><p>Shivpuri, MP</p></div>
                <div><IoCall /><p>+91 123456789</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vinayak Dental EQ. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
