import React from 'react';
import { Search, Phone, ArrowRight, Target, Layers, Users, MapPin, TrendingUp, CheckCircle } from 'lucide-react';
import './CrossSellStrategy.css';

const CrossSellStrategy = () => {
  return (
    <section id="section-crosssell" className="cross-sell">
      {/* Header */}
      <div className="cs-header">
        <div className="cs-badge">STRATEGY 2: CROSS SELLING</div>
        <h2 className="cs-title">
          One Vendor. Two Solutions.<br />
          <span className="cs-title-accent">The Power of Cross Selling</span>
        </h2>
        <p className="cs-subtitle">
          Google has fundamentally changed how local search works. Businesses that don't optimize 
          will disappear from results. We solve that with GeoGrid. But the businesses that need 
          GeoGrid are the same businesses with field teams who need BYON. Every sales conversation 
          becomes two closed deals.
        </p>
      </div>

      {/* The Problem */}
      <div className="cs-problem-section">
        <div className="cs-problem-grid">
          <div className="cs-problem-card">
            <Search size={32} className="cs-problem-icon" />
            <h3>The Google Problem</h3>
            <p>
              Google's algorithm changes have made local search optimization critical. 
              Large local businesses — HVAC companies, medical practices, law firms, home service 
              providers — are losing visibility to competitors who optimize. If your customers 
              can't find you, you don't exist.
            </p>
          </div>
          <div className="cs-problem-card">
            <Phone size={32} className="cs-problem-icon" />
            <h3>The Field Team Problem</h3>
            <p>
              These same businesses deploy teams into the field daily — technicians, nurses, 
              agents, installers. They use personal phones for company business with zero 
              oversight. No call control. No tracking. No separation between work and personal life.
            </p>
          </div>
        </div>
      </div>

      {/* Cross Sell Visual */}
      <div className="cs-visual-section">
        <h3 className="cs-visual-title">Two Problems. One Conversation. Two Sales.</h3>
        <div className="cs-visual-flow">
          <div className="cs-flow-target">
            <div className="cs-target-icon">
              <Target size={36} />
            </div>
            <h4>Target Customer</h4>
            <p>Large local businesses with<br />field employees</p>
            <div className="cs-target-examples">
              <span>Well & Septic</span>
              <span>Plumbers</span>
              <span>Electricians</span>
              <span>Air & Heating</span>
              <span>Pest Control</span>
              <span>Real Estate</span>
            </div>
          </div>

          <div className="cs-flow-arrows">
            <div className="cs-flow-arrow cs-arrow-top">
              <ArrowRight size={24} />
            </div>
            <div className="cs-flow-arrow cs-arrow-bottom">
              <ArrowRight size={24} />
            </div>
          </div>

          <div className="cs-flow-solutions">
            <div className="cs-solution-card cs-solution-geogrid">
              <div className="cs-solution-icon">
                <MapPin size={28} />
              </div>
              <h4>GeoGrid</h4>
              <p>Local Search Optimization</p>
              <ul>
                <li>Dominate Google local results</li>
                <li>Monitor search rankings in real-time</li>
                <li>AI-powered content optimization</li>
                <li>Google Business Profile management</li>
              </ul>
            </div>
            <div className="cs-solution-plus">+</div>
            <div className="cs-solution-card cs-solution-byon">
              <div className="cs-solution-icon">
                <Phone size={28} />
              </div>
              <h4>BYON</h4>
              <p>Second Line for Field Teams</p>
              <ul>
                <li>Business/personal separation</li>
                <li>Call control & whitelisting</li>
                <li>Location tracking</li>
                <li>Scam protection for employees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Works */}
      <div className="cs-why-section">
        <h3 className="cs-why-title">Why Cross Selling Works</h3>
        <div className="cs-why-grid">
          <div className="cs-why-card">
            <Layers size={28} className="cs-why-icon" />
            <h4>Same Decision Maker</h4>
            <p>The business owner who needs better Google visibility is the same person who needs to manage their field team's communications. One meeting, two solutions.</p>
          </div>
          <div className="cs-why-card">
            <TrendingUp size={28} className="cs-why-icon" />
            <h4>Higher Deal Value</h4>
            <p>Instead of selling a single product, every engagement becomes a bundled deal. Double the revenue per customer without doubling the sales effort.</p>
          </div>
          <div className="cs-why-card">
            <Users size={28} className="cs-why-icon" />
            <h4>Stickier Relationships</h4>
            <p>When a customer depends on you for both their online presence and their team communications, switching costs are high. Retention goes up dramatically.</p>
          </div>
          <div className="cs-why-card">
            <CheckCircle size={28} className="cs-why-icon" />
            <h4>One Vendor Simplicity</h4>
            <p>Businesses prefer fewer vendors. We offer a unified platform — one invoice, one support team, one relationship. That's a competitive advantage over point solutions.</p>
          </div>
        </div>
      </div>

      {/* The Pitch */}
      <div className="cs-pitch-section">
        <div className="cs-pitch-card">
          <div className="cs-pitch-label">The Sales Conversation</div>
          <blockquote className="cs-pitch-quote">
            "We noticed your business isn't showing up in Google's top local results — 
            your competitors are getting those calls instead. We fix that with GeoGrid. 
            And since you have a team in the field using personal phones for company 
            business, we can also give each of them a managed second line with BYON. 
            One vendor. Two problems solved."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default CrossSellStrategy;
