import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, UtensilsCrossed, Wrench, Stethoscope, Scale, Dumbbell, Car } from 'lucide-react';
import './GeoGridShowcase.css';

const GeoGridShowcase = () => {
  const industries = [
    {
      title: 'Restaurants & Cafes',
      description: 'Dominate your neighborhood food searches',
      icon: <UtensilsCrossed size={32} />,
      link: '/geogrid/restaurants'
    },
    {
      title: 'Home Services',
      description: 'Be the first call for plumbing, HVAC & electrical',
      icon: <Wrench size={32} />,
      link: '/geogrid/home-services'
    },
    {
      title: 'Medical & Dental',
      description: 'Capture patients searching "near me"',
      icon: <Stethoscope size={32} />,
      link: '/geogrid/medical'
    },
    {
      title: 'Law Firms',
      description: 'Own your local legal search territory',
      icon: <Scale size={32} />,
      link: '/geogrid/law-firms'
    },
    {
      title: 'Fitness & Wellness',
      description: 'Fill classes from your surrounding blocks',
      icon: <Dumbbell size={32} />,
      link: '/geogrid/fitness'
    },
    {
      title: 'Auto Repair & Service',
      description: 'Become the go-to shop in your zip code',
      icon: <Car size={32} />,
      link: '/geogrid/auto-repair'
    }
  ];

  return (
    <section className="geogrid-showcase" data-testid="geogrid-showcase">
      <div className="geogrid-showcase-container">
        <div className="geogrid-showcase-header">
          <div className="geogrid-badge">
            <MapPin size={16} />
            <span className="geogrid-badge-text">Local Search Dominance</span>
          </div>
          <h2 className="geogrid-showcase-title">GeoGrid</h2>
          <p className="geogrid-showcase-tagline">
            <span>From "Strings" to "Things"</span>
            <span className="geogrid-separator">|</span>
            <span>Become the Source of Truth</span>
            <span className="geogrid-separator">|</span>
            <span>Dominate Every Block</span>
          </p>
          <p className="geogrid-showcase-description">
            Google stopped matching keywords. Now it matches entities — real businesses in real places. 
            Your customers are searching for you right now, but finding your competitors instead. 
            GeoGrid makes your business the trusted local authority on every block in your neighborhood.
          </p>
          <Link to="/geogrid" className="geogrid-overview-link" data-testid="geogrid-overview-link">
            See How It Works
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="geogrid-industries-grid">
          {industries.map((industry, index) => (
            <Link
              to={industry.link}
              key={index}
              className="geogrid-industry-card"
              data-testid={`geogrid-card-${index}`}
            >
              <div className="geogrid-industry-icon">{industry.icon}</div>
              <h3 className="geogrid-industry-title">{industry.title}</h3>
              <p className="geogrid-industry-description">{industry.description}</p>
              <span className="geogrid-industry-cta">Learn More</span>
            </Link>
          ))}
        </div>

        <div className="geogrid-showcase-footer">
          <div className="geogrid-stats">
            <div className="geogrid-stat">
              <span className="geogrid-stat-number">46%</span>
              <span className="geogrid-stat-label">of Google searches are local</span>
            </div>
            <div className="geogrid-stat-divider"></div>
            <div className="geogrid-stat">
              <span className="geogrid-stat-number">78%</span>
              <span className="geogrid-stat-label">of local searches lead to a purchase within 24hrs</span>
            </div>
            <div className="geogrid-stat-divider"></div>
            <div className="geogrid-stat">
              <span className="geogrid-stat-number">97%</span>
              <span className="geogrid-stat-label">of consumers search online for local businesses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeoGridShowcase;
