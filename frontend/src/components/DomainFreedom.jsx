import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock, AlertTriangle, Shield, ArrowRight, Check, X, KeyRound } from 'lucide-react';
import './DomainFreedom.css';

const DomainFreedom = () => {
  return (
    <section className="df-section" data-testid="domain-freedom-section">
      <div className="df-container">

        {/* Header */}
        <div className="df-badge">THE QUESTION YOU NEED TO ASK</div>
        <h2 className="df-title">
          Do You Actually Own<br />
          <span className="df-title-accent">Your Domain Name?</span>
        </h2>
        <p className="df-subtitle">
          Call your current website provider right now. Ask them one simple question: 
          <strong> "Can I take full ownership of my domain name today?"</strong> If there is 
          any hesitation whatsoever — you have your answer.
        </p>

        {/* Visual: Hostage vs Freedom */}
        <div className="df-comparison">
          {/* Hostage Side */}
          <div className="df-card df-card-hostage" data-testid="domain-hostage-card">
            <div className="df-card-icon-wrap df-icon-danger">
              <Lock size={28} />
            </div>
            <h3 className="df-card-title">Domain Held Hostage</h3>
            <p className="df-card-desc">
              What most website providers do
            </p>
            <div className="df-chain-visual">
              <div className="df-chain-link">
                <div className="df-chain-dot df-dot-danger"></div>
                <div className="df-chain-line"></div>
              </div>
              <div className="df-chain-link">
                <div className="df-chain-dot df-dot-danger"></div>
                <div className="df-chain-line"></div>
              </div>
              <div className="df-chain-link">
                <div className="df-chain-dot df-dot-danger"></div>
              </div>
            </div>
            <ul className="df-list">
              <li><X size={14} className="df-x" /> They registered your domain under their account</li>
              <li><X size={14} className="df-x" /> Transfer requests get "lost" or delayed</li>
              <li><X size={14} className="df-x" /> You can't leave without losing your web identity</li>
              <li><X size={14} className="df-x" /> The longer you stay, the deeper the trap</li>
            </ul>
          </div>

          {/* Freedom Side */}
          <div className="df-card df-card-freedom" data-testid="domain-freedom-card">
            <div className="df-card-icon-wrap df-icon-safe">
              <Unlock size={28} />
            </div>
            <h3 className="df-card-title">Your Domain. Your Property.</h3>
            <p className="df-card-desc">
              Our commitment to you
            </p>
            <div className="df-shield-visual">
              <Shield size={40} className="df-shield-icon" />
              <KeyRound size={18} className="df-key-icon" />
            </div>
            <ul className="df-list">
              <li><Check size={14} className="df-check" /> Your domain is registered in your name, always</li>
              <li><Check size={14} className="df-check" /> Full transfer rights, no questions asked, ever</li>
              <li><Check size={14} className="df-check" /> You leave whenever you want, and take everything</li>
              <li><Check size={14} className="df-check" /> Zero lock-in. Zero hostage tactics. Period.</li>
            </ul>
          </div>
        </div>

        {/* Urgency Block */}
        <div className="df-urgency" data-testid="domain-urgency-block">
          <div className="df-urgency-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="df-urgency-content">
            <h3 className="df-urgency-title">Every Day You Wait, the Chains Get Tighter</h3>
            <p className="df-urgency-text">
              Every page you add, every customer who bookmarks your site, every business card 
              you print with that URL — it all makes you more dependent on a provider who may 
              not have your best interests at heart. The cost of switching doesn't go down with 
              time. It goes up. If you've been thinking about making a change, the best time 
              was yesterday. The second best time is right now.
            </p>
          </div>
        </div>

        {/* Our Promise */}
        <div className="df-promise" data-testid="domain-promise-block">
          <div className="df-promise-badge">OUR PROMISE</div>
          <h3 className="df-promise-title">
            We Will <span className="df-title-accent">Never</span> Hold Your Domain Hostage
          </h3>
          <p className="df-promise-text">
            Your domain name is your digital identity. It belongs to you and you alone — 
            not to us, not to any provider. We put that in writing. If you ever decide to 
            leave, you take your domain, your content, and your data with you. No fees. 
            No delays. No games. That's not a policy — that's a principle.
          </p>
          <Link to="/subscribe" className="df-cta" data-testid="domain-freedom-cta">
            Take Back Control <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DomainFreedom;
