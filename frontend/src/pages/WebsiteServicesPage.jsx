import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Code, RefreshCw, Server, Wrench, ArrowRight, Check, Layers, Zap, Shield, TrendingUp } from 'lucide-react';
import './WebsiteServicesPage.css';

const WebsiteServicesPage = () => {
  return (
    <div className="ws-page" data-testid="website-services-page">
      {/* Hero */}
      <section className="ws-hero">
        <div className="ws-hero-bg">
          <div className="ws-grid-pattern"></div>
        </div>
        <div className="ws-hero-content">
          <div className="ws-hero-badge">
            <Globe size={14} />
            <span>Website Services</span>
          </div>
          <h1 className="ws-hero-title" data-testid="ws-hero-title">
            Your Website Is the <span className="ws-highlight">Foundation</span> of Local Dominance
          </h1>
          <p className="ws-hero-subtitle">
            You already have a website. You already know that ranking on Google matters. 
            The question is: is your current site built to win in today's geographic search landscape? 
            We either build you a new one or rebuild what you have — optimized from day one.
          </p>
          <div className="ws-hero-stats">
            <div className="ws-stat">
              <span className="ws-stat-number">99%</span>
              <span className="ws-stat-text">of service companies have a website</span>
            </div>
            <div className="ws-stat-divider"></div>
            <div className="ws-stat">
              <span className="ws-stat-number">75%</span>
              <span className="ws-stat-text">aren't optimized for local search</span>
            </div>
            <div className="ws-stat-divider"></div>
            <div className="ws-stat">
              <span className="ws-stat-number">3 sec</span>
              <span className="ws-stat-text">is all you get to make an impression</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Premise */}
      <section className="ws-premise">
        <div className="ws-container">
          <div className="ws-section-label">The Reality</div>
          <h2 className="ws-section-title">You Know You Have a Problem. We Have the Fix.</h2>
          <p className="ws-section-desc">
            If you're reading this, you've already realized that being invisible on Google is costing 
            you money. You understand the value of being at the top of search results. The next step 
            isn't more SEO blog posts — it's a website built from the ground up for how Google actually 
            works today.
          </p>
          <div className="ws-premise-cards">
            <div className="ws-premise-card">
              <div className="ws-premise-icon ws-premise-warning">
                <Globe size={28} />
              </div>
              <h3>Your Current Site Was Built for the Old Web</h3>
              <p>Most service company websites were designed to "look nice" — not to rank in geographic search. They're slow, not mobile-first, and invisible to Google's entity-based algorithm.</p>
            </div>
            <div className="ws-premise-card">
              <div className="ws-premise-icon ws-premise-success">
                <Code size={28} />
              </div>
              <h3>We Build for How Google Works Now</h3>
              <p>Every site we build is structured for entity search, local schema markup, mobile-first performance, and geographic relevance — the signals that actually move the needle in 2026.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Site Construction */}
      <section className="ws-construction" data-testid="ws-site-construction">
        <div className="ws-container">
          <div className="ws-section-label">Site Construction</div>
          <h2 className="ws-section-title">Two Paths to a High-Performance Website</h2>
          <p className="ws-section-desc">
            Whether you're starting fresh or have an existing site, we meet you where you are 
            and build something that actually drives local customers to your door.
          </p>

          <div className="ws-construction-grid">
            {/* New Build */}
            <div className="ws-construction-card" data-testid="ws-new-build-card">
              <div className="ws-card-header ws-header-new">
                <Code size={32} />
                <span className="ws-card-option">Option 1</span>
              </div>
              <h3>New Build</h3>
              <p className="ws-card-tagline">Start from scratch. Built right from day one.</p>
              <p className="ws-card-desc">
                We design and develop a brand-new website purpose-built for local search dominance. 
                Every page, every element, every line of code is optimized for geographic entity search 
                from the ground up.
              </p>
              <ul className="ws-card-features">
                <li><Check size={16} /> Custom design tailored to your brand and industry</li>
                <li><Check size={16} /> Mobile-first, fast-loading architecture</li>
                <li><Check size={16} /> LocalBusiness schema markup built in</li>
                <li><Check size={16} /> Geographic content strategy for your service area</li>
                <li><Check size={16} /> Google Business Profile integration</li>
                <li><Check size={16} /> Review display and trust signals</li>
              </ul>
              <div className="ws-card-ideal">
                <Zap size={14} />
                <span><strong>Ideal for:</strong> New businesses, businesses with outdated sites beyond repair, or companies ready for a complete rebrand.</span>
              </div>
            </div>

            {/* Rebuild & Optimize */}
            <div className="ws-construction-card" data-testid="ws-rebuild-card">
              <div className="ws-card-header ws-header-rebuild">
                <RefreshCw size={32} />
                <span className="ws-card-option">Option 2</span>
              </div>
              <h3>Rebuild & Optimize</h3>
              <p className="ws-card-tagline">Keep what works. Fix everything else.</p>
              <p className="ws-card-desc">
                We scrape your existing site, preserve your content and brand identity, then rebuild 
                the entire structure for performance and local search. Same brand, dramatically better results.
              </p>
              <ul className="ws-card-features">
                <li><Check size={16} /> Full audit and scrape of your current site</li>
                <li><Check size={16} /> Content migration with SEO improvements</li>
                <li><Check size={16} /> Performance optimization (speed, mobile, Core Web Vitals)</li>
                <li><Check size={16} /> Schema markup and structured data implementation</li>
                <li><Check size={16} /> Local search optimization layered in</li>
                <li><Check size={16} /> Redirect mapping to preserve existing rankings</li>
              </ul>
              <div className="ws-card-ideal">
                <Zap size={14} />
                <span><strong>Ideal for:</strong> Established businesses with good content but poor technical performance, or companies that want to keep their brand but modernize.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Hosting */}
      <section className="ws-hosting" data-testid="ws-monthly-hosting">
        <div className="ws-container">
          <div className="ws-section-label">Monthly Hosting</div>
          <h2 className="ws-section-title">Reliable, Fast, Secure Hosting</h2>
          <p className="ws-section-desc">
            Your website needs a home that's fast, secure, and always online. Our managed hosting 
            takes the technical burden off your plate so you can focus on running your business.
          </p>

          <div className="ws-hosting-card">
            <div className="ws-hosting-icon">
              <Server size={40} />
            </div>
            <div className="ws-hosting-content">
              <h3>Managed Website Hosting</h3>
              <p>
                We handle the servers, security, backups, and uptime monitoring. 
                Your site stays fast and protected — no technical knowledge required on your end.
              </p>
              <div className="ws-hosting-features">
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>SSL certificate included</span>
                </div>
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>Daily automated backups</span>
                </div>
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>CDN for fast load times</span>
                </div>
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>Security monitoring & malware protection</span>
                </div>
                <div className="ws-hosting-feature">
                  <Check size={16} />
                  <span>Domain management support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Maintenance */}
      <section className="ws-maintenance" data-testid="ws-monthly-maintenance">
        <div className="ws-container">
          <div className="ws-section-label">Monthly Maintenance</div>
          <h2 className="ws-section-title">Keep Your Site Sharp and Your Rankings Growing</h2>
          <p className="ws-section-desc">
            A website isn't a "set it and forget it" asset. Google rewards sites that are actively 
            maintained and updated. Our maintenance plans align directly with your 
            <Link to="/geogrid" className="ws-inline-link"> Search Engine (GeoGrid) tier</Link> to 
            keep everything working together.
          </p>

          <div className="ws-maintenance-grid">
            <div className="ws-maintenance-card" data-testid="ws-maintenance-foundation">
              <div className="ws-maint-tier">Pairs with GeoGrid Tier 1</div>
              <h3>Foundation Maintenance</h3>
              <p className="ws-maint-desc">Keep the lights on and the basics updated</p>
              <ul className="ws-maint-features">
                <li><Check size={16} /> Monthly CMS and plugin updates</li>
                <li><Check size={16} /> Security patches and monitoring</li>
                <li><Check size={16} /> Performance checks (speed, uptime)</li>
                <li><Check size={16} /> Basic content updates (up to 2/month)</li>
                <li><Check size={16} /> Monthly health report</li>
              </ul>
              <div className="ws-maint-price">
                <span className="ws-price-label">Monthly</span>
                <span className="ws-price-value">Contact Us</span>
              </div>
            </div>

            <div className="ws-maintenance-card ws-maint-popular" data-testid="ws-maintenance-growth">
              <div className="ws-maint-badge">Recommended</div>
              <div className="ws-maint-tier">Pairs with GeoGrid Tier 2</div>
              <h3>Growth Maintenance</h3>
              <p className="ws-maint-desc">Active optimization to improve rankings month over month</p>
              <ul className="ws-maint-features">
                <li><Check size={16} /> Everything in Foundation</li>
                <li><Check size={16} /> Monthly local content updates (up to 4 pages)</li>
                <li><Check size={16} /> Schema markup monitoring and updates</li>
                <li><Check size={16} /> Core Web Vitals optimization</li>
                <li><Check size={16} /> Google Business Profile sync checks</li>
                <li><Check size={16} /> Quarterly strategy review call</li>
              </ul>
              <div className="ws-maint-price">
                <span className="ws-price-label">Monthly</span>
                <span className="ws-price-value">Contact Us</span>
              </div>
            </div>

            <div className="ws-maintenance-card" data-testid="ws-maintenance-authority">
              <div className="ws-maint-tier">Pairs with GeoGrid Tier 3</div>
              <h3>Authority Maintenance</h3>
              <p className="ws-maint-desc">Full-service site management to dominate your market</p>
              <ul className="ws-maint-features">
                <li><Check size={16} /> Everything in Growth</li>
                <li><Check size={16} /> Unlimited content updates</li>
                <li><Check size={16} /> Advanced local SEO implementation</li>
                <li><Check size={16} /> Competitor site monitoring</li>
                <li><Check size={16} /> A/B testing for conversion optimization</li>
                <li><Check size={16} /> Monthly strategy call with dedicated manager</li>
                <li><Check size={16} /> Priority support (same-day response)</li>
              </ul>
              <div className="ws-maint-price">
                <span className="ws-price-label">Monthly</span>
                <span className="ws-price-value">Contact Us</span>
              </div>
            </div>
          </div>

          <div className="ws-tier-note">
            <Layers size={16} />
            <p>
              <strong>How this connects:</strong> Your maintenance tier aligns with your 
              <Link to="/geogrid" className="ws-inline-link"> Search Engine (GeoGrid) plan</Link>. 
              As you grow through Foundation → Growth → Authority, your website maintenance scales 
              to support the increasing search optimization work.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="ws-pricing" data-testid="ws-pricing-section">
        <div className="ws-container">
          <div className="ws-section-label">Pricing</div>
          <h2 className="ws-section-title">Our Services at a Glance</h2>
          <p className="ws-section-desc">
            Straightforward services. No hidden fees. All pricing is customized based on your 
            specific needs and scope.
          </p>

          <div className="ws-pricing-table">
            <div className="ws-pricing-row ws-pricing-header">
              <div className="ws-pricing-service">Service</div>
              <div className="ws-pricing-type">Type</div>
              <div className="ws-pricing-cost">Pricing</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-new-build">
              <div className="ws-pricing-service">
                <Code size={18} />
                <span>New Build</span>
              </div>
              <div className="ws-pricing-type">One-Time</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-rebuild">
              <div className="ws-pricing-service">
                <RefreshCw size={18} />
                <span>Rebuild & Optimize</span>
              </div>
              <div className="ws-pricing-type">One-Time</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-hosting">
              <div className="ws-pricing-service">
                <Server size={18} />
                <span>Monthly Hosting</span>
              </div>
              <div className="ws-pricing-type">Monthly</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-maintenance-f">
              <div className="ws-pricing-service">
                <Wrench size={18} />
                <span>Foundation Maintenance</span>
              </div>
              <div className="ws-pricing-type">Monthly</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-maintenance-g">
              <div className="ws-pricing-service">
                <Wrench size={18} />
                <span>Growth Maintenance</span>
              </div>
              <div className="ws-pricing-type">Monthly</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
            <div className="ws-pricing-row" data-testid="ws-pricing-maintenance-a">
              <div className="ws-pricing-service">
                <Wrench size={18} />
                <span>Authority Maintenance</span>
              </div>
              <div className="ws-pricing-type">Monthly</div>
              <div className="ws-pricing-cost">Contact Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ws-cta">
        <div className="ws-container">
          <div className="ws-cta-content">
            <Shield size={40} className="ws-cta-icon" />
            <h2>Ready to Build a Website That Actually Works?</h2>
            <p>
              Whether you need a new site or a rebuild of what you have, we'll create a 
              high-performance foundation for your local search strategy. Combined with 
              GeoGrid and BYON, you'll have everything you need to dominate your market.
            </p>
            <div className="ws-cta-buttons">
              <Link to="/geogrid" className="ws-btn-primary" data-testid="ws-cta-geogrid">
                Explore Search Engine (GeoGrid)
                <ArrowRight size={18} />
              </Link>
              <Link to="/big-market" className="ws-btn-ghost" data-testid="ws-cta-big-market">
                See Target Industries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteServicesPage;
