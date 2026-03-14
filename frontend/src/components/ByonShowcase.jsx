import React from 'react';
import { Link } from 'react-router-dom';
import './ByonShowcase.css';

const ByonShowcase = () => {
  const applications = [
    {
      title: 'Trucking Companies',
      description: 'Fleet management & driver communication',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      link: '/byon-trucking-companies'
    },
    {
      title: 'Real Estate',
      description: 'Secure client communications',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      link: '/byon-real-estate'
    },
    {
      title: 'Field Services',
      description: 'Technician dispatch & coordination',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      link: '/byon-field-services'
    },
    {
      title: 'Finance',
      description: 'Compliant wealth management',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      ),
      link: '/byon-finance'
    },
    {
      title: 'Last-Mile Delivery',
      description: 'Gig economy solutions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      link: '/byon-last-mile'
    },
    {
      title: 'Healthcare',
      description: 'HIPAA-compliant mobile care',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      link: '/byon-healthcare'
    },
    {
      title: 'Government',
      description: 'Secure contractor communications',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      link: '/byon-government'
    },
    {
      title: 'Construction',
      description: 'Jobsite safety & geofencing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 20h20"/>
          <path d="M5 20V8l7-5 7 5v12"/>
          <path d="M9 20v-6h6v6"/>
          <path d="M9 8h6"/>
        </svg>
      ),
      link: '/byon-construction'
    }
  ];

  return (
    <section className="byon-showcase" data-testid="byon-showcase">
      <div className="byon-showcase-container">
        <div className="byon-showcase-header">
          <div className="byon-tmobile-badge">
            <span className="byon-powered">Powered by</span>
            <span className="byon-tmobile">T-Mobile</span>
          </div>
          <h2 className="byon-showcase-title">BYON Applications</h2>
          <p className="byon-showcase-subtitle">
            <strong><span className="byon-letter">B</span>ring <span className="byon-letter">Y</span>our <span className="byon-letter">O</span>wn <span className="byon-letter">N</span>umber</strong>
          </p>
          <p className="byon-showcase-tagline">
            <span>One Cell Phone</span>
            <span className="byon-separator">—</span>
            <span>Two Lines</span>
            <span className="byon-separator">—</span>
            <span>Complete Separation</span>
          </p>
          <p className="byon-showcase-description">
            Our eSIM technology creates a secure, isolated business line on any personal smartphone. 
            Employees keep their privacy, companies maintain security and compliance.
          </p>
        </div>

        <div className="byon-applications-grid">
          {applications.map((app, index) => (
            <Link 
              to={app.link} 
              key={index} 
              className="byon-app-card"
              data-testid={`byon-card-${index}`}
            >
              <div className="byon-app-icon">{app.icon}</div>
              <h3 className="byon-app-title">{app.title}</h3>
              <p className="byon-app-description">{app.description}</p>
              <span className="byon-app-cta">Learn More →</span>
            </Link>
          ))}
        </div>

        <div className="byon-showcase-footer">
          <div className="byon-network-features">
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0114.08 0"/>
                <path d="M1.42 9a16 16 0 0121.16 0"/>
                <path d="M8.53 16.11a6 6 0 016.95 0"/>
                <circle cx="12" cy="20" r="1"/>
              </svg>
              <span>Nationwide 5G</span>
            </div>
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Enterprise Security</span>
            </div>
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ByonShowcase;
