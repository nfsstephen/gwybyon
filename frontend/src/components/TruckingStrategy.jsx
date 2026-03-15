import React from 'react';
import { Shield, Phone, MapPin, Route, Users, Building2, Signal, Lock, ChevronRight, TrendingUp } from 'lucide-react';
import './TruckingStrategy.css';

const TruckingStrategy = () => {
  return (
    <section className="trucking-strategy">
      {/* Hero */}
      <div className="ts-hero">
        <div className="ts-hero-badge">MARKET STRATEGY</div>
        <h1 className="ts-hero-title">
          The Trucking Industry<br />
          <span className="ts-hero-accent">Unlocking Access to Millions of Drivers</span>
        </h1>
        <p className="ts-hero-subtitle">
          Every major carrier operates a fleet of drivers who depend on their phones daily. 
          BYON transforms each driver's personal device into a secure, company-managed business tool — 
          creating massive value for carriers and an unprecedented distribution channel for T-Mobile.
        </p>
      </div>

      {/* Relationship Diagram */}
      <div className="ts-diagram-section">
        <h2 className="ts-section-title">The Partnership Ecosystem</h2>
        <p className="ts-section-desc">How BYON connects T-Mobile to millions of commercial drivers through their employers</p>
        <div className="ts-diagram">
          <div className="ts-diagram-node ts-node-tmobile">
            <Signal size={36} />
            <span className="ts-node-label">T-Mobile</span>
            <span className="ts-node-role">Network Partner</span>
          </div>
          <div className="ts-diagram-arrow">
            <ChevronRight size={28} />
            <span className="ts-arrow-label">Powers</span>
          </div>
          <div className="ts-diagram-node ts-node-byon">
            <Phone size={36} />
            <span className="ts-node-label">BYON</span>
            <span className="ts-node-role">Second Line Platform</span>
          </div>
          <div className="ts-diagram-arrow">
            <ChevronRight size={28} />
            <span className="ts-arrow-label">Serves</span>
          </div>
          <div className="ts-diagram-node ts-node-carrier">
            <Building2 size={36} />
            <span className="ts-node-label">Trucking Companies</span>
            <span className="ts-node-role">Enterprise Clients</span>
          </div>
          <div className="ts-diagram-arrow">
            <ChevronRight size={28} />
            <span className="ts-arrow-label">Employs</span>
          </div>
          <div className="ts-diagram-node ts-node-drivers">
            <Users size={36} />
            <span className="ts-node-label">Drivers</span>
            <span className="ts-node-role">End Users</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="ts-stats-bar">
        <div className="ts-stat">
          <span className="ts-stat-number">3.5M+</span>
          <span className="ts-stat-label">Commercial Truck Drivers in the U.S.</span>
        </div>
        <div className="ts-stat-divider" />
        <div className="ts-stat">
          <span className="ts-stat-number">500K+</span>
          <span className="ts-stat-label">Drivers in Top 100 Carriers Alone</span>
        </div>
        <div className="ts-stat-divider" />
        <div className="ts-stat">
          <span className="ts-stat-number">$XX</span>
          <span className="ts-stat-label">Monthly Revenue Per Driver Line</span>
        </div>
        <div className="ts-stat-divider" />
        <div className="ts-stat">
          <span className="ts-stat-number">92%</span>
          <span className="ts-stat-label">Drivers Using Personal Phones for Work</span>
        </div>
      </div>

      {/* Dual Value Proposition */}
      <div className="ts-dual-value">
        <h2 className="ts-section-title">Dual Value Proposition</h2>
        <p className="ts-section-desc">BYON creates value from both sides of the equation</p>
        
        <div className="ts-dual-grid">
          {/* For Trucking Companies */}
          <div className="ts-value-card ts-card-carrier">
            <div className="ts-card-header">
              <Building2 size={28} />
              <h3>Why Trucking Companies Want BYON</h3>
            </div>
            <div className="ts-card-subtitle">The employer value proposition</div>
            <ul className="ts-value-list">
              <li>
                <Shield size={20} className="ts-icon-shield" />
                <div>
                  <strong>Scam Protection</strong>
                  <p>Drivers use a dedicated business number — personal number stays private, reducing scam exposure and social engineering attacks</p>
                </div>
              </li>
              <li>
                <Lock size={20} className="ts-icon-lock" />
                <div>
                  <strong>Call Control & Whitelisting</strong>
                  <p>Companies control who can reach drivers on their business line — block unwanted calls, whitelist dispatchers and approved contacts</p>
                </div>
              </li>
              <li>
                <MapPin size={20} className="ts-icon-map" />
                <div>
                  <strong>Location Tracking</strong>
                  <p>Track the business line's location in real-time — know where drivers and assets are without invading personal privacy</p>
                </div>
              </li>
              <li>
                <Route size={20} className="ts-icon-route" />
                <div>
                  <strong>Route Recording</strong>
                  <p>Automatically log routes taken on business time — proof of delivery, compliance documentation, and route optimization data</p>
                </div>
              </li>
              <li>
                <Phone size={20} className="ts-icon-phone" />
                <div>
                  <strong>Business/Personal Separation</strong>
                  <p>The foundational value — give drivers a clean boundary between work and personal life while giving companies control over the business side</p>
                </div>
              </li>
            </ul>
          </div>

          {/* For T-Mobile */}
          <div className="ts-value-card ts-card-tmobile">
            <div className="ts-card-header">
              <Signal size={28} />
              <h3>Why T-Mobile Should Partner</h3>
            </div>
            <div className="ts-card-subtitle">The distribution & revenue opportunity</div>
            <ul className="ts-value-list">
              <li>
                <Users size={20} className="ts-icon-users" />
                <div>
                  <strong>Massive Captive Audience</strong>
                  <p>Each trucking company brings hundreds to thousands of drivers — one enterprise deal = massive line activations overnight</p>
                </div>
              </li>
              <li>
                <TrendingUp size={20} className="ts-icon-trend" />
                <div>
                  <strong>Recurring Revenue Per Driver</strong>
                  <p>Every business line is a monthly subscription — predictable, recurring revenue that scales with fleet size</p>
                </div>
              </li>
              <li>
                <Building2 size={20} className="ts-icon-building" />
                <div>
                  <strong>Enterprise Sales Channel</strong>
                  <p>Sell to the company, onboard the fleet — B2B distribution is faster and stickier than individual consumer sales</p>
                </div>
              </li>
              <li>
                <Shield size={20} className="ts-icon-shield" />
                <div>
                  <strong>Differentiated Product Offering</strong>
                  <p>No other carrier offers a managed second-line platform — BYON gives T-Mobile a unique competitive advantage in the enterprise fleet market</p>
                </div>
              </li>
              <li>
                <Signal size={20} className="ts-icon-signal" />
                <div>
                  <strong>Cross-Sell Gateway</strong>
                  <p>Once drivers are on T-Mobile's network for business, personal plan conversions and family plan upsells follow naturally</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* The Second Line Advantage */}
      <div className="ts-second-line">
        <h2 className="ts-section-title">The Second Line Advantage</h2>
        <p className="ts-section-desc">One device. Two numbers. Complete separation of business and personal life.</p>
        <div className="ts-advantage-grid">
          <div className="ts-advantage-card">
            <div className="ts-adv-icon ts-adv-business">
              <Phone size={32} />
            </div>
            <h4>Business Line</h4>
            <ul>
              <li>Company-assigned number</li>
              <li>Managed by employer</li>
              <li>Call logs available to company</li>
              <li>Location tracking enabled</li>
              <li>Whitelisted contacts only</li>
              <li>Route recording active</li>
            </ul>
          </div>
          <div className="ts-advantage-divider">
            <div className="ts-divider-line" />
            <div className="ts-divider-label">Same Phone</div>
            <div className="ts-divider-line" />
          </div>
          <div className="ts-advantage-card">
            <div className="ts-adv-icon ts-adv-personal">
              <Phone size={32} />
            </div>
            <h4>Personal Line</h4>
            <ul>
              <li>Driver's own number</li>
              <li>Completely private</li>
              <li>No employer access</li>
              <li>No tracking</li>
              <li>Unrestricted contacts</li>
              <li>Personal use only</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TruckingStrategy;
