import React from 'react';
import Implementation from '../components/Implementation';
import './ParkingLotControlPage.css';

const ParkingLotControlPage = () => {
  return (
    <div className="parking-lot-control-page">
      {/* Hero Section with Background Image */}
      <section className="plc-hero">
        <div className="plc-hero-overlay"></div>
        <div className="plc-hero-content">
          <h1 data-testid="plc-page-title">Parking Lot Control</h1>
          <p className="plc-hero-subtitle">
            Intelligent solutions for truck stop parking management
          </p>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="plc-business-model">
        <div className="plc-container">
          <div className="plc-model-header">
            <h2 data-testid="plc-model-title">Free Products Guarantee Their Own Shortage</h2>
            <p className="plc-model-subtitle">
              The traditional Truck Stop free overnight truck parking Model<br />
              has created a shortage of Overnight Truck Parking.
            </p>
          </div>

          <h3 className="plc-and-divider">AND</h3>
          <h3 className="plc-approach-title">A New and Smarter Convenience Store Model</h3>

          {/* Three Column Features */}
          <div className="plc-features-grid">
            <div className="plc-feature-card" data-testid="plc-feature-fuel">
              <div className="plc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L12 22M3 12L21 12M5 6L19 6M5 18L19 18"/>
                </svg>
              </div>
              <h4>Provide Commercial Fuel Pumps</h4>
              <p>Full-service fueling stations for commercial vehicles</p>
            </div>
            
            <div className="plc-feature-card" data-testid="plc-feature-pricing">
              <div className="plc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                </svg>
              </div>
              <h4>Cheaper Fuel</h4>
              <p>Attract Customers with Cheaper Diesel Pricing</p>
            </div>
            
            <div className="plc-feature-card" data-testid="plc-feature-parking">
              <div className="plc-feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 17V7h4a3 3 0 010 6H9"/>
                </svg>
              </div>
              <h4>Charge for Overnight Parking</h4>
              <p>Generate ROI from your parking infrastructure investment</p>
            </div>
          </div>
          
          <div className="plc-model-content">
            <div className="plc-model-text">
              <p>
                Providing commercial fuel lanes with limited truck parking creates a more 
                profitable operation. Drivers can park and shop with ease during business hours, 
                while overnight parking becomes available for a reasonable fee.
              </p>
              <p>
                Offering free overnight parking is a difficult expense to offset through fuel 
                sales alone. Monetize your parking assets while maintaining 
                excellent customer relationships.
              </p>
              <p>
                Remove barriers to your parking, ease of entrance and exit, for the driver. Removes the management 
                burden from the driver, without losing control of your parking facility.
              </p>
              <p className="plc-gates-callout">
                NO ONE likes GATES.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Lot Signage Section */}
      <section className="plc-signage-section">
        <div className="plc-container">
          <div className="plc-signage-content">
            <div className="plc-signage-text">
              <h2 data-testid="plc-signage-title">Parking Lot Signage</h2>
              <p>
                Drivers are hardworking and honest individuals who earn every dollar through 
                dedication and effort. They will respect and appreciate your decision to charge 
                for the services you provide, recognizing the value and fairness in your offering.
              </p>
              <p>
                Clear, professional signage communicates your policies effectively and sets 
                proper expectations for all visitors to your facility.
              </p>
            </div>
            <div className="plc-signage-visual">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2025/06/parkingLotControll-1.png" 
                alt="Parking Lot Signage" 
                className="plc-signage-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Cart Section */}
      <section className="plc-mobile-cart-section">
        <div className="plc-container">
          <div className="plc-mobile-cart-content">
            <div className="plc-mobile-cart-visual">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2024/06/Mobile-Cart-1.png" 
                alt="Mobile Cart for AI LPR" 
                className="plc-cart-image"
              />
            </div>
            <div className="plc-mobile-cart-text">
              <h2 data-testid="plc-cart-title">Mobile Cart for AI LPR</h2>
              <p>
                Quickly and effectively establish verifiable, documented evidence of which 
                trucks parked in which spaces and at what times.
              </p>
              <p>
                Our unique Mobile Cart system uses advanced License Plate Recognition technology 
                to automate parking management and enforcement. See the difference it can make 
                in managing your parking facility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Store Monitors Section */}
      <section className="plc-monitors-section">
        <div className="plc-container">
          <div className="plc-monitors-content">
            <div className="plc-monitors-text">
              <h2 data-testid="plc-monitors-title">In-Store Monitors</h2>
              <p>
                Provide real-time updates to both drivers and store operators, displaying 
                the current status of your parking facility and fuel lanes.
              </p>
              <ul className="plc-monitors-features">
                <li>Live parking space availability</li>
                <li>Fuel lane status updates</li>
                <li>Real-time occupancy tracking</li>
                <li>Driver notifications and alerts</li>
              </ul>
            </div>
            <div className="plc-monitors-visual">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2024/05/Untitled-design12121-1.png" 
                alt="In-Store Monitors" 
                className="plc-monitors-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="plc-roi-section">
        <div className="plc-container">
          <div className="plc-roi-content">
            <div className="plc-roi-text">
              <h2 data-testid="plc-roi-title">Calculate Your Return on Investment</h2>
              <p className="plc-roi-subtitle">
                See exactly how much revenue your parking facility can generate.
              </p>
              <p>
                Our ROI Calculator helps you understand the financial impact of implementing 
                paid overnight parking at your truck stop. Simply enter your facility details 
                and see projected returns.
              </p>
              <ul className="plc-roi-features">
                <li>Estimate monthly and annual parking revenue</li>
                <li>Factor in your specific operating costs</li>
                <li>Project ROI timeline for your investment</li>
                <li><strong>Remember: Free Parking is PURE EXPENSE</strong></li>
              </ul>
            </div>
            <div className="plc-roi-buttons">
              <a href="/calculator/corporate" className="plc-btn plc-btn-roi" data-testid="plc-corporate-roi-btn">
                Corporate Parking ROI
              </a>
              <a href="/calculator/store" className="plc-btn plc-btn-roi plc-btn-roi-secondary" data-testid="plc-store-roi-btn">
                Store Parking ROI
              </a>
              <button className="plc-btn plc-btn-roi plc-btn-roi-quote" data-testid="plc-request-quote-btn">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <Implementation />

      {/* CTA Section */}
      <section className="plc-cta-section">
        <div className="plc-container">
          <h2 data-testid="plc-cta-title">Ready to Optimize Your Parking Operations?</h2>
          <p>Contact us today to learn how our parking lot control solutions can transform your business.</p>
          <a href="/contact" className="plc-btn plc-btn-large" data-testid="plc-contact-btn">Get Started</a>
        </div>
      </section>
    </div>
  );
};

export default ParkingLotControlPage;
