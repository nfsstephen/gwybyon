import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, HardHat, Home, ArrowRight, Sparkles } from 'lucide-react';
import './SingleSourceTruth.css';

const SingleSourceTruth = () => {
  return (
    <section className="sst-section" data-testid="sst-home-teaser">
      <div className="sst-bg" aria-hidden="true">
        <div className="sst-bg-grid"></div>
        <div className="sst-bg-glow"></div>
      </div>

      <div className="sst-container">
        <div className="sst-eyebrow" data-testid="sst-home-eyebrow">
          <Sparkles size={14} />
          NEW · CREW MANAGEMENT TOOL
        </div>

        {/* The phrase is the hero element */}
        <div className="sst-phrase" data-testid="sst-home-phrase">
          <span className="sst-phrase-line"></span>
          <span className="sst-phrase-text">
            <em>"A Single Source of Truth"</em>
          </span>
          <span className="sst-phrase-line"></span>
        </div>

        <h2 className="sst-title">
          Your website doesn't just <span className="sst-strike">advertise</span> anymore.<br />
          It keeps the <span className="sst-accent">office</span>, the <span className="sst-accent">crew</span>,
          and the <span className="sst-accent-bold">customer</span> on the same page.
        </h2>

        <p className="sst-sub">
          When the schedule changes — the office knows, the crew knows, the customer knows.
          One source of truth, visible to whoever needs it. No group texts. No sticky notes.
          No "where's the rig?" voicemails.
        </p>

        {/* Three-pill mini diagram */}
        <div className="sst-pills" data-testid="sst-three-pills">
          <div className="sst-pill">
            <div className="sst-pill-ring"><Building2 size={18} /></div>
            <span>Office</span>
          </div>
          <div className="sst-connector" aria-hidden="true">
            <span className="sst-dot"></span>
            <span className="sst-line"></span>
            <span className="sst-dot"></span>
          </div>
          <div className="sst-pill">
            <div className="sst-pill-ring"><HardHat size={18} /></div>
            <span>Crew</span>
          </div>
          <div className="sst-connector" aria-hidden="true">
            <span className="sst-dot"></span>
            <span className="sst-line"></span>
            <span className="sst-dot"></span>
          </div>
          <div className="sst-pill">
            <div className="sst-pill-ring"><Home size={18} /></div>
            <span>Customer</span>
          </div>
        </div>

        <div className="sst-aligned" data-testid="sst-aligned-note">
          This is the product that joins our objectives together —
          <strong> we don't make money when you stand still, we make money when you grow.</strong>
        </div>

        <Link to="/crew-management" className="sst-cta" data-testid="sst-home-cta">
          See How It Works
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default SingleSourceTruth;
