import React from 'react';
import { Link } from 'react-router-dom';
import './FuelLaneControlPage.css';

const FuelLaneControlPage = () => {
  return (
    <div className="fuel-lane-control-page">
      {/* Hero Section with Background Image */}
      <section className="flc-hero">
        <div className="flc-hero-overlay"></div>
        <div className="flc-hero-content">
          <h1 data-testid="flc-page-title">Fuel Lane Control</h1>
          <p className="flc-hero-subtitle">
            Intelligent monitoring for your fuel lanes
          </p>
        </div>
      </section>

      {/* Three Key Points Section */}
      <section className="flc-key-points">
        <div className="flc-container">
          <h2 className="flc-key-points-title">Three Key Points</h2>
          <div className="flc-points-grid">
            <div className="flc-point-card" data-testid="flc-point-1">
              <div className="flc-point-number">1</div>
              <p>Limited Truck Parking requires that you monitor your Fuel Lanes.</p>
            </div>
            
            <div className="flc-point-card" data-testid="flc-point-2">
              <div className="flc-point-number">2</div>
              <p>How do you know if Trucks are taking their 30 minute break in your fuel lane?</p>
            </div>
            
            <div className="flc-point-card" data-testid="flc-point-3">
              <div className="flc-point-number">3</div>
              <p>How can you sell fuel if trucks are blocking your pumps?</p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Store Monitors Section */}
      <section className="flc-monitors-section">
        <div className="flc-container">
          <div className="flc-monitors-content">
            <div className="flc-monitors-text">
              <h2 data-testid="flc-monitors-title">In-Store Monitors</h2>
              <p>
                Monitors installed above the fuel desk keep both drivers and store staff 
                informed with <strong>real-time visibility</strong> into the status of 
                <strong> parking spaces and fuel lanes</strong>, ensuring everyone knows 
                what's available and where delays may occur.
              </p>
            </div>
            <div className="flc-monitors-visual">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2024/05/Untitled-design12121.png" 
                alt="In-Store Monitors" 
                className="flc-monitors-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Lane Image Section */}
      <section className="flc-lane-section">
        <div className="flc-container">
          <div className="flc-lane-image-wrapper">
            <img 
              src="https://gatewayaisystems.com/wp-content/uploads/2024/05/Lane-image06-1024x576.jpg" 
              alt="Fuel Lane Monitoring" 
              className="flc-lane-image"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="flc-benefits-section">
        <div className="flc-container">
          <h2 data-testid="flc-benefits-title">Benefits</h2>
          <div className="flc-benefits-image-wrapper">
            <img 
              src="https://gatewayaisystems.com/wp-content/uploads/2024/04/Infographics-2.png" 
              alt="Fuel Lane Control Benefits" 
              className="flc-benefits-image"
            />
            <div className="flc-benefit-overlay flc-benefit-1">
              <span>BUILD CUSTOMER</span>
              <span>TRUST</span>
            </div>
            <div className="flc-benefit-overlay flc-benefit-2">
              <span>TREAT CUSTOMERS</span>
              <span>FAIRLY</span>
            </div>
            <div className="flc-benefit-overlay flc-benefit-3">
              <span>INCREASE CUSTOMER</span>
              <span>SERVICE</span>
            </div>
            <div className="flc-benefit-overlay flc-benefit-4">
              <span>EMPOWER YOUR</span>
              <span>TEAM MEMBERS</span>
            </div>
            <div className="flc-benefit-overlay flc-benefit-5">
              <span>SELL MORE</span>
              <span>FUEL</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="flc-features-section">
        <div className="flc-container">
          <h2 data-testid="flc-features-title">Key Features</h2>
          <p className="flc-features-subtitle">Multiple benefits all inter-related</p>
          
          <div className="flc-features-grid">
            <div className="flc-feature-item" data-testid="flc-feature-time">
              <div className="flc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>Time Tracking</h3>
            </div>
            
            <div className="flc-feature-item" data-testid="flc-feature-display">
              <div className="flc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <h3>In-Store Display</h3>
            </div>
            
            <div className="flc-feature-item" data-testid="flc-feature-recognition">
              <div className="flc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="6" width="18" height="12" rx="2"/>
                  <path d="M7 12h2M15 12h2"/>
                </svg>
              </div>
              <h3>Vehicle Recognition</h3>
            </div>
            
            <div className="flc-feature-item" data-testid="flc-feature-timing">
              <div className="flc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <h3>Time Both Fuel Lane and Pull Up Space</h3>
            </div>
            
            <div className="flc-feature-item" data-testid="flc-feature-lane">
              <div className="flc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L12 22M4 12h16"/>
                  <rect x="6" y="6" width="12" height="12" rx="1"/>
                </svg>
              </div>
              <h3>Lane Specific</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flc-cta-section">
        <div className="flc-container">
          <h2 data-testid="flc-cta-title">Optimize Your Fuel Lane Operations</h2>
          <p>Contact us to learn how fuel lane monitoring can improve your truck stop efficiency.</p>
          <a href="/contact" className="flc-btn flc-btn-cta" data-testid="flc-contact-btn">Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default FuelLaneControlPage;
