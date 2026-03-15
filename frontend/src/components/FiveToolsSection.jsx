import React from 'react';
import { MapPin, Check, TrendingUp } from 'lucide-react';
import './FiveToolsSection.css';

const FiveToolsSection = ({ title, subtitle }) => {
  return (
    <section className="five-tools-section" data-testid="five-tools-section">
      <div className="ft-container">
        <div className="ft-section-label">The Solution</div>
        <h2 className="ft-section-title">{title || 'Five Tools That Build Local Dominance'}</h2>
        <p className="ft-section-desc">
          {subtitle || 'GeoGrid automates every lever that Google uses to rank local businesses. Stop guessing. Start growing.'}
        </p>

        <div className="ft-features-list">
          {/* Tool 1: Geo-Health Scanner */}
          <div className="ft-feature-row" data-testid="five-tools-scanner">
            <div className="ft-feature-content">
              <div className="ft-feature-number">01</div>
              <h3>Geo-Health Scanner</h3>
              <p>
                Enter your business name and address. Our system scans your visibility across a 5-mile 
                radius and assigns a "Local Authority Score." See exactly where you rank — block by block — 
                and where competitors are outperforming you.
              </p>
              <ul className="ft-feature-bullets">
                <li><Check size={16} /> 5-mile radius heat map analysis</li>
                <li><Check size={16} /> Local Authority Score (0-100)</li>
                <li><Check size={16} /> Competitor gap identification</li>
              </ul>
            </div>
            <div className="ft-feature-visual">
              <div className="ft-visual-card">
                <div className="ft-mini-grid">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const r = Math.floor(i / 5);
                    const c = i % 5;
                    const d = Math.sqrt(Math.pow(r - 2, 2) + Math.pow(c - 2, 2));
                    const lvl = d < 1 ? 'high' : d < 2 ? 'medium' : 'low';
                    return <div key={i} className={`ft-mini-cell ft-mini-${lvl}`}></div>;
                  })}
                </div>
                <div className="ft-visual-score">Score: 72/100</div>
              </div>
            </div>
          </div>

          {/* Tool 2: Entity-Sync Dashboard */}
          <div className="ft-feature-row ft-feature-reverse" data-testid="five-tools-entity-sync">
            <div className="ft-feature-content">
              <div className="ft-feature-number">02</div>
              <h3>Entity-Sync Dashboard</h3>
              <p>
                Your "Digital Twin" — a single portal to manage the version of your business that Google, 
                Apple Maps, Bing, and 60+ directories show the world. Keep your Name, Address, and Phone (NAP) 
                perfectly synced everywhere simultaneously. In entity-based search, your map presence matters 
                more than your website.
              </p>
              <ul className="ft-feature-bullets">
                <li><Check size={16} /> Sync across Google, Apple Maps, Bing</li>
                <li><Check size={16} /> 60+ directory listings managed</li>
                <li><Check size={16} /> Automatic mismatch detection</li>
              </ul>
            </div>
            <div className="ft-feature-visual">
              <div className="ft-visual-card">
                <div className="ft-sync-lines">
                  <div className="ft-sync-source">Your Business</div>
                  <div className="ft-sync-arrows">
                    <div className="ft-sync-target">Google</div>
                    <div className="ft-sync-target">Apple Maps</div>
                    <div className="ft-sync-target">Bing</div>
                    <div className="ft-sync-target">60+ More</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 3: Neighborhood Content Engine */}
          <div className="ft-feature-row" data-testid="five-tools-content-engine">
            <div className="ft-feature-content">
              <div className="ft-feature-number">03</div>
              <h3>Neighborhood Content Engine</h3>
              <p>
                AI-powered tool that generates hyper-local content mentioning specific nearby landmarks, 
                neighborhoods, and community touchpoints. This signals geographic relevance to search 
                engines in a way generic content never can.
              </p>
              <ul className="ft-feature-bullets">
                <li><Check size={16} /> AI-generated local content updates</li>
                <li><Check size={16} /> Landmark & neighborhood mentions</li>
                <li><Check size={16} /> Automated publishing schedule</li>
              </ul>
            </div>
            <div className="ft-feature-visual">
              <div className="ft-visual-card">
                <div className="ft-content-preview">
                  <div className="ft-content-line ft-content-title"></div>
                  <div className="ft-content-line"></div>
                  <div className="ft-content-line"></div>
                  <div className="ft-content-highlight">
                    <MapPin size={12} />
                    <span>"Serving coffee near Westside High School stadium"</span>
                  </div>
                  <div className="ft-content-line"></div>
                  <div className="ft-content-line ft-content-short"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 4: The Review Magnet */}
          <div className="ft-feature-row ft-feature-reverse" data-testid="five-tools-review-magnet">
            <div className="ft-feature-content">
              <div className="ft-feature-number">04</div>
              <h3>The Review Magnet</h3>
              <p>
                Automated SMS and email sequences that prompt customers to leave reviews specifically 
                mentioning your service and location. These geo-tagged reviews are rocket fuel for 
                local search algorithms.
              </p>
              <ul className="ft-feature-bullets">
                <li><Check size={16} /> Automated review request sequences</li>
                <li><Check size={16} /> Location-specific review prompts</li>
                <li><Check size={16} /> Multi-platform review management</li>
              </ul>
            </div>
            <div className="ft-feature-visual">
              <div className="ft-visual-card">
                <div className="ft-review-mock">
                  <div className="ft-review-stars">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} viewBox="0 0 24 24" fill="#F59E0B" width="18" height="18">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p className="ft-review-text">"Best auto repair near downtown Oak Park. Fixed my brakes the same day!"</p>
                  <span className="ft-review-author">— Verified Customer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tool 5: ROI Tracker */}
          <div className="ft-feature-row" data-testid="five-tools-roi-tracker">
            <div className="ft-feature-content">
              <div className="ft-feature-number">05</div>
              <h3>ROI Tracker</h3>
              <p>
                Forget confusing website analytics. Our simplified dashboard shows the metrics that 
                actually matter for local businesses: Map Views, Direction Requests, and Phone Calls. 
                See your local dominance grow in real time.
              </p>
              <ul className="ft-feature-bullets">
                <li><Check size={16} /> Map Views & Direction Requests</li>
                <li><Check size={16} /> Phone call tracking</li>
                <li><Check size={16} /> Monthly growth reports</li>
              </ul>
            </div>
            <div className="ft-feature-visual">
              <div className="ft-visual-card">
                <div className="ft-roi-bars">
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar" style={{height: '40%'}}></div>
                    <span>Jan</span>
                  </div>
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar" style={{height: '55%'}}></div>
                    <span>Feb</span>
                  </div>
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar" style={{height: '50%'}}></div>
                    <span>Mar</span>
                  </div>
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar" style={{height: '70%'}}></div>
                    <span>Apr</span>
                  </div>
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar" style={{height: '85%'}}></div>
                    <span>May</span>
                  </div>
                  <div className="ft-roi-bar-group">
                    <div className="ft-roi-bar ft-roi-current" style={{height: '95%'}}></div>
                    <span>Jun</span>
                  </div>
                </div>
                <div className="ft-roi-label">
                  <TrendingUp size={14} />
                  <span>+137% Direction Requests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiveToolsSection;
