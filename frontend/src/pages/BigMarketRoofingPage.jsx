import React from 'react';
import { HardHat } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Roofing Companies',
  shortName: 'Roofing Companies',
  icon: HardHat,
  color: '#b45309',
  heroText: 'Roofing is one of the most competitive and high-value local service industries. Whether it\'s storm damage, a full replacement, or a routine inspection, homeowners search online first — and they call whoever shows up at the top. Your crews are spread across job sites with no centralized communication. Two problems, one vendor.',
  searchProblem: '"Roof repair near me" and "roofing company [city]" are among the highest-value local search queries in home services. A single residential roof replacement can be worth $8,000–$15,000 or more. If your roofing company isn\'t dominating local search results, those high-ticket jobs are going straight to competitors who are.',
  teamProblem: 'Your roofing crews are on job sites all day — coordinating with suppliers, scheduling inspections, and communicating with homeowners about project timelines. They\'re doing all of it from personal cell phones. You can\'t track customer communications, can\'t ensure consistent follow-ups, and when a crew leader leaves, they take those customer relationships with them.',
  geogridIntro: 'GeoGrid puts your roofing company at the top of local search for both storm-driven emergencies and planned replacement projects.',
  geogridBenefits: [
    { title: 'High-Value Search Capture', desc: 'Dominate "roof repair near me," "roofing company [city name]," and "storm damage roof inspection" — the searches that lead to $10,000+ jobs.' },
    { title: 'Review Reputation Engine', desc: 'Roofing is a trust-driven purchase. GeoGrid helps you build and showcase the review volume and ratings that make homeowners choose you over the competition.' },
    { title: 'Storm Response Visibility', desc: 'After severe weather, search volume for roofing services spikes dramatically. GeoGrid ensures you\'re already positioned at the top when homeowners start searching.' },
    { title: 'Service Area Expansion', desc: 'As you take on projects in new neighborhoods and zip codes, GeoGrid optimizes your visibility in those areas before other roofers can establish a footprint.' },
  ],
  byonIntro: 'BYON gives every crew leader and estimator on your team a professional business line that you own and control.',
  byonBenefits: [
    { title: 'Professional Customer Contact', desc: 'Homeowners call and text a company-managed number for estimates, scheduling, and project updates. Your brand stays front and center — and the number stays with the company.' },
    { title: 'Job Coordination', desc: 'Route calls between office staff, crew leaders, and suppliers through managed business lines. Know who\'s available and who\'s on a roof.' },
    { title: 'Scam Call Blocking', desc: 'Your crews waste time on spam calls during working hours. BYON\'s whitelisting ensures only dispatch, customers, and suppliers can reach them on the business line.' },
    { title: 'Documentation Trail', desc: 'Every customer call and text on the business line is logged — critical for warranty claims, insurance documentation, and quality assurance follow-ups.' },
  ],
  territoryText: 'We guarantee that no other roofing company in your assigned territory will receive GeoGrid or BYON services from us. When homeowners in your area need a roof, we\'re working exclusively to put you at the top — not helping your competitor down the street.',
  salesPitch: '"Roofing is a high-ticket business where one job can be worth $10,000 or more. GeoGrid gets your company to the top of local search and keeps you there — and we won\'t sell the same service to your competitor. Plus, your crews are using personal phones for everything from estimates to supplier orders. BYON gives each of them a business line you control. One vendor, two solutions, exclusive territory."',
};

export default function BigMarketRoofingPage() {
  return <BigMarketIndustryPage industry={data} />;
}
