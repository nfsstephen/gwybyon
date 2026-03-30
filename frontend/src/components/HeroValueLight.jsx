import React from 'react';
import { TrendingDown, TrendingUp, BarChart3, Shield } from 'lucide-react';
import './HeroValueLight.css';

const HeroValueLight = () => {
  return (
    <section className="hvl-section">
      <div className="hvl-container">
        <div className="hvl-headline">
          <span className="hvl-label">WHY GATEWAY AI SYSTEMS</span>
          <h1 className="hvl-title">
            Stop Overpaying for Websites<br />
            <span className="hvl-title-accent">That Do Not Deliver the Potential They Should.</span>
          </h1>
          <p className="hvl-subtitle">
            We built a better model — one that costs less, performs more, 
            and puts you in control of your own success.
          </p>
        </div>

        <div className="hvl-grid">
          <div className="hvl-card">
            <div className="hvl-card-visual hvl-visual-cost">
              <div className="hvl-metric-ring">
                <TrendingDown size={20} className="hvl-metric-icon" />
              </div>
              <span className="hvl-metric">50<span className="hvl-metric-unit">%</span></span>
            </div>
            <h3 className="hvl-card-title">Cut Your Costs in Half</h3>
            <p className="hvl-card-text">
              Our market-based pricing eliminates the inflated costs of traditional 
              agencies. You pay for results — not overhead.
            </p>
          </div>

          <div className="hvl-card">
            <div className="hvl-card-visual hvl-visual-results">
              <div className="hvl-metric-ring">
                <TrendingUp size={20} className="hvl-metric-icon" />
              </div>
              <span className="hvl-metric">2<span className="hvl-metric-unit">x</span></span>
            </div>
            <h3 className="hvl-card-title">Double Your Search Results</h3>
            <p className="hvl-card-text">
              Exclusive territory protection means zero competition from our other 
              clients. Every dollar works harder for you.
            </p>
          </div>

          <div className="hvl-card">
            <div className="hvl-card-visual hvl-visual-tools">
              <div className="hvl-metric-ring">
                <BarChart3 size={20} className="hvl-metric-icon" />
              </div>
              <span className="hvl-metric-text">LIVE</span>
            </div>
            <h3 className="hvl-card-title">Measure Results in Real Time</h3>
            <p className="hvl-card-text">
              Our tools let you track rankings, traffic, and leads yourself — 
              no waiting for monthly reports or trusting someone else's numbers.
            </p>
          </div>

          <div className="hvl-card">
            <div className="hvl-card-visual hvl-visual-control">
              <div className="hvl-metric-ring">
                <Shield size={20} className="hvl-metric-icon" />
              </div>
              <span className="hvl-metric-text">YOU</span>
            </div>
            <h3 className="hvl-card-title">Own Your Marketing</h3>
            <p className="hvl-card-text">
              Stop depending on agencies who hold your business hostage. 
              Our platform gives you visibility and control from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroValueLight;
