import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Crown, Mail, Clock, Users, Ban, TrendingUp, CheckCircle, XCircle, ArrowDown, ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import './MarketTerritories.css';

const MarketTerritories = () => {
  return (
    <section id="section-territories" className="market-territories">
      {/* Hero */}
      <div className="mt-hero">
        <div className="mt-badge">STRATEGY 1: MARKET TERRITORIES</div>
        <h2 className="mt-title">
          We Compete <em>For</em> Our Customers.<br />
          <span className="mt-title-accent">Never Against Them.</span>
        </h2>
        <p className="mt-subtitle">
          Most search engine companies will sell the same product to every business in 
          the same area. Four restaurants. Same zip code. Same SEO vendor. Only one can 
          rank #1 — so three of them lose. That's not a service. That's a conflict of interest.
        </p>
      </div>

      {/* The Industry Problem */}
      <div className="mt-problem">
        <h3 className="mt-section-title">The Dirty Secret of Our Competitors</h3>
        <p className="mt-bidding-war-caption">
          Traditional agencies profit by over-saturating your territory and selling your zip code to your competitors.
          <strong> We profit by making sure you own it.</strong>
        </p>
        <div className="mt-problem-visual">
          <div className="mt-problem-scenario">
            <div className="mt-scenario-label mt-scenario-them">How They Do It: Over-Saturation</div>
            <div className="mt-competitor-grid mt-oversaturated-bg">
              <div className="mt-competitor-slot mt-slot-losing">
                <XCircle size={20} />
                <span>Business A</span>
                <small>Active in Territory</small>
              </div>
              <div className="mt-competitor-slot mt-slot-losing">
                <XCircle size={20} />
                <span>Business B</span>
                <small>Active in Territory</small>
              </div>
              <div className="mt-competitor-slot mt-slot-winning">
                <CheckCircle size={20} />
                <span>Business C</span>
                <small>Gets Lead (Luck)</small>
              </div>
              <div className="mt-competitor-slot mt-slot-losing">
                <XCircle size={20} />
                <span>Business D</span>
                <small>Active in Territory</small>
              </div>
            </div>
            <div className="mt-scenario-result mt-result-bad">
              <Ban size={16} />
              <span>Same area. Same industry. The agency gets paid 4x to crowd your market.</span>
            </div>
          </div>

          <div className="mt-problem-vs">VS</div>

          <div className="mt-problem-scenario">
            <div className="mt-scenario-label mt-scenario-us">How We Do It</div>
            <div className="mt-territory-visual mt-protected-zone-bg">
              <div className="mt-territory-slot mt-territory-premium">
                <div className="mt-territory-badge">
                  <Lock size={12} />
                  <span>Territory Locked</span>
                </div>
                <Crown size={24} />
                <span>Your Business</span>
                <small>Exclusive Zone</small>
              </div>
              <div className="mt-territory-shield">
                <Shield size={32} />
                <span>Protected Territory</span>
              </div>
            </div>
            <div className="mt-scenario-result mt-result-good mt-result-premium">
              <CheckCircle size={16} />
              <span>One customer per territory per industry. Your investment is protected.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conflict of Interest Section */}
      <div className="mt-conflict">
        <div className="mt-conflict-card">
          <AlertTriangle size={28} className="mt-conflict-icon" />
          <h4>Our Conflict of Interest Guarantee</h4>
          <p>
            We <strong>cannot</strong> work for your competitor. It's not just policy — it's in our contract. 
            Once you claim your territory, we are legally bound to refuse service to any competing business 
            in your industry within your geographic zone. Your success becomes our only option.
          </p>
        </div>
        <div className="mt-scarcity-notice">
          <Clock size={18} />
          <span>Once a territory is locked, it's gone for the duration of the partnership. Early action secures your position.</span>
        </div>
      </div>

      {/* The Process */}
      <div className="mt-process">
        <h3 className="mt-section-title">Our Territory Assignment Process</h3>
        <p className="mt-section-desc">A disciplined, four-step approach that protects the value of every customer relationship</p>
        <div className="mt-process-steps">
          <div className="mt-step">
            <div className="mt-step-number">01</div>
            <div className="mt-step-icon"><Users size={28} /></div>
            <h4>Define Industries</h4>
            <p>We have identified SEVEN high-value local industries where businesses need both search visibility (GeoGrid) and field team management (BYON). Each industry gets its own territory map.</p>
            <ul className="mt-industry-list">
              <li>Well & Septic Companies</li>
              <li>Plumbing Companies</li>
              <li>Electrical Companies</li>
              <li>Air & Heating Companies</li>
              <li>Pest Control Services</li>
              <li>Real Estate Firms</li>
              <li>Roofing Companies</li>
            </ul>
          </div>
          <div className="mt-step-connector"><ArrowDown size={20} /></div>
          <div className="mt-step">
            <div className="mt-step-number">02</div>
            <div className="mt-step-icon"><MapPin size={28} /></div>
            <h4>Establish Territories</h4>
            <p>For each industry, we carve out geographic territories. No overlap. No gray areas. Each territory is a protected zone where only one business per industry will receive our services.</p>
          </div>
          <div className="mt-step-connector"><ArrowDown size={20} /></div>
          <div className="mt-step">
            <div className="mt-step-number">03</div>
            <div className="mt-step-icon"><Crown size={28} /></div>
            <h4>Select Preferred Customers</h4>
            <p>Within each territory, we research and identify the ideal business — the one best positioned to benefit from our platform. This is a privilege, not a cold call.</p>
          </div>
          <div className="mt-step-connector"><ArrowDown size={20} /></div>
          <div className="mt-step">
            <div className="mt-step-number">04</div>
            <div className="mt-step-icon"><Mail size={28} /></div>
            <h4>Exclusive Invitation</h4>
            <p>The selected business receives a personal invitation to claim their territory — with a limited window to accept. If they pass, the territory goes to the next candidate. Scarcity drives value.</p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="mt-value">
        <h3 className="mt-section-title">The Territory Promise</h3>
        <div className="mt-value-grid">
          <div className="mt-value-card">
            <Shield size={32} className="mt-val-icon mt-val-shield" />
            <h4>Exclusive Protection</h4>
            <p>No competitor in your industry will receive our services within your territory. Your investment is protected by design.</p>
          </div>
          <div className="mt-value-card">
            <TrendingUp size={32} className="mt-val-icon mt-val-trend" />
            <h4>Your Success Is Our Success</h4>
            <p>We don't profit from selling to your competitors. We profit when you dominate your local market. Our incentives are aligned with yours.</p>
          </div>
          <div className="mt-value-card">
            <Clock size={32} className="mt-val-icon mt-val-clock" />
            <h4>Limited Availability</h4>
            <p>Territories are finite. Once claimed, they're off the market. Early adopters secure the best positions in their local markets.</p>
          </div>
        </div>
      </div>

      {/* Closing Statement */}
      <div className="mt-closing">
        <div className="mt-closing-card">
          <p className="mt-closing-text">
            Our competitors are driven by greed — they'll sell to anyone who pays, even if it means 
            their own customers compete against each other. <strong>We chose a different path.</strong> We assign 
            territories because we believe the only way to truly serve our customers is to guarantee 
            that we're fighting <em>for</em> them, not profiting from the fight <em>between</em> them.
          </p>
        </div>
        <div className="mt-closing-cta">
          <Link to="/seven-industries" className="mt-cta-btn" data-testid="mt-cta-industries">
            Select Your Industry to See Your Solution <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketTerritories;
