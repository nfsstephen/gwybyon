import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, BarChart3, MessageSquare, FileText, RefreshCw, ArrowRight, Check, Zap, Shield, TrendingUp, Globe, X } from 'lucide-react';
import './GeoGridLandingPage.css';

const GeoGridLandingPage = () => {
  const [businessName, setBusinessName] = useState('');
  const [showHeatMap, setShowHeatMap] = useState(false);

  const handleScan = (e) => {
    e.preventDefault();
    if (businessName.trim()) {
      setShowHeatMap(true);
    }
  };

  return (
    <div className="geogrid-landing" data-testid="geogrid-landing">
      {/* Hero Section */}
      <section className="gg-hero">
        <div className="gg-hero-bg">
          <div className="gg-grid-pattern"></div>
        </div>
        <div className="gg-hero-content">
          <div className="gg-hero-badge">
            <MapPin size={14} />
            <span>The Geographic Search Solution</span>
          </div>
          <h1 className="gg-hero-title" data-testid="geogrid-hero-title">
            Is Your Business <span className="gg-highlight">Invisible</span> to People Three Blocks Away?
          </h1>
          <p className="gg-hero-subtitle">
            97% of consumers search online for local businesses. If you're not dominating your 
            geographic zone, your competitors are stealing customers who should be walking through your door.
          </p>
          <div className="gg-hero-cta-group">
            <a href="#free-scan" className="gg-btn-primary" data-testid="geogrid-cta-scan">
              Get Your Free Geo-Health Scan
              <ArrowRight size={18} />
            </a>
            <a href="#how-it-works" className="gg-btn-ghost">
              See How It Works
            </a>
          </div>
          <div className="gg-hero-proof">
            <div className="gg-proof-item">
              <span className="gg-proof-number">46%</span>
              <span className="gg-proof-text">of all Google searches are local</span>
            </div>
            <div className="gg-proof-divider"></div>
            <div className="gg-proof-item">
              <span className="gg-proof-number">78%</span>
              <span className="gg-proof-text">convert within 24 hours</span>
            </div>
            <div className="gg-proof-divider"></div>
            <div className="gg-proof-item">
              <span className="gg-proof-number">200ft</span>
              <span className="gg-proof-text">can change your ranking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="gg-problem" id="how-it-works">
        <div className="gg-container">
          <div className="gg-section-label">The Problem</div>
          <h2 className="gg-section-title">The Geographic Search Gap Is Costing You Money</h2>
          <p className="gg-section-desc">
            When someone searches "coffee shop near me" or "best plumber in [neighborhood]," 
            Google uses a complex algorithm that weighs proximity, relevance, and prominence. 
            Most small businesses lose this battle without even knowing it.
          </p>
          <div className="gg-problem-grid">
            <div className="gg-problem-card">
              <div className="gg-problem-icon gg-problem-red">
                <Search size={28} />
              </div>
              <h3>Fragmented Data</h3>
              <p>Your business name, address, and phone number are inconsistent across Google, Apple Maps, Bing, and dozens of directories. Each mismatch kills your ranking.</p>
            </div>
            <div className="gg-problem-card">
              <div className="gg-problem-icon gg-problem-red">
                <MapPin size={28} />
              </div>
              <h3>Invisible Radius</h3>
              <p>You might rank #1 at your front door but disappear by Block 3. Your competitors own the search results just a few streets away from you.</p>
            </div>
            <div className="gg-problem-card">
              <div className="gg-problem-icon gg-problem-red">
                <BarChart3 size={28} />
              </div>
              <h3>Zero Visibility</h3>
              <p>Traditional analytics show "website clicks" — meaningless for a local business. You need to know how many people saw you on the MAP and asked for DIRECTIONS.</p>
            </div>
            <div className="gg-problem-card" data-testid="geogrid-zero-click-card">
              <div className="gg-problem-icon gg-problem-red">
                <Globe size={28} />
              </div>
              <h3>The Zero-Click World</h3>
              <p>Google now answers most local searches in the Map Pack or AI Overviews — users find what they need without ever clicking a website. If you're still optimizing for "website traffic," you're playing yesterday's game.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift: Strings to Things */}
      <section className="gg-shift" data-testid="geogrid-shift-section">
        <div className="gg-container">
          <div className="gg-section-label">The Shift</div>
          <h2 className="gg-section-title">Google Stopped Matching Words. Now It Matches <em>Things</em>.</h2>
          <p className="gg-section-desc">
            The search algorithm that built the internet is dead. Understanding the new one is the difference
            between being found and being forgotten.
          </p>

          <div className="gg-shift-comparison">
            <div className="gg-shift-card gg-shift-old">
              <div className="gg-shift-header">
                <X size={18} />
                <span>The Old Way</span>
              </div>
              <h3>"Word-Driven" Search</h3>
              <ul>
                <li><span className="gg-shift-label">Logic:</span> Matching letters and words</li>
                <li><span className="gg-shift-label">Priority:</span> Keyword density & backlinks</li>
                <li><span className="gg-shift-label">Context:</span> Ignored — same results for everyone</li>
                <li><span className="gg-shift-label">Winner:</span> Whoever has the best SEO team</li>
              </ul>
            </div>
            <div className="gg-shift-vs">VS</div>
            <div className="gg-shift-card gg-shift-new">
              <div className="gg-shift-header">
                <Check size={18} />
                <span>The New Reality</span>
              </div>
              <h3>"Geographic Entity" Search</h3>
              <ul>
                <li><span className="gg-shift-label">Logic:</span> Matching intent, location & trust</li>
                <li><span className="gg-shift-label">Priority:</span> Proximity, relevance & prominence</li>
                <li><span className="gg-shift-label">Context:</span> Hyper-personalized — results change by block</li>
                <li><span className="gg-shift-label">Winner:</span> Most trusted local authority</li>
              </ul>
            </div>
          </div>

          <p className="gg-shift-bottom-text">
            Small businesses still spending money on SEO agencies writing keyword-stuffed blogs
            are optimizing for an algorithm that no longer exists. Meanwhile, their Google Business Profile
            is outdated, their map pins are wrong, and their reviews are stagnant.
          </p>
        </div>
      </section>

      {/* Free Scan / Aha Moment */}
      <section className="gg-scan-section" id="free-scan">
        <div className="gg-container">
          <div className="gg-section-label">The "Aha!" Moment</div>
          <h2 className="gg-section-title">See Where You're Losing Customers Right Now</h2>
          <p className="gg-section-desc">
            Enter your business name below. Our Geo-Health Scanner analyzes your visibility 
            across a 5-mile radius and shows you exactly where competitors are stealing your traffic.
          </p>

          <div className="gg-scan-container">
            {!showHeatMap ? (
              <form className="gg-scan-form" onSubmit={handleScan} data-testid="geogrid-scan-form">
                <div className="gg-scan-input-group">
                  <div className="gg-scan-field">
                    <MapPin size={20} className="gg-scan-icon" />
                    <input
                      type="text"
                      placeholder="Enter your business name..."
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="gg-scan-input"
                      data-testid="geogrid-scan-input"
                    />
                  </div>
                  <button type="submit" className="gg-scan-btn" data-testid="geogrid-scan-btn">
                    <Search size={18} />
                    Run Free Scan
                  </button>
                </div>
                <p className="gg-scan-note">No credit card required. Results in under 60 seconds.</p>
              </form>
            ) : (
              <div className="gg-heatmap-result" data-testid="geogrid-heatmap">
                <div className="gg-heatmap-header">
                  <h3>Geo-Health Report: <span>{businessName}</span></h3>
                  <div className="gg-score-badge gg-score-low">
                    Local Authority Score: <strong>32/100</strong>
                  </div>
                </div>
                <div className="gg-heatmap-visual">
                  <div className="gg-heatmap-grid">
                    {/* Simulated heat map grid - 7x7 */}
                    {Array.from({ length: 49 }).map((_, i) => {
                      const row = Math.floor(i / 7);
                      const col = i % 7;
                      const centerDist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
                      let level;
                      if (centerDist < 1) level = 'high';
                      else if (centerDist < 2) level = 'medium';
                      else if (centerDist < 2.8) level = 'low';
                      else level = 'none';
                      const isCenter = row === 3 && col === 3;
                      return (
                        <div
                          key={i}
                          className={`gg-heat-cell gg-heat-${level} ${isCenter ? 'gg-heat-center' : ''}`}
                        >
                          {isCenter && <MapPin size={16} />}
                          {!isCenter && level === 'none' && (
                            <span className="gg-competitor-dot"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="gg-heatmap-legend">
                    <div className="gg-legend-item"><span className="gg-legend-dot gg-dot-high"></span> You rank #1-3</div>
                    <div className="gg-legend-item"><span className="gg-legend-dot gg-dot-medium"></span> You rank #4-10</div>
                    <div className="gg-legend-item"><span className="gg-legend-dot gg-dot-low"></span> You rank #11-20</div>
                    <div className="gg-legend-item"><span className="gg-legend-dot gg-dot-none"></span> Not visible</div>
                  </div>
                </div>
                <div className="gg-heatmap-insights">
                  <div className="gg-insight-card gg-insight-bad">
                    <span className="gg-insight-label">Competitor Visibility</span>
                    <span className="gg-insight-value">3x higher than yours</span>
                  </div>
                  <div className="gg-insight-card gg-insight-bad">
                    <span className="gg-insight-label">Lost Radius</span>
                    <span className="gg-insight-value">68% of your 5-mile zone</span>
                  </div>
                  <div className="gg-insight-card gg-insight-warn">
                    <span className="gg-insight-label">NAP Consistency</span>
                    <span className="gg-insight-value">4 mismatches found</span>
                  </div>
                </div>
                <div className="gg-heatmap-cta">
                  <p>You're invisible to <strong>68%</strong> of potential customers in your area.</p>
                  <a href="#pricing" className="gg-btn-primary">
                    Fix This Now
                    <ArrowRight size={18} />
                  </a>
                  <button className="gg-btn-ghost" onClick={() => setShowHeatMap(false)}>
                    Scan Another Business
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="gg-features">
        <div className="gg-container">
          <div className="gg-section-label">The Solution</div>
          <h2 className="gg-section-title">Five Tools That Build Local Dominance</h2>
          <p className="gg-section-desc">
            GeoGrid automates every lever that Google uses to rank local businesses. 
            Stop guessing. Start growing.
          </p>

          <div className="gg-features-list">
            <div className="gg-feature-row">
              <div className="gg-feature-content">
                <div className="gg-feature-number">01</div>
                <h3>Geo-Health Scanner</h3>
                <p>
                  Enter your business name and address. Our system scans your visibility across a 5-mile 
                  radius and assigns a "Local Authority Score." See exactly where you rank — block by block — 
                  and where competitors are outperforming you.
                </p>
                <ul className="gg-feature-bullets">
                  <li><Check size={16} /> 5-mile radius heat map analysis</li>
                  <li><Check size={16} /> Local Authority Score (0-100)</li>
                  <li><Check size={16} /> Competitor gap identification</li>
                </ul>
              </div>
              <div className="gg-feature-visual">
                <div className="gg-visual-card gg-visual-scanner">
                  <div className="gg-mini-grid">
                    {Array.from({ length: 25 }).map((_, i) => {
                      const r = Math.floor(i / 5);
                      const c = i % 5;
                      const d = Math.sqrt(Math.pow(r - 2, 2) + Math.pow(c - 2, 2));
                      const lvl = d < 1 ? 'high' : d < 2 ? 'medium' : 'low';
                      return <div key={i} className={`gg-mini-cell gg-mini-${lvl}`}></div>;
                    })}
                  </div>
                  <div className="gg-visual-score">Score: 72/100</div>
                </div>
              </div>
            </div>

            <div className="gg-feature-row gg-feature-reverse">
              <div className="gg-feature-content">
                <div className="gg-feature-number">02</div>
                <h3>Entity-Sync Dashboard</h3>
                <p>
                  Your "Digital Twin" — a single portal to manage the version of your business that Google, 
                  Apple Maps, Bing, and 60+ directories show the world. Keep your Name, Address, and Phone (NAP) 
                  perfectly synced everywhere simultaneously. In entity-based search, your map presence matters 
                  more than your website.
                </p>
                <ul className="gg-feature-bullets">
                  <li><Check size={16} /> Sync across Google, Apple Maps, Bing</li>
                  <li><Check size={16} /> 60+ directory listings managed</li>
                  <li><Check size={16} /> Automatic mismatch detection</li>
                </ul>
              </div>
              <div className="gg-feature-visual">
                <div className="gg-visual-card gg-visual-sync">
                  <div className="gg-sync-lines">
                    <div className="gg-sync-source">Your Business</div>
                    <div className="gg-sync-arrows">
                      <div className="gg-sync-target">Google</div>
                      <div className="gg-sync-target">Apple Maps</div>
                      <div className="gg-sync-target">Bing</div>
                      <div className="gg-sync-target">60+ More</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gg-feature-row">
              <div className="gg-feature-content">
                <div className="gg-feature-number">03</div>
                <h3>Neighborhood Content Engine</h3>
                <p>
                  AI-powered tool that generates hyper-local content mentioning specific nearby landmarks, 
                  neighborhoods, and community touchpoints. This signals geographic relevance to search 
                  engines in a way generic content never can.
                </p>
                <ul className="gg-feature-bullets">
                  <li><Check size={16} /> AI-generated local content updates</li>
                  <li><Check size={16} /> Landmark & neighborhood mentions</li>
                  <li><Check size={16} /> Automated publishing schedule</li>
                </ul>
              </div>
              <div className="gg-feature-visual">
                <div className="gg-visual-card gg-visual-content">
                  <div className="gg-content-preview">
                    <div className="gg-content-line gg-content-title"></div>
                    <div className="gg-content-line"></div>
                    <div className="gg-content-line"></div>
                    <div className="gg-content-highlight">
                      <MapPin size={12} />
                      <span>"Serving coffee near Westside High School stadium"</span>
                    </div>
                    <div className="gg-content-line"></div>
                    <div className="gg-content-line gg-content-short"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="gg-feature-row gg-feature-reverse">
              <div className="gg-feature-content">
                <div className="gg-feature-number">04</div>
                <h3>The Review Magnet</h3>
                <p>
                  Automated SMS and email sequences that prompt customers to leave reviews specifically 
                  mentioning your service and location. These geo-tagged reviews are rocket fuel for 
                  local search algorithms.
                </p>
                <ul className="gg-feature-bullets">
                  <li><Check size={16} /> Automated review request sequences</li>
                  <li><Check size={16} /> Location-specific review prompts</li>
                  <li><Check size={16} /> Multi-platform review management</li>
                </ul>
              </div>
              <div className="gg-feature-visual">
                <div className="gg-visual-card gg-visual-review">
                  <div className="gg-review-mock">
                    <div className="gg-review-stars">
                      {[1,2,3,4,5].map(s => (
                        <svg key={s} viewBox="0 0 24 24" fill="#F59E0B" width="18" height="18">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <p className="gg-review-text">"Best auto repair near downtown Oak Park. Fixed my brakes the same day!"</p>
                    <span className="gg-review-author">— Verified Customer</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="gg-feature-row">
              <div className="gg-feature-content">
                <div className="gg-feature-number">05</div>
                <h3>ROI Tracker</h3>
                <p>
                  Forget confusing website analytics. Our simplified dashboard shows the metrics that 
                  actually matter for local businesses: Map Views, Direction Requests, and Phone Calls. 
                  See your local dominance grow in real time.
                </p>
                <ul className="gg-feature-bullets">
                  <li><Check size={16} /> Map Views & Direction Requests</li>
                  <li><Check size={16} /> Phone call tracking</li>
                  <li><Check size={16} /> Monthly growth reports</li>
                </ul>
              </div>
              <div className="gg-feature-visual">
                <div className="gg-visual-card gg-visual-roi">
                  <div className="gg-roi-bars">
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar" style={{height: '40%'}}></div>
                      <span>Jan</span>
                    </div>
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar" style={{height: '55%'}}></div>
                      <span>Feb</span>
                    </div>
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar" style={{height: '50%'}}></div>
                      <span>Mar</span>
                    </div>
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar" style={{height: '70%'}}></div>
                      <span>Apr</span>
                    </div>
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar" style={{height: '85%'}}></div>
                      <span>May</span>
                    </div>
                    <div className="gg-roi-bar-group">
                      <div className="gg-roi-bar gg-roi-current" style={{height: '95%'}}></div>
                      <span>Jun</span>
                    </div>
                  </div>
                  <div className="gg-roi-label">
                    <TrendingUp size={14} />
                    <span>+137% Direction Requests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Tiering Section */}
      <section className="gg-pricing" id="pricing">
        <div className="gg-container">
          <div className="gg-section-label">Product Tiers</div>
          <h2 className="gg-section-title">Choose Your Level of Local Dominance</h2>
          <p className="gg-section-desc">
            Every tier builds on the last. Start with the foundation and scale as you grow.
          </p>

          <div className="gg-pricing-grid">
            <div className="gg-pricing-card">
              <div className="gg-pricing-tier">Tier 1</div>
              <h3 className="gg-pricing-name">The Foundation</h3>
              <p className="gg-pricing-desc">Automated Map Syncing & NAP Consistency</p>
              <div className="gg-pricing-price">
                <span className="gg-price-label">Starting at</span>
                <span className="gg-price-contact">Contact Us</span>
              </div>
              <ul className="gg-pricing-features">
                <li><Check size={16} /> Geo-Health Scanner access</li>
                <li><Check size={16} /> Entity-Sync across Google, Apple, Bing</li>
                <li><Check size={16} /> NAP consistency monitoring</li>
                <li><Check size={16} /> Basic ROI Tracker</li>
                <li><Check size={16} /> Monthly performance reports</li>
              </ul>
              <Link to="/contact" className="gg-pricing-btn" data-testid="geogrid-tier1-cta">Get Started</Link>
            </div>

            <div className="gg-pricing-card gg-pricing-popular">
              <div className="gg-popular-badge">Most Popular</div>
              <div className="gg-pricing-tier">Tier 2</div>
              <h3 className="gg-pricing-name">The Growth</h3>
              <p className="gg-pricing-desc">Local Content Generation & Review Management</p>
              <div className="gg-pricing-price">
                <span className="gg-price-label">Starting at</span>
                <span className="gg-price-contact">Contact Us</span>
              </div>
              <ul className="gg-pricing-features">
                <li><Check size={16} /> Everything in Foundation</li>
                <li><Check size={16} /> Neighborhood Content Engine</li>
                <li><Check size={16} /> AI-generated local updates</li>
                <li><Check size={16} /> Review Magnet (SMS + Email)</li>
                <li><Check size={16} /> Review response management</li>
                <li><Check size={16} /> Advanced ROI analytics</li>
              </ul>
              <Link to="/contact" className="gg-pricing-btn gg-pricing-btn-primary" data-testid="geogrid-tier2-cta">Get Started</Link>
            </div>

            <div className="gg-pricing-card">
              <div className="gg-pricing-tier">Tier 3</div>
              <h3 className="gg-pricing-name">The Authority</h3>
              <p className="gg-pricing-desc">Entity Building & Community Backlink Placement</p>
              <div className="gg-pricing-price">
                <span className="gg-price-label">Starting at</span>
                <span className="gg-price-contact">Contact Us</span>
              </div>
              <ul className="gg-pricing-features">
                <li><Check size={16} /> Everything in Growth</li>
                <li><Check size={16} /> High-level Entity building</li>
                <li><Check size={16} /> LocalBusiness Schema markup implementation</li>
                <li><Check size={16} /> Local community site backlinks</li>
                <li><Check size={16} /> Competitor displacement strategy</li>
                <li><Check size={16} /> Dedicated account manager</li>
                <li><Check size={16} /> Priority support</li>
              </ul>
              <Link to="/contact" className="gg-pricing-btn" data-testid="geogrid-tier3-cta">Get Started</Link>
            </div>
          </div>

          <div className="gg-pricing-comparison">
            <p className="gg-comparison-text">
              <Zap size={16} />
              <strong>Time Saved vs. Doing It Yourself:</strong> The average small business owner spends 
              15+ hours/month manually managing listings, writing local content, and chasing reviews. 
              GeoGrid automates all of it.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="gg-final-cta">
        <div className="gg-container">
          <div className="gg-cta-content">
            <Shield size={40} className="gg-cta-icon" />
            <h2>Stop Being a Website.<br/>Start Being a Source of Truth.</h2>
            <p>
              In 2026, success isn't about having the best website — it's about being the most 
              trusted local authority in your neighborhood. Every day you wait, competitors claim 
              more of your geographic territory. See exactly where you stand.
            </p>
            <div className="gg-cta-buttons">
              <a href="#free-scan" className="gg-btn-primary gg-btn-lg" data-testid="geogrid-final-cta">
                Get Your Free Scan
                <ArrowRight size={18} />
              </a>
              <Link to="/contact" className="gg-btn-ghost gg-btn-lg">
                Talk to Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeoGridLandingPage;
