import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Check, ArrowRight } from 'lucide-react';
import './GeoGridIndustryPage.css';

const GeoGridIndustryPage = ({ config }) => {
  const {
    industry,
    heroTitle,
    heroSubtitle,
    painPoints,
    solutions,
    localExample,
    stats,
    ctaText,
  } = config;

  return (
    <div className="ggi-page" data-testid={`geogrid-industry-${industry.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Hero */}
      <section className="ggi-hero">
        <div className="ggi-hero-bg"></div>
        <div className="ggi-hero-content">
          <div className="ggi-hero-badge">
            <MapPin size={14} />
            <span>GeoGrid for {industry}</span>
          </div>
          <h1 className="ggi-hero-title" data-testid="ggi-page-title">{heroTitle}</h1>
          <p className="ggi-hero-subtitle">{heroSubtitle}</p>
          <div className="ggi-hero-actions">
            <Link to="/services-pricing" className="ggi-btn-primary" data-testid="ggi-hero-scan-cta">
              Get Your Free Geo-Health Scan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="ggi-pain">
        <div className="ggi-container">
          <div className="ggi-section-label">The Problem</div>
          <h2 className="ggi-section-title">Why {industry} Businesses Lose Local Customers</h2>
          <div className="ggi-pain-grid">
            {painPoints.map((point, i) => (
              <div className="ggi-pain-card" key={i}>
                <div className="ggi-pain-number">{String(i + 1).padStart(2, '0')}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Example */}
      <section className="ggi-example">
        <div className="ggi-container">
          <div className="ggi-example-card">
            <div className="ggi-example-content">
              <div className="ggi-section-label">The Neighborhood Effect</div>
              <h2>{localExample.title}</h2>
              <p>{localExample.description}</p>
              <div className="ggi-example-quote">
                <blockquote>"{localExample.quote}"</blockquote>
              </div>
            </div>
            <div className="ggi-example-visual">
              <div className="ggi-mini-heatmap">
                {Array.from({ length: 25 }).map((_, i) => {
                  const r = Math.floor(i / 5);
                  const c = i % 5;
                  const d = Math.sqrt(Math.pow(r - 2, 2) + Math.pow(c - 2, 2));
                  const isCenter = r === 2 && c === 2;
                  let lvl = d < 1 ? 'high' : d < 1.8 ? 'medium' : d < 2.5 ? 'low' : 'none';
                  return (
                    <div key={i} className={`ggi-map-cell ggi-map-${lvl} ${isCenter ? 'ggi-map-center' : ''}`}>
                      {isCenter && <MapPin size={12} />}
                    </div>
                  );
                })}
              </div>
              <p className="ggi-map-caption">Typical {industry.toLowerCase()} visibility gap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="ggi-solutions">
        <div className="ggi-container">
          <div className="ggi-section-label">How GeoGrid Helps</div>
          <h2 className="ggi-section-title">Your {industry} Local Dominance Toolkit</h2>
          <div className="ggi-solutions-grid">
            {solutions.map((sol, i) => (
              <div className="ggi-solution-card" key={i}>
                <div className="ggi-solution-icon">{sol.icon}</div>
                <h3>{sol.title}</h3>
                <p>{sol.description}</p>
                <ul className="ggi-solution-features">
                  {sol.features.map((f, j) => (
                    <li key={j}><Check size={14} /> {f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="ggi-stats">
        <div className="ggi-container">
          <div className="ggi-stats-grid">
            {stats.map((stat, i) => (
              <div className="ggi-stat-card" key={i}>
                <span className="ggi-stat-number">{stat.value}</span>
                <span className="ggi-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ggi-cta">
        <div className="ggi-container">
          <h2>{ctaText || `Stop Losing ${industry} Customers to the Business Down the Street`}</h2>
          <p>Get your free Geo-Health Scan and see exactly where you stand in your neighborhood.</p>
          <div className="ggi-cta-buttons">
            <Link to="/services-pricing" className="ggi-btn-primary" data-testid="ggi-cta-scan">
              Get Your Free Scan <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="ggi-btn-ghost" data-testid="ggi-cta-contact">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeoGridIndustryPage;
