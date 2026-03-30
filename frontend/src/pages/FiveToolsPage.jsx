import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, Settings, FileText, Star, BarChart3 } from 'lucide-react';
import FiveToolsSection from '../components/FiveToolsSection';
import './FiveToolsPage.css';

export default function FiveToolsPage() {
  return (
    <div className="ftp-page" data-testid="five-tools-page">

      {/* Hero */}
      <section className="ftp-hero">
        <div className="ftp-hero-inner">
          <span className="ftp-hero-badge">GEOGRID PLATFORM</span>
          <h2 className="ftp-hero-brand">GeoGrid</h2>
          <h1 className="ftp-hero-title">
            Five Proprietary Tools<br />to Dominate Local Search
          </h1>
          <p className="ftp-hero-subtitle">
            Google ranks local businesses on three factors: proximity, relevance, and prominence.
            Our five <span className="ftp-geogrid-highlight">GeoGrid</span> tools are engineered to maximize all three — giving you measurable
            control over your local search visibility for the first time.
          </p>
          <div className="ftp-hero-tools">
            <div className="ftp-tool-pill"><Crosshair size={15} /> Geo-Health Scanner</div>
            <div className="ftp-tool-pill"><Settings size={15} /> Entity-Sync Dashboard</div>
            <div className="ftp-tool-pill"><FileText size={15} /> Content Engine</div>
            <div className="ftp-tool-pill"><Star size={15} /> Review Magnet</div>
            <div className="ftp-tool-pill"><BarChart3 size={15} /> ROI Tracker</div>
          </div>
          <div className="ftp-hero-cta">
            <Link to="/subscribe" className="ftp-btn-primary" data-testid="ftp-subscribe-btn">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/services-pricing" className="ftp-btn-ghost">View Pricing</Link>
          </div>
        </div>
      </section>

      {/* Five Tools Detail (reused component) */}
      <FiveToolsSection
        title="How Each Tool Works"
        subtitle="Each tool targets a specific factor in Google's local ranking algorithm. Together, they give you complete visibility and control over your local search presence."
      />

      {/* Next Step CTA */}
      <section className="ftp-next-step">
        <div className="ftp-next-step-inner">
          <h3 className="ftp-next-step-title">What's Next?</h3>
          <p className="ftp-next-step-text">
            Now that you understand the five tools that drive your search rankings, 
            learn about the marketing website that serves as the foundation of your 
            entire online presence.
          </p>
          <Link to="/web-service-v2" className="ftp-next-step-btn" data-testid="ftp-cta-webservices">
            Explore Web Services <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
