import React from 'react';
import { Link } from 'react-router-dom';
import {
  Droplets, Wrench, Zap, Thermometer, Bug, Home, HardHat, ArrowRight, Check,
  Globe, Shield, MapPin, Phone, Layers, Search, BarChart3, X
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
  { name: 'Roofing Companies', icon: HardHat, path: '/big-market/roofing', color: '#b45309', desc: 'High-ticket jobs driven by local search and storm events. Field crews need managed communication across job sites.' },
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
            Seven Industries.
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
              <a href="https://gatewayaisystems.com/byon-overview" className="v2-solution-link" target="_blank" rel="noopener noreferrer">
                See BYON Overview <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GeoGrid Search Hero */}
      <section className="v2-geohero" data-testid="v2-geohero">
        <div className="v2-geohero-content">
          <div className="v2-geohero-badge">
            <MapPin size={14} />
            <span>The Geographic Search Solution</span>
          </div>
          <h2 className="v2-geohero-title">
            Is Your Business <span className="v2-geohero-accent">Invisible</span> to People Three Blocks Away?
          </h2>
          <p className="v2-geohero-subtitle">
            97% of consumers search online for local businesses. If you're not dominating your 
            geographic zone, your competitors are stealing customers who should be walking through your door.
          </p>
          <div className="v2-geohero-ctas">
            <Link to="/services-pricing" className="v2-geohero-btn-primary" data-testid="v2-geohero-cta">
              Explore GeoGrid <ArrowRight size={18} />
            </Link>
          </div>
          <div className="v2-geohero-proof">
            <div className="v2-geohero-stat">
              <span className="v2-geohero-num">46%</span>
              <span className="v2-geohero-label">of all Google searches are local</span>
            </div>
            <div className="v2-geohero-divider"></div>
            <div className="v2-geohero-stat">
              <span className="v2-geohero-num">78%</span>
              <span className="v2-geohero-label">convert within 24 hours</span>
            </div>
            <div className="v2-geohero-divider"></div>
            <div className="v2-geohero-stat">
              <span className="v2-geohero-num">200ft</span>
              <span className="v2-geohero-label">can change your ranking</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="v2-problem" data-testid="v2-problem">
        <div className="v2-container">
          <div className="v2-label">The Problem</div>
          <h2 className="v2-title">Google Changed. Your Visibility Didn't.</h2>
          <p className="v2-desc">
            Google no longer matches keywords — it matches <strong>locations first</strong>. 
            When someone searches "plumber near me," Google looks at WHERE they are, then decides WHO to show. 
            If you're not optimized for this new reality, you're invisible to customers standing three blocks away.
          </p>
          <div className="v2-problem-grid">
            <div className="v2-problem-card">
              <div className="v2-problem-icon"><MapPin size={28} /></div>
              <h3>Location Is Now #1</h3>
              <p>Google prioritizes proximity over everything else. A customer 500 feet away might see your competitor instead of you — not because they're better, but because Google thinks they're closer.</p>
            </div>
            <div className="v2-problem-card">
              <div className="v2-problem-icon"><Search size={28} /></div>
              <h3>Keywords Don't Matter Like They Used To</h3>
              <p>You can stuff your website with "best plumber in Austin" all day — Google ignores it. What matters now is your geographic footprint: your address, your service area, and whether Google trusts you're actually THERE.</p>
            </div>
            <div className="v2-problem-card">
              <div className="v2-problem-icon"><BarChart3 size={28} /></div>
              <h3>Your Ranking Changes Every Block</h3>
              <p>You might be #1 at your office, #5 two streets over, and invisible a mile away. Most business owners have no idea their rankings shift based on where the searcher is standing.</p>
            </div>
            <div className="v2-problem-card">
              <div className="v2-problem-icon"><Globe size={28} /></div>
              <h3>Customers Never Click Your Website</h3>
              <p>Google answers local searches directly in the Map Pack — showing your phone number, directions, and reviews. Users call or navigate without ever visiting your site. If you're measuring "website traffic," you're measuring the wrong thing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="v2-shift" data-testid="v2-shift">
        <div className="v2-container">
          <div className="v2-label">The Shift</div>
          <h2 className="v2-title">Google Stopped Matching Words. Now It Matches <em>Things</em>.</h2>
          <p className="v2-desc">
            The search algorithm that built the internet is dead. Understanding the new one is the difference
            between being found and being forgotten.
          </p>
          <div className="v2-shift-comparison">
            <div className="v2-shift-card v2-shift-old">
              <div className="v2-shift-header">
                <X size={18} />
                <span>The Old Way</span>
              </div>
              <h3>"Word-Driven" Search</h3>
              <ul>
                <li><span className="v2-shift-label">Logic:</span> Matching letters and words</li>
                <li><span className="v2-shift-label">Priority:</span> Keyword density & backlinks</li>
                <li><span className="v2-shift-label">Context:</span> Ignored — same results for everyone</li>
                <li><span className="v2-shift-label">Winner:</span> Whoever has the best SEO team</li>
              </ul>
            </div>
            <div className="v2-shift-vs">VS</div>
            <div className="v2-shift-card v2-shift-new">
              <div className="v2-shift-header">
                <Check size={18} />
                <span>The New Reality</span>
              </div>
              <h3>"Geographic Entity" Search</h3>
              <ul>
                <li><span className="v2-shift-label">Logic:</span> Matching intent, location & trust</li>
                <li><span className="v2-shift-label">Priority:</span> Proximity, relevance & prominence</li>
                <li><span className="v2-shift-label">Context:</span> Hyper-personalized — results change by block</li>
                <li><span className="v2-shift-label">Winner:</span> Most trusted local authority</li>
              </ul>
            </div>
          </div>
          <p className="v2-shift-bottom">
            Small businesses still spending money on SEO agencies writing keyword-stuffed blogs
            are optimizing for an algorithm that no longer exists. Meanwhile, their Google Business Profile
            is outdated, their map pins are wrong, and their reviews are stagnant.
          </p>
        </div>
      </section>

      {/* Target Industries */}
      <section className="v2-industries" data-testid="v2-industries">
        <div className="v2-container">
          <div className="v2-label">Who We Serve</div>
          <h2 className="v2-title">Seven High-Value Industries</h2>
          <p className="v2-desc">
            We've identified seven industries where local businesses need all three solutions. 
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

      {/* Five GeoGrid Tools */}
      <div id="five-tools">
        <FiveToolsSection
          title="The Five GeoGrid Tools We Sell Alongside BYON"
          subtitle="These are the search engine optimization tools the tech team is building. Combined with website services and BYON, this is the complete package."
        />
      </div>

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
              <Link to="/services-pricing" className="v2-btn-primary" data-testid="v2-cta-geogrid">
                Explore GeoGrid <ArrowRight size={18} />
              </Link>
              <a href="https://gatewayaisystems.com/byon-overview" className="v2-btn-ghost" data-testid="v2-cta-byon" target="_blank" rel="noopener noreferrer">
                Explore BYON
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebServiceV2Page;
