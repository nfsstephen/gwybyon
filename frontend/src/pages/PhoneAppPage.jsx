import React from 'react';
import './PhoneAppPage.css';

const PhoneAppPage = () => {
  return (
    <div className="phone-app-page">
      {/* Hero Section */}
      <section className="pa-hero">
        <div className="pa-hero-overlay"></div>
        <div className="pa-hero-content">
          <div className="pa-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="pa-page-title">Secure Driver Communications</h1>
          <p className="pa-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Protecting Your Drivers. Securing Your Cargo.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="pa-problem-section">
        <div className="pa-container">
          <div className="pa-problem-header">
            <div className="pa-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Growing Threat of Cargo Theft</h2>
          </div>
          <div className="pa-problem-content">
            <div className="pa-problem-stats">
              <div className="pa-stat-card">
                <span className="pa-stat-number">$500M+</span>
                <span className="pa-stat-label">Annual Cargo Theft Losses</span>
              </div>
              <div className="pa-stat-card">
                <span className="pa-stat-number">70%</span>
                <span className="pa-stat-label">Involve Phone-Based Fraud</span>
              </div>
              <div className="pa-stat-card">
                <span className="pa-stat-number">24/7</span>
                <span className="pa-stat-label">Drivers Are Vulnerable</span>
              </div>
            </div>
            <div className="pa-problem-text">
              <p>
                <strong>Cargo theft often begins with a phone call.</strong> Criminals pose as dispatchers, 
                brokers, or company representatives, tricking drivers into re-routing loads to 
                unauthorized destinations. By the time the deception is discovered, your cargo is gone.
              </p>
              <p>
                Traditional phone systems leave drivers exposed. They have no way to verify if a 
                caller is legitimate, making them easy targets for sophisticated social engineering attacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="pa-solution-section">
        <div className="pa-container">
          <h2>The Solution: One Phone, Two Numbers, Total Security</h2>
          <p className="pa-solution-subtitle">
            Our eSIM technology creates an impenetrable barrier between your drivers and potential threats
          </p>
          
          <div className="pa-phone-demo">
            <div className="pa-phone-mockup">
              <div className="pa-phone-frame">
                <div className="pa-phone-notch"></div>
                <div className="pa-phone-screen">
                  <div className="pa-phone-header">
                    <span>Incoming Call</span>
                  </div>
                  <div className="pa-phone-caller">
                    <div className="pa-caller-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <div className="pa-caller-info">
                      <span className="pa-caller-name">ABC Logistics Dispatch</span>
                      <span className="pa-caller-status pa-verified">✓ VERIFIED CALLER</span>
                    </div>
                  </div>
                  <div className="pa-phone-actions">
                    <div className="pa-action-btn pa-decline">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                      </svg>
                    </div>
                    <div className="pa-action-btn pa-accept">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pa-phone-label">Company eSIM Line</div>
            </div>
            
            <div className="pa-dual-number-info">
              <div className="pa-number-card pa-personal">
                <div className="pa-number-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4>Personal Number</h4>
                <p>Driver's existing phone number for personal calls, family, and friends</p>
              </div>
              <div className="pa-number-divider">
                <span>+</span>
              </div>
              <div className="pa-number-card pa-company">
                <div className="pa-number-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <h4>Company eSIM Number</h4>
                <p>Secure business line with verified caller screening and company control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="pa-how-it-works">
        <div className="pa-container">
          <h2>How It Works</h2>
          <p className="pa-section-subtitle">Every call is verified before it reaches your driver</p>
          
          <div className="pa-flow-diagram">
            <div className="pa-flow-step">
              <div className="pa-flow-number">1</div>
              <div className="pa-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h4>Incoming Call</h4>
              <p>Someone dials the driver's company eSIM number</p>
            </div>
            
            <div className="pa-flow-arrow">→</div>
            
            <div className="pa-flow-step">
              <div className="pa-flow-number">2</div>
              <div className="pa-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h4>Company Screening</h4>
              <p>Call routes through company phone system for verification</p>
            </div>
            
            <div className="pa-flow-arrow">→</div>
            
            <div className="pa-flow-step">
              <div className="pa-flow-number">3</div>
              <div className="pa-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4>Trusted Caller?</h4>
              <p>System checks if caller is in the approved contacts list</p>
            </div>
            
            <div className="pa-flow-arrow">→</div>
            
            <div className="pa-flow-step">
              <div className="pa-flow-number">4</div>
              <div className="pa-flow-icon pa-secure">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <h4>Secure Connection</h4>
              <p>Verified calls connect to driver with caller ID confirmation</p>
            </div>
          </div>
          
          <div className="pa-blocked-calls">
            <div className="pa-blocked-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
              <h4>Unverified Callers?</h4>
            </div>
            <p>
              Unknown callers are handled according to company policy: blocked, sent to voicemail, 
              or routed to dispatch for manual verification. <strong>Your driver is never exposed to potential threats.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pa-benefits-section">
        <div className="pa-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="pa-benefits-grid">
            <div className="pa-benefit-column">
              <div className="pa-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
                <h3>For Trucking Companies</h3>
              </div>
              <ul className="pa-benefit-list">
                <li>Complete control over driver communications</li>
                <li>Manage approved caller lists in real-time</li>
                <li>Protect cargo from social engineering attacks</li>
                <li>Reduce insurance claims from theft</li>
                <li>Monitor and log all business calls</li>
                <li>Easy onboarding for new drivers and contractors</li>
              </ul>
            </div>
            
            <div className="pa-benefit-column">
              <div className="pa-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Drivers</h3>
              </div>
              <ul className="pa-benefit-list">
                <li>Peace of mind - know every caller is verified</li>
                <li>Keep personal number private from work contacts</li>
                <li>No second phone needed - one device does it all</li>
                <li>Protection from scams and fraud attempts</li>
                <li>Clear separation between work and personal life</li>
                <li>Confidence to answer every company call</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="pa-partnership-section">
        <div className="pa-container">
          <div className="pa-partnership-content">
            <div className="pa-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's extensive nationwide network, ensuring 
                reliable connectivity wherever the road takes your drivers. With industry-leading 
                coverage and 5G capabilities, your secure communications never miss a beat.
              </p>
              <ul className="pa-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Instant eSIM activation</li>
                <li>Enterprise-grade security</li>
                <li>24/7 network reliability</li>
              </ul>
            </div>
            <div className="pa-partnership-visual">
              <div className="pa-network-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12.55a11 11 0 0114.08 0"/>
                  <path d="M1.42 9a16 16 0 0121.16 0"/>
                  <path d="M8.53 16.11a6 6 0 016.95 0"/>
                  <circle cx="12" cy="20" r="1"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pa-cta-section">
        <div className="pa-container">
          <h2>Protect Your Fleet Today</h2>
          <p>Don't wait for cargo theft to impact your business. Secure your driver communications now.</p>
          <div className="pa-cta-buttons">
            <a href="/contact" className="pa-btn pa-btn-primary">Request a Demo</a>
            <a href="/contact" className="pa-btn pa-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PhoneAppPage;
