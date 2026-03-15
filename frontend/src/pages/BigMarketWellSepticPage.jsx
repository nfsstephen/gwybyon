import React from 'react';
import { Droplets } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Well & Septic Companies',
  shortName: 'Well & Septic',
  icon: Droplets,
  color: '#0369a1',
  heroText: 'Homeowners don\'t think about their well or septic system until something goes wrong — and when it does, they search immediately. The company that shows up first gets the call. Meanwhile, your field crews are handling emergencies on personal phones with zero company oversight.',
  searchProblem: 'When a septic system backs up or a well pump fails, homeowners grab their phone and search "septic service near me" or "well repair emergency." If your company isn\'t in the top 3 results, you don\'t exist. Your competitors who invest in local search optimization are getting those emergency calls — and those are high-ticket jobs.',
  teamProblem: 'Your technicians are in the field all day responding to emergencies and scheduled maintenance. They use personal phones to coordinate with dispatch, call customers, and receive job updates. You have no visibility into those communications, no call control, and no way to protect them from scam calls that waste their time.',
  geogridIntro: 'GeoGrid ensures your well & septic company dominates local search results when homeowners need you most.',
  geogridBenefits: [
    { title: 'Emergency Search Dominance', desc: 'Rank at the top for "septic emergency near me," "well pump repair," and other high-intent searches that drive immediate revenue.' },
    { title: 'Google Business Profile Optimization', desc: 'Ensure your profile has accurate service areas, hours, emergency availability, and the reviews that build trust with panicked homeowners.' },
    { title: 'Neighborhood-Level Targeting', desc: 'Optimize for specific neighborhoods and rural areas where well and septic services are concentrated — reaching the exact communities you serve.' },
    { title: 'Competitor Monitoring', desc: 'Track where your competitors rank and identify gaps in their coverage that you can exploit to capture more service calls.' },
  ],
  byonIntro: 'BYON gives your field technicians a managed business line that keeps company communications professional and controlled.',
  byonBenefits: [
    { title: 'Emergency Dispatch Line', desc: 'Technicians receive emergency calls on their business line — dispatch can reach them instantly without calling personal numbers.' },
    { title: 'Customer Communication Control', desc: 'All customer-facing calls go through the business line. If a tech leaves the company, the number stays with you — not with them.' },
    { title: 'Location & Route Tracking', desc: 'Know where your crews are in real-time. Optimize routing between emergency calls and scheduled maintenance appointments.' },
    { title: 'After-Hours Separation', desc: 'When the shift ends, the business line can be forwarded to on-call staff. Technicians get their personal time back without missing emergency calls.' },
  ],
  territoryText: 'We will only serve one well & septic company per territory. Your investment in GeoGrid is protected — we won\'t help your competitor in the same service area outrank you. When homeowners search for emergency service, you\'re the one we\'re fighting for.',
  salesPitch: '"Your well and septic company depends on being found when emergencies happen — that\'s where GeoGrid puts you at the top of local search. And since your technicians are in the field every day using personal phones for company business, BYON gives each of them a managed second line with dispatch integration and route tracking. One vendor, two problems solved — and we guarantee no other well & septic company in your territory gets our services."',
};

export default function BigMarketWellSepticPage() {
  return <BigMarketIndustryPage industry={data} />;
}
