import React from 'react';
import { RefreshCw, MapPin, ArrowRight } from 'lucide-react';
import './StrategyOverview.css';

const StrategyOverview = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="strategy-overview">
      <div className="so-content">
        <div className="so-badge">OUR MARKETING STRATEGY</div>
        <h1 className="so-title">A Two-Pronged Approach to Market Dominance</h1>
        <p className="so-subtitle">
          We don't rely on a single sales channel. We've built a coordinated strategy 
          that targets high-value customers from two angles — each reinforcing the other 
          to create a marketing engine that scales.
        </p>

        <div className="so-prongs">
          <div className="so-prong so-prong-1">
            <div className="so-prong-number">01</div>
            <div className="so-prong-icon"><MapPin size={32} /></div>
            <h3>Market Territories</h3>
            <p>
              Assign exclusive territories so our customers never compete against each other. 
              We fight for them, not between them. Scarcity creates urgency and loyalty.
            </p>
            <button className="so-prong-btn so-btn-1" onClick={() => scrollTo('section-territories')}>
              Explore Strategy <ArrowRight size={16} />
            </button>
          </div>

          <div className="so-prong so-prong-2">
            <div className="so-prong-number">02</div>
            <div className="so-prong-icon"><RefreshCw size={32} /></div>
            <h3>Cross Selling</h3>
            <p>
              Every business that needs GeoGrid also has field teams that need BYON. 
              One vendor, two solutions. Double the revenue per customer without doubling the effort.
            </p>
            <button className="so-prong-btn so-btn-2" onClick={() => scrollTo('section-crosssell')}>
              Explore Strategy <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategyOverview;
