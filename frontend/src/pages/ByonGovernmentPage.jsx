import React from 'react';
import './ByonGovernmentPage.css';

const ByonGovernmentPage = () => {
  return (
    <div className="government-page">
      {/* Hero Section */}
      <section className="gv-hero">
        <div className="gv-hero-overlay"></div>
        <div className="gv-hero-content">
          <div className="gv-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="gv-page-title">Secure Government Communications</h1>
          <p className="gv-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            GFE-Level Security. Personal Device Convenience.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="gv-problem-section">
        <div className="gv-container">
          <div className="gv-problem-header">
            <div className="gv-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Two-Phone Problem</h2>
          </div>
          <div className="gv-problem-content">
            <div className="gv-two-phones">
              <div className="gv-phone-card gv-govt-phone">
                <div className="gv-phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h4>The "Bat Phone"</h4>
                <p>Government-issued device for CUI communications</p>
                <div className="gv-phone-traits">
                  <span className="gv-trait gv-negative">Heavy & outdated</span>
                  <span className="gv-trait gv-negative">Restricted apps</span>
                  <span className="gv-trait gv-negative">Separate carrier</span>
                </div>
              </div>
              
              <div className="gv-plus-sign">+</div>
              
              <div className="gv-phone-card gv-personal-phone">
                <div className="gv-phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <h4>Personal Phone</h4>
                <p>Modern device for everyday use</p>
                <div className="gv-phone-traits">
                  <span className="gv-trait gv-positive">Latest technology</span>
                  <span className="gv-trait gv-positive">All your apps</span>
                  <span className="gv-trait gv-negative">Not secure for CUI</span>
                </div>
              </div>
              
              <div className="gv-equals-sign">=</div>
              
              <div className="gv-result-card">
                <div className="gv-result-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h4>Frustrated Contractors</h4>
                <p>Two devices, two chargers, two numbers—nobody wants this</p>
              </div>
            </div>
            
            <div className="gv-problem-stats">
              <div className="gv-stat-card">
                <span className="gv-stat-number">72%</span>
                <span className="gv-stat-text">of contractors resist carrying a second device</span>
              </div>
              <div className="gv-stat-card">
                <span className="gv-stat-number">$1,200</span>
                <span className="gv-stat-text">average annual cost per GFE device</span>
              </div>
              <div className="gv-stat-card">
                <span className="gv-stat-number">40%</span>
                <span className="gv-stat-text">of CUI communications happen on unsecured devices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="gv-solution-section">
        <div className="gv-container">
          <h2>The Solution: GFE in Software</h2>
          <p className="gv-solution-subtitle">
            A secure government line on a personal device—fully isolated, fully compliant
          </p>
          
          <div className="gv-phone-demo">
            <div className="gv-phone-mockup">
              <div className="gv-phone-frame">
                <div className="gv-phone-notch"></div>
                <div className="gv-phone-screen">
                  <div className="gv-phone-header">
                    <span>Secure Government Line</span>
                  </div>
                  <div className="gv-security-badges">
                    <div className="gv-badge gv-cui">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span>CUI</span>
                    </div>
                    <div className="gv-badge gv-encrypted">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>ENCRYPTED</span>
                    </div>
                  </div>
                  <div className="gv-isolation-visual">
                    <div className="gv-secure-zone">
                      <div className="gv-zone-label">SECURE PARTITION</div>
                      <div className="gv-secure-apps">
                        <div className="gv-app-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                          </svg>
                        </div>
                        <div className="gv-app-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                          </svg>
                        </div>
                        <div className="gv-app-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6" fill="none" stroke="white" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                      <span className="gv-zone-desc">Govt Calls • Secure Text • Email</span>
                    </div>
                    <div className="gv-barrier">
                      <div className="gv-barrier-line"></div>
                      <span>ISOLATED</span>
                      <div className="gv-barrier-line"></div>
                    </div>
                    <div className="gv-personal-zone">
                      <div className="gv-zone-label">PERSONAL</div>
                      <div className="gv-personal-apps">
                        <span>📱</span>
                        <span>📷</span>
                        <span>🎵</span>
                      </div>
                      <span className="gv-zone-desc">TikTok • Photos • Music</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gv-phone-label">One Device. Complete Separation.</div>
            </div>
            
            <div className="gv-solution-features">
              <div className="gv-feature-card">
                <div className="gv-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h4>Hardware-Level Isolation</h4>
                <p>The eSIM creates a completely separate secure tunnel. Personal apps can't touch government data.</p>
              </div>
              <div className="gv-feature-card">
                <div className="gv-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <h4>End-to-End Encryption</h4>
                <p>All communications on the government line are encrypted in transit and at rest.</p>
              </div>
              <div className="gv-feature-card">
                <div className="gv-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                </div>
                <h4>Remote Management</h4>
                <p>IT admins can provision, monitor, and wipe the government partition remotely—without touching personal data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="gv-compliance-section">
        <div className="gv-container">
          <h2>Built for Government Standards</h2>
          <p className="gv-section-subtitle">Meeting the requirements that matter most</p>
          
          <div className="gv-compliance-grid">
            <div className="gv-compliance-card">
              <div className="gv-comp-badge">CUI</div>
              <h4>Controlled Unclassified Information</h4>
              <p>Meets NIST SP 800-171 requirements for handling sensitive but unclassified government data.</p>
            </div>
            
            <div className="gv-compliance-card">
              <div className="gv-comp-badge">DFARS</div>
              <h4>Defense Acquisition Regulations</h4>
              <p>Compliant with DFARS 252.204-7012 cybersecurity requirements for DoD contractors.</p>
            </div>
            
            <div className="gv-compliance-card">
              <div className="gv-comp-badge">CMMC</div>
              <h4>Cybersecurity Maturity Model</h4>
              <p>Supports CMMC Level 2 compliance for handling CUI on mobile devices.</p>
            </div>
            
            <div className="gv-compliance-card">
              <div className="gv-comp-badge">FedRAMP</div>
              <h4>Federal Risk Authorization</h4>
              <p>Infrastructure built on FedRAMP-authorized cloud services for government workloads.</p>
            </div>
          </div>
          
          <div className="gv-cui-callout">
            <div className="gv-cui-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <div className="gv-cui-content">
              <h4>Not for Classified Information</h4>
              <p>This solution is designed for CUI and sensitive unclassified communications. For classified data (SECRET, TOP SECRET), continue using approved classified systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Savings Section */}
      <section className="gv-savings-section">
        <div className="gv-container">
          <h2>Massive Cost Savings</h2>
          
          <div className="gv-savings-comparison">
            <div className="gv-savings-card gv-traditional">
              <div className="gv-savings-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
                <h4>Traditional GFE</h4>
              </div>
              <div className="gv-cost-breakdown">
                <div className="gv-cost-item">
                  <span>Device hardware</span>
                  <span className="gv-cost">$800</span>
                </div>
                <div className="gv-cost-item">
                  <span>Annual service plan</span>
                  <span className="gv-cost">$600</span>
                </div>
                <div className="gv-cost-item">
                  <span>MDM licensing</span>
                  <span className="gv-cost">$150</span>
                </div>
                <div className="gv-cost-item">
                  <span>IT support overhead</span>
                  <span className="gv-cost">$400</span>
                </div>
                <div className="gv-cost-total">
                  <span>Year 1 Total</span>
                  <span className="gv-cost">$1,950</span>
                </div>
              </div>
            </div>
            
            <div className="gv-vs-badge">vs</div>
            
            <div className="gv-savings-card gv-byon">
              <div className="gv-savings-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h4>BYON eSIM</h4>
              </div>
              <div className="gv-cost-breakdown">
                <div className="gv-cost-item">
                  <span>Device hardware</span>
                  <span className="gv-saving">$0</span>
                </div>
                <div className="gv-cost-item">
                  <span>eSIM service</span>
                  <span className="gv-saving">$360</span>
                </div>
                <div className="gv-cost-item">
                  <span>Management platform</span>
                  <span className="gv-saving">$120</span>
                </div>
                <div className="gv-cost-item">
                  <span>Reduced IT burden</span>
                  <span className="gv-saving">$100</span>
                </div>
                <div className="gv-cost-total gv-total-savings">
                  <span>Year 1 Total</span>
                  <span className="gv-saving">$580</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gv-savings-summary">
            <div className="gv-big-number">70%</div>
            <p>Average cost reduction per contractor</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="gv-benefits-section">
        <div className="gv-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="gv-benefits-grid">
            <div className="gv-benefit-column">
              <div className="gv-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <h3>For Agencies & Primes</h3>
              </div>
              <ul className="gv-benefit-list">
                <li>70% reduction in mobile device costs</li>
                <li>Simplified contractor onboarding</li>
                <li>Remote provisioning and management</li>
                <li>Meet CUI compliance requirements</li>
                <li>Audit-ready communication logs</li>
                <li>Instant offboarding when contracts end</li>
              </ul>
            </div>
            
            <div className="gv-benefit-column">
              <div className="gv-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Contractors</h3>
              </div>
              <ul className="gv-benefit-list">
                <li>One phone for work and personal life</li>
                <li>Use your preferred device</li>
                <li>Personal apps stay personal</li>
                <li>No carrying the "brick"</li>
                <li>Secure without sacrifice</li>
                <li>Easy setup—instant activation</li>
              </ul>
            </div>
            
            <div className="gv-benefit-column gv-security">
              <div className="gv-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h3>For Security Teams</h3>
              </div>
              <ul className="gv-benefit-list">
                <li>True data isolation on personal devices</li>
                <li>Remote wipe of government partition</li>
                <li>Full visibility into secure comms</li>
                <li>No data leakage to personal apps</li>
                <li>Consistent security policies</li>
                <li>Reduced shadow IT risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="gv-partnership-section">
        <div className="gv-container">
          <div className="gv-partnership-content">
            <div className="gv-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's nationwide network and enterprise 
                security infrastructure. From the Pentagon to remote field offices, your 
                contractors stay connected and secure.
              </p>
              <ul className="gv-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>FirstNet-ready options</li>
                <li>Enterprise security standards</li>
                <li>24/7 priority support</li>
              </ul>
            </div>
            <div className="gv-partnership-visual">
              <div className="gv-network-icon">
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
      <section className="gv-cta-section">
        <div className="gv-container">
          <h2>Secure Comms. One Device. Zero Compromise.</h2>
          <p>Eliminate the two-phone problem. Deploy GFE-level security on personal devices.</p>
          <div className="gv-cta-buttons">
            <a href="/contact" className="gv-btn gv-btn-primary">Request a Demo</a>
            <a href="/contact" className="gv-btn gv-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonGovernmentPage;
