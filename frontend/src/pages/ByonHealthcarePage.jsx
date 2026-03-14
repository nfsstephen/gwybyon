import React from 'react';
import './ByonHealthcarePage.css';

const ByonHealthcarePage = () => {
  return (
    <div className="healthcare-page">
      {/* Hero Section */}
      <section className="hc-hero">
        <div className="hc-hero-overlay"></div>
        <div className="hc-hero-content">
          <div className="hc-hero-badge">Powered by T-Mobile</div>
          <h1 data-testid="hc-page-title">HIPAA-Compliant Communications</h1>
          <p className="hc-hero-subtitle">
            BYON (Bring Your Own Number) eSIM Technology<br />
            Verified Visits. Protected Privacy. Complete Compliance.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="hc-problem-section">
        <div className="hc-container">
          <div className="hc-problem-header">
            <div className="hc-alert-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h2>Two Critical Challenges in Home Healthcare</h2>
          </div>
          <div className="hc-problem-content">
            <div className="hc-problem-cards">
              <div className="hc-problem-card hc-evv">
                <div className="hc-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3>EVV Fraud & Compliance</h3>
                <p>Medicaid and Medicare now require Electronic Visit Verification—proof that caregivers are actually at the patient's home. But current systems are easy to game. Staff can "check in" from anywhere with location spoofing.</p>
                <div className="hc-stat-highlight">
                  <span className="hc-stat-number">$2B+</span>
                  <span className="hc-stat-text">in annual Medicaid fraud involves falsified home visit records</span>
                </div>
              </div>
              
              <div className="hc-problem-card hc-privacy">
                <div className="hc-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </div>
                <h3>Nurse Privacy & Burnout</h3>
                <p>Nurses are forced to use personal phones for patient calls. That means patients have their private numbers—leading to after-hours calls, boundary violations, and accelerated burnout in an already strained workforce.</p>
                <div className="hc-stat-highlight">
                  <span className="hc-stat-number">78%</span>
                  <span className="hc-stat-text">of home health nurses report work-related privacy concerns</span>
                </div>
              </div>
            </div>
            
            <div className="hc-problem-text">
              <p>
                <strong>Your caregivers deserve protection. Your agency needs compliance.</strong> Current solutions 
                force a choice between employee privacy and regulatory requirements. There's a better way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="hc-solution-section">
        <div className="hc-container">
          <h2>The Solution: The Digital Badge</h2>
          <p className="hc-solution-subtitle">
            One eSIM that proves location, protects privacy, and ensures HIPAA compliance
          </p>
          
          <div className="hc-phone-demo">
            <div className="hc-phone-mockup">
              <div className="hc-phone-frame">
                <div className="hc-phone-notch"></div>
                <div className="hc-phone-screen">
                  <div className="hc-phone-header">
                    <span>Healthcare Line Active</span>
                  </div>
                  <div className="hc-compliance-badges">
                    <div className="hc-badge hc-hipaa">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span>HIPAA</span>
                    </div>
                    <div className="hc-badge hc-evv-badge">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3" fill="white"/>
                      </svg>
                      <span>EVV</span>
                    </div>
                  </div>
                  <div className="hc-visit-card">
                    <div className="hc-visit-header">
                      <span className="hc-visit-label">Current Visit</span>
                      <span className="hc-visit-status">✓ Verified</span>
                    </div>
                    <div className="hc-patient-info">
                      <span className="hc-patient-name">Martha Johnson</span>
                      <span className="hc-patient-address">742 Oak Street, Apt 3B</span>
                    </div>
                    <div className="hc-location-verify">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>Location confirmed at patient address</span>
                    </div>
                  </div>
                  <div className="hc-quick-actions">
                    <div className="hc-action-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                      <span>Call Patient</span>
                    </div>
                    <div className="hc-action-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                      </svg>
                      <span>Secure Text</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hc-phone-label">Nurse's Phone</div>
            </div>
            
            <div className="hc-dual-line-info">
              <div className="hc-line-card hc-personal">
                <div className="hc-line-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h4>Personal Number</h4>
                <p>Stays completely private. Patients never see it. Off-hours calls go to personal voicemail—not the nurse.</p>
                <div className="hc-line-status">
                  <span className="hc-status-dot hc-private"></span>
                  <span>Hidden from Patients</span>
                </div>
              </div>
              <div className="hc-line-divider">
                <div className="hc-divider-line"></div>
                <span>+</span>
                <div className="hc-divider-line"></div>
              </div>
              <div className="hc-line-card hc-healthcare">
                <div className="hc-line-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h4>Healthcare eSIM Line</h4>
                <p>Patient-facing number with EVV location tracking, HIPAA-compliant texting, and automatic visit logging.</p>
                <div className="hc-line-status">
                  <span className="hc-status-dot hc-compliant"></span>
                  <span>100% Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVV Compliance Section */}
      <section className="hc-evv-section">
        <div className="hc-container">
          <h2>Electronic Visit Verification: Solved</h2>
          <p className="hc-section-subtitle">Meet Medicaid and Medicare EVV requirements with hardware-level proof</p>
          
          <div className="hc-evv-grid">
            <div className="hc-evv-card">
              <div className="hc-evv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h4>GPS Location Lock</h4>
              <p>Tamper-proof location verification. The eSIM confirms the caregiver is physically at the patient's address.</p>
            </div>
            
            <div className="hc-evv-card">
              <div className="hc-evv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h4>Automatic Time Stamps</h4>
              <p>Check-in and check-out times logged automatically. No manual entry. No forgetting to clock in.</p>
            </div>
            
            <div className="hc-evv-card">
              <div className="hc-evv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <h4>Anti-Spoofing Tech</h4>
              <p>Hardware-level security prevents GPS spoofing apps. If the phone isn't there, the visit doesn't verify.</p>
            </div>
            
            <div className="hc-evv-card">
              <div className="hc-evv-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h4>Audit-Ready Reports</h4>
              <p>Complete visit documentation exported in CMS-approved formats. Ready for any audit, any time.</p>
            </div>
          </div>
          
          <div className="hc-cures-act">
            <div className="hc-cures-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="hc-cures-content">
              <h4>21st Century Cures Act Compliant</h4>
              <p>Our EVV solution meets all federal requirements mandated by the Cures Act, including type of service, individual receiving service, individual providing service, date, time, and location verification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIPAA Section */}
      <section className="hc-hipaa-section">
        <div className="hc-container">
          <div className="hc-hipaa-content">
            <div className="hc-hipaa-text">
              <h2>HIPAA-Compliant by Design</h2>
              <p>
                Patient communications require the highest level of security. Our healthcare eSIM line 
                is built from the ground up to meet and exceed HIPAA requirements.
              </p>
              
              <div className="hc-hipaa-features">
                <div className="hc-hipaa-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <div>
                    <h4>End-to-End Encryption</h4>
                    <p>All voice and text encrypted in transit and at rest</p>
                  </div>
                </div>
                
                <div className="hc-hipaa-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="21 8 21 21 3 21 3 8"/>
                    <rect x="1" y="3" width="22" height="5"/>
                    <line x1="10" y1="12" x2="14" y2="12"/>
                  </svg>
                  <div>
                    <h4>Message Archiving</h4>
                    <p>Automatic retention for compliance and legal requirements</p>
                  </div>
                </div>
                
                <div className="hc-hipaa-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <div>
                    <h4>Access Controls</h4>
                    <p>Role-based permissions and audit logging</p>
                  </div>
                </div>
                
                <div className="hc-hipaa-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  <div>
                    <h4>BAA Available</h4>
                    <p>Business Associate Agreement for covered entities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hc-hipaa-visual">
              <div className="hc-shield-container">
                <div className="hc-shield">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span className="hc-shield-text">HIPAA</span>
                </div>
                <span>Protected Health Information Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="hc-benefits-section">
        <div className="hc-container">
          <h2>Benefits for Everyone</h2>
          
          <div className="hc-benefits-grid">
            <div className="hc-benefit-column">
              <div className="hc-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
                <h3>For Healthcare Agencies</h3>
              </div>
              <ul className="hc-benefit-list">
                <li>100% EVV compliance—no exceptions</li>
                <li>Eliminate fraudulent visit claims</li>
                <li>Audit-ready documentation always available</li>
                <li>Reduce Medicaid clawback risk</li>
                <li>HIPAA compliance built-in</li>
                <li>Centralized communication management</li>
              </ul>
            </div>
            
            <div className="hc-benefit-column">
              <div className="hc-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h3>For Nurses & Caregivers</h3>
              </div>
              <ul className="hc-benefit-list">
                <li>Personal number stays completely private</li>
                <li>No more after-hours patient calls</li>
                <li>Clear work-life boundaries</li>
                <li>One phone for everything</li>
                <li>Automatic visit documentation</li>
                <li>Reduced administrative burden</li>
              </ul>
            </div>
            
            <div className="hc-benefit-column hc-patients">
              <div className="hc-benefit-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <h3>For Patients</h3>
              </div>
              <ul className="hc-benefit-list">
                <li>Know their caregiver is verified</li>
                <li>Secure, private communications</li>
                <li>Consistent contact number for their nurse</li>
                <li>Better continuity of care</li>
                <li>Trust in visit documentation</li>
                <li>Protected health information</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* T-Mobile Partnership Section */}
      <section className="hc-partnership-section">
        <div className="hc-container">
          <div className="hc-partnership-content">
            <div className="hc-partnership-text">
              <h2>Powered by T-Mobile's Network</h2>
              <p>
                Our eSIM technology leverages T-Mobile's nationwide network to keep caregivers 
                connected wherever patients need them. From urban hospitals to rural home visits, 
                your team stays compliant and connected.
              </p>
              <ul className="hc-partnership-features">
                <li>Nationwide 5G coverage</li>
                <li>Healthcare-grade security</li>
                <li>Instant eSIM activation</li>
                <li>24/7 network reliability</li>
              </ul>
            </div>
            <div className="hc-partnership-visual">
              <div className="hc-network-icon">
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
      <section className="hc-cta-section">
        <div className="hc-container">
          <h2>Compliance Without Compromise</h2>
          <p>Protect your caregivers. Satisfy your regulators. Secure your patients.</p>
          <div className="hc-cta-buttons">
            <a href="/contact" className="hc-btn hc-btn-primary">Request a Demo</a>
            <a href="/contact" className="hc-btn hc-btn-secondary">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ByonHealthcarePage;
