import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-solving-text">
        <h2 className="hero-solving">PLUS Two Unique Tools</h2>
      </div>
      <div className="hero-split-container">
        <div className="hero-half hero-left">
          <div className="hero-background">
            <img 
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01" 
              alt="AI Technology" 
              loading="lazy"
            />
            <div className="hero-overlay hero-overlay-left"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">Artificial<br/>Intelligence</h1>
          </div>
        </div>
        <div className="hero-half hero-right">
          <div className="hero-background">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a" 
              alt="Blockchain Technology" 
              loading="lazy"
            />
            <div className="hero-overlay hero-overlay-right"></div>
          </div>
          <div className="hero-content">
            <h1 className="hero-title">Blockchain</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;