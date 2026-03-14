import React from 'react';
import './ByonConstructionPage.css';

const ByonConstructionPage = () => {
  return (
    <div className="construction-page">
      {/* Hero Section */}
      <section className="cn-hero">
        <div className="cn-hero-overlay"></div>
        <div className="cn-hero-content">
          <div className="cn-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="cn-page-title">Smarter Jobsite Safety</h1>
          <p className="cn-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Control Distractions. Protect Workers. Stay OSHA Compliant.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="cn-problem-section">
        <div className="cn-container">
          <div className="cn-problem-header">
            <div className="cn-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Distracted Worker Problem</h2>
          </div>
          <div className="cn-problem-content">
            <div className="cn-problem-cards">
              <div className="cn-problem-card">
                <div className="cn-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h3>Phones on Active Sites</h3>
                <p>Workers scrolling social media near operating cranes, checking texts while walking through active demolition zones, or taking calls in areas where full attention is critical.</p>
                <div className="cn-stat-highlight">
                  <span className="cn-stat-number">26%</span>
                  <span className="cn-stat-text">of construction accidents involve distracted workers</span>
                </div>
              </div>
              
              <div className="cn-problem-card">
                <div className="cn-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h3>OSHA Compliance Risk</h3>
                <p>Distracted operation of heavy machinery violates OSHA standards. Companies face fines, liability, and—worst of all—preventable injuries and fatalities.</p>
                <div className="cn-stat-highlight">
                  <span className="cn-stat-number">$15K+</span>
                  <span className="cn-stat-text">average OSHA fine per serious violation</span>
                </div>
              </div>
            </div>
            
            <div className="cn-problem-text">
              <p>
                <strong>You can't confiscate personal phones—but you can control how they behave on your jobsite.</strong> 
                BYON technology gives you granular control over device functionality based on location, time, and role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="cn-solution-section">
        <div className="cn-container">
          <h2>The Solution: Phone-Free Work Zones</h2>
          <p className="cn-solution-subtitle">
            Geofencing + Mobile Device Management = Safe, Focused Workers
          </p>
          
          <div className="cn-phone-demo">
            <div className="cn-phone-mockup">
              <div className="cn-phone-frame">
                <div className="cn-phone-notch"></div>
                <div className="cn-phone-screen">
                  <div className="cn-phone-header">
                    <span>BYON Work Mode</span>
                  </div>
                  <div className="cn-work-mode-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>Restricted Zone Active</span>
                  </div>
                  <div className="cn-zone-info">
                    <div className="cn-zone-name">Crane Operating Zone</div>
                    <div className="cn-zone-status">Non-essential apps disabled</div>
                  </div>
                  <div className="cn-allowed-apps">
                    <div className="cn-apps-label">Available Apps</div>
                    <div className="cn-apps-grid">
                      <div className="cn-app-icon cn-active">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                        <span>Emergency</span>
                      </div>
                      <div className="cn-app-icon cn-active">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span>Procore</span>
                      </div>
                      <div className="cn-app-icon cn-active">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <line x1="3" y1="9" x2="21" y2="9"/>
                          <line x1="9" y1="21" x2="9" y2="9"/>
                        </svg>
                        <span>PlanGrid</span>
                      </div>
                      <div className="cn-app-icon cn-disabled">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                        <span>Blocked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cn-phone-label">Worker's Phone in Restricted Zone</div>
            </div>
            
            <div className="cn-features-info">
              <div className="cn-feature-card">
                <div className="cn-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h4>Geofencing</h4>
                <p>GPS-based zones automatically trigger Work Mode when workers enter high-risk areas</p>
              </div>
              <div className="cn-feature-card">
                <div className="cn-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <h4>Work Profiles</h4>
                <p>Secure container keeps work and personal data completely separate</p>
              </div>
              <div className="cn-feature-card">
                <div className="cn-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <h4>Safety Lockouts</h4>
                <p>Motion sensing disables screen when operating heavy equipment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className="cn-features-section">
        <div className="cn-container">
          <h2>How BYON Keeps Your Jobsite Safe</h2>
          
          <div className="cn-features-grid">
            <div className="cn-feature-detail">
              <div className="cn-feature-number">01</div>
              <div className="cn-feature-content">
                <h3>Geofencing: "Phone-Free" Work Zones</h3>
                <p>Using the phone's GPS, BYON technology creates virtual boundaries around high-risk areas—crane operating zones, active demolition spots, or excavation sites.</p>
                <ul className="cn-feature-list">
                  <li>Automatic "Work Mode" activation upon entry</li>
                  <li>Non-essential apps disabled (social media, games)</li>
                  <li>Only emergency calls and work apps remain active</li>
                  <li>Seamless return to normal when exiting zone</li>
                </ul>
              </div>
            </div>
            
            <div className="cn-feature-detail">
              <div className="cn-feature-number">02</div>
              <div className="cn-feature-content">
                <h3>Mobile Device Management (MDM) & Work Profiles</h3>
                <p>Rather than taking over an employee's entire phone, BYON creates a secure "container" that separates work from personal use.</p>
                <ul className="cn-feature-list">
                  <li>Company controls work profile policies only</li>
                  <li>Disable camera or specific apps during work hours</li>
                  <li>Enforce use of verified project management apps (Procore, PlanGrid)</li>
                  <li>Personal data remains completely private</li>
                </ul>
              </div>
            </div>
            
            <div className="cn-feature-detail">
              <div className="cn-feature-number">03</div>
              <div className="cn-feature-content">
                <h3>"Hands-Free" & Safety Lockouts</h3>
                <p>To comply with OSHA standards prohibiting distracted operations, BYON uses motion sensing lockouts.</p>
                <ul className="cn-feature-list">
                  <li>Phone sensors detect equipment operation</li>
                  <li>Screen locks to prevent texting or browsing</li>
                  <li>Only hands-free audio signals allowed</li>
                  <li>Automatic unlock when safe conditions detected</li>
                </ul>
              </div>
            </div>
            
            <div className="cn-feature-detail">
              <div className="cn-feature-number">04</div>
              <div className="cn-feature-content">
                <h3>Bandwidth Throttling via Private Site Networks</h3>
                <p>On large sites with company-deployed Wi-Fi or LTE networks, BYON prioritizes work over entertainment.</p>
                <ul className="cn-feature-list">
                  <li>Priority access for blueprints, site photos, and reports</li>
                  <li>Throttle or block data-heavy entertainment (YouTube, Netflix)</li>
                  <li>Usage visibility for management</li>
                  <li>Address excessive personal usage directly</li>
                </ul>
              </div>
            </div>
            
            <div className="cn-feature-detail">
              <div className="cn-feature-number">05</div>
              <div className="cn-feature-content">
                <h3>Automated "Clock-In" Integration</h3>
                <p>BYON ties phone functionality directly to your payroll system, creating natural incentives for compliance.</p>
                <ul className="cn-feature-list">
                  <li>Phone enters "Work Mode" when clocked in</li>
                  <li>"Personal Mode" only available after clock-out</li>
                  <li>Geofence exit automatically ends work mode</li>
                  <li>Reinforces phone as a professional tool during work hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="cn-benefits-section">
        <div className="cn-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="cn-benefits-grid">
            <div className="cn-benefit-column">
              <div className="cn-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <h3>For Contractors & GCs</h3>
              </div>
              <ul className="cn-benefit-list">
                <li>Reduce distraction-related accidents</li>
                <li>Meet OSHA compliance requirements</li>
                <li>Lower liability and insurance costs</li>
                <li>Ensure proper app usage on site</li>
                <li>Real-time visibility into device policies</li>
                <li>Professional workforce image</li>
              </ul>
            </div>
            
            <div className="cn-benefit-column">
              <div className="cn-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Workers</h3>
              </div>
              <ul className="cn-benefit-list">
                <li>Keep your personal phone—no second device</li>
                <li>Personal data stays completely private</li>
                <li>Clear boundaries between work and personal</li>
                <li>Safety features protect you and coworkers</li>
                <li>Access to approved work apps</li>
                <li>Full personal use after clock-out</li>
              </ul>
            </div>
            
            <div className="cn-benefit-column cn-safety">
              <div className="cn-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h3>For Safety Teams</h3>
              </div>
              <ul className="cn-benefit-list">
                <li>Enforceable phone-free zones</li>
                <li>Automated compliance—no policing needed</li>
                <li>Audit trail of policy enforcement</li>
                <li>Reduced incident investigations</li>
                <li>Proactive rather than reactive safety</li>
                <li>Integration with existing safety programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="cn-partnership-section">
        <div className="cn-container">
          <div className="cn-partnership-content">
            <div className="cn-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's extensive nationwide network and 
                enterprise MDM capabilities. From urban high-rises to remote infrastructure 
                projects, your safety policies travel with your workforce.
              </p>
              <ul className="cn-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Enterprise MDM integration</li>
                <li>Instant eSIM activation</li>
                <li>24/7 priority support</li>
              </ul>
            </div>
            <div className="cn-partnership-visual">
              <div className="cn-network-icon">
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
      <section className="cn-cta-section">
        <div className="cn-container">
          <h2>Build Safer. Work Smarter.</h2>
          <p>Eliminate phone distractions without confiscating devices. Keep your crews focused and protected.</p>
          <div className="cn-cta-buttons">
            <a href="/contact" className="cn-btn cn-btn-primary">Request a Demo</a>
            <a href="/contact" className="cn-btn cn-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonConstructionPage;
