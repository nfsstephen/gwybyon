import React from 'react';
import { Wrench } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Plumbers',
  shortName: 'Plumbing Companies',
  icon: Wrench,
  color: '#7c3aed',
  heroText: 'Plumbing is one of the highest-intent local search categories. When a pipe bursts at 2 AM, homeowners don\'t browse — they call the first company they find. Your plumbers are running between jobs using personal phones for everything. Two problems, one vendor.',
  searchProblem: '"Emergency plumber near me" is one of the most valuable local search queries in home services. These are customers ready to pay premium rates for immediate help. If your plumbing company isn\'t ranking in the top local results, those high-value calls are going to your competitors — every single day.',
  teamProblem: 'Your plumbers are on the road from morning to night. They call customers for ETAs, receive dispatch updates, and coordinate parts orders — all from their personal phones. You can\'t track their availability, can\'t control who reaches them, and when a plumber leaves your company, they take their customer relationships with them.',
  geogridIntro: 'GeoGrid puts your plumbing company at the top of local search for both emergency and scheduled service calls.',
  geogridBenefits: [
    { title: 'High-Intent Search Capture', desc: 'Dominate "emergency plumber near me," "plumber [city name]," and "drain cleaning service" — the searches that convert to same-day revenue.' },
    { title: 'Review Management', desc: 'Plumbing customers leave reviews when the experience is memorable. GeoGrid helps you build and showcase the review volume that makes homeowners choose you over competitors.' },
    { title: 'Service Area Expansion', desc: 'As you grow into new neighborhoods, GeoGrid optimizes your visibility in those areas before competitors establish dominance.' },
    { title: 'Seasonal Campaign Support', desc: 'Optimize for seasonal queries like "frozen pipe repair" in winter or "sewer line inspection" during home buying season.' },
  ],
  byonIntro: 'BYON gives every plumber on your team a professional business line that you control.',
  byonBenefits: [
    { title: 'Professional Customer Contact', desc: 'Customers call and text a company-managed number. Your brand is represented consistently, and the number stays with the company if the plumber moves on.' },
    { title: 'Dispatch Integration', desc: 'Route emergency calls to available plumbers through their business lines. Know who\'s on a job and who can take the next call.' },
    { title: 'Scam Call Blocking', desc: 'Plumbers waste time on spam calls during working hours. BYON\'s whitelisting ensures only dispatch, customers, and suppliers can reach them on the business line.' },
    { title: 'Job Documentation', desc: 'Call logs on the business line create an automatic record of customer communications — useful for warranty disputes, follow-ups, and quality assurance.' },
  ],
  territoryText: 'We guarantee that no other plumbing company in your assigned territory will receive GeoGrid or BYON services from us. When homeowners in your area search for a plumber, we\'re working exclusively to put you at the top — not playing both sides.',
  salesPitch: '"You know that \'plumber near me\' is one of the most competitive local searches. GeoGrid gets you to the top of those results and keeps you there — and we won\'t sell the same service to your competitor down the street. Plus, your plumbers are using personal phones for dispatch and customer calls every day. BYON gives each of them a business line you control. One vendor, two solutions, exclusive territory."',
};

export default function BigMarketPlumbersPage() {
  return <BigMarketIndustryPage industry={data} />;
}
