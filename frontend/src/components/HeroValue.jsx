import React from 'react';
import { TrendingDown, TrendingUp, BarChart3, Shield } from 'lucide-react';
import './HeroValue.css';

const HeroValue = () => {
  return (
    <section className="hv-section">
      <div className="hv-container">
        <div className="hv-headline">
          <span className="hv-label">WHY GATEWAY AI SYSTEMS</span>
          <h1 className="hv-title">
            Stop Overpaying for Marketing<br />
            <span className="hv-title-accent">That Doesn't Deliver Results.</span>
          </h1>
          <p className="hv-subtitle">
            We built a better model — one that costs less, performs more, 
            and puts you in control of your own success.
          </p>
        </div>

        <div className="hv-grid">
          <div className="hv-card">
            <div className="hv-card-visual hv-visual-cost">
              <div className="hv-metric-ring">
                <TrendingDown size={20} className="hv-metric-icon" />
              </div>
              <span className="hv-metric">50<span className="hv-metric-unit">%</span></span>
            </div>
            <h3 className="hv-card-title">Cut Your Costs in Half</h3>
            <p className="hv-card-text">
              Our market-based pricing eliminates the inflated costs of traditional 
              agencies. You pay for results — not overhead.
            </p>
          </div>

          <div className="hv-card">
            <div className="hv-card-visual hv-visual-results">
              <div className="hv-metric-ring">
                <TrendingUp size={20} className="hv-metric-icon" />
              </div>
              <span className="hv-metric">2<span className="hv-metric-unit">x</span></span>
            </div>
            <h3 className="hv-card-title">Double Your Search Results</h3>
            <p className="hv-card-text">
              Exclusive territory protection means zero competition from our other 
              clients. Every dollar works harder for you.
            </p>
          </div>

          <div className="hv-card">
            <div className="hv-card-visual hv-visual-tools">
              <div className="hv-metric-ring">
                <BarChart3 size={20} className="hv-metric-icon" />
              </div>
              <span className="hv-metric-text">LIVE</span>
            </div>
            <h3 className="hv-card-title">Measure Results in Real Time</h3>
            <p className="hv-card-text">
              Our tools let you track rankings, traffic, and leads yourself — 
              no waiting for monthly reports or trusting someone else's numbers.
            </p>
          </div>

          <div className="hv-card">
            <div className="hv-card-visual hv-visual-control">
              <div className="hv-metric-ring">
                <Shield size={20} className="hv-metric-icon" />
              </div>
              <span className="hv-metric-text">YOU</span>
            </div>
            <h3 className="hv-card-title">Own Your Marketing</h3>
            <p className="hv-card-text">
              Stop depending on agencies who hold your business hostage. 
              Our platform gives you visibility and control from day one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroValue;
