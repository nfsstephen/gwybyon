import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets, Wrench, Zap, Thermometer, Bug, Home, ArrowRight, Check,
  Globe, Code, RefreshCw, Server, Shield, MapPin, Phone, Layers
} from 'lucide-react';
import FiveToolsSection from '../components/FiveToolsSection';
import './WebServiceV2Page.css';

const industries = [
  { name: 'Well & Septic Companies', icon: Droplets, path: '/big-market/well-septic', color: '#0369a1', desc: 'Emergency-driven services where being found first means everything. Field crews need managed communication.' },
  { name: 'Plumbers', icon: Wrench, path: '/big-market/plumbers', color: '#7c3aed', desc: 'High-intent "near me" searches dominate this industry. Technicians in the field need business/personal separation.' },
  { name: 'Electricians', icon: Zap, path: '/big-market/electricians', color: '#d97706', desc: 'Safety-critical field work demands controlled communications. Local search visibility drives new customer acquisition.' },
  { name: 'Air & Heating Companies', icon: Thermometer, path: '/big-market/hvac', color: '#dc2626', desc: 'Seasonal demand spikes make search rankings critical. Large field teams need scalable phone management.' },
  { name: 'Pest Control Services', icon: Bug, path: '/big-market/pest-control', color: '#16a34a', desc: 'Recurring service model with technicians covering territories daily. Local visibility drives the first appointment.' },
  { name: 'Real Estate', icon: Home, path: '/big-market/real-estate', color: '#0d9488', desc: 'Agents live on their phones. Separating client calls from personal life is essential. Local search drives leads.' },
];

const WebServiceV2Page = () => {
  return (
    <div className="v2-page" data-testid="web-service-v2-page">

      {/* Hero */}
      <section className="v2-hero">
        <div className="v2-hero-bg"><div className="v2-grid-pattern"></div></div>
        <div className="v2-hero-content">
          <div className="v2-hero-badge">
            <Layers size={14} />
            <span>Complete Market Solution</span>
          </div>
          <h1 className="v2-hero-title" data-testid="v2-hero-title">
            One Vendor.<br />
            <span className="v2-highlight">Three Solutions.</span><br />
            Six Industries.
          </h1>
          <p className="v2-hero-subtitle">
            Every local service company needs three things: a website built for modern search, 
            visibility at the top of Google, and a way to manage their field teams. 
            We deliver all three — with exclusive territory protection.
          </p>
          <div className="v2-hero-pills">
            <div className="v2-pill v2-pill-web"><Globe size={15} /> Website Services</div>
            <div className="v2-pill v2-pill-geo"><MapPin size={15} /> Search Engine (GeoGrid)</div>
            <div className="v2-pill v2-pill-byon"><Phone size={15} /> Field Team (BYON)</div>
          </div>
        </div>
      </section>

      {/* Target Industries */}
      <section className="v2-industries" data-testid="v2-industries">
        <div className="v2-container">
          <div className="v2-label">Who We Serve</div>
          <h2 className="v2-title">Six High-Value Industries</h2>
          <p className="v2-desc">
            We've identified six industries where local businesses need all three solutions. 
            Click into each to see the full strategy.
          </p>
          <div className="v2-industry-grid">
            {industries.map((ind) => (
              <Link to={ind.path} key={ind.path} className="v2-industry-card">
                <div className="v2-ind-icon" style={{ color: ind.color, borderColor: `${ind.color}33`, background: `${ind.color}0a` }}>
                  <ind.icon size={28} />
                </div>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
                <span className="v2-ind-link" style={{ color: ind.color }}>
                  View Strategy <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three Solutions Overview */}
      <section className="v2-solutions" data-testid="v2-three-solutions">
        <div className="v2-container">
          <div className="v2-label">The Complete Solution</div>
          <h2 className="v2-title">Three Problems. Three Solutions. One Vendor.</h2>
          <p className="v2-desc">
            Every business in these industries faces the same three challenges. 
            We solve all of them so they don't have to juggle multiple vendors.
          </p>
          <div className="v2-solutions-grid">
            <div className="v2-solution-card">
              <div className="v2-solution-num">01</div>
              <div className="v2-solution-icon v2-sol-web"><Globe size={28} /></div>
              <h3>Their Website Doesn't Work</h3>
              <p>
                99% of service companies have a website — but most were built for the old web. 
                They're slow, not mobile-first, and invisible to Google's entity-based algorithm. 
                We either <strong>build a new one</strong> or <strong>rebuild and optimize</strong> what they have.
              </p>
              <a href="#site-construction" className="v2-solution-link">
                See Website Services <ArrowRight size={14} />
              </a>
            </div>
            <div className="v2-solution-card">
              <div className="v2-solution-num">02</div>
              <div className="v2-solution-icon v2-sol-geo"><MapPin size={28} /></div>
              <h3>Customers Can't Find Them</h3>
              <p>
                Google changed how local search works. If they're not optimized for geographic 
                entity search, their competitors get the calls. <strong>GeoGrid</strong> puts them 
                at the top of local results — and our territory guarantee means we won't help 
                their competitors do the same.
              </p>
              <a href="#five-tools" className="v2-solution-link">
                See GeoGrid Tools <ArrowRight size={14} />
              </a>
            </div>
            <div className="v2-solution-card">
              <div className="v2-solution-num">03</div>
              <div className="v2-solution-icon v2-sol-byon"><Phone size={28} /></div>
              <h3>They Can't Manage Their Teams</h3>
              <p>
                They have technicians, contractors, plumbers, electricians, and agents using personal 
                phones for business. No oversight. No separation. <strong>BYON</strong> gives every 
                team member a managed second line — call control, tracking, and scam protection.
              </p>
              <Link to="/byon" className="v2-solution-link">
                See BYON Overview <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Site Construction */}
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

      {/* Five GeoGrid Tools */}
      <div id="five-tools">
        <FiveToolsSection
          title="The Five GeoGrid Tools We Sell Alongside BYON"
          subtitle="These are the search engine optimization tools the tech team is building. Combined with website services and BYON, this is the complete package."
        />
      </div>

      {/* Monthly Hosting */}
      <section className="v2-hosting" data-testid="v2-hosting">
        <div className="v2-container">
          <div className="v2-label">Monthly Hosting</div>
          <h2 className="v2-title">Reliable, Fast, Secure Hosting</h2>
          <p className="v2-desc">
            Every website we build needs a home that's fast, secure, and always online. 
            Our managed hosting takes the technical burden off their plate.
          </p>
          <div className="v2-hosting-card">
            <div className="v2-hosting-icon"><Server size={40} /></div>
            <div className="v2-hosting-body">
              <h3>Managed Website Hosting</h3>
              <p>We handle servers, security, backups, and uptime monitoring. The site stays fast and protected.</p>
              <div className="v2-hosting-features">
                <div className="v2-hf"><Check size={16} /><span>99.9% uptime guarantee</span></div>
                <div className="v2-hf"><Check size={16} /><span>SSL certificate included</span></div>
                <div className="v2-hf"><Check size={16} /><span>Daily automated backups</span></div>
                <div className="v2-hf"><Check size={16} /><span>CDN for fast load times</span></div>
                <div className="v2-hf"><Check size={16} /><span>Security monitoring & malware protection</span></div>
                <div className="v2-hf"><Check size={16} /><span>Domain management support</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Maintenance */}
      <section className="v2-maintenance" data-testid="v2-maintenance">
        <div className="v2-container">
          <div className="v2-label">Monthly Maintenance</div>
          <h2 className="v2-title">Keep Sites Sharp and Rankings Growing</h2>
          <p className="v2-desc">
            A website isn't "set it and forget it." Google rewards sites that are actively maintained. 
            These tiers align directly with the 
            <Link to="/geogrid" className="v2-inline-link"> Search Engine (GeoGrid) pricing tiers</Link>.
          </p>
          <div className="v2-maint-grid">
            <div className="v2-maint-card" data-testid="v2-maint-foundation">
              <div className="v2-maint-tier">Pairs with GeoGrid Tier 1</div>
              <h3>Foundation</h3>
              <p className="v2-maint-tagline">Keep the lights on and the basics updated</p>
              <ul className="v2-maint-list">
                <li><Check size={16} /> Monthly CMS and plugin updates</li>
                <li><Check size={16} /> Security patches and monitoring</li>
                <li><Check size={16} /> Performance checks (speed, uptime)</li>
                <li><Check size={16} /> Basic content updates (up to 2/month)</li>
                <li><Check size={16} /> Monthly health report</li>
              </ul>
              <div className="v2-maint-price">
                <span className="v2-price-label">Monthly</span>
                <span className="v2-price-val">Contact Us</span>
              </div>
            </div>
            <div className="v2-maint-card v2-maint-popular" data-testid="v2-maint-growth">
              <div className="v2-maint-badge">Recommended</div>
              <div className="v2-maint-tier">Pairs with GeoGrid Tier 2</div>
              <h3>Growth</h3>
              <p className="v2-maint-tagline">Active optimization to improve rankings monthly</p>
              <ul className="v2-maint-list">
                <li><Check size={16} /> Everything in Foundation</li>
                <li><Check size={16} /> Monthly local content updates (up to 4 pages)</li>
                <li><Check size={16} /> Schema markup monitoring and updates</li>
                <li><Check size={16} /> Core Web Vitals optimization</li>
                <li><Check size={16} /> Google Business Profile sync checks</li>
                <li><Check size={16} /> Quarterly strategy review call</li>
              </ul>
              <div className="v2-maint-price">
                <span className="v2-price-label">Monthly</span>
                <span className="v2-price-val">Contact Us</span>
              </div>
            </div>
            <div className="v2-maint-card" data-testid="v2-maint-authority">
              <div className="v2-maint-tier">Pairs with GeoGrid Tier 3</div>
              <h3>Authority</h3>
              <p className="v2-maint-tagline">Full-service management to dominate the market</p>
              <ul className="v2-maint-list">
                <li><Check size={16} /> Everything in Growth</li>
                <li><Check size={16} /> Unlimited content updates</li>
                <li><Check size={16} /> Advanced local SEO implementation</li>
                <li><Check size={16} /> Competitor site monitoring</li>
                <li><Check size={16} /> A/B testing for conversion optimization</li>
                <li><Check size={16} /> Monthly strategy call with dedicated manager</li>
                <li><Check size={16} /> Priority support (same-day response)</li>
              </ul>
              <div className="v2-maint-price">
                <span className="v2-price-label">Monthly</span>
                <span className="v2-price-val">Contact Us</span>
              </div>
            </div>
          </div>
          <div className="v2-tier-note">
            <Layers size={16} />
            <p>
              <strong>How this connects:</strong> Maintenance tiers align with 
              <Link to="/geogrid" className="v2-inline-link"> GeoGrid tiers</Link>. 
              As customers grow through Foundation → Growth → Authority, website maintenance 
              scales to support the increasing search optimization work.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="v2-pricing" data-testid="v2-pricing">
        <div className="v2-container">
          <div className="v2-label">Pricing</div>
          <h2 className="v2-title">All Services at a Glance</h2>
          <p className="v2-desc">
            Straightforward services. No hidden fees. All pricing customized to scope.
          </p>
          <div className="v2-pricing-table">
            <div className="v2-pr-row v2-pr-header">
              <div className="v2-pr-svc">Service</div>
              <div className="v2-pr-cat">Category</div>
              <div className="v2-pr-type">Type</div>
              <div className="v2-pr-cost">Pricing</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><Code size={16} /><span>New Website Build</span></div>
              <div className="v2-pr-cat">Website</div>
              <div className="v2-pr-type">One-Time</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><RefreshCw size={16} /><span>Rebuild & Optimize</span></div>
              <div className="v2-pr-cat">Website</div>
              <div className="v2-pr-type">One-Time</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><Server size={16} /><span>Managed Hosting</span></div>
              <div className="v2-pr-cat">Website</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row v2-pr-divider">
              <div className="v2-pr-svc"><Wrench size={16} /><span>Foundation Maintenance</span></div>
              <div className="v2-pr-cat">Maintenance</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><Wrench size={16} /><span>Growth Maintenance</span></div>
              <div className="v2-pr-cat">Maintenance</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><Wrench size={16} /><span>Authority Maintenance</span></div>
              <div className="v2-pr-cat">Maintenance</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row v2-pr-divider">
              <div className="v2-pr-svc"><MapPin size={16} /><span>GeoGrid Tier 1 — Foundation</span></div>
              <div className="v2-pr-cat">Search Engine</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><MapPin size={16} /><span>GeoGrid Tier 2 — Growth</span></div>
              <div className="v2-pr-cat">Search Engine</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row">
              <div className="v2-pr-svc"><MapPin size={16} /><span>GeoGrid Tier 3 — Authority</span></div>
              <div className="v2-pr-cat">Search Engine</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
            <div className="v2-pr-row v2-pr-divider">
              <div className="v2-pr-svc"><Phone size={16} /><span>BYON (per line)</span></div>
              <div className="v2-pr-cat">Field Team</div>
              <div className="v2-pr-type">Monthly</div>
              <div className="v2-pr-cost">Contact Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="v2-cta">
        <div className="v2-container">
          <div className="v2-cta-inner">
            <Shield size={40} className="v2-cta-icon" />
            <h2>The Complete Package for Local Market Dominance</h2>
            <p>
              Website. Search engine visibility. Field team management. 
              Three solutions, one vendor, exclusive territories. 
              Everything a local service company needs to win.
            </p>
            <div className="v2-cta-btns">
              <Link to="/geogrid" className="v2-btn-primary" data-testid="v2-cta-geogrid">
                Explore GeoGrid <ArrowRight size={18} />
              </Link>
              <Link to="/byon" className="v2-btn-ghost" data-testid="v2-cta-byon">
                Explore BYON
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebServiceV2Page;
