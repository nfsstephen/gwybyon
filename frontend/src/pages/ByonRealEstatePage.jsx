import React from 'react';
import './ByonRealEstatePage.css';

const ByonRealEstatePage = () => {
  return (
    <div className="real-estate-page">
      {/* Hero Section */}
      <section className="re-hero">
        <div className="re-hero-overlay"></div>
        <div className="re-hero-content">
          <div className="re-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="re-page-title">Secure Agent Communications</h1>
          <p className="re-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Protecting Your Agents. Securing Your Client Relationships.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="re-problem-section">
        <div className="re-container">
          <div className="re-problem-header">
            <div className="re-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Hidden Risks in Real Estate</h2>
          </div>
          <div className="re-problem-content">
            <div className="re-problem-cards">
              <div className="re-problem-card re-safety">
                <div className="re-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3>Agent Safety Crisis</h3>
                <p>Real estate agents meet strangers in empty homes every day—a scenario that puts them at serious risk. With no witnesses and isolated locations, agents are vulnerable to assault, robbery, and worse.</p>
                <div className="re-stat-highlight">
                  <span className="re-stat-number">44%</span>
                  <span className="re-stat-text">of agents have felt unsafe during a showing</span>
                </div>
              </div>
              
              <div className="re-problem-card re-leakage">
                <div className="re-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <h3>Lead Leakage Problem</h3>
                <p>When a top-producing agent leaves your brokerage, they walk out the door with your most valuable asset—their client relationships. Personal phones mean personal contacts, and there's nothing you can do.</p>
                <div className="re-stat-highlight">
                  <span className="re-stat-number">$2.1M</span>
                  <span className="re-stat-text">average lifetime value of lost client relationships per agent</span>
                </div>
              </div>
            </div>
            
            <div className="re-problem-text">
              <p>
                <strong>Your agents are your greatest asset—and your biggest liability.</strong> Traditional phone systems 
                give agents all the power. They control the client relationships, the contact history, and the communication 
                records. When they leave, everything goes with them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="re-solution-section">
        <div className="re-container">
          <h2>The Solution: Brokerage-Owned Business Lines</h2>
          <p className="re-solution-subtitle">
            Our eSIM technology puts control back in the brokerage's hands while protecting your agents
          </p>
          
          <div className="re-phone-demo">
            <div className="re-phone-mockup">
              <div className="re-phone-frame">
                <div className="re-phone-notch"></div>
                <div className="re-phone-screen">
                  <div className="re-phone-header">
                    <span>Business Line Active</span>
                  </div>
                  <div className="re-phone-status">
                    <div className="re-status-safe">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span>Protected</span>
                    </div>
                    <div className="re-location-active">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>Location Shared</span>
                    </div>
                  </div>
                  <div className="re-phone-caller">
                    <div className="re-caller-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"/>
                      </svg>
                    </div>
                    <div className="re-caller-info">
                      <span className="re-caller-name">Showing: 742 Oak Lane</span>
                      <span className="re-caller-status">Client: Michael Thompson</span>
                    </div>
                  </div>
                  <div className="re-emergency-btn">
                    <span>Emergency Alert</span>
                  </div>
                </div>
              </div>
              <div className="re-phone-label">Brokerage eSIM Line</div>
            </div>
            
            <div className="re-dual-number-info">
              <div className="re-number-card re-personal">
                <div className="re-number-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4>Personal Number</h4>
                <p>Agent's private line for family, friends, and personal matters—completely separate from work</p>
              </div>
              <div className="re-number-divider">
                <span>+</span>
              </div>
              <div className="re-number-card re-company">
                <div className="re-number-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h4>Brokerage eSIM Number</h4>
                <p>Company-owned business line with safety features, call logging, and complete client history</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="re-safety-section">
        <div className="re-container">
          <h2>Agent Safety Features</h2>
          <p className="re-section-subtitle">Because getting home safe matters more than closing the deal</p>
          
          <div className="re-safety-grid">
            <div className="re-safety-card">
              <div className="re-safety-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h4>Real-Time Location Sharing</h4>
              <p>Automatic location sharing during scheduled showings. The office always knows where your agents are.</p>
            </div>
            
            <div className="re-safety-card">
              <div className="re-safety-icon re-emergency">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <h4>One-Touch Emergency Alert</h4>
              <p>Silent panic button triggers emergency protocols instantly—alerts office, shares GPS, and can auto-dial 911.</p>
            </div>
            
            <div className="re-safety-card">
              <div className="re-safety-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h4>Check-In Timers</h4>
              <p>Automated check-in prompts during showings. Missed check-in? The system escalates automatically.</p>
            </div>
            
            <div className="re-safety-card">
              <div className="re-safety-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h4>Verified Client Screening</h4>
              <p>Know who's calling before the showing. Screen potential clients through the brokerage system first.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Kill Switch Section */}
      <section className="re-killswitch-section">
        <div className="re-container">
          <div className="re-killswitch-content">
            <div className="re-killswitch-text">
              <h2>The Digital Kill Switch</h2>
              <p className="re-killswitch-intro">
                When an agent leaves your brokerage, you shouldn't lose years of client relationships overnight.
              </p>
              
              <div className="re-killswitch-steps">
                <div className="re-step">
                  <div className="re-step-number">1</div>
                  <div className="re-step-content">
                    <h4>Instant Number Reclamation</h4>
                    <p>The brokerage owns the eSIM number. When an agent departs, deactivate their business line immediately.</p>
                  </div>
                </div>
                
                <div className="re-step">
                  <div className="re-step-number">2</div>
                  <div className="re-step-content">
                    <h4>Complete Client History</h4>
                    <p>All calls, texts, and client interactions are logged. Transfer the full relationship history to a new agent seamlessly.</p>
                  </div>
                </div>
                
                <div className="re-step">
                  <div className="re-step-number">3</div>
                  <div className="re-step-content">
                    <h4>Automatic Reassignment</h4>
                    <p>Redirect incoming client calls to the new assigned agent. Clients experience zero disruption.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="re-killswitch-visual">
              <div className="re-transfer-diagram">
                <div className="re-agent-card re-departing">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Departing Agent</span>
                  <div className="re-status-badge re-inactive">Deactivated</div>
                </div>
                
                <div className="re-transfer-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                  <span>Instant Transfer</span>
                </div>
                
                <div className="re-agent-card re-new">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>New Agent</span>
                  <div className="re-status-badge re-active">Active</div>
                </div>
              </div>
              <p className="re-transfer-note">Client relationships stay with the brokerage—not the agent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="re-benefits-section">
        <div className="re-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="re-benefits-grid">
            <div className="re-benefit-column">
              <div className="re-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <h3>For Brokerages</h3>
              </div>
              <ul className="re-benefit-list">
                <li>Own all client relationships and contact history</li>
                <li>Protect your investment when agents leave</li>
                <li>Real-time visibility into agent safety and location</li>
                <li>Complete call and message logging for compliance</li>
                <li>Seamless client handoffs between agents</li>
                <li>Reduced liability with documented safety protocols</li>
              </ul>
            </div>
            
            <div className="re-benefit-column">
              <div className="re-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Agents</h3>
              </div>
              <ul className="re-benefit-list">
                <li>Enhanced personal safety during showings</li>
                <li>Keep personal number completely private</li>
                <li>One device for both work and personal life</li>
                <li>Emergency help is always one tap away</li>
                <li>Clear boundaries between work and home</li>
                <li>Professional presence with dedicated business line</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="re-partnership-section">
        <div className="re-container">
          <div className="re-partnership-content">
            <div className="re-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's extensive nationwide network, ensuring 
                reliable connectivity wherever your agents are showing properties. From urban 
                high-rises to rural estates, your safety features never go offline.
              </p>
              <ul className="re-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Instant eSIM activation</li>
                <li>Enterprise-grade security</li>
                <li>24/7 network reliability</li>
              </ul>
            </div>
            <div className="re-partnership-visual">
              <div className="re-network-icon">
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
      <section className="re-cta-section">
        <div className="re-container">
          <h2>Protect Your Agents. Protect Your Business.</h2>
          <p>Don't wait for an incident to prioritize safety. Don't lose another client list to a departing agent.</p>
          <div className="re-cta-buttons">
            <a href="/contact" className="re-btn re-btn-primary">Request a Demo</a>
            <a href="/contact" className="re-btn re-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonRealEstatePage;
