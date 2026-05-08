import React, { useState } from 'react';
import { Droplets, Wrench, Zap, Thermometer, Bug, Home, HardHat, MapPin, Phone, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SevenIndustriesPage.css';

const INDUSTRIES = [
  {
    id: 'well-drilling',
    name: 'Well Drilling',
    icon: Droplets,
    color: '#0369a1',
    accent: '#e0f2fe',
    heroText: 'Homeowners don\'t think about their well system until something goes wrong — and when it does, they search immediately.',
    searchProblem: 'When a well pump fails or water quality drops, homeowners grab their phone and search "well drilling near me." If your company isn\'t in the top 3 results, you don\'t exist. Your competitors who invest in local search optimization are getting those emergency calls — and those are high-ticket jobs.',
    teamProblem: 'Your technicians are in the field all day responding to emergencies. They use personal phones to coordinate with dispatch, call customers, and receive job updates. You have no visibility into those communications and no way to protect them from scam calls.',
    geogridBenefits: [
      { title: 'Emergency Search Dominance', desc: 'Rank at the top for "well drilling near me," "well pump repair," and other high-intent searches.' },
      { title: 'Google Business Optimization', desc: 'Accurate service areas, hours, emergency availability, and trust-building reviews.' },
      { title: 'Neighborhood-Level Targeting', desc: 'Optimize for specific rural areas where well services are concentrated.' },
      { title: 'Competitor Monitoring', desc: 'Track where competitors rank and identify gaps in their coverage.' },
    ],
    byonBenefits: [
      { title: 'Emergency Dispatch Line', desc: 'Technicians receive emergency calls on their business line — dispatch can reach them instantly.' },
      { title: 'Customer Communication Control', desc: 'All customer-facing calls go through the business line. Number stays with you.' },
      { title: 'Location & Route Tracking', desc: 'Know where your crews are in real-time. Optimize routing between calls.' },
      { title: 'After-Hours Separation', desc: 'Business line forwards to on-call staff. Technicians get their personal time back.' },
    ],
  },
  {
    id: 'septic',
    name: 'Septic Tank Installation & Service',
    icon: Droplets,
    color: '#1e6b8a',
    accent: '#dbeafe',
    heroText: 'When a septic system backs up or needs replacement, homeowners need a trusted professional immediately — and they search locally.',
    searchProblem: 'When a septic system backs up, homeowners search "septic service near me" or "septic tank installation." If your company isn\'t in the top 3 results, you don\'t exist. Your competitors who invest in local search optimization are getting those emergency calls — and those are high-ticket jobs.',
    teamProblem: 'Your crews are in the field handling installations and emergency pumping calls. They use personal phones to coordinate with dispatch, call customers, and receive job updates. You have no visibility into those communications and no way to protect them from scam calls.',
    geogridBenefits: [
      { title: 'Emergency Search Dominance', desc: 'Rank at the top for "septic emergency near me," "septic tank installation," and other high-intent searches.' },
      { title: 'Google Business Optimization', desc: 'Accurate service areas, hours, emergency availability, and trust-building reviews.' },
      { title: 'Neighborhood-Level Targeting', desc: 'Optimize for specific rural and suburban areas where septic systems are most common.' },
      { title: 'Competitor Monitoring', desc: 'Track where competitors rank and identify gaps in their coverage.' },
    ],
    byonBenefits: [
      { title: 'Emergency Dispatch Line', desc: 'Crews receive emergency calls on their business line — dispatch can reach them instantly.' },
      { title: 'Customer Communication Control', desc: 'All customer-facing calls go through the business line. Number stays with you.' },
      { title: 'Location & Route Tracking', desc: 'Know where your crews are in real-time. Optimize routing between jobs.' },
      { title: 'After-Hours Separation', desc: 'Business line forwards to on-call staff. Technicians get their personal time back.' },
    ],
  },
  {
    id: 'plumbers',
    name: 'Plumbers',
    icon: Wrench,
    color: '#7c3aed',
    accent: '#ede9fe',
    heroText: 'When a pipe bursts at 2 AM, homeowners don\'t browse — they call the first company they find.',
    searchProblem: '"Emergency plumber near me" is one of the most valuable local search queries. These are customers ready to pay premium rates for immediate help. If you\'re not ranking in the top local results, those high-value calls go to competitors — every single day.',
    teamProblem: 'Your plumbers are on the road from morning to night — calling customers, receiving dispatch updates, coordinating parts. All from personal phones. When a plumber leaves, they take customer relationships with them.',
    geogridBenefits: [
      { title: 'High-Intent Search Capture', desc: 'Dominate "emergency plumber near me" and "drain cleaning service" — searches that convert to same-day revenue.' },
      { title: 'Review Management', desc: 'Build and showcase the review volume that makes homeowners choose you.' },
      { title: 'Service Area Expansion', desc: 'Optimize visibility in new neighborhoods before competitors establish dominance.' },
      { title: 'Seasonal Campaign Support', desc: 'Optimize for "frozen pipe repair" in winter or "sewer line inspection" during home buying season.' },
    ],
    byonBenefits: [
      { title: 'Professional Customer Contact', desc: 'Company-managed number stays with the business, not the plumber.' },
      { title: 'Dispatch Integration', desc: 'Route emergency calls to available plumbers through managed business lines.' },
      { title: 'Scam Call Blocking', desc: 'BYON whitelisting ensures only dispatch, customers, and suppliers get through.' },
      { title: 'Job Documentation', desc: 'Call logs create automatic records for warranty disputes and follow-ups.' },
    ],
  },
  {
    id: 'electricians',
    name: 'Electricians',
    icon: Zap,
    color: '#d97706',
    accent: '#fef3c7',
    heroText: 'Electrical work is safety-critical and trust-driven. Homeowners choose based on visibility and reviews.',
    searchProblem: 'When a homeowner has a panel issue or needs an inspection, they search "electrician near me." Commercial clients need licensed contractors for code compliance. If you\'re not visible in local search, you\'re losing bids and emergency calls to competitors.',
    teamProblem: 'Electricians work on job sites where communication is critical for safety — confirming power shutoffs, coordinating with other trades. All on personal phones with no company oversight.',
    geogridBenefits: [
      { title: 'Licensed & Trusted Visibility', desc: 'Rank for "licensed electrician near me" — where trust and licensing matter most.' },
      { title: 'Commercial & Residential Coverage', desc: 'Optimize for both emergency searches and commercial contractor queries.' },
      { title: 'Certification Showcase', desc: 'Highlight licenses and specializations in local search results.' },
      { title: 'New Construction Targeting', desc: 'Capture searches for new construction wiring, remodels, and EV charger installation.' },
    ],
    byonBenefits: [
      { title: 'Safety Communication Channel', desc: 'Dedicated line for job-site coordination — power shutoffs, emergency communication.' },
      { title: 'Customer-Facing Professionalism', desc: 'Customers call a company number. Relationships stay with the business.' },
      { title: 'Location Tracking for Dispatch', desc: 'Dispatch the closest electrician to emergency calls. Reduce response times.' },
      { title: 'After-Hours Call Routing', desc: 'Forward to on-call electricians after hours. Emergencies get answered.' },
    ],
  },
  {
    id: 'hvac',
    name: 'Air & Heating Co.',
    icon: Thermometer,
    color: '#dc2626',
    accent: '#fee2e2',
    heroText: 'When the AC fails in August or the furnace dies in January, homeowners need help now.',
    searchProblem: 'HVAC searches spike dramatically with weather. "AC repair near me" surges in summer, "furnace repair near me" in winter. Ranking #1 during peak weeks can mean tens of thousands in revenue. If you\'re not dominating local search during these windows, competitors capture your revenue.',
    teamProblem: 'HVAC technicians cover large service areas, handling 4-6 appointments per day. They coordinate with dispatch, call customers with ETAs, order parts — all on personal phones. Scaling your team means scaling this chaos.',
    geogridBenefits: [
      { title: 'Seasonal Search Dominance', desc: 'Rank at the top for "AC repair near me" in summer and "furnace repair" in winter.' },
      { title: 'Maintenance Plan Visibility', desc: 'Optimize for "HVAC maintenance plan" and other recurring revenue searches.' },
      { title: 'Service Area Expansion', desc: 'Extend visibility into new neighborhoods as your team grows.' },
      { title: 'New Technology Queries', desc: 'Capture "heat pump installation" and "smart thermostat" — premium services.' },
    ],
    byonBenefits: [
      { title: 'High-Volume Dispatch', desc: 'During peak season, dispatch calls always get through — no competing with personal calls.' },
      { title: 'Customer ETA Updates', desc: 'Professional, trackable updates from a company number.' },
      { title: 'Route Optimization', desc: 'Location tracking routes the nearest technician to emergency calls.' },
      { title: 'Seasonal Staff Scaling', desc: 'Instant business lines for seasonal techs. Deactivate when the season ends.' },
    ],
  },
  {
    id: 'pest-control',
    name: 'Pest Control Services',
    icon: Bug,
    color: '#16a34a',
    accent: '#dcfce7',
    heroText: 'When someone finds termites or a rodent problem, they search immediately — and the top-ranked company gets the call.',
    searchProblem: '"Pest control near me," "termite treatment," "bed bug exterminator" — these are urgent, emotional searches. Pest control is also highly seasonal — ant searches spike in summer, rodent searches in fall. Missing these windows means missing revenue.',
    teamProblem: 'Technicians run daily routes covering 8-12 stops — coordinating schedules, confirming appointments, handling callbacks. All from personal devices. As your fleet grows, lack of communication oversight becomes real operational risk.',
    geogridBenefits: [
      { title: 'Urgent Search Capture', desc: 'Dominate "pest control near me" and "termite inspection" — active infestation searches.' },
      { title: 'Recurring Service Visibility', desc: 'Rank for "monthly pest control" — customers looking for ongoing relationships.' },
      { title: 'Seasonal Pest Targeting', desc: 'Mosquito control in summer, rodent prevention in fall, termites in spring.' },
      { title: 'Neighborhood Reputation', desc: 'When one homeowner uses your service, their neighbors search for you by name.' },
    ],
    byonBenefits: [
      { title: 'Route-Based Communication', desc: 'Keep work calls separate and trackable across 8-12 daily stops.' },
      { title: 'Appointment Confirmation', desc: 'ETAs from a consistent company number — professional and trustworthy.' },
      { title: 'Callback Management', desc: 'Customer callbacks go to the business line, routed to the right technician.' },
      { title: 'Fleet Scaling', desc: 'New tech gets a business line on day one. Tech leaves — the line stays.' },
    ],
  },
  {
    id: 'real-estate',
    name: 'Real Estate Brokers',
    icon: Home,
    color: '#0d9488',
    accent: '#ccfbf1',
    heroText: 'Every call could be a buyer, seller, or referral. Local search determines which agencies get found first.',
    searchProblem: 'Home buyers and sellers search "real estate agent near me" and "best realtor [neighborhood]." Ranking in local search is the difference between a steady pipeline and buying leads from Zillow. The agency that dominates local search builds its brand independently.',
    teamProblem: 'Agents share personal numbers with clients, get calls at all hours, and have no boundary between work and life. When an agent leaves your agency, they take their phone number — and every client relationship with it.',
    geogridBenefits: [
      { title: 'Agency Brand Building', desc: 'Rank for "real estate agency [city]" instead of depending on Zillow.' },
      { title: 'Neighborhood Expertise', desc: 'Optimize for specific neighborhoods and school districts.' },
      { title: 'Listing Visibility', desc: 'Your listings appear in local search alongside your agency brand.' },
      { title: 'Content Authority', desc: 'Market reports and neighborhood guides rank locally, driving organic leads.' },
    ],
    byonBenefits: [
      { title: 'Client-Agent Separation', desc: 'Business number for clients. Forward calls when off the clock — prevent burnout.' },
      { title: 'Agency Number Retention', desc: 'Agent leaves? The business line and client history stay with your agency.' },
      { title: 'Transaction Documentation', desc: 'Call logs for transaction records, dispute resolution, and compliance.' },
      { title: 'Team Coordination', desc: 'Showing agents, listing agents, and coordinators on managed lines.' },
    ],
  },
  {
    id: 'roofing',
    name: 'Roofing Co.',
    icon: HardHat,
    color: '#b45309',
    accent: '#fef3c7',
    heroText: 'A single residential roof replacement can be worth $8,000-$15,000. The company that shows up first gets the job.',
    searchProblem: '"Roof repair near me" and "roofing company [city]" are among the highest-value local search queries. If your roofing company isn\'t dominating local search results, those high-ticket jobs are going straight to competitors.',
    teamProblem: 'Crews are on job sites all day — coordinating with suppliers, scheduling inspections, communicating with homeowners. All on personal phones. When a crew leader leaves, they take customer relationships with them.',
    geogridBenefits: [
      { title: 'High-Value Search Capture', desc: 'Dominate "roof repair near me" — the searches that lead to $10,000+ jobs.' },
      { title: 'Review Reputation Engine', desc: 'Build the trust and review volume that win over cautious homeowners.' },
      { title: 'Storm Response Visibility', desc: 'Already positioned at the top when weather drives search spikes.' },
      { title: 'Service Area Expansion', desc: 'Optimize in new zip codes before other roofers establish a footprint.' },
    ],
    byonBenefits: [
      { title: 'Professional Customer Contact', desc: 'Company-managed number for estimates, scheduling, and project updates.' },
      { title: 'Job Coordination', desc: 'Route calls between office, crew leaders, and suppliers through managed lines.' },
      { title: 'Scam Call Blocking', desc: 'Whitelisting ensures only dispatch, customers, and suppliers get through.' },
      { title: 'Documentation Trail', desc: 'Every call logged — critical for warranty claims and insurance documentation.' },
    ],
  },
];

export default function EightIndustriesPage() {
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].id);
  const current = INDUSTRIES.find(i => i.id === activeIndustry);

  return (
    <div className="si-page" data-testid="eight-industries-page">

      {/* Hero */}
      <section className="si-hero">
        <div className="si-hero-inner">
          <span className="si-hero-badge">WHO WE SERVE</span>
          <h1 className="si-hero-title">Eight Industries.<br />Two Problems. One Vendor.</h1>
          <p className="si-hero-subtitle">
            Every service business faces the same challenge: being found when customers search,
            and managing team communications as you scale. We solve both — exclusively for your territory.
          </p>
        </div>
      </section>

      {/* Industry Selector Tabs */}
      <section className="si-tabs-section">
        <div className="si-tabs-wrapper">
          <p className="si-tabs-instruction">Select your industry below to see how we solve your specific challenges.</p>
          <div className="si-tabs" data-testid="industry-tabs">
            {INDUSTRIES.map(ind => {
              const Icon = ind.icon;
              const isActive = activeIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  data-testid={`industry-tab-${ind.id}`}
                  className={`si-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveIndustry(ind.id)}
                  style={isActive ? { '--tab-color': ind.color, '--tab-accent': ind.accent } : {}}
                >
                  <Icon size={20} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Industry Content */}
      <section className="si-content" data-testid="industry-content">
        <div className="si-content-inner">

          {/* Industry Intro */}
          <div className="si-intro" style={{ borderLeftColor: current.color }}>
            <div className="si-intro-icon" style={{ color: current.color, background: current.accent }}>
              <current.icon size={28} />
            </div>
            <p className="si-intro-text">{current.heroText}</p>
          </div>

          {/* Two Problems */}
          <h2 className="si-section-heading">Two Problems. One Conversation.</h2>
          <div className="si-problems-grid">
            <div className="si-problem-card si-problem-search">
              <div className="si-problem-icon">
                <MapPin size={22} />
              </div>
              <h3>The Search Problem</h3>
              <p>{current.searchProblem}</p>
              <div className="si-solved-by">
                <span>Solved by</span> <strong>GeoGrid</strong>
              </div>
            </div>
            <div className="si-problem-card si-problem-team">
              <div className="si-problem-icon">
                <Phone size={22} />
              </div>
              <h3>The Team Problem</h3>
              <p>{current.teamProblem}</p>
              <div className="si-solved-by">
                <span>Solved by</span> <strong>BYON</strong>
              </div>
            </div>
          </div>

          {/* GeoGrid Benefits */}
          <div className="si-solution-block">
            <div className="si-solution-header si-solution-geogrid">
              <MapPin size={20} />
              <h3>GeoGrid for {current.name}</h3>
            </div>
            <div className="si-benefits-grid">
              {current.geogridBenefits.map((b, i) => (
                <div className="si-benefit-card" key={i}>
                  <CheckCircle size={18} className="si-benefit-check si-check-geogrid" />
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BYON Benefits */}
          <div className="si-solution-block si-solution-block-alt">
            <div className="si-solution-header si-solution-byon">
              <Phone size={20} />
              <h3>BYON for {current.name}</h3>
            </div>
            <div className="si-benefits-grid">
              {current.byonBenefits.map((b, i) => (
                <div className="si-benefit-card" key={i}>
                  <CheckCircle size={18} className="si-benefit-check si-check-byon" />
                  <div>
                    <strong>{b.title}</strong>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Territory Protection */}
          <div className="si-territory">
            <Shield size={28} className="si-territory-shield" />
            <h3>Exclusive Territory Protection</h3>
            <p>
              We will only serve <strong>one {current.name.toLowerCase()} company per territory</strong>.
              Your investment is protected — we won't help your competitor in the same service area.
              When customers search, you're the one we're fighting for.
            </p>
          </div>

          {/* CTA */}
          <div className="si-cta">
            <Link to="/five-tools" className="si-cta-btn" data-testid="industry-subscribe-btn">
              Learn About Our Five Tools <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
