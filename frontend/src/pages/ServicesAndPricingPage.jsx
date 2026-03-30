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
              <span className="sp-stat-num">7</span>
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
            Whether you're starting fresh or have an existing site, we meet you where you are 
            and build something that drives local customers to your door.
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
              <div className="v2-build-pricing">
                <div className="v2-price-hero">
                  <span className="v2-price-dollar">$</span>
                  <span className="v2-price-amount">150</span>
                </div>
                <div className="v2-price-label">Initial Production</div>
                <div className="v2-price-upgrade-row">
                  <span className="v2-price-upgrade-tag">Upgrades:</span>
                  <span className="v2-price-upgrade-val">$50</span>
                  <span className="v2-price-upgrade-label">per request</span>
                </div>
              </div>
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
                We take your existing site, preserve content and brand identity, then rebuild 
                the entire structure for performance and local search. Same brand, dramatically better results.
              </p>
              <ul className="v2-build-features">
                <li><Check size={16} /> Full audit of current site</li>
                <li><Check size={16} /> Content migration with SEO improvements</li>
                <li><Check size={16} /> Performance optimization (speed, mobile, Core Web Vitals)</li>
                <li><Check size={16} /> Schema markup and structured data</li>
                <li><Check size={16} /> Local search optimization layered in</li>
                <li><Check size={16} /> Redirect mapping to preserve existing rankings</li>
              </ul>
              <div className="v2-build-pricing">
                <div className="v2-price-hero">
                  <span className="v2-price-dollar">$</span>
                  <span className="v2-price-amount">300</span>
                </div>
                <div className="v2-price-label">Rebuild Fee</div>
                <div className="v2-price-upgrade-row">
                  <span className="v2-price-upgrade-tag">Upgrades:</span>
                  <span className="v2-price-upgrade-val">$150</span>
                  <span className="v2-price-upgrade-label">e.g., color scheme change</span>
                </div>
              </div>
              <div className="v2-build-ideal">
                <Zap size={14} />
                <span><strong>Ideal for:</strong> Established businesses with good content but poor technical performance.</span>
              </div>
            </div>
          </div>
          <div className="v2-cta-below">
            <Link to="/subscribe#step-website" className="v2-build-cta" data-testid="cta-website">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>

          {/* Transparency Comment Box */}
          <div className="v2-transparency-box">
            <h4>A Note on Transparency</h4>
            <p>
              We want to begin this process with complete transparency. With the advent of AI, you absolutely 
              can build your own site — but before you do, ask yourself a few questions:
            </p>
            <ol>
              <li><strong>Where is my time best spent?</strong> Doing something I have no knowledge of, or letting professionals continue to provide the service while I focus on running my business?</li>
              <li><strong>If this new company is offering me a website service at half the price of my present provider, why didn't my present provider call me first and cut their price?</strong></li>
              <li><strong>What happens when something breaks?</strong> Will I know how to fix it, or will I be searching YouTube at midnight hoping for answers?</li>
              <li><strong>Is "cheap" really cheaper?</strong> A website that doesn't convert visitors into customers costs you money every day it's live.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Territory Protection — Core Differentiator */}
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

          {/* Market Area Pricing */}
          <p className="sp-territory-note">
            Market size refers to customer density and business opportunity within the county — not geographic area. 
            A "small market" county simply has a more focused customer base, while a "large market" has higher population density and more potential customers.
          </p>
          <div className="v2-construction-grid sp-market-pricing-grid">
            <div className="v2-build-card" data-testid="sp-small-market-card">
              <div className="v2-build-header v2-build-new">
                <MapPin size={32} />
                <span className="v2-build-option">Small Market</span>
              </div>
              <h3>Small Market County</h3>
              <p className="v2-build-tagline">Targeted reach in focused communities.</p>
              <p className="v2-build-desc">
                Small market doesn't mean small opportunity. These counties have a more focused customer base, 
                making it easier to establish dominance quickly. Lower competition means your investment goes further.
              </p>
              <ul className="v2-build-features">
                <li><Check size={16} /> Fewer competing businesses in your industry</li>
                <li><Check size={16} /> Faster path to market dominance</li>
                <li><Check size={16} /> Lower customer acquisition costs</li>
                <li><Check size={16} /> Perfect for building a strong local foundation</li>
              </ul>
              <div className="v2-build-pricing">
                <div className="v2-price-hero">
                  <span className="v2-price-dollar">$</span>
                  <span className="v2-price-amount">300</span>
                </div>
                <div className="v2-price-label">Per Territory Area</div>
              </div>
            </div>
            <div className="v2-build-card" data-testid="sp-large-market-card">
              <div className="v2-build-header v2-build-rebuild">
                <Users size={32} />
                <span className="v2-build-option">Large Market</span>
              </div>
              <h3>Large Market County</h3>
              <p className="v2-build-tagline">Maximum exposure in high-density areas.</p>
              <p className="v2-build-desc">
                Large market counties have a higher concentration of potential customers. More people means 
                more opportunity — and a protected territory here gives you access to a larger customer pool 
                that competitors can't touch.
              </p>
              <ul className="v2-build-features">
                <li><Check size={16} /> Higher concentration of potential customers</li>
                <li><Check size={16} /> Greater revenue potential per territory</li>
                <li><Check size={16} /> Premium market positioning</li>
                <li><Check size={16} /> Exclusive access to high-demand areas</li>
              </ul>
              <div className="v2-build-pricing">
                <div className="v2-price-hero">
                  <span className="v2-price-dollar">$</span>
                  <span className="v2-price-amount">1,200</span>
                </div>
                <div className="v2-price-label">Per Territory Area</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Claim CTA — after territory cards */}
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
              <Link to="/subscribe" className="sp-btn-primary" data-testid="sp-cta-claim">
                Claim your Territory before it is gone <ArrowRight size={18} />
              </Link>
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

      {/* ===== GeoGrid Tool Access ===== */}
      <section className="sp-matrix" data-testid="sp-comparison-matrix">
        <div className="sp-container">
          <div className="sp-section-badge"><BarChart3 size={14} /> GeoGrid Tool Access</div>
          <h2 className="sp-matrix-title">Five Tools. Two Market Types.</h2>
          <p className="sp-matrix-desc">
            Market Territory size affects pricing. Small markets require less 
            firepower to dominate. Large markets demand the full arsenal.
          </p>

          <div className="sp-matrix-wrapper">
            <table className="sp-matrix-table sp-matrix-split" data-testid="sp-matrix-table">
              <thead>
                <tr className="sp-matrix-market-row">
                  <th className="sp-matrix-feature-col"></th>
                  <th className="sp-matrix-market-header sp-market-header-small" colSpan={2}>
                    <MapPin size={14} /> Small Market Territory
                  </th>
                  <th className="sp-matrix-market-header sp-market-header-large">
                    <Crown size={14} /> Large Market Territory
                  </th>
                </tr>
                <tr>
                  <th className="sp-matrix-feature-col"></th>
                  <th className="sp-matrix-tier-col" data-testid="sp-small-standard-head">
                    <div className="sp-matrix-tier-name">Standard</div>
                  </th>
                  <th className="sp-matrix-tier-col sp-matrix-tier-small-premium" data-testid="sp-small-premium-head">
                    <div className="sp-matrix-tier-name">Premium</div>
                  </th>
                  <th className="sp-matrix-tier-col sp-matrix-tier-large" data-testid="sp-large-head">
                    <div className="sp-matrix-pop-badge">All 5 Tools</div>
                    <div className="sp-matrix-tier-name">Full Suite</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="sp-matrix-group-header">
                  <td colSpan={4}>
                    <MapPin size={16} />
                    <span>GeoGrid Tools (5-Tool Suite)</span>
                  </td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Geo-Health Scanner<span className="sp-matrix-detail">Local Authority Score & heat map analysis</span></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                  <td className="sp-matrix-check sp-matrix-border-right"><Check size={22} /></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Entity-Sync Dashboard<span className="sp-matrix-detail">NAP sync across Google, Apple, Bing & 60+ directories</span></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                  <td className="sp-matrix-check sp-matrix-border-right"><Check size={22} /></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Neighborhood Content Engine<span className="sp-matrix-detail">AI-powered hyper-local content generation</span></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check sp-matrix-border-right"><Check size={22} /></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">Review Magnet<span className="sp-matrix-detail">Automated SMS & email review generation</span></td>
                  <td className="sp-matrix-x"><X size={18} /></td>
                  <td className="sp-matrix-check sp-matrix-border-right"><Check size={22} /></td>
                  <td className="sp-matrix-check"><Check size={22} /></td>
                </tr>
                <tr>
                  <td className="sp-matrix-feature">ROI Tracker<span className="sp-matrix-detail">Map Views, Direction Requests, Phone Calls</span></td>
                  <td className="sp-matrix-text">Basic</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight sp-matrix-border-right">Advanced</td>
                  <td className="sp-matrix-text sp-matrix-text-highlight">Advanced</td>
                </tr>
                <tr className="sp-matrix-tool-count">
                  <td className="sp-matrix-feature"><strong>Active GeoGrid Tools</strong></td>
                  <td className="sp-matrix-count">2 of 5</td>
                  <td className="sp-matrix-count sp-matrix-count-full sp-matrix-border-right">5 of 5</td>
                  <td className="sp-matrix-count sp-matrix-count-full">5 of 5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="v2-cta-below sp-matrix-cta">
            <Link to="/subscribe" className="v2-build-cta" data-testid="cta-matrix-subscribe">
              Choose Your Territory & Subscribe <ArrowRight size={16} />
            </Link>
          </div>

          {/* Other Services — existing 3 columns preserved */}
          <div className="sp-market-block" data-testid="sp-other-services">
            <div className="sp-market-label sp-market-services">
              <Layers size={16} />
              <span>Additional Services (All Territories)</span>
            </div>
            <div className="sp-matrix-wrapper">
              <table className="sp-matrix-table" data-testid="sp-matrix-table">
                <thead>
                  <tr>
                    <th className="sp-matrix-feature-col"></th>
                    <th className="sp-matrix-tier-col" data-testid="sp-matrix-foundation-head">
                      <div className="sp-matrix-tier-label">Tier 1</div>
                      <div className="sp-matrix-tier-name">Foundation</div>
                    </th>
                    <th className="sp-matrix-tier-col sp-matrix-tier-popular" data-testid="sp-matrix-growth-head">
                      <div className="sp-matrix-pop-badge">Most Popular</div>
                      <div className="sp-matrix-tier-label">Tier 2</div>
                      <div className="sp-matrix-tier-name">Growth</div>
                    </th>
                    <th className="sp-matrix-tier-col sp-matrix-tier-authority" data-testid="sp-matrix-authority-head">
                      <div className="sp-matrix-tier-label">Tier 3</div>
                      <div className="sp-matrix-tier-name">Authority</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Website Services Group */}
                  <tr className="sp-matrix-group-header">
                    <td colSpan={4}>
                      <Globe size={16} />
                      <span>Website Services</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">New Build or Rebuild</td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">Managed Hosting, SSL & Security</td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
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
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">Core Web Vitals Optimization</td>
                    <td className="sp-matrix-x"><X size={18} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">Advanced Local SEO</td>
                    <td className="sp-matrix-x"><X size={18} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">A/B Testing for Conversions</td>
                    <td className="sp-matrix-x"><X size={18} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
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
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">Call Control & Scam Protection</td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
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
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
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
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                  <tr>
                    <td className="sp-matrix-feature">Priority Same-Day Support</td>
                    <td className="sp-matrix-x"><X size={18} /></td>
                    <td className="sp-matrix-x"><X size={18} /></td>
                    <td className="sp-matrix-check"><Check size={22} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Activation Fee removed — replaced by per-county pricing */}
        </div>
      </section>

    </div>
  );
};

export default ServicesAndPricingPage;
