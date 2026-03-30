import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, BookOpen, DollarSign, Mail, CheckCircle, 
  RefreshCw, MapPin, ArrowRight, ArrowDown,
  Shield, Crown, Clock, Users, Ban, TrendingUp, 
  XCircle, Lock, AlertTriangle, Search, Phone, 
  Layers
} from 'lucide-react';
import './GatewayHomePage.css';

/* =============================================
   GATEWAY AI SYSTEMS — HOMEPAGE CONTENT
   5 main sections (no Nav/Footer — use your layout wrapper).
   
   Dependencies: 
     - react-router-dom (for Link in BYON cards)
     - lucide-react (for icons)
     - GatewayHomePage.css (companion stylesheet)
   
   Usage:
     import GatewayHomePage from './GatewayHomePage';
     // In your router: <Route path="/home" element={<GatewayHomePage />} />
============================================= */

// ─── SECTION 1: MARKETING MISSION ──────────────────
const MarketingMission = () => (
  <section className="mm-section">
    <div className="mm-container">
      <div className="mm-badge">OUR MISSION</div>
      <h2 className="mm-title">
        Websites Were Built to Advertise.<br />
        <span className="mm-accent">It's Time Someone Remembered That.</span>
      </h2>
      <p className="mm-subtitle">
        Gateway AI Systems exists to return website development to its original purpose: 
        bringing new customers to your business. Not feeding egos. Not selling colors and fonts. Marketing.
      </p>

      <div className="mm-narrative">
        <div className="mm-narrative-block">
          <div className="mm-narrative-icon"><BookOpen size={28} /></div>
          <div className="mm-narrative-content">
            <h3>How the Industry Lost Its Way</h3>
            <p>
              Websites are a technology born from the digital revolution — first with personal computers, 
              then reshaped by mobile phones and responsive design. But somewhere along the way, the people 
              building websites started selling the wrong things. Design trends. Color palettes. Domain names. 
              Features that had little to do with the actual purpose of a website, but everything to do with 
              the amount of labor and expertise it took to build one.
            </p>
            <p>
              The result? An entire industry that prices websites based on how they look — appealing 
              to the ego of the company owner — instead of what they do: advertise your business 
              and bring customers through your door.
            </p>
          </div>
        </div>

        <div className="mm-narrative-block">
          <div className="mm-narrative-icon"><Target size={28} /></div>
          <div className="mm-narrative-content">
            <h3>Remember the Yellow Pages?</h3>
            <p>
              Before websites existed, local businesses advertised in the Yellow Pages. And the Yellow Pages 
              got one thing exactly right: pricing was based on <strong>market size and potential</strong>. 
              A full-page ad in a large metropolitan area with a massive customer base cost more than the same 
              ad in a small rural market. That made sense — because the value of advertising is directly 
              tied to how many potential customers it reaches.
            </p>
            <p>
              Websites replaced the Yellow Pages. But the pricing philosophy was thrown out entirely. 
              Today, a small-town plumber pays the same as a plumber in a major metro — even though the 
              metro plumber has ten times the customer base and ten times the competition.
            </p>
          </div>
        </div>

        <div className="mm-narrative-block">
          <div className="mm-narrative-icon"><DollarSign size={28} /></div>
          <div className="mm-narrative-content">
            <h3>Pricing Should Reflect Results, Not Labor</h3>
            <p>
              Here's what the industry won't tell you: getting your website to the top of search results 
              is <strong>significantly easier in small markets</strong>. Less competition. Fewer businesses 
              fighting for the same results — placing your business at the top of the page. The work required 
              to produce results — actual customers walking through your door — is simply less.
            </p>
            <p>
              So why would we charge a small-market business the same as a large-market business? We wouldn't. 
              The cost to our customers is based on the market potential and the effort required to deliver 
              results — not the ego of the buyer and not a one-size-fits-all price tag.
            </p>
          </div>
        </div>
      </div>

      <div className="mm-approach">
        <div className="mm-approach-header">
          <Mail size={24} />
          <h3>How It Works</h3>
        </div>
        <div className="mm-approach-grid">
          <div className="mm-approach-card">
            <div className="mm-approach-step">01</div>
            <h4>Invitation Only</h4>
            <p>
              Our customers are selected, not solicited. You'll receive an invitation email 
              because we've identified an open territory in your industry and market area.
              Remember — we work with one business per industry per territory.
            </p>
          </div>
          <div className="mm-approach-card">
            <div className="mm-approach-step">02</div>
            <h4>Market Designation</h4>
            <p>
              Within your invitation, we designate whether your territory is a 
              <strong> large market</strong> or <strong>small market</strong> area. This designation 
              is based on customer base size, competition density, and the effort required to achieve 
              top search rankings.
            </p>
          </div>
          <div className="mm-approach-card">
            <div className="mm-approach-step">03</div>
            <h4>Fair Pricing</h4>
            <p>
              If you've been designated a small market customer, you'll find a checkbox on our pricing 
              page: <strong>"Designated Small Market Customer."</strong> Checking that box gives you a 
              50% discount on all pricing. Because your market requires less effort to dominate — and 
              our pricing reflects that honestly.
            </p>
          </div>
        </div>
      </div>

      <div className="mm-bottom-line">
        <CheckCircle size={22} />
        <p>
          <strong>The bottom line:</strong> It's time for website developers to be honest with their 
          customers. The cost of building a site is irrelevant. What matters is the cost to produce 
          the results your business needs — new customers. All of our pricing is based on the time 
          and effort it takes to get your business to the top of the search results in your market. 
          Nothing more, nothing less.
        </p>
      </div>
    </div>
  </section>
);

// ─── SECTION 2: STRATEGY OVERVIEW ──────────────────
const StrategyOverview = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="strategy-overview">
      <div className="so-content">
        <div className="so-badge">OUR MARKETING STRATEGY</div>
        <h1 className="so-title">A Two-Pronged Approach to Market Dominance</h1>
        <p className="so-subtitle">
          We don't rely on a single sales channel. We've built a coordinated strategy 
          that targets high-value customers from two angles — each reinforcing the other 
          to create a marketing engine that scales.
        </p>

        <div className="so-prongs">
          <div className="so-prong so-prong-1">
            <div className="so-prong-number">01</div>
            <div className="so-prong-icon"><MapPin size={32} /></div>
            <h3>Market Territories</h3>
            <p>
              Assign exclusive territories so our customers never compete against each other. 
              We fight for them, not between them. Scarcity creates urgency and loyalty.
            </p>
            <button className="so-prong-btn so-btn-1" onClick={() => scrollTo('section-territories')}>
              Explore Strategy <ArrowRight size={16} />
            </button>
          </div>

          <div className="so-prong so-prong-2">
            <div className="so-prong-number">02</div>
            <div className="so-prong-icon"><RefreshCw size={32} /></div>
            <h3>Cross Selling</h3>
            <p>
              Every business that needs GeoGrid also has field teams that need BYON. 
              One vendor, two solutions. Double the revenue per customer without doubling the effort.
            </p>
            <button className="so-prong-btn so-btn-2" onClick={() => scrollTo('section-crosssell')}>
              Explore Strategy <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SECTION 3: MARKET TERRITORIES ─────────────────
const MarketTerritories = () => (
  <section id="section-territories" className="market-territories">
    <div className="mt-hero">
      <div className="mt-badge">STRATEGY 1: MARKET TERRITORIES</div>
      <h2 className="mt-title">
        We Compete <em>For</em> Our Customers.<br />
        <span className="mt-title-accent">Never Against Them.</span>
      </h2>
      <p className="mt-subtitle">
        Most search engine companies will sell the same product to every business in 
        the same area. Four restaurants. Same zip code. Same SEO vendor. Only one can 
        rank #1 — so three of them lose. That's not a service. That's a conflict of interest.
      </p>
    </div>

    <div className="mt-problem">
      <h3 className="mt-section-title">The Dirty Secret of Our Competitors</h3>
      <p className="mt-bidding-war-caption">
        Traditional agencies profit by over-saturating your territory and selling your zip code to your competitors.
        <strong> We profit by making sure you own it.</strong>
      </p>
      <div className="mt-problem-visual">
        <div className="mt-problem-scenario">
          <div className="mt-scenario-label mt-scenario-them">How They Do It: Over-Saturation</div>
          <div className="mt-competitor-grid mt-oversaturated-bg">
            <div className="mt-competitor-slot mt-slot-losing"><XCircle size={20} /><span>Business A</span><small>Active in Territory</small></div>
            <div className="mt-competitor-slot mt-slot-losing"><XCircle size={20} /><span>Business B</span><small>Active in Territory</small></div>
            <div className="mt-competitor-slot mt-slot-winning"><CheckCircle size={20} /><span>Business C</span><small>Gets Lead (Luck)</small></div>
            <div className="mt-competitor-slot mt-slot-losing"><XCircle size={20} /><span>Business D</span><small>Active in Territory</small></div>
          </div>
          <div className="mt-scenario-result mt-result-bad">
            <Ban size={16} />
            <span>Same area. Same industry. The agency gets paid 4x to crowd your market.</span>
          </div>
        </div>

        <div className="mt-problem-vs">VS</div>

        <div className="mt-problem-scenario">
          <div className="mt-scenario-label mt-scenario-us">How We Do It</div>
          <div className="mt-territory-visual mt-protected-zone-bg">
            <div className="mt-territory-slot mt-territory-premium">
              <div className="mt-territory-badge"><Lock size={12} /><span>Territory Locked</span></div>
              <Crown size={24} />
              <span>Your Business</span>
              <small>Exclusive Zone</small>
            </div>
            <div className="mt-territory-shield">
              <Shield size={32} />
              <span>Protected Territory</span>
            </div>
          </div>
          <div className="mt-scenario-result mt-result-good mt-result-premium">
            <CheckCircle size={16} />
            <span>One customer per territory per industry. Your investment is protected.</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-conflict">
      <div className="mt-conflict-card">
        <AlertTriangle size={28} className="mt-conflict-icon" />
        <h4>Our Conflict of Interest Guarantee</h4>
        <p>
          We <strong>cannot</strong> work for your competitor. It's not just policy — it's in our contract. 
          Once you claim your territory, we are legally bound to refuse service to any competing business 
          in your industry within your geographic zone. Your success becomes our only option.
        </p>
      </div>
      <div className="mt-scarcity-notice">
        <Clock size={18} />
        <span>Once a territory is locked, it's gone for the duration of the partnership. Early action secures your position.</span>
      </div>
    </div>

    <div className="mt-process">
      <h3 className="mt-section-title">Our Territory Assignment Process</h3>
      <p className="mt-section-desc">A disciplined, four-step approach that protects the value of every customer relationship</p>
      <div className="mt-process-steps">
        <div className="mt-step">
          <div className="mt-step-number">01</div>
          <div className="mt-step-icon"><Users size={28} /></div>
          <h4>Define Industries</h4>
          <p>We have identified SIX high-value local industries where businesses need both search visibility (GeoGrid) and field team management (BYON). Each industry gets its own territory map.</p>
          <ul className="mt-industry-list">
            <li>Well & Septic Companies</li>
            <li>Plumbing Companies</li>
            <li>Electrical Companies</li>
            <li>Air & Heating Companies</li>
            <li>Pest Control Services</li>
            <li>Real Estate Firms</li>
          </ul>
        </div>
        <div className="mt-step-connector"><ArrowDown size={20} /></div>
        <div className="mt-step">
          <div className="mt-step-number">02</div>
          <div className="mt-step-icon"><MapPin size={28} /></div>
          <h4>Establish Territories</h4>
          <p>For each industry, we carve out geographic territories. No overlap. No gray areas. Each territory is a protected zone where only one business per industry will receive our services.</p>
        </div>
        <div className="mt-step-connector"><ArrowDown size={20} /></div>
        <div className="mt-step">
          <div className="mt-step-number">03</div>
          <div className="mt-step-icon"><Crown size={28} /></div>
          <h4>Select Preferred Customers</h4>
          <p>Within each territory, we research and identify the ideal business — the one best positioned to benefit from our platform. This is a privilege, not a cold call.</p>
        </div>
        <div className="mt-step-connector"><ArrowDown size={20} /></div>
        <div className="mt-step">
          <div className="mt-step-number">04</div>
          <div className="mt-step-icon"><Mail size={28} /></div>
          <h4>Exclusive Invitation</h4>
          <p>The selected business receives a personal invitation to claim their territory — with a limited window to accept. If they pass, the territory goes to the next candidate. Scarcity drives value.</p>
        </div>
      </div>
    </div>

    <div className="mt-value">
      <h3 className="mt-section-title">The Territory Promise</h3>
      <div className="mt-value-grid">
        <div className="mt-value-card">
          <Shield size={32} className="mt-val-icon mt-val-shield" />
          <h4>Exclusive Protection</h4>
          <p>No competitor in your industry will receive our services within your territory. Your investment is protected by design.</p>
        </div>
        <div className="mt-value-card">
          <TrendingUp size={32} className="mt-val-icon mt-val-trend" />
          <h4>Your Success Is Our Success</h4>
          <p>We don't profit from selling to your competitors. We profit when you dominate your local market. Our incentives are aligned with yours.</p>
        </div>
        <div className="mt-value-card">
          <Clock size={32} className="mt-val-icon mt-val-clock" />
          <h4>Limited Availability</h4>
          <p>Territories are finite. Once claimed, they're off the market. Early adopters secure the best positions in their local markets.</p>
        </div>
      </div>
    </div>

    <div className="mt-closing">
      <div className="mt-closing-card">
        <p className="mt-closing-text">
          Our competitors are driven by greed — they'll sell to anyone who pays, even if it means 
          their own customers compete against each other. <strong>We chose a different path.</strong> We assign 
          territories because we believe the only way to truly serve our customers is to guarantee 
          that we're fighting <em>for</em> them, not profiting from the fight <em>between</em> them.
        </p>
      </div>
    </div>
  </section>
);

// ─── SECTION 4: CROSS SELL STRATEGY ────────────────
const CrossSellStrategy = () => (
  <section id="section-crosssell" className="cross-sell">
    <div className="cs-header">
      <div className="cs-badge">STRATEGY 2: CROSS SELLING</div>
      <h2 className="cs-title">
        One Vendor. Two Solutions.<br />
        <span className="cs-title-accent">The Power of Cross Selling</span>
      </h2>
      <p className="cs-subtitle">
        Google has fundamentally changed how local search works. Businesses that don't optimize 
        will disappear from results. We solve that with GeoGrid. But the businesses that need 
        GeoGrid are the same businesses with field teams who need BYON. Every sales conversation 
        becomes two closed deals.
      </p>
    </div>

    <div className="cs-problem-section">
      <div className="cs-problem-grid">
        <div className="cs-problem-card">
          <Search size={32} className="cs-problem-icon" />
          <h3>The Google Problem</h3>
          <p>
            Google's algorithm changes have made local search optimization critical. 
            Large local businesses — well & septic companies, plumbers, electricians, air & heating 
            companies, pest control services, and real estate firms — are losing visibility to competitors who optimize. If your customers 
            can't find you, you don't exist.
          </p>
        </div>
        <div className="cs-problem-card">
          <Phone size={32} className="cs-problem-icon" />
          <h3>The Field Team Problem</h3>
          <p>
            These same businesses deploy teams into the field daily — technicians, contractors, 
            plumbers, electricians, and agents. They use personal phones for company business with zero 
            oversight. No call control. No tracking. No separation between work and personal life.
          </p>
        </div>
      </div>
    </div>

    <div className="cs-visual-section">
      <h3 className="cs-visual-title">Two Problems. One Conversation. Two Sales.</h3>
      <div className="cs-visual-flow">
        <div className="cs-flow-target">
          <div className="cs-target-icon"><Target size={36} /></div>
          <h4>Target Customer</h4>
          <p>Large local businesses with<br />field employees</p>
          <div className="cs-target-examples">
            <span>Well & Septic</span>
            <span>Plumbers</span>
            <span>Electricians</span>
            <span>Air & Heating</span>
            <span>Pest Control</span>
            <span>Real Estate</span>
          </div>
        </div>

        <div className="cs-flow-arrows">
          <div className="cs-flow-arrow cs-arrow-top"><ArrowRight size={24} /></div>
          <div className="cs-flow-arrow cs-arrow-bottom"><ArrowRight size={24} /></div>
        </div>

        <div className="cs-flow-solutions">
          <div className="cs-solution-card cs-solution-geogrid">
            <div className="cs-solution-icon"><MapPin size={28} /></div>
            <h4>GeoGrid</h4>
            <p>Local Search Optimization</p>
            <ul>
              <li>Dominate Google local results</li>
              <li>Monitor search rankings in real-time</li>
              <li>AI-powered content optimization</li>
              <li>Google Business Profile management</li>
            </ul>
          </div>
          <div className="cs-solution-plus">+</div>
          <div className="cs-solution-card cs-solution-byon">
            <div className="cs-solution-icon"><Phone size={28} /></div>
            <h4>BYON</h4>
            <p>Second Line for Field Teams</p>
            <ul>
              <li>Business/personal separation</li>
              <li>Call control & whitelisting</li>
              <li>Location tracking</li>
              <li>Scam protection for employees</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="cs-why-section">
      <h3 className="cs-why-title">Why Cross Selling Works</h3>
      <div className="cs-why-grid">
        <div className="cs-why-card">
          <Layers size={28} className="cs-why-icon" />
          <h4>Same Decision Maker</h4>
          <p>The business owner who needs better Google visibility is the same person who needs to manage their field team's communications. One meeting, two solutions.</p>
        </div>
        <div className="cs-why-card">
          <TrendingUp size={28} className="cs-why-icon" />
          <h4>Higher Deal Value</h4>
          <p>Instead of selling a single product, every engagement becomes a bundled deal. Double the revenue per customer without doubling the sales effort.</p>
        </div>
        <div className="cs-why-card">
          <Users size={28} className="cs-why-icon" />
          <h4>Stickier Relationships</h4>
          <p>When a customer depends on you for both their online presence and their team communications, switching costs are high. Retention goes up dramatically.</p>
        </div>
        <div className="cs-why-card">
          <CheckCircle size={28} className="cs-why-icon" />
          <h4>One Vendor Simplicity</h4>
          <p>Businesses prefer fewer vendors. We offer a unified platform — one invoice, one support team, one relationship. That's a competitive advantage over point solutions.</p>
        </div>
      </div>
    </div>

    <div className="cs-pitch-section">
      <div className="cs-pitch-card">
        <div className="cs-pitch-label">The Sales Conversation</div>
        <blockquote className="cs-pitch-quote">
          "We noticed your business isn't showing up in Google's top local results — 
          your competitors are getting those calls instead. We fix that with GeoGrid. 
          And since you have a team in the field using personal phones for company 
          business, we can also give each of them a managed second line with BYON. 
          One vendor. Two problems solved."
        </blockquote>
      </div>
    </div>
  </section>
);

// ─── SECTION 5: BYON SHOWCASE ──────────────────────
const ByonShowcase = () => {
  const applications = [
    { title: 'Trucking Companies', description: 'Fleet management & driver communication', link: '/byon-trucking-companies',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
    { title: 'Real Estate', description: 'Secure client communications', link: '/byon-real-estate',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { title: 'Field Services', description: 'Technician dispatch & coordination', link: '/byon-field-services',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
    { title: 'Finance', description: 'Compliant wealth management', link: '/byon-finance',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
    { title: 'Last-Mile Delivery', description: 'Gig economy solutions', link: '/byon-last-mile',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
    { title: 'Healthcare', description: 'HIPAA-compliant mobile care', link: '/byon-healthcare',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
    { title: 'Government', description: 'Secure contractor communications', link: '/byon-government',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { title: 'Construction', description: 'Jobsite safety & geofencing', link: '/byon-construction',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-6h6v6"/><path d="M9 8h6"/></svg> },
  ];

  return (
    <section className="byon-showcase" data-testid="byon-showcase">
      <div className="byon-showcase-container">
        <div className="byon-showcase-header">
          <div className="byon-tmobile-badge">
            <span className="byon-powered">Powered by</span>
            <span className="byon-tmobile">T-Mobile</span>
          </div>
          <h2 className="byon-showcase-title">BYON Applications</h2>
          <p className="byon-showcase-subtitle">
            <strong><span className="byon-letter">B</span>ring <span className="byon-letter">Y</span>our <span className="byon-letter">O</span>wn <span className="byon-letter">N</span>umber</strong>
          </p>
          <p className="byon-showcase-tagline">
            <span>One Cell Phone</span>
            <span className="byon-separator">—</span>
            <span>Two Lines</span>
            <span className="byon-separator">—</span>
            <span>Complete Separation</span>
          </p>
          <p className="byon-showcase-description">
            Our eSIM technology creates a secure, isolated business line on any personal smartphone. 
            Employees keep their privacy, companies maintain security and compliance.
          </p>
        </div>

        <div className="byon-applications-grid">
          {applications.map((app, index) => (
            <Link to={app.link} key={index} className="byon-app-card" data-testid={`byon-card-${index}`}>
              <div className="byon-app-icon">{app.icon}</div>
              <h3 className="byon-app-title">{app.title}</h3>
              <p className="byon-app-description">{app.description}</p>
              <span className="byon-app-cta">Learn More →</span>
            </Link>
          ))}
        </div>

        <div className="byon-showcase-footer">
          <div className="byon-network-features">
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1"/></svg>
              <span>Nationwide 5G</span>
            </div>
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Enterprise Security</span>
            </div>
            <div className="byon-feature">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── MAIN PAGE COMPONENT ───────────────────────────
const GatewayHomePage = () => {
  return (
    <>
      <MarketingMission />
      <StrategyOverview />
      <MarketTerritories />
      <CrossSellStrategy />
      <ByonShowcase />
    </>
  );
};

export default GatewayHomePage;
