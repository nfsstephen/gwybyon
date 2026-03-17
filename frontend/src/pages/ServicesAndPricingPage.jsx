import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, MapPin, Phone, Globe, Check, X, ArrowRight, Zap,
  Crown, Lock, TrendingUp, BarChart3, Search, Users, Layers,
  Code, RefreshCw
} from 'lucide-react';
import './ServicesAndPricingPage.css';
import '../pages/WebServiceV2Page.css';

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

      {/* Website Services — New Build or Rebuild */}
      <section className="v2-construction" id="site-construction" data-testid="v2-site-construction">
        <div className="v2-container">
          <div className="v2-label">Website Services</div>
          <h2 className="v2-title">Two Paths to a High-Performance Website</h2>
          <p className="v2-desc">
            Whether they're starting fresh or have an existing site, we meet them where they are 
            and build something that drives local customers to their door.
          </p>
          <div className="v2-construction-grid">
            <div className="v2-build-card" data-testid="v2-new-build">
              <div className="v2-build-header v2-build-new">
                <Code size={32} />
                <span className="v2-build-option">Option 1</span>
              </div>
              <h3>New Build</h3>
              <p className="v2-build-tagline">Start from scratch. Built right from day one.</p>
              <p className="v2-build-desc">
                A brand-new website purpose-built for local search dominance. Every page, 
                every element is optimized for geographic entity search from the ground up.
              </p>
              <ul className="v2-build-features">
                <li><Check size={16} /> Custom design tailored to brand and industry</li>
                <li><Check size={16} /> Mobile-first, fast-loading architecture</li>
                <li><Check size={16} /> LocalBusiness schema markup built in</li>
                <li><Check size={16} /> Geographic content strategy for service area</li>
                <li><Check size={16} /> Google Business Profile integration</li>
                <li><Check size={16} /> Review display and trust signals</li>
              </ul>
              <div className="v2-build-ideal">
                <Zap size={14} />
                <span><strong>Ideal for:</strong> New businesses, outdated sites beyond repair, or companies ready for a complete rebrand.</span>
              </div>
            </div>
            <div className="v2-build-card" data-testid="v2-rebuild">
              <div className="v2-build-header v2-build-rebuild">
                <RefreshCw size={32} />
                <span className="v2-build-option">Option 2</span>
              </div>
              <h3>Rebuild & Optimize</h3>
              <p className="v2-build-tagline">Keep what works. Fix everything else.</p>
              <p className="v2-build-desc">
                We scrape the existing site, preserve content and brand identity, then rebuild 
                the entire structure for performance and local search. Same brand, dramatically better results.
              </p>
              <ul className="v2-build-features">
                <li><Check size={16} /> Full audit and scrape of current site</li>
                <li><Check size={16} /> Content migration with SEO improvements</li>
                <li><Check size={16} /> Performance optimization (speed, mobile, Core Web Vitals)</li>
                <li><Check size={16} /> Schema markup and structured data</li>
                <li><Check size={16} /> Local search optimization layered in</li>
                <li><Check size={16} /> Redirect mapping to preserve existing rankings</li>
              </ul>
              <div className="v2-build-ideal">
                <Zap size={14} />
                <span><strong>Ideal for:</strong> Established businesses with good content but poor technical performance.</span>
              </div>
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
            One package, three levels of service, designed to create the level of service that fits 
            your needs and your budget. Solve your website, search results, and team communication 
            needs all in one package from one vendor.
            <br /><br />
            You just choose the level of search dominance you want. Check 'The GeoGrid Advantage' 
            to see how many tools we use to scale your results.
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

      {/* ===== NEW: Comparison Matrix ===== */}
      <section className="sp-matrix" data-testid="sp-comparison-matrix">
        <div className="sp-container">
          <div className="sp-section-badge"><BarChart3 size={14} /> Tool Access by Tier</div>
          <h2 className="sp-matrix-title">More Tools. More Dominance.</h2>
          <p className="sp-matrix-desc">
            Each tier unlocks more of our 5-tool GeoGrid suite. Foundation gets you on the map.
            Growth actively builds your rankings. Authority deploys the full arsenal to dominate your market.
          </p>

          <div className="sp-matrix-wrapper">
            <table className="sp-matrix-table" data-testid="sp-matrix-table">
              <thead>
                <tr>
                  <th className="sp-matrix-feature-col"></th>
                  <th className="sp-matrix-tier-col" data-testid="sp-matrix-foundation-head">
                    <div className="sp-matrix-tier-label">Tier 1</div>
                    <div className="sp-matrix-tier-name">Foundation</div>
                    <div className="sp-matrix-tier-price">$497<span>/mo</span></div>
                  </th>
                  <th className="sp-matrix-tier-col sp-matrix-tier-popular" data-testid="sp-matrix-growth-head">
                    <div className="sp-matrix-pop-badge">Most Popular</div>
                    <div className="sp-matrix-tier-label">Tier 2</div>
                    <div className="sp-matrix-tier-name">Growth</div>
                    <div className="sp-matrix-tier-price">$797<span>/mo</span></div>
                  </th>
                  <th className="sp-matrix-tier-col" data-testid="sp-matrix-authority-head">
                    <div className="sp-matrix-tier-label">Tier 3</div>
                    <div className="sp-matrix-tier-name">Authority</div>
                    <div className="sp-matrix-tier-price">$1,297<span>/mo</span></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* GeoGrid Tools Group */}
                <tr className="sp-matrix-group-header">
                  <td colSpan={4}>
                    <MapPin size={16} />
                    <span>GeoGrid Tools (5-Tool Suite)</span>
                  </td>
                </tr>
                <tr data-testid="sp-matrix-row-scanner">
                  <td className="sp-matrix-feature">Geo-Health Scanner<span className="sp-matrix-detail">Local Authority Score & heat map analysis</span></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr data-testid="sp-matrix-row-entity-sync">
                  <td className="sp-matrix-feature">Entity-Sync Dashboard<span className="sp-matrix-detail">NAP sync across Google, Apple, Bing & 60+ directories</span></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr data-testid="sp-matrix-row-content-engine">
                  <td className="sp-matrix-feature">Neighborhood Content Engine<span className="sp-matrix-detail">AI-powered hyper-local content generation</span></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr data-testid="sp-matrix-row-review-magnet">
                  <td className="sp-matrix-feature">Review Magnet<span className="sp-matrix-detail">Automated SMS & email review generation</span></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr data-testid="sp-matrix-row-roi-tracker">
                  <td className="sp-matrix-feature">ROI Tracker<span className="sp-matrix-detail">Map Views, Direction Requests, Phone Calls</span></td>
                  <td className="sp-matrix-text">Basic</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight">Advanced</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight">Advanced</td>
                </tr>
                <tr className="sp-matrix-tool-count">
                  <td className="sp-matrix-feature"><strong>Active GeoGrid Tools</strong></td>
                  <td className="sp-matrix-count">2 of 5</td>
                  <td className="sp-matrix-count sp-matrix-count-highlight">4 of 5</td>
                  <td className="sp-matrix-count sp-matrix-count-full">5 of 5</td>
                </tr>

                {/* Website Services Group */}
                <tr className="sp-matrix-group-header">
                  <td colSpan={4}>
                    <Globe size={16} />
                    <span>Website Services</span>
                  </td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">New Build or Rebuild</td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Managed Hosting, SSL & Security</td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Content Updates / Month</td>
                  <td className="sp-matrix-text">2</td>
                  <td className="sp-matrix-text">4</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight">Unlimited</td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Schema Markup Monitoring</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Core Web Vitals Optimization</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Advanced Local SEO</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">A/B Testing for Conversions</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>

                {/* BYON & Communication Group */}
                <tr className="sp-matrix-group-header">
                  <td colSpan={4}>
                    <Phone size={16} />
                    <span>BYON Team Communication</span>
                  </td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Managed BYON Phone Lines</td>
                  <td className="sp-matrix-text">2 lines</td>
                  <td className="sp-matrix-text">2 lines</td>
                  <td className="sp-matrix-text">2 lines</td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Business/Personal Call Separation</td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Call Control & Scam Protection</td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>

                {/* Territory & Support Group */}
                <tr className="sp-matrix-group-header">
                  <td colSpan={4}>
                    <Shield size={16} />
                    <span>Territory & Support</span>
                  </td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Exclusive Territory Rights</td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Performance Reports</td>
                  <td className="sp-matrix-text">Monthly</td>
                  <td className="sp-matrix-text">Monthly</td>
                  <td className="sp-matrix-text">Monthly</td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Strategy Review Calls</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-text">Quarterly</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight">Monthly</td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Dedicated Account Manager</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Priority Same-Day Support</td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check"><Check size={18} /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Activation Fee */}
          <div className="sp-matrix-activation" data-testid="sp-matrix-activation">
            <Zap size={20} />
            <div>
              <strong>$1,497 One-Time Territory Activation Fee</strong> — covers your website build/rebuild, territory setup, initial GeoGrid configuration, and BYON line provisioning.
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers (Original — kept for comparison) */}
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
              <Link to="/services-pricing" className="sp-btn-ghost" data-testid="sp-cta-geogrid">
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
