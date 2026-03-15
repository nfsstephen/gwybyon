import React from 'react';
import { Zap } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Electricians',
  shortName: 'Electrical Companies',
  icon: Zap,
  color: '#d97706',
  heroText: 'Electrical work is safety-critical and trust-driven. Homeowners and businesses search locally and choose based on visibility and reviews. Your electricians work on-site all day communicating through personal devices with no company oversight.',
  searchProblem: 'When a homeowner loses power, has a panel issue, or needs an electrical inspection for a home sale, they search "electrician near me." Commercial clients search for licensed electrical contractors for code compliance. If your company isn\'t visible in local search, you\'re losing bids and emergency calls to competitors who are.',
  teamProblem: 'Electricians work on job sites where communication is critical for safety — coordinating with other trades, confirming power shutoffs, and updating dispatch. They do all of this on personal phones. You have no record of these communications, no way to manage who contacts them, and no separation between their work and personal calls.',
  geogridIntro: 'GeoGrid ensures your electrical company is the first choice when customers search for licensed electricians in your area.',
  geogridBenefits: [
    { title: 'Licensed & Trusted Visibility', desc: 'Rank for "licensed electrician near me," "electrical contractor [city]," and "emergency electrician" — the searches where trust and licensing matter most.' },
    { title: 'Commercial & Residential Coverage', desc: 'Optimize for both residential emergency searches and commercial contractor queries — expanding your reach across customer segments.' },
    { title: 'Certification Showcase', desc: 'Highlight your licenses, certifications, and specializations in local search results — the differentiators that win over cautious customers.' },
    { title: 'New Construction & Remodel Targeting', desc: 'Capture searches related to new construction wiring, remodel electrical work, and EV charger installation — growing service categories.' },
  ],
  byonIntro: 'BYON keeps your electricians connected and controlled with a managed business line on their personal device.',
  byonBenefits: [
    { title: 'Safety Communication Channel', desc: 'Dedicated business line for job-site coordination — confirming power shutoffs, coordinating with other trades, and emergency communication through a managed channel.' },
    { title: 'Customer-Facing Professionalism', desc: 'Customers call a company number, not a personal cell. When an electrician leaves your team, the customer relationship stays with the business.' },
    { title: 'Location Tracking for Dispatching', desc: 'Know where your crews are to dispatch the closest electrician to emergency calls. Reduce response times and fuel costs.' },
    { title: 'After-Hours Call Routing', desc: 'Business lines can be forwarded to on-call electricians after hours. Emergency calls get answered; off-duty techs aren\'t disturbed.' },
  ],
  territoryText: 'Your territory means we will not provide GeoGrid or BYON to any competing electrical company in your service area. When customers search for an electrician, our entire effort is behind your company — no conflicts, no competing interests.',
  salesPitch: '"Homeowners and businesses need to trust their electrician — and that starts with finding you first. GeoGrid puts your company at the top of local search results, and we guarantee no competing electrician in your territory gets the same service. Meanwhile, your team is on job sites all day using personal phones. BYON gives each electrician a managed business line for dispatch, customer calls, and safety coordination. One vendor, both problems solved."',
};

export default function BigMarketElectriciansPage() {
  return <BigMarketIndustryPage industry={data} />;
}
