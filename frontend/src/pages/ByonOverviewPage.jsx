import React from 'react';
import { Phone, Shield, MapPin, Route, Lock, Users, PhoneOff, Bell, Eye, UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ByonOverviewPage.css';

const ByonOverviewPage = () => {
  return (
    <div className="byon-overview">
      {/* Hero */}
      <section className="bo-hero">
        <div className="bo-badge">PRODUCT OVERVIEW</div>
        <h1 className="bo-title">BYON — Bring Your Own Number</h1>
        <p className="bo-subtitle">
          BYON gives every employee a second phone line on their existing personal device. 
          One phone. Two numbers. The company controls the business line. 
          The employee keeps their personal line completely private.
        </p>
      </section>

      {/* What It Is */}
      <section className="bo-what">
        <h2 className="bo-section-title">What BYON Is</h2>
        <div className="bo-what-grid">
          <div className="bo-what-card bo-what-is">
            <h3>It Is</h3>
            <ul>
              <li><Phone size={18} /> A second business phone line on the employee's personal device</li>
              <li><Shield size={18} /> A company-managed communication channel with full oversight</li>
              <li><Lock size={18} /> A clean boundary between work and personal life</li>
              <li><Eye size={18} /> A visibility tool for managers — call logs, location, routes</li>
              <li><Users size={18} /> A scalable system that grows with your workforce</li>
            </ul>
          </div>
          <div className="bo-what-card bo-what-not">
            <h3>It Is Not</h3>
            <ul>
              <li><PhoneOff size={18} /> Not a second physical device employees have to carry</li>
              <li><PhoneOff size={18} /> Not access to the employee's personal number or data</li>
              <li><PhoneOff size={18} /> Not a traditional phone system requiring hardware</li>
              <li><PhoneOff size={18} /> Not limited to calls — supports texts and voicemail</li>
              <li><PhoneOff size={18} /> Not a one-size-fits-all — configurable per role and team</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="bo-capabilities">
        <h2 className="bo-section-title">Core Capabilities</h2>
        <p className="bo-section-desc">Everything the business line provides — from day one</p>
        <div className="bo-cap-grid">
          <div className="bo-cap-card">
            <Phone size={28} className="bo-cap-icon bo-icon-purple" />
            <h4>Second Business Line</h4>
            <p>Every employee gets a dedicated company phone number installed on their personal device. No second phone needed. The business number is assigned and owned by the company.</p>
          </div>
          <div className="bo-cap-card">
            <Lock size={28} className="bo-cap-icon bo-icon-amber" />
            <h4>Call Control & Whitelisting</h4>
            <p>Managers decide who can reach employees on their business line. Whitelist dispatchers, customers, and approved contacts. Block everything else. Eliminate time wasted on unwanted calls.</p>
          </div>
          <div className="bo-cap-card">
            <Shield size={28} className="bo-cap-icon bo-icon-green" />
            <h4>Scam Protection</h4>
            <p>Employees using personal numbers for business are targets for scams and social engineering. The business line shields their personal number from exposure — scammers can't reach what they can't see.</p>
          </div>
          <div className="bo-cap-card">
            <MapPin size={28} className="bo-cap-icon bo-icon-blue" />
            <h4>Location Tracking</h4>
            <p>Track the business line's location in real-time. Know where field employees and assets are during business hours without accessing their personal device or invading personal privacy.</p>
          </div>
          <div className="bo-cap-card">
            <Route size={28} className="bo-cap-icon bo-icon-violet" />
            <h4>Route Recording</h4>
            <p>Automatically log the routes taken during business hours. Proof of delivery, compliance documentation, route optimization data, and mileage tracking — all captured passively.</p>
          </div>
          <div className="bo-cap-card">
            <Bell size={28} className="bo-cap-icon bo-icon-red" />
            <h4>After-Hours Management</h4>
            <p>When the shift ends, business calls can be forwarded to on-call staff, sent to voicemail, or silenced. Employees get their personal time back. Emergency coverage stays intact.</p>
          </div>
          <div className="bo-cap-card">
            <Eye size={28} className="bo-cap-icon bo-icon-teal" />
            <h4>Call Logging & Records</h4>
            <p>Every call, text, and voicemail on the business line is logged. Managers have visibility into communication patterns, response times, and customer interactions — all auditable.</p>
          </div>
          <div className="bo-cap-card">
            <UserCheck size={28} className="bo-cap-icon bo-icon-orange" />
            <h4>Employee Offboarding</h4>
            <p>When an employee leaves, their business line stays with the company. Customer relationships, call history, and the phone number itself are company assets — not personal ones walking out the door.</p>
          </div>
        </div>
      </section>

      {/* The Fundamental Value */}
      <section className="bo-fundamental">
        <div className="bo-fundamental-card">
          <h2>The Fundamental Value</h2>
          <p>
            Every business with employees in the field faces the same problem: their people use personal 
            phones for company business. This creates zero visibility for managers, zero protection for 
            employees, and zero control when someone leaves.
          </p>
          <p>
            BYON solves this by adding a company-managed second line to the device they already carry. 
            The company gets oversight and control. The employee gets a clean separation between work and 
            personal life. No new hardware. No carrier changes. No disruption.
          </p>
          <p className="bo-fundamental-highlight">
            <strong>One phone. Two numbers. Complete separation. Full company control.</strong>
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bo-who">
        <h2 className="bo-section-title">Who BYON Is Built For</h2>
        <p className="bo-section-desc">Any business with employees who use their phones for work</p>
        <div className="bo-who-grid">
          <Link to="/byon-finance" className="bo-who-card">
            <span>Finance & Wealth Management</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/byon-last-mile" className="bo-who-card">
            <span>Last-Mile Delivery & Gig Economy</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/byon-healthcare" className="bo-who-card">
            <span>Healthcare (Home Health & Visiting Nurses)</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/byon-government" className="bo-who-card">
            <span>Government & Defense Contractors</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <p className="bo-who-note">
          BYON is also a core component of our <Link to="/big-market">BIG Market</Link> and <Link to="/trucking-division">Trucking Division</Link> strategies — 
          where it's bundled with GeoGrid for maximum cross-sell value.
        </p>
      </section>
    </div>
  );
};

export default ByonOverviewPage;
