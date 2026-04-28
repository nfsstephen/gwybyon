import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Search, ArrowRight, ShieldCheck, Globe2, Sparkles } from 'lucide-react';
import { trackAudienceCta } from '../hooks/useAudience';
import './HeroNoWebsite.css';

/**
 * Hero variant for businesses that DON'T have a real website yet —
 * either brand-new or running on Facebook / Google Business Profile alone.
 * Tone (per user direction): URGENT loss-framing at the top, EDUCATIONAL
 * "we handle every step" reassurance below.
 */
const HeroNoWebsite = () => {
  return (
    <section className="hns-section" data-testid="hero-no-website">
      <div className="hns-container">
        {/* === URGENT TOP === */}
        <div className="hns-urgent">
          <span className="hns-label hns-label-urgent">RIGHT NOW IN YOUR COUNTY</span>
          <h2 className="hns-title">
            Someone is Googling your service.<br />
            <span className="hns-title-accent">They're not finding you.</span>
          </h2>
          <p className="hns-subtitle">
            Word-of-mouth and a Facebook page got you this far. But the customers
            who don't already know you? They don't ask their neighbor — they pull
            out their phone and search. And every search you don't show up for
            is a job your competitor wins by default.
          </p>

          {/* Mini "phone mockup" SERP — visual proof of the problem */}
          <div className="hns-serp" aria-hidden>
            <div className="hns-serp-frame">
              <div className="hns-serp-bar">
                <Search size={14} />
                <span>well drilling near me</span>
              </div>
              <div className="hns-serp-result is-competitor">
                <div className="hns-serp-pin"><MapPin size={14} /></div>
                <div className="hns-serp-info">
                  <div className="hns-serp-name">Competitor Drilling Co.</div>
                  <div className="hns-serp-meta">★ 4.9 · 6 mi · Open · Call</div>
                </div>
                <div className="hns-serp-tag">RANKING</div>
              </div>
              <div className="hns-serp-result is-competitor">
                <div className="hns-serp-pin"><MapPin size={14} /></div>
                <div className="hns-serp-info">
                  <div className="hns-serp-name">Another Local Driller</div>
                  <div className="hns-serp-meta">★ 4.7 · 9 mi · Open · Call</div>
                </div>
                <div className="hns-serp-tag">RANKING</div>
              </div>
              <div className="hns-serp-result is-you">
                <div className="hns-serp-pin"><MapPin size={14} /></div>
                <div className="hns-serp-info">
                  <div className="hns-serp-name">YOUR BUSINESS</div>
                  <div className="hns-serp-meta">No website found</div>
                </div>
                <div className="hns-serp-tag hns-serp-tag-warn">INVISIBLE</div>
              </div>
            </div>
          </div>
        </div>

        {/* === EDUCATIONAL BOTTOM === */}
        <div className="hns-educational">
          <span className="hns-label hns-label-calm">HOW IT WORKS</span>
          <h3 className="hns-edu-title">
            We handle every step. You stay focused on the work you actually do.
          </h3>

          <div className="hns-steps">
            <div className="hns-step">
              <div className="hns-step-num">01</div>
              <Globe2 size={20} className="hns-step-icon" />
              <h4>Domain &amp; Build</h4>
              <p>We secure a domain that makes sense for your business and build a site engineered around the keywords your customers actually type.</p>
            </div>
            <div className="hns-step">
              <div className="hns-step-num">02</div>
              <Sparkles size={20} className="hns-step-icon" />
              <h4>Content &amp; Pages</h4>
              <p>Service pages, location pages, content — written and structured to rank. No "lorem ipsum," no template filler. Designed for your county.</p>
            </div>
            <div className="hns-step">
              <div className="hns-step-num">03</div>
              <ShieldCheck size={20} className="hns-step-icon" />
              <h4>Rank &amp; Track</h4>
              <p>You watch your position climb in real time on the same dashboard we use. Calls, forms, traffic — visible to you. No black-box reports.</p>
            </div>
          </div>

          <div className="hns-cta-row">
            <Link
              to="/contact"
              className="hns-cta"
              onClick={() => trackAudienceCta('no-site', 'free_audit')}
              data-testid="hero-no-site-cta"
            >
              <Phone size={16} />
              Talk to us — we'll start with a free audit
              <ArrowRight size={16} className="hns-cta-arrow" />
            </Link>
            <p className="hns-cta-sub">
              30-minute call. We pull what's already out there about your business
              and show you exactly what your competitors are doing that you're not.
              No pressure to sign up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNoWebsite;
