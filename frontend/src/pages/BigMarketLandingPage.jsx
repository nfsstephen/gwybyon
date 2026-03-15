import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Wrench, Zap, Thermometer, Bug, Home, ArrowRight, Shield, MapPin, Phone } from 'lucide-react';
import FiveToolsSection from '../components/FiveToolsSection';
import './BigMarketLanding.css';

const industries = [
  { name: 'Well & Septic Companies', icon: Droplets, path: '/big-market/well-septic', color: '#0369a1', desc: 'Emergency-driven services where being found first means everything. Field crews need managed communication.' },
  { name: 'Plumbers', icon: Wrench, path: '/big-market/plumbers', color: '#7c3aed', desc: 'High-intent "near me" searches dominate this industry. Technicians in the field need business/personal separation.' },
  { name: 'Electricians', icon: Zap, path: '/big-market/electricians', color: '#d97706', desc: 'Safety-critical field work demands controlled communications. Local search visibility drives new customer acquisition.' },
  { name: 'Air & Heating Companies', icon: Thermometer, path: '/big-market/hvac', color: '#dc2626', desc: 'Seasonal demand spikes make search rankings critical. Large field teams need scalable phone management.' },
  { name: 'Pest Control Services', icon: Bug, path: '/big-market/pest-control', color: '#16a34a', desc: 'Recurring service model with technicians covering territories daily. Local visibility drives the first appointment.' },
  { name: 'Real Estate', icon: Home, path: '/big-market/real-estate', color: '#0d9488', desc: 'Agents live on their phones. Separating client calls from personal life is essential. Local search drives leads.' },
];

const BigMarketLandingPage = () => {
  return (
    <div className="big-market-landing">
      {/* Hero */}
      <section className="bml-hero">
        <div className="bml-badge">SHRAD'S DIVISION</div>
        <h1 className="bml-title">BIG Market</h1>
        <p className="bml-subtitle">
          Six high-value industries. Thousands of local businesses across the U.S. 
          Each one needs to be found online <em>and</em> needs to manage their field teams. 
          We solve both problems — one vendor, two solutions, exclusive territories.
        </p>
        <div className="bml-strategy-tags">
          <div className="bml-tag bml-tag-cross">
            <Phone size={16} /> Cross Selling: GeoGrid + BYON
          </div>
          <div className="bml-tag bml-tag-territory">
            <Shield size={16} /> Protected Market Territories
          </div>
          <div className="bml-tag bml-tag-local">
            <MapPin size={16} /> Local Market Dominance
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bml-how">
        <h2 className="bml-section-title">The Two-Solution Approach</h2>
        <p className="bml-section-desc">Every business in these industries faces the same two challenges. We solve both.</p>
        <div className="bml-how-grid">
          <div className="bml-how-card">
            <div className="bml-how-icon bml-how-geogrid"><MapPin size={28} /></div>
            <h3>Problem 1: "Can customers find them?"</h3>
            <p>Google changed how local search works. If they're not optimized, their competitors get the calls. <strong>GeoGrid</strong> puts them at the top of local results — and our territory guarantee means we won't help their competitors do the same.</p>
          </div>
          <div className="bml-how-plus">+</div>
          <div className="bml-how-card">
            <div className="bml-how-icon bml-how-byon"><Phone size={28} /></div>
            <h3>Problem 2: "Can they manage their team?"</h3>
            <p>They have technicians, agents, and crews using personal phones for business. No oversight. No separation. <strong>BYON</strong> gives every team member a managed second line — call control, tracking, and scam protection.</p>
          </div>
        </div>
      </section>

      {/* Five Tools We Are Building */}
      <FiveToolsSection
        title="These Are the Five Tools We Are Building"
        subtitle="The tech team is building these five GeoGrid tools to power every industry in this division. This is what we sell alongside BYON."
      />

      {/* Industry Grid */}
      <section className="bml-industries">
        <h2 className="bml-section-title">Target Industries</h2>
        <p className="bml-section-desc">Click into each industry to see the full cross-sell strategy and territory plan</p>
        <div className="bml-industry-grid">
          {industries.map((ind) => (
            <Link to={ind.path} key={ind.path} className="bml-industry-card">
              <div className="bml-ind-icon" style={{ color: ind.color, borderColor: `${ind.color}33`, background: `${ind.color}0a` }}>
                <ind.icon size={28} />
              </div>
              <h3>{ind.name}</h3>
              <p>{ind.desc}</p>
              <span className="bml-ind-link" style={{ color: ind.color }}>
                View Strategy <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BigMarketLandingPage;
