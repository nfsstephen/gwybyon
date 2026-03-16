import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, MapPin, Phone, Globe, Check, ArrowRight, Zap,
  Crown, Lock, TrendingUp, BarChart3, Search, Users, Layers
} from 'lucide-react';
import './ServicesAndPricingPage.css';

const ServicesAndPricingPage = () => {
  return (
    <div className="sp-page" data-testid="services-pricing-page">

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-bg"><div className="sp-grid-pattern"></div></div>
        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <Shield size={14} />
            <span>All-in-One Growth Partner</span>
          </div>
          <h1 className="sp-hero-title" data-testid="sp-hero-title">
            One Vendor.<br />
            <span className="sp-highlight">Three Solutions.</span><br />
            Your Exclusive Territory.
          </h1>
          <p className="sp-hero-subtitle">
            We don't just build websites. We deploy a complete local dominance system — 
            search optimization, team communication, and exclusive territory protection — 
            so you own your market, not just a URL.
          </p>
          <div className="sp-hero-stats">
            <div className="sp-stat">
              <span className="sp-stat-num">6</span>
              <span className="sp-stat-label">Industries Served</span>
            </div>
            <div className="sp-stat-divider"></div>
            <div className="sp-stat">
              <span className="sp-stat-num">3</span>
              <span className="sp-stat-label">Integrated Solutions</span>
            </div>
            <div className="sp-stat-divider"></div>
            <div className="sp-stat">
              <span className="sp-stat-num">1</span>
              <span className="sp-stat-label">Territory Per Industry</span>
            </div>
          </div>
        </div>
      </section>

      {/* Territory Protection */}
      <section className="sp-territory" data-testid="sp-territory">
        <div className="sp-container">
          <div className="sp-section-badge"><Lock size={14} /> Core Differentiator</div>
          <h2 className="sp-section-title">Exclusive Territory Protection</h2>
          <p className="sp-section-desc">
            Every plan includes something our competitors can't offer: a protected geographic territory. 
            We work with <strong>one business per industry per territory</strong>. Once you claim yours, 
            no competitor in your industry gets our services in your area. Period.
          </p>
          <div className="sp-territory-grid">
            <div className="sp-territory-card">
              <Crown size={28} />
              <h3>Your Market. Protected.</h3>
              <p>We fight for you, not between you and your competitors. Your investment in local dominance is structurally protected.</p>
            </div>
            <div className="sp-territory-card">
              <Shield size={28} />
              <h3>Scarcity Creates Value</h3>
              <p>Territories are finite and first-come, first-served. Early adopters lock out their competitors permanently.</p>
            </div>
            <div className="sp-territory-card">
              <TrendingUp size={28} />
              <h3>Aligned Incentives</h3>
              <p>We succeed when you dominate your local market. We never profit from selling the same tools to your competition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included — The Three Solutions */}
      <section className="sp-solutions" data-testid="sp-three-solutions">
        <div className="sp-container">
          <div className="sp-section-badge"><Layers size={14} /> What Every Plan Includes</div>
          <h2 className="sp-section-title">Three Solutions. One Monthly Investment.</h2>
          <p className="sp-section-desc">
            Every tier bundles all three pillars of local market dominance. 
            No add-ons. No surprise fees. One partner, one invoice, total coverage.
          </p>
          <div className="sp-solutions-grid">
            <div className="sp-solution-card sp-sol-web">
              <div className="sp-sol-icon"><Globe size={32} /></div>
              <h3>High-Performance Website</h3>
              <p>
                A website built (or rebuilt) for modern local search. Mobile-first, schema-optimized, 
                and designed to convert visitors into customers. Includes managed hosting, SSL, daily backups, and CDN.
              </p>
              <ul>
                <li><Check size={14} /> New Build or Rebuild included</li>
                <li><Check size={14} /> Managed hosting & security</li>
                <li><Check size={14} /> Ongoing maintenance & updates</li>
              </ul>
            </div>
            <div className="sp-solution-card sp-sol-geo">
              <div className="sp-sol-icon"><MapPin size={32} /></div>
              <h3>The GeoGrid Advantage</h3>
              <p>
                Our proprietary 5-tool suite that automates everything Google uses to rank local businesses. 
                Stop being invisible to customers three blocks away.
              </p>
              <ul>
                <li><Check size={14} /> Geo-Health Scanner & Authority Score</li>
                <li><Check size={14} /> Entity-Sync across 60+ directories</li>
                <li><Check size={14} /> AI-powered local content engine</li>
                <li><Check size={14} /> Review Magnet automation</li>
                <li><Check size={14} /> ROI Tracker (Map Views, Calls, Directions)</li>
              </ul>
            </div>
            <div className="sp-solution-card sp-sol-byon">
              <div className="sp-sol-icon"><Phone size={32} /></div>
              <h3>Seamless Team Communication</h3>
              <p>
                Every plan includes 2 managed BYON phone lines. Give your field team a professional second line 
                with call control, tracking, and scam protection — without touching their personal phones.
              </p>
              <ul>
                <li><Check size={14} /> 2 managed BYON lines included</li>
                <li><Check size={14} /> Business/personal call separation</li>
                <li><Check size={14} /> Call control & whitelisting</li>
                <li><Check size={14} /> Scam protection for employees</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="sp-pricing" data-testid="sp-pricing">
        <div className="sp-container">
          <div className="sp-section-badge"><BarChart3 size={14} /> Pricing</div>
          <h2 className="sp-section-title">Choose Your Level of Local Dominance</h2>
          <p className="sp-section-desc">
            Every tier includes your website, GeoGrid search tools, 2 BYON lines, and exclusive territory rights.
            The difference is how aggressively we grow your local presence.
          </p>

          {/* Activation Fee Banner */}
          <div className="sp-activation-banner" data-testid="sp-activation-fee">
            <div className="sp-activation-icon"><Zap size={24} /></div>
            <div className="sp-activation-text">
              <h3>$1,497 Territory Activation Fee</h3>
              <p>One-time fee covers your New Website Build or Rebuild & Optimize — plus territory setup, 
                 initial GeoGrid configuration, and BYON line provisioning. This is your launchpad.</p>
            </div>
          </div>

          <div className="sp-pricing-grid">
            {/* Foundation */}
            <div className="sp-pricing-card" data-testid="sp-tier-foundation">
              <div className="sp-tier-label">Tier 1</div>
              <h3 className="sp-tier-name">Foundation</h3>
              <p className="sp-tier-tagline">Establish your digital presence and claim your territory</p>
              <div className="sp-tier-price">
                <span className="sp-price-amount">$497</span>
                <span className="sp-price-period">/month</span>
              </div>
              <div className="sp-tier-includes">
                <div className="sp-includes-label">Everything includes:</div>
                <ul>
                  <li><Check size={14} /> Managed website hosting & security</li>
                  <li><Check size={14} /> Monthly CMS & plugin updates</li>
                  <li><Check size={14} /> Up to 2 content updates/month</li>
                  <li><Check size={14} /> Geo-Health Scanner access</li>
                  <li><Check size={14} /> Entity-Sync (Google, Apple, Bing, 60+)</li>
                  <li><Check size={14} /> NAP consistency monitoring</li>
                  <li><Check size={14} /> Basic ROI Tracker</li>
                  <li><Check size={14} /> 2 managed BYON phone lines</li>
                  <li><Check size={14} /> Exclusive territory rights</li>
                  <li><Check size={14} /> Monthly performance report</li>
                </ul>
              </div>
              <div className="sp-tier-ideal">
                <strong>Ideal for:</strong> Businesses ready to establish a professional online presence and lock out competitors from their territory.
              </div>
            </div>

            {/* Growth */}
            <div className="sp-pricing-card sp-pricing-popular" data-testid="sp-tier-growth">
              <div className="sp-popular-badge">Most Popular</div>
              <div className="sp-tier-label">Tier 2</div>
              <h3 className="sp-tier-name">Growth</h3>
              <p className="sp-tier-tagline">Actively grow your local rankings and customer pipeline</p>
              <div className="sp-tier-price">
                <span className="sp-price-amount">$797</span>
                <span className="sp-price-period">/month</span>
              </div>
              <div className="sp-tier-includes">
                <div className="sp-includes-label">Everything in Foundation, plus:</div>
                <ul>
                  <li><Check size={14} /> Up to 4 local content updates/month</li>
                  <li><Check size={14} /> Neighborhood Content Engine (AI)</li>
                  <li><Check size={14} /> Review Magnet (SMS + Email automation)</li>
                  <li><Check size={14} /> Review response management</li>
                  <li><Check size={14} /> Schema markup monitoring</li>
                  <li><Check size={14} /> Core Web Vitals optimization</li>
                  <li><Check size={14} /> Google Business Profile sync</li>
                  <li><Check size={14} /> Advanced ROI analytics</li>
                  <li><Check size={14} /> Quarterly strategy review call</li>
                </ul>
              </div>
              <div className="sp-tier-ideal">
                <strong>Ideal for:</strong> Businesses ready to actively grow their local search visibility and generate a consistent flow of new customers.
              </div>
            </div>

            {/* Authority */}
            <div className="sp-pricing-card" data-testid="sp-tier-authority">
              <div className="sp-tier-label">Tier 3</div>
              <h3 className="sp-tier-name">Authority</h3>
              <p className="sp-tier-tagline">Dominate your market with full-service management</p>
              <div className="sp-tier-price">
                <span className="sp-price-amount">$1,297</span>
                <span className="sp-price-period">/month</span>
              </div>
              <div className="sp-tier-includes">
                <div className="sp-includes-label">Everything in Growth, plus:</div>
                <ul>
                  <li><Check size={14} /> Unlimited content updates</li>
                  <li><Check size={14} /> Advanced local SEO implementation</li>
                  <li><Check size={14} /> High-level entity building</li>
                  <li><Check size={14} /> LocalBusiness Schema implementation</li>
                  <li><Check size={14} /> Community site backlink placement</li>
                  <li><Check size={14} /> Competitor displacement strategy</li>
                  <li><Check size={14} /> A/B testing for conversions</li>
                  <li><Check size={14} /> Dedicated account manager</li>
                  <li><Check size={14} /> Monthly strategy call</li>
                  <li><Check size={14} /> Priority same-day support</li>
                </ul>
              </div>
              <div className="sp-tier-ideal">
                <strong>Ideal for:</strong> Established businesses ready to become the undisputed local authority in their industry and territory.
              </div>
            </div>
          </div>

          {/* All Plans Include */}
          <div className="sp-all-include" data-testid="sp-all-include">
            <h3>Every Plan Includes</h3>
            <div className="sp-all-grid">
              <div className="sp-all-item"><Shield size={16} /> Exclusive Territory Rights</div>
              <div className="sp-all-item"><Phone size={16} /> 2 Managed BYON Lines</div>
              <div className="sp-all-item"><Globe size={16} /> Website Build or Rebuild</div>
              <div className="sp-all-item"><Search size={16} /> GeoGrid Search Tools</div>
              <div className="sp-all-item"><Lock size={16} /> SSL & Security Monitoring</div>
              <div className="sp-all-item"><TrendingUp size={16} /> ROI Performance Tracking</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="sp-industries" data-testid="sp-industries">
        <div className="sp-container">
          <div className="sp-section-badge"><Users size={14} /> Who We Serve</div>
          <h2 className="sp-section-title">Six High-Value Industries</h2>
          <p className="sp-section-desc">
            We've identified six industries where local businesses need all three solutions — 
            and where exclusive territory protection creates the most value.
          </p>
          <div className="sp-industry-grid">
            <Link to="/big-market/well-septic" className="sp-industry-pill">Well & Septic</Link>
            <Link to="/big-market/plumbers" className="sp-industry-pill">Plumbers</Link>
            <Link to="/big-market/electricians" className="sp-industry-pill">Electricians</Link>
            <Link to="/big-market/hvac" className="sp-industry-pill">Air & Heating</Link>
            <Link to="/big-market/pest-control" className="sp-industry-pill">Pest Control</Link>
            <Link to="/big-market/real-estate" className="sp-industry-pill">Real Estate</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta" data-testid="sp-cta">
        <div className="sp-container">
          <div className="sp-cta-inner">
            <Shield size={40} className="sp-cta-icon" />
            <h2>Ready to Claim Your Territory?</h2>
            <p>
              Territories are limited and assigned on a first-come, first-served basis. 
              Once a competitor in your industry claims your area, it's gone. 
              Don't wait to find out someone else moved first.
            </p>
            <div className="sp-cta-btns">
              <Link to="/web-service-v2" className="sp-btn-primary" data-testid="sp-cta-overview">
                See Full Service Details <ArrowRight size={18} />
              </Link>
              <Link to="/geogrid" className="sp-btn-ghost" data-testid="sp-cta-geogrid">
                Explore GeoGrid
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesAndPricingPage;
