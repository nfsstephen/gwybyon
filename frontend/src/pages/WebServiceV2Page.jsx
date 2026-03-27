import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check,
  Globe, Shield, MapPin, Phone, Search, BarChart3, X
} from 'lucide-react';
import FiveToolsSection from '../components/FiveToolsSection';
import './WebServiceV2Page.css';

const WebServiceV2Page = () => {
  return (
    <div className="v2-page" data-testid="web-service-v2-page">

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
