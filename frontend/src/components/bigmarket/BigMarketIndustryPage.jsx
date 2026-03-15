import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import './BigMarketIndustryPage.css';

const BigMarketIndustryPage = ({ industry }) => {
  return (
    <div className="bmi-page">
      {/* Hero */}
      <section className="bmi-hero" style={{ borderTopColor: industry.color }}>
        <Link to="/big-market" className="bmi-back"><ArrowLeft size={16} /> Back to BIG Market</Link>
        <div className="bmi-hero-icon" style={{ color: industry.color, borderColor: `${industry.color}33`, background: `${industry.color}0a` }}>
          <industry.icon size={40} />
        </div>
        <h1 className="bmi-title">{industry.name}</h1>
        <p className="bmi-subtitle">{industry.heroText}</p>
      </section>

      {/* The Two Problems */}
      <section className="bmi-problems">
        <h2 className="bmi-section-title">Two Problems. One Conversation.</h2>
        <div className="bmi-problem-grid">
          <div className="bmi-problem-card bmi-problem-search">
            <div className="bmi-problem-header">
              <MapPin size={24} />
              <h3>The Search Problem</h3>
            </div>
            <p>{industry.searchProblem}</p>
            <div className="bmi-solution-tag">
              <span>Solved by</span> <strong>GeoGrid</strong>
            </div>
          </div>
          <div className="bmi-problem-card bmi-problem-team">
            <div className="bmi-problem-header">
              <Phone size={24} />
              <h3>The Team Problem</h3>
            </div>
            <p>{industry.teamProblem}</p>
            <div className="bmi-solution-tag">
              <span>Solved by</span> <strong>BYON</strong>
            </div>
          </div>
        </div>
      </section>

      {/* GeoGrid Value */}
      <section className="bmi-geogrid">
        <h2 className="bmi-section-title">GeoGrid for {industry.shortName}</h2>
        <p className="bmi-section-desc">{industry.geogridIntro}</p>
        <div className="bmi-benefit-grid">
          {industry.geogridBenefits.map((b, i) => (
            <div className="bmi-benefit-card" key={i}>
              <CheckCircle size={20} style={{ color: '#0369a1' }} />
              <div>
                <strong>{b.title}</strong>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BYON Value */}
      <section className="bmi-byon">
        <h2 className="bmi-section-title">BYON for {industry.shortName}</h2>
        <p className="bmi-section-desc">{industry.byonIntro}</p>
        <div className="bmi-benefit-grid">
          {industry.byonBenefits.map((b, i) => (
            <div className="bmi-benefit-card" key={i}>
              <CheckCircle size={20} style={{ color: '#7c3aed' }} />
              <div>
                <strong>{b.title}</strong>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Territory Protection */}
      <section className="bmi-territory">
        <div className="bmi-territory-card">
          <Shield size={32} className="bmi-territory-icon" />
          <h2>Territory Protection for {industry.shortName}</h2>
          <p>{industry.territoryText}</p>
        </div>
      </section>

      {/* Cross-Sell Pitch */}
      <section className="bmi-pitch">
        <div className="bmi-pitch-card">
          <div className="bmi-pitch-label">The Sales Conversation</div>
          <blockquote>{industry.salesPitch}</blockquote>
        </div>
      </section>
    </div>
  );
};

export default BigMarketIndustryPage;
