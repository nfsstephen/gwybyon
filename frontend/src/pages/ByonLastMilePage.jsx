import React from 'react';
import './ByonLastMilePage.css';

const ByonLastMilePage = () => {
  return (
    <div className="last-mile-page">
      {/* Hero Section */}
      <section className="lm-hero">
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content">
          <div className="lm-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="lm-page-title">Verified Driver Identity</h1>
          <p className="lm-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Know Exactly Who's Behind the Wheel.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="lm-problem-section">
        <div className="lm-container">
          <div className="lm-problem-header">
            <div className="lm-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Account Renting Crisis</h2>
          </div>
          <div className="lm-problem-content">
            <div className="lm-problem-cards">
              <div className="lm-problem-card lm-renting">
                <div className="lm-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <h3>Ghost Drivers on Your Platform</h3>
                <p>Verified drivers are renting their accounts to unvetted strangers—sometimes for hundreds of dollars per week. The person who passed your background check isn't the one picking up customers or delivering packages.</p>
                <div className="lm-stat-highlight">
                  <span className="lm-stat-number">30%</span>
                  <span className="lm-stat-text">of gig economy fraud involves account sharing or rental schemes</span>
                </div>
              </div>
              
              <div className="lm-problem-card lm-liability">
                <div className="lm-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3>Massive Liability Exposure</h3>
                <p>When an unverified driver causes an incident, your company is liable. You certified them as "background checked" to customers. Lawsuits, regulatory action, and brand damage follow.</p>
                <div className="lm-stat-highlight">
                  <span className="lm-stat-number">$500M+</span>
                  <span className="lm-stat-text">in settlements from incidents involving unverified gig workers</span>
                </div>
              </div>
            </div>
            
            <div className="lm-problem-visual">
              <div className="lm-swap-diagram">
                <div className="lm-driver-card lm-verified">
                  <div className="lm-driver-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <span className="lm-driver-label">Verified Driver</span>
                  <span className="lm-driver-status lm-checked">✓ Background Checked</span>
                </div>
                
                <div className="lm-swap-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                  <span>Account Swap</span>
                </div>
                
                <div className="lm-driver-card lm-unknown">
                  <div className="lm-driver-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <span className="lm-driver-label">Unknown Person</span>
                  <span className="lm-driver-status lm-danger">⚠ Unverified</span>
                </div>
              </div>
              <p className="lm-swap-caption">Current systems can't detect when accounts change hands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="lm-solution-section">
        <div className="lm-container">
          <h2>The Solution: Hardware-Locked Identity</h2>
          <p className="lm-solution-subtitle">
            The BYON eSIM creates an unbreakable link between the verified driver and the device
          </p>
          
          <div className="lm-phone-demo">
            <div className="lm-phone-mockup">
              <div className="lm-phone-frame">
                <div className="lm-phone-notch"></div>
                <div className="lm-phone-screen">
                  <div className="lm-phone-header">
                    <span>Driver Verification Active</span>
                  </div>
                  <div className="lm-identity-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>Identity Verified</span>
                  </div>
                  <div className="lm-driver-profile">
                    <div className="lm-profile-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <div className="lm-profile-info">
                      <span className="lm-profile-name">Marcus Johnson</span>
                      <span className="lm-profile-id">ID: DRV-4829</span>
                    </div>
                  </div>
                  <div className="lm-verification-checks">
                    <div className="lm-check-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>eSIM Active</span>
                    </div>
                    <div className="lm-check-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Biometric Match</span>
                    </div>
                    <div className="lm-check-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      <span>Device Bound</span>
                    </div>
                  </div>
                  <div className="lm-app-status">
                    <span>Dispatch App: UNLOCKED</span>
                  </div>
                </div>
              </div>
              <div className="lm-phone-label">Driver's Phone</div>
            </div>
            
            <div className="lm-lock-features">
              <div className="lm-feature-card">
                <div className="lm-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h4>Device Binding</h4>
                <p>The eSIM is locked to one specific device. Moving it triggers immediate alerts.</p>
              </div>
              <div className="lm-feature-card">
                <div className="lm-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
                  </svg>
                </div>
                <h4>Biometric Verification</h4>
                <p>Periodic face or fingerprint checks confirm the right person is using the app.</p>
              </div>
              <div className="lm-feature-card">
                <div className="lm-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h4>SIM Swap Detection</h4>
                <p>Any attempt to move or clone the eSIM instantly disables the driver account.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="lm-how-it-works">
        <div className="lm-container">
          <h2>Chain of Custody: Always Verified</h2>
          <p className="lm-section-subtitle">Continuous identity verification from login to delivery</p>
          
          <div className="lm-flow-diagram">
            <div className="lm-flow-step">
              <div className="lm-flow-number">1</div>
              <div className="lm-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h4>App Launch</h4>
              <p>Driver opens dispatch app on their BYON-enabled device</p>
            </div>
            
            <div className="lm-flow-arrow">→</div>
            
            <div className="lm-flow-step">
              <div className="lm-flow-number">2</div>
              <div className="lm-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <path d="M12 18h.01"/>
                </svg>
              </div>
              <h4>eSIM Check</h4>
              <p>System verifies the correct Business eSIM is active</p>
            </div>
            
            <div className="lm-flow-arrow">→</div>
            
            <div className="lm-flow-step">
              <div className="lm-flow-number">3</div>
              <div className="lm-flow-icon lm-biometric">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
                </svg>
              </div>
              <h4>Biometric Confirm</h4>
              <p>Face or fingerprint confirms the verified driver</p>
            </div>
            
            <div className="lm-flow-arrow">→</div>
            
            <div className="lm-flow-step">
              <div className="lm-flow-number">4</div>
              <div className="lm-flow-icon lm-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4>Identity Locked</h4>
              <p>Continuous verification throughout the shift</p>
            </div>
          </div>
          
          <div className="lm-detection-callout">
            <div className="lm-detection-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <h4>Account Sharing Attempt Detected?</h4>
            </div>
            <p>
              If the eSIM is removed, the device changes, or biometrics don't match—the app instantly locks. 
              <strong>No delivery. No ride. No exception.</strong> The platform is notified immediately for investigation.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="lm-usecases-section">
        <div className="lm-container">
          <h2>Protecting Every Platform</h2>
          
          <div className="lm-usecases-grid">
            <div className="lm-usecase-card">
              <div className="lm-usecase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                </svg>
              </div>
              <h4>Rideshare</h4>
              <p>Uber, Lyft, and regional services. Passengers know their verified driver is who the app says.</p>
            </div>
            
            <div className="lm-usecase-card">
              <div className="lm-usecase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h4>Package Delivery</h4>
              <p>Amazon Flex, FedEx contractors, and last-mile services. Every package handled by a verified driver.</p>
            </div>
            
            <div className="lm-usecase-card">
              <div className="lm-usecase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 010 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <h4>Food Delivery</h4>
              <p>DoorDash, Uber Eats, Grubhub. Food safety meets driver safety with verified couriers.</p>
            </div>
            
            <div className="lm-usecase-card">
              <div className="lm-usecase-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h4>Grocery & Retail</h4>
              <p>Instacart, Shipt, and retail delivery. Trust for high-value and perishable deliveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="lm-benefits-section">
        <div className="lm-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="lm-benefits-grid">
            <div className="lm-benefit-column">
              <div className="lm-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <h3>For Platforms</h3>
              </div>
              <ul className="lm-benefit-list">
                <li>Eliminate account renting and sharing fraud</li>
                <li>Reduce liability from unverified drivers</li>
                <li>Demonstrate safety commitment to regulators</li>
                <li>Build customer trust with verified drivers</li>
                <li>Real-time alerts for suspicious activity</li>
                <li>Complete audit trail for every trip/delivery</li>
              </ul>
            </div>
            
            <div className="lm-benefit-column">
              <div className="lm-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Drivers</h3>
              </div>
              <ul className="lm-benefit-list">
                <li>Protect your account from theft or misuse</li>
                <li>Higher ratings from verified trust signals</li>
                <li>Keep personal number separate from work</li>
                <li>No second phone needed</li>
                <li>Premium job access for verified drivers</li>
                <li>Protection from false fraud accusations</li>
              </ul>
            </div>
            
            <div className="lm-benefit-column lm-customers">
              <div className="lm-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <h3>For Customers</h3>
              </div>
              <ul className="lm-benefit-list">
                <li>Confidence the driver is background-checked</li>
                <li>Real verification, not just a photo</li>
                <li>Safer rides and deliveries</li>
                <li>Trust signals visible in-app</li>
                <li>Peace of mind for every order</li>
                <li>Accountability if issues arise</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="lm-partnership-section">
        <div className="lm-container">
          <div className="lm-partnership-content">
            <div className="lm-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's nationwide network and advanced security 
                infrastructure. Drivers stay connected and verified whether they're in urban centers 
                or suburban neighborhoods.
              </p>
              <ul className="lm-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Secure eSIM provisioning</li>
                <li>Real-time verification</li>
                <li>24/7 network reliability</li>
              </ul>
            </div>
            <div className="lm-partnership-visual">
              <div className="lm-network-icon">
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
      <section className="lm-cta-section">
        <div className="lm-container">
          <h2>Verify Every Driver. Every Trip.</h2>
          <p>Stop account renting. Start building trust with hardware-locked driver identity.</p>
          <div className="lm-cta-buttons">
            <a href="/contact" className="lm-btn lm-btn-primary">Request a Demo</a>
            <a href="/contact" className="lm-btn lm-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonLastMilePage;
