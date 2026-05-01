import React, { useState } from 'react';
import { Droplets, Wrench, Zap, Thermometer, Bug, Home, HardHat, MapPin, CalendarClock, Shield, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SevenIndustriesPage.css';
import AlignedObjectivesBanner from '../components/AlignedObjectivesBanner';

const INDUSTRIES = [
  {
    id: 'well-drilling',
    name: 'Well Drilling',
    icon: Droplets,
    color: '#0369a1',
    accent: '#e0f2fe',
    heroText: 'Homeowners don\'t think about their well system until something goes wrong — and when it does, they search immediately.',
    searchProblem: 'When a well pump fails or water quality drops, homeowners grab their phone and search "well drilling near me." If your company isn\'t in the top 3 results, you don\'t exist. Your competitors who invest in local search optimization are getting those emergency calls — and those are high-ticket jobs.',
    teamProblem: 'Well drilling isn\'t a one-stop service call — it\'s a multi-day operation with rigs, casing crews, and pump installers all needing to show up on the right day in the right order. The office has no real-time view of where each job is in that sequence, and homeowners spend days wondering "is the rig coming Tuesday or Wednesday?" The bigger your fleet gets, the more those small coordination misses turn into rebooked days and lost revenue.',
    geogridBenefits: [
      { title: 'Emergency Search Dominance', desc: 'Rank at the top for "well drilling near me," "well pump repair," and other high-intent searches.' },
      { title: 'Google Business Optimization', desc: 'Accurate service areas, hours, emergency availability, and trust-building reviews.' },
      { title: 'Neighborhood-Level Targeting', desc: 'Optimize for specific rural areas where well services are concentrated.' },
      { title: 'Competitor Monitoring', desc: 'Track where competitors rank and identify gaps in their coverage.' },
    ],
    crewBenefits: [
      { title: 'Multi-Stage Job View', desc: 'Drilling, casing, pump install, and water testing visible as one connected timeline. The office can see exactly where every job is without phoning each crew leader.' },
      { title: 'Homeowner Tracker Link', desc: 'Customers get a self-serve link showing the full sequence — "Day 1: Drilling," "Day 4: Pump install," "Day 5: Water quality." Cuts inbound calls in half.' },
      { title: 'Job History You Own', desc: 'Every well, every depth log, every part installed — stored under your business. When a tech leaves, the well-by-well history doesn\'t walk out the door with them.' },
      { title: 'Standardized Service Catalog', desc: 'From "Residential Well Drilling" to "Pump Replacement," each service has a default duration and price. Consistent scoping, regardless of who\'s quoting.' },
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
    teamProblem: 'Septic work splits between routine pump-outs, emergency backups, and multi-day system installs — three completely different cadences sharing the same crew. Customers waiting on a pump-out call your office about ETAs. Install jobs need permit and inspector windows coordinated. Without one shared schedule view, your office becomes a switchboard, and the techs in the field never know what\'s coming next.',
    geogridBenefits: [
      { title: 'Emergency Search Dominance', desc: 'Rank at the top for "septic emergency near me," "septic tank installation," and other high-intent searches.' },
      { title: 'Google Business Optimization', desc: 'Accurate service areas, hours, emergency availability, and trust-building reviews.' },
      { title: 'Neighborhood-Level Targeting', desc: 'Optimize for specific rural and suburban areas where septic systems are most common.' },
      { title: 'Competitor Monitoring', desc: 'Track where competitors rank and identify gaps in their coverage.' },
    ],
    crewBenefits: [
      { title: 'Mixed-Cadence Schedule View', desc: 'Recurring pump-outs, emergency calls, and multi-day installs all on the same calendar. Dispatch can rebalance the day when an emergency hits without breaking the installs.' },
      { title: 'Customer Self-Tracking', desc: 'Homeowners get a tracker link the moment the appointment is booked. They stop calling "is the pump truck coming?" and your office gets the morning back.' },
      { title: 'Job & Property History You Own', desc: 'Every system you\'ve serviced, every tank size, every soil report — stored under your business. The next call starts with full context.' },
      { title: 'Standardized Service Catalog', desc: 'From "Septic Pump-Out" to "New System Install," each service has a default duration and price. New techs onboard in days, not weeks.' },
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
    teamProblem: 'Your plumbers run a full schedule of emergency calls and dispatched jobs every day — but the office has no real-time view of where they are or what\'s done. Customers call the office asking "when\'s my plumber arriving?" and your team chases down the answer one truck at a time. Every day, an hour of admin work disappears into questions a dashboard could answer in three seconds.',
    geogridBenefits: [
      { title: 'High-Intent Search Capture', desc: 'Dominate "emergency plumber near me" and "drain cleaning service" — searches that convert to same-day revenue.' },
      { title: 'Review Management', desc: 'Build and showcase the review volume that makes homeowners choose you.' },
      { title: 'Service Area Expansion', desc: 'Optimize visibility in new neighborhoods before competitors establish dominance.' },
      { title: 'Seasonal Campaign Support', desc: 'Optimize for "frozen pipe repair" in winter or "sewer line inspection" during home buying season.' },
    ],
    crewBenefits: [
      { title: 'Live Dispatch Visibility', desc: 'Office, dispatch, and field plumbers see the same week-at-a-glance schedule. No more "where\'s Joe?" calls eating up the morning.' },
      { title: 'Customer Self-Tracking', desc: 'Send each customer a unique link. They see when their plumber is scheduled, on the way, or on-site — without ever calling your office.' },
      { title: 'Job History You Own', desc: 'Every visit, every customer, every note stored under your business — not on a plumber\'s personal phone. When someone leaves, the relationships stay.' },
      { title: 'Standardized Service Catalog', desc: 'Your services with default durations and prices, so your team scopes jobs in seconds. "Drain Cleaning" means the same thing every time.' },
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
    teamProblem: 'Electrical work is safety-critical, and that means every job has handoffs — confirmed power shutoffs, code-inspection windows, coordination with other trades. All of it currently happens in scattered text threads nobody can audit. When something goes wrong, there\'s no record of who told whom what — and that\'s a real liability for a licensed business.',
    geogridBenefits: [
      { title: 'Licensed & Trusted Visibility', desc: 'Rank for "licensed electrician near me" — where trust and licensing matter most.' },
      { title: 'Commercial & Residential Coverage', desc: 'Optimize for both emergency searches and commercial contractor queries.' },
      { title: 'Certification Showcase', desc: 'Highlight licenses and specializations in local search results.' },
      { title: 'New Construction Targeting', desc: 'Capture searches for new construction wiring, remodels, and EV charger installation.' },
    ],
    crewBenefits: [
      { title: 'Job-Site Schedule Visibility', desc: 'Office and field electricians on the same calendar. Inspection times, shutoff windows, and trade-coordination slots all in one place.' },
      { title: 'Auditable Job Records', desc: 'Every visit, note, and customer update logged under your business. Critical for warranty disputes, code documentation, and license protection.' },
      { title: 'Customer Status Tracking', desc: 'Homeowners and GCs get a self-serve link showing crew status. Cuts inbound "where are you?" calls during sensitive jobs.' },
      { title: 'Standardized Service Pricing', desc: 'From "Panel Upgrade" to "EV Charger Install," each service has a default duration and price your crew can quote on the spot.' },
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
    teamProblem: 'HVAC is a feast-or-famine business — slow weeks, then 80-degree nights when every customer in the county wants you yesterday. Without a real schedule view, dispatch becomes a fire drill, customers wait hours just to know if anyone\'s coming, and good techs burn out because nobody can see how loaded they already are. The summer revenue you\'ve waited for slips out the door because the office can\'t keep up.',
    geogridBenefits: [
      { title: 'Seasonal Search Dominance', desc: 'Rank at the top for "AC repair near me" in summer and "furnace repair" in winter.' },
      { title: 'Maintenance Plan Visibility', desc: 'Optimize for "HVAC maintenance plan" and other recurring revenue searches.' },
      { title: 'Service Area Expansion', desc: 'Extend visibility into new neighborhoods as your team grows.' },
      { title: 'New Technology Queries', desc: 'Capture "heat pump installation" and "smart thermostat" — premium services.' },
    ],
    crewBenefits: [
      { title: 'Peak-Season Visibility', desc: 'When the heat wave hits, dispatch sees every truck, every appointment, every available hour at a glance — instead of working from a notepad and a panic.' },
      { title: 'Self-Serve Customer Updates', desc: 'Send each customer a tracker link the moment the appointment is booked. They stop calling "when\'s the tech coming?" — your office gets the afternoon back.' },
      { title: 'Job & Equipment History', desc: 'Every system you\'ve worked on, every part installed, tied to the customer\'s record. The next service call starts with full context, not a guess.' },
      { title: 'Service Catalog with Defaults', desc: 'From "AC Tune-Up" to "Furnace Install," your standard services have standard durations. Quoting and scheduling stop being arguments.' },
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
    teamProblem: 'Pest control is a grind of recurring routes and one-off treatments sharing the same schedule. Customers want appointment reminders, on-the-way notifications, and easy reschedules. Your techs want to know what\'s on tap tomorrow without 50 texts. Right now, your office is the bottleneck for every one of those questions — and as your fleet scales from three trucks to ten, that bottleneck breaks.',
    geogridBenefits: [
      { title: 'Urgent Search Capture', desc: 'Dominate "pest control near me" and "termite inspection" — active infestation searches.' },
      { title: 'Recurring Service Visibility', desc: 'Rank for "monthly pest control" — customers looking for ongoing relationships.' },
      { title: 'Seasonal Pest Targeting', desc: 'Mosquito control in summer, rodent prevention in fall, termites in spring.' },
      { title: 'Neighborhood Reputation', desc: 'When one homeowner uses your service, their neighbors search for you by name.' },
    ],
    crewBenefits: [
      { title: 'Route + One-Off Schedule View', desc: 'Recurring quarterly visits and emergency treatments live on one calendar. Dispatch can rebalance routes when a tech calls in sick without a paper map and a prayer.' },
      { title: 'Customer Tracker Link', desc: 'Every visit triggers a self-serve status link — appointment confirmed, tech en route, treatment complete. No more "did anyone come today?" calls.' },
      { title: 'Customer Visit History', desc: 'Every property, every treatment, every chemical applied — stored under your business, not your tech\'s notebook. Compliance and re-treatment guarantees stay intact.' },
      { title: 'Service Catalog', desc: 'From "Termite Inspection" to "Mosquito Treatment," each service has a default duration and treatment plan. New techs get up to speed in days, not weeks.' },
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
    teamProblem: 'Brokers don\'t run trucks, they run people — showings, inspections, closings, all coordinated by phone and text between agents, clients, and other brokers. When an agent leaves your firm, the schedule, the client history, and the activity log walk out the door with them. Most CRMs are built for a single agent\'s workflow, not the firm that pays them.',
    geogridBenefits: [
      { title: 'Agency Brand Building', desc: 'Rank for "real estate agency [city]" instead of depending on Zillow.' },
      { title: 'Neighborhood Expertise', desc: 'Optimize for specific neighborhoods and school districts.' },
      { title: 'Listing Visibility', desc: 'Your listings appear in local search alongside your agency brand.' },
      { title: 'Content Authority', desc: 'Market reports and neighborhood guides rank locally, driving organic leads.' },
    ],
    crewBenefits: [
      { title: 'Agency-Wide Schedule View', desc: 'Showings, listing appointments, and closings visible to brokers and admins. Coordination stops being someone\'s full-time job.' },
      { title: 'Client Self-Service Link', desc: 'Buyers and sellers get a tokenized status link — "Showing scheduled Thursday 2 PM with Agent X." Cuts inbound "what\'s next?" calls in half.' },
      { title: 'Activity History Owned by the Firm', desc: 'Every showing, every offer, every note tied to your agency — not the agent\'s personal Notes app. When agents come and go, the relationships stay.' },
      { title: 'Service Catalog by Agent Tier', desc: 'Standardize what a "Buyer Consultation" or "Listing Walkthrough" actually includes, so your firm delivers a consistent experience regardless of which agent shows up.' },
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
    teamProblem: 'Roofing jobs aren\'t single-day visits — they\'re multi-day projects spread across crews, weather windows, and material deliveries. The office has no way to know which roof is at which stage, or whether the homeowner has been told the crew is coming back tomorrow. By the time someone notices a missed update, the customer is already on the phone with another roofer.',
    geogridBenefits: [
      { title: 'High-Value Search Capture', desc: 'Dominate "roof repair near me" — the searches that lead to $10,000+ jobs.' },
      { title: 'Review Reputation Engine', desc: 'Build the trust and review volume that win over cautious homeowners.' },
      { title: 'Storm Response Visibility', desc: 'Already positioned at the top when weather drives search spikes.' },
      { title: 'Service Area Expansion', desc: 'Optimize in new zip codes before other roofers establish a footprint.' },
    ],
    crewBenefits: [
      { title: 'Multi-Day Project View', desc: 'Crews, deliveries, and inspection slots on one timeline. The office sees what\'s happening on every active roof without calling each crew leader.' },
      { title: 'Homeowner Status Link', desc: 'Send the customer a tracker the day work begins. They see "Day 1: tear-off complete," "Day 2: underlayment," "Day 3: shingles" — without picking up the phone.' },
      { title: 'Project History You Own', desc: 'Photos, notes, materials, inspections — all stored under the project, not in a crew leader\'s text thread. Critical for warranty claims and insurance disputes.' },
      { title: 'Standardized Service Catalog', desc: 'From "20-Square Asphalt Replacement" to "Storm Damage Inspection," every service has a baseline duration and price. Quoting becomes consistent, not personal.' },
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

      {/* Aligned Objectives — universal frame for the entire page */}
      <AlignedObjectivesBanner />

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
                <CalendarClock size={22} />
              </div>
              <h3>The Team Problem</h3>
              <p>{current.teamProblem}</p>
              <div className="si-solved-by">
                <span>Solved by</span> <strong>Crew Management</strong>
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

          {/* Crew Management Benefits */}
          <div className="si-solution-block si-solution-block-alt">
            <div className="si-solution-header si-solution-crew">
              <CalendarClock size={20} />
              <h3>Crew Management for {current.name}</h3>
            </div>
            <div className="si-benefits-grid">
              {current.crewBenefits.map((b, i) => (
                <div className="si-benefit-card" key={i}>
                  <CheckCircle size={18} className="si-benefit-check si-check-crew" />
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
