import React from 'react';
import './ByonFieldServicesPage.css';

const ByonFieldServicesPage = () => {
  return (
    <div className="field-services-page">
      {/* Hero Section */}
      <section className="fs-hero">
        <div className="fs-hero-overlay"></div>
        <div className="fs-hero-content">
          <div className="fs-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="fs-page-title">Verified Technician Communications</h1>
          <p className="fs-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Building Trust Before You Knock.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="fs-problem-section">
        <div className="fs-container">
          <div className="fs-problem-header">
            <div className="fs-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Stranger at the Door</h2>
          </div>
          <div className="fs-problem-content">
            <div className="fs-problem-cards">
              <div className="fs-problem-card fs-trust">
                <div className="fs-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <h3>Homeowner Hesitation</h3>
                <p>Today's homeowners are more cautious than ever. Unknown callers go unanswered. Doors stay locked. Even legitimate service appointments get cancelled because customers can't verify who's really calling or knocking.</p>
                <div className="fs-stat-highlight">
                  <span className="fs-stat-number">67%</span>
                  <span className="fs-stat-text">of homeowners don't answer calls from unknown numbers</span>
                </div>
              </div>
              
              <div className="fs-problem-card fs-fraud">
                <div className="fs-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                    <line x1="18" y1="8" x2="23" y2="13"/>
                    <line x1="23" y1="8" x2="18" y2="13"/>
                  </svg>
                </div>
                <h3>Impersonation Fraud</h3>
                <p>Criminals regularly pose as utility workers, plumbers, and electricians to gain entry into homes. These scams make legitimate technicians suffer—customers assume the worst when anyone shows up at their door.</p>
                <div className="fs-stat-highlight">
                  <span className="fs-stat-number">$350M</span>
                  <span className="fs-stat-text">lost annually to home service impersonation scams</span>
                </div>
              </div>
            </div>
            
            <div className="fs-problem-text">
              <p>
                <strong>Your technicians are paying the price for criminals' actions.</strong> Missed appointments, 
                wasted drive time, and frustrated customers—all because there's no easy way to prove 
                your team is who they say they are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="fs-solution-section">
        <div className="fs-container">
          <h2>The Solution: T-Mobile Verified Business Calling</h2>
          <p className="fs-solution-subtitle">
            Instant trust verification that appears on your customer's phone before they even answer
          </p>
          
          <div className="fs-phone-demo">
            <div className="fs-phone-mockup">
              <div className="fs-phone-frame">
                <div className="fs-phone-notch"></div>
                <div className="fs-phone-screen">
                  <div className="fs-phone-header">
                    <span>Incoming Call</span>
                  </div>
                  <div className="fs-verified-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>T-Mobile Verified Business</span>
                  </div>
                  <div className="fs-phone-caller">
                    <div className="fs-caller-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                      </svg>
                    </div>
                    <div className="fs-caller-info">
                      <span className="fs-caller-name">ABC Plumbing</span>
                      <span className="fs-caller-status">Mike T. - Your Technician</span>
                    </div>
                  </div>
                  <div className="fs-eta-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Arriving in 5 minutes</span>
                  </div>
                  <div className="fs-phone-actions">
                    <div className="fs-action-btn fs-decline">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
                      </svg>
                    </div>
                    <div className="fs-action-btn fs-accept">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fs-phone-label">Customer's Phone</div>
            </div>
            
            <div className="fs-verification-info">
              <div className="fs-verify-card">
                <div className="fs-verify-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h4>Verified Business Badge</h4>
                <p>Your company name and logo appear with a T-Mobile verification seal—before the customer answers</p>
              </div>
              <div className="fs-verify-card">
                <div className="fs-verify-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4>Technician Identity</h4>
                <p>Customer sees the technician's name and role, so they know exactly who's calling</p>
              </div>
              <div className="fs-verify-card">
                <div className="fs-verify-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h4>ETA Notification</h4>
                <p>Automatic arrival time display gives customers confidence and reduces no-shows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="fs-how-it-works">
        <div className="fs-container">
          <h2>How It Works</h2>
          <p className="fs-section-subtitle">From dispatch to doorstep—trust built at every step</p>
          
          <div className="fs-flow-diagram">
            <div className="fs-flow-step">
              <div className="fs-flow-number">1</div>
              <div className="fs-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h4>Job Dispatched</h4>
              <p>Technician receives assignment with customer details</p>
            </div>
            
            <div className="fs-flow-arrow">→</div>
            
            <div className="fs-flow-step">
              <div className="fs-flow-number">2</div>
              <div className="fs-flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h4>Tech Calls Ahead</h4>
              <p>Technician uses BYON line to call customer</p>
            </div>
            
            <div className="fs-flow-arrow">→</div>
            
            <div className="fs-flow-step">
              <div className="fs-flow-number">3</div>
              <div className="fs-flow-icon fs-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <h4>Verified Badge Appears</h4>
              <p>Customer sees verified business info on their screen</p>
            </div>
            
            <div className="fs-flow-arrow">→</div>
            
            <div className="fs-flow-step">
              <div className="fs-flow-number">4</div>
              <div className="fs-flow-icon fs-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h4>Door Opens</h4>
              <p>Confident customer welcomes your verified technician</p>
            </div>
          </div>
          
          <div className="fs-trust-callout">
            <div className="fs-trust-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h4>Trust Built Before Arrival</h4>
            </div>
            <p>
              By the time your technician knocks, the customer already knows who's there. 
              <strong>No more suspicious glances through the peephole. No more ignored calls. No more wasted trips.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="fs-results-section">
        <div className="fs-container">
          <h2>The Results Speak for Themselves</h2>
          
          <div className="fs-results-grid">
            <div className="fs-result-card">
              <div className="fs-result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span className="fs-result-number">89%</span>
              <span className="fs-result-label">Call Answer Rate</span>
              <p>Up from industry average of 33%</p>
            </div>
            
            <div className="fs-result-card">
              <div className="fs-result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <span className="fs-result-number">40%</span>
              <span className="fs-result-label">Fewer No-Shows</span>
              <p>Customers confirm and prepare</p>
            </div>
            
            <div className="fs-result-card">
              <div className="fs-result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <span className="fs-result-number">4.8★</span>
              <span className="fs-result-label">Customer Satisfaction</span>
              <p>Trust starts before the work begins</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fs-benefits-section">
        <div className="fs-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="fs-benefits-grid">
            <div className="fs-benefit-column">
              <div className="fs-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                </svg>
                <h3>For Service Companies</h3>
              </div>
              <ul className="fs-benefit-list">
                <li>Dramatically higher call answer rates</li>
                <li>Fewer wasted trips and no-shows</li>
                <li>Stronger brand trust and recognition</li>
                <li>Stand out from unverified competitors</li>
                <li>Complete call history and analytics</li>
                <li>Professional image on every interaction</li>
              </ul>
            </div>
            
            <div className="fs-benefit-column">
              <div className="fs-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <h3>For Homeowners</h3>
              </div>
              <ul className="fs-benefit-list">
                <li>Know exactly who's calling before answering</li>
                <li>Verified company identity provides peace of mind</li>
                <li>See technician name and arrival time</li>
                <li>Protection from impersonation scams</li>
                <li>Confident and comfortable service experience</li>
                <li>Easy to distinguish legitimate service calls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="fs-partnership-section">
        <div className="fs-container">
          <div className="fs-partnership-content">
            <div className="fs-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's extensive nationwide network and 
                industry-leading verified calling technology. Your business identity travels 
                with your technicians wherever the job takes them.
              </p>
              <ul className="fs-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Verified Business Calling</li>
                <li>Instant eSIM activation</li>
                <li>Enterprise-grade security</li>
              </ul>
            </div>
            <div className="fs-partnership-visual">
              <div className="fs-network-icon">
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
      <section className="fs-cta-section">
        <div className="fs-container">
          <h2>Build Trust Before You Knock</h2>
          <p>Stop losing jobs to unanswered calls. Let customers know it's really you.</p>
          <div className="fs-cta-buttons">
            <a href="/contact" className="fs-btn fs-btn-primary">Request a Demo</a>
            <a href="/contact" className="fs-btn fs-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonFieldServicesPage;
