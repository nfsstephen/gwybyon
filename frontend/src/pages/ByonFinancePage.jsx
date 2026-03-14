import React from 'react';
import './ByonFinancePage.css';

const ByonFinancePage = () => {
  return (
    <div className="finance-page">
      {/* Hero Section */}
      <section className="fn-hero">
        <div className="fn-hero-overlay"></div>
        <div className="fn-hero-content">
          <div className="fn-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="fn-page-title">Compliant Communications</h1>
          <p className="fn-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Every Conversation Captured. Every Regulation Met.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="fn-problem-section">
        <div className="fn-container">
          <div className="fn-problem-header">
            <div className="fn-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>The Shadow IT Crisis in Finance</h2>
          </div>
          <div className="fn-problem-content">
            <div className="fn-problem-cards">
              <div className="fn-problem-card fn-fines">
                <div className="fn-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                  </svg>
                </div>
                <h3>Billion-Dollar Fines</h3>
                <p>SEC and FINRA are cracking down hard. Major banks have paid over $2 billion in fines for failing to capture employee communications on personal devices. The regulators aren't slowing down.</p>
                <div className="fn-stat-highlight">
                  <span className="fn-stat-number">$2B+</span>
                  <span className="fn-stat-text">in regulatory fines for communication violations since 2021</span>
                </div>
              </div>
              
              <div className="fn-problem-card fn-shadow">
                <div className="fn-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    <line x1="9" y1="10" x2="15" y2="10"/>
                  </svg>
                </div>
                <h3>The Convenience Trap</h3>
                <p>Your bankers and traders aren't being malicious—they're being efficient. Clients expect instant responses. WhatsApp and personal texts are just faster. But every unrecorded message is a compliance time bomb.</p>
                <div className="fn-stat-highlight">
                  <span className="fn-stat-number">87%</span>
                  <span className="fn-stat-text">of financial professionals admit to using personal messaging for work</span>
                </div>
              </div>
            </div>
            
            <div className="fn-problem-text">
              <p>
                <strong>You can't stop human behavior. But you can channel it.</strong> Blocking personal apps doesn't work—employees 
                find workarounds. The only solution is giving them a compliant channel that's just as convenient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="fn-solution-section">
        <div className="fn-container">
          <h2>The Solution: Compliant by Default</h2>
          <p className="fn-solution-subtitle">
            A separate business line that automatically archives everything—without changing how your team works
          </p>
          
          <div className="fn-phone-demo">
            <div className="fn-phone-mockup">
              <div className="fn-phone-frame">
                <div className="fn-phone-notch"></div>
                <div className="fn-phone-screen">
                  <div className="fn-phone-header">
                    <span>Business Line • Encrypted</span>
                  </div>
                  <div className="fn-compliance-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    <span>SEC/FINRA Compliant</span>
                  </div>
                  <div className="fn-message-thread">
                    <div className="fn-message fn-incoming">
                      <span className="fn-msg-text">Can we discuss the Henderson portfolio restructure?</span>
                      <span className="fn-msg-time">2:34 PM</span>
                    </div>
                    <div className="fn-message fn-outgoing">
                      <span className="fn-msg-text">Absolutely. I'll send the analysis by EOD.</span>
                      <span className="fn-msg-time">2:35 PM</span>
                    </div>
                    <div className="fn-message fn-incoming">
                      <span className="fn-msg-text">Perfect. Let's schedule a call for tomorrow.</span>
                      <span className="fn-msg-time">2:36 PM</span>
                    </div>
                  </div>
                  <div className="fn-archive-indicator">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="21 8 21 21 3 21 3 8"/>
                      <rect x="1" y="3" width="22" height="5"/>
                      <line x1="10" y1="12" x2="14" y2="12"/>
                    </svg>
                    <span>Auto-archived to compliance vault</span>
                  </div>
                </div>
              </div>
              <div className="fn-phone-label">Banker's Phone</div>
            </div>
            
            <div className="fn-dual-line-info">
              <div className="fn-line-card fn-personal">
                <div className="fn-line-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4>Personal Line</h4>
                <p>Private. Unmonitored. For family, friends, and personal matters. Complete privacy guaranteed.</p>
                <div className="fn-line-status">
                  <span className="fn-status-dot fn-private"></span>
                  <span>Not Recorded</span>
                </div>
              </div>
              <div className="fn-line-divider">
                <div className="fn-divider-line"></div>
                <span>vs</span>
                <div className="fn-divider-line"></div>
              </div>
              <div className="fn-line-card fn-business">
                <div className="fn-line-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                  </svg>
                </div>
                <h4>Business eSIM Line</h4>
                <p>All calls and texts automatically captured, encrypted, and archived for regulatory compliance.</p>
                <div className="fn-line-status">
                  <span className="fn-status-dot fn-compliant"></span>
                  <span>100% Archived</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Features Section */}
      <section className="fn-compliance-section">
        <div className="fn-container">
          <h2>Built for Financial Compliance</h2>
          <p className="fn-section-subtitle">Every feature designed with SEC, FINRA, MiFID II, and FCA requirements in mind</p>
          
          <div className="fn-compliance-grid">
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="21 8 21 21 3 21 3 8"/>
                  <rect x="1" y="3" width="22" height="5"/>
                  <line x1="10" y1="12" x2="14" y2="12"/>
                </svg>
              </div>
              <h4>Automatic Archiving</h4>
              <p>Every voice call, text message, and voicemail captured in real-time. No manual steps. No gaps.</p>
            </div>
            
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h4>Tamper-Proof Storage</h4>
              <p>WORM-compliant storage ensures records can't be altered or deleted. Audit-ready at all times.</p>
            </div>
            
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h4>eDiscovery Ready</h4>
              <p>Full-text search across all communications. Export in standard formats for legal review.</p>
            </div>
            
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h4>Retention Policies</h4>
              <p>Configurable retention periods to meet your specific regulatory requirements. 7-year default.</p>
            </div>
            
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4>End-to-End Encryption</h4>
              <p>Bank-grade encryption in transit and at rest. Your communications are secure from interception.</p>
            </div>
            
            <div className="fn-compliance-card">
              <div className="fn-comp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h4>Audit Trail</h4>
              <p>Complete chain of custody documentation. Know who accessed what and when.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations Section */}
      <section className="fn-regulations-section">
        <div className="fn-container">
          <div className="fn-reg-content">
            <div className="fn-reg-text">
              <h2>Meet Every Regulation</h2>
              <p>
                Financial communications compliance isn't optional—it's the law. Our solution is built 
                from the ground up to satisfy the most stringent regulatory requirements across jurisdictions.
              </p>
              
              <div className="fn-reg-list">
                <div className="fn-reg-item">
                  <div className="fn-reg-badge">SEC</div>
                  <div className="fn-reg-details">
                    <h4>Rule 17a-4</h4>
                    <p>Electronic records retention and preservation requirements</p>
                  </div>
                </div>
                
                <div className="fn-reg-item">
                  <div className="fn-reg-badge">FINRA</div>
                  <div className="fn-reg-details">
                    <h4>Rules 3110 & 4511</h4>
                    <p>Supervision and books/records obligations</p>
                  </div>
                </div>
                
                <div className="fn-reg-item">
                  <div className="fn-reg-badge">MiFID II</div>
                  <div className="fn-reg-details">
                    <h4>Article 16(7)</h4>
                    <p>European communication recording requirements</p>
                  </div>
                </div>
                
                <div className="fn-reg-item">
                  <div className="fn-reg-badge">FCA</div>
                  <div className="fn-reg-details">
                    <h4>SYSC 10A</h4>
                    <p>UK recording of communications rules</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fn-reg-visual">
              <div className="fn-shield-container">
                <div className="fn-shield">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <span>Regulatory Shield</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fn-benefits-section">
        <div className="fn-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="fn-benefits-grid">
            <div className="fn-benefit-column">
              <div className="fn-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <h3>For Financial Institutions</h3>
              </div>
              <ul className="fn-benefit-list">
                <li>Eliminate regulatory fine exposure</li>
                <li>Close the Shadow IT compliance gap</li>
                <li>Complete visibility into client communications</li>
                <li>Simplified eDiscovery and audit response</li>
                <li>Centralized compliance management</li>
                <li>Protect your firm's reputation</li>
              </ul>
            </div>
            
            <div className="fn-benefit-column">
              <div className="fn-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Financial Professionals</h3>
              </div>
              <ul className="fn-benefit-list">
                <li>Stay responsive to clients—compliantly</li>
                <li>Keep personal communications private</li>
                <li>No second phone to carry</li>
                <li>Work the way you want without risk</li>
                <li>Clear separation of work and personal</li>
                <li>Protection from personal liability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="fn-roi-section">
        <div className="fn-container">
          <h2>The Cost of Non-Compliance</h2>
          
          <div className="fn-roi-grid">
            <div className="fn-roi-card fn-risk">
              <div className="fn-roi-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <h4>Without BYON</h4>
              </div>
              <ul className="fn-roi-list">
                <li><span className="fn-cost">$200M+</span> potential regulatory fines</li>
                <li><span className="fn-cost">Unlimited</span> litigation exposure</li>
                <li><span className="fn-cost">Reputation</span> damage and client loss</li>
                <li><span className="fn-cost">Leadership</span> personal liability</li>
              </ul>
            </div>
            
            <div className="fn-roi-card fn-savings">
              <div className="fn-roi-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h4>With BYON</h4>
              </div>
              <ul className="fn-roi-list">
                <li><span className="fn-saving">100%</span> communication capture</li>
                <li><span className="fn-saving">Zero</span> Shadow IT exposure</li>
                <li><span className="fn-saving">Instant</span> audit readiness</li>
                <li><span className="fn-saving">Peace of mind</span> for leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="fn-partnership-section">
        <div className="fn-container">
          <div className="fn-partnership-content">
            <div className="fn-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's enterprise-grade network infrastructure, 
                ensuring reliable connectivity for your most critical client communications. 
                Bank-grade security meets carrier-grade reliability.
              </p>
              <ul className="fn-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Enterprise security standards</li>
                <li>Instant eSIM provisioning</li>
                <li>24/7 network reliability</li>
              </ul>
            </div>
            <div className="fn-partnership-visual">
              <div className="fn-network-icon">
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
      <section className="fn-cta-section">
        <div className="fn-container">
          <h2>Eliminate Your Compliance Risk</h2>
          <p>Don't be the next firm in the headlines. Close your Shadow IT gap today.</p>
          <div className="fn-cta-buttons">
            <a href="/contact" className="fn-btn fn-btn-primary">Request a Demo</a>
            <a href="/contact" className="fn-btn fn-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonFinancePage;
