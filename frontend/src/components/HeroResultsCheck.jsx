import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Target, Users, ArrowRight } from 'lucide-react';
import './HeroResultsCheck.css';

/**
 * Results-focused hero alternative to "Stop Overpaying."
 * Sits under HeroValueLight while we A/B-evaluate copy that reframes
 * the conversation from price to performance.
 */
const HeroResultsCheck = () => {
  return (
    <section className="hrc-section" data-testid="hero-results-check">
      <div className="hrc-container">
        {/* === Diagnostic probe === */}
        <div className="hrc-probe">
          <span className="hrc-label">THE QUESTION THAT MATTERS</span>
          <h2 className="hrc-title">
            Are you ranking at the top of the<br />
            <span className="hrc-title-accent">search results?</span>
          </h2>
          <p className="hrc-subtitle">
            Forget what you paid for your website. The real question is what
            it's <em>doing</em> for you. A "cheap" site that nobody finds is
            the most expensive site you'll ever own — every day it's invisible,
            another customer hires the competitor who ranks above you.
          </p>

          <Link
            to="/contact"
            className="hrc-cta"
            data-testid="hero-results-cta"
          >
            <Search size={16} />
            Run my free ranking check
            <ArrowRight size={16} className="hrc-cta-arrow" />
          </Link>
          <p className="hrc-cta-sub">
            No commitment. We pull your current rankings, traffic, and visibility
            against your top 3 local competitors and walk you through what we find.
          </p>
        </div>

        {/* === Results-focused supporting cards === */}
        <div className="hrc-grid">
          <div className="hrc-card">
            <div className="hrc-card-visual hrc-visual-rank">
              <div className="hrc-metric-ring">
                <Target size={20} />
              </div>
              <span className="hrc-metric-text">PAGE 1</span>
            </div>
            <h3 className="hrc-card-title">Search Position</h3>
            <p className="hrc-card-text">
              75% of searchers never click past page one. If you're not on it
              for the keywords that matter in your county, you don't exist
              to those customers — regardless of what your site cost.
            </p>
          </div>

          <div className="hrc-card">
            <div className="hrc-card-visual hrc-visual-leads">
              <div className="hrc-metric-ring">
                <Phone size={20} />
              </div>
              <span className="hrc-metric">+<span className="hrc-metric-unit">leads</span></span>
            </div>
            <h3 className="hrc-card-title">Inbound Calls &amp; Form Fills</h3>
            <p className="hrc-card-text">
              A website is a sales tool, not a brochure. Track every call,
              every form, every quote request — and watch the volume rise
              when the rankings do.
            </p>
          </div>

          <div className="hrc-card">
            <div className="hrc-card-visual hrc-visual-conv">
              <div className="hrc-metric-ring">
                <Users size={20} />
              </div>
              <span className="hrc-metric-text">VISITS → JOBS</span>
            </div>
            <h3 className="hrc-card-title">Conversion You Can See</h3>
            <p className="hrc-card-text">
              Every visitor, every behavior, every drop-off point — visible
              to you in real time. If something isn't working, you'll know
              before you waste another month wondering.
            </p>
          </div>

          <div className="hrc-card">
            <div className="hrc-card-visual hrc-visual-share">
              <div className="hrc-metric-ring">
                <span className="hrc-share-bars" aria-hidden>
                  <span className="hrc-share-bar" />
                  <span className="hrc-share-bar" />
                  <span className="hrc-share-bar" />
                </span>
              </div>
              <span className="hrc-metric-text">YOUR SLICE</span>
            </div>
            <h3 className="hrc-card-title">Local Market Share</h3>
            <p className="hrc-card-text">
              Your county only has so many drilling jobs, septic services,
              or roofing leads each month. The question isn't whether you
              have a website — it's whether you're claiming your share.
            </p>
          </div>
        </div>

        <div className="hrc-bottom-tag">
          A website that doesn't rank is a billboard in the desert. We build the highway.
        </div>
      </div>
    </section>
  );
};

export default HeroResultsCheck;
