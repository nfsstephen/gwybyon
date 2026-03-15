import React from 'react';
import { Thermometer } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Air & Heating Companies',
  shortName: 'HVAC Companies',
  icon: Thermometer,
  color: '#dc2626',
  heroText: 'HVAC is a seasonal, high-urgency industry. When the AC fails in August or the furnace dies in January, homeowners need help now. Your technicians cover wide service areas daily. Search visibility and team management are both critical.',
  searchProblem: 'HVAC searches spike dramatically with weather changes. "AC repair near me" surges in summer, "furnace repair near me" in winter. These are high-value, emergency-driven searches where ranking #1 can mean tens of thousands in revenue during peak weeks. If your HVAC company isn\'t dominating local search during these critical windows, your competitors are capturing your revenue.',
  teamProblem: 'HVAC technicians cover large service areas, often handling 4-6 appointments per day across different neighborhoods. They coordinate with dispatch, call customers with ETAs, order parts, and troubleshoot with senior techs — all on personal phones. Scaling your team means scaling this chaos unless you have a managed communication system.',
  geogridIntro: 'GeoGrid ensures your HVAC company captures the seasonal search spikes that drive your highest-revenue months.',
  geogridBenefits: [
    { title: 'Seasonal Search Dominance', desc: 'Rank at the top for "AC repair near me" in summer and "furnace repair near me" in winter — the searches that drive 60%+ of annual revenue in compressed timeframes.' },
    { title: 'Maintenance Plan Visibility', desc: 'Beyond emergencies, optimize for "HVAC maintenance plan," "annual AC tune-up," and other searches that drive recurring revenue and customer retention.' },
    { title: 'Service Area Expansion', desc: 'As your team grows, GeoGrid extends your visibility into new neighborhoods and cities — putting you on the map before competitors establish presence.' },
    { title: 'New Technology Queries', desc: 'Capture growing searches for "heat pump installation," "smart thermostat setup," and "energy-efficient HVAC" — the premium services that command higher margins.' },
  ],
  byonIntro: 'BYON scales your HVAC team\'s communication as your fleet and service area grow.',
  byonBenefits: [
    { title: 'High-Volume Dispatch Management', desc: 'During peak season, your dispatchers need to reach technicians instantly. Business lines ensure dispatch calls always get through — no competing with personal calls and texts.' },
    { title: 'Customer ETA Updates', desc: 'Technicians call customers from their business line with arrival times. Professional, trackable, and the number stays with your company.' },
    { title: 'Route Optimization', desc: 'With location tracking on business lines, dispatchers can route the nearest available technician to emergency calls — critical during peak season when every minute counts.' },
    { title: 'Seasonal Staff Scaling', desc: 'Onboard seasonal technicians with instant business lines. When the season ends, deactivate the lines. No contracts, no personal number complications.' },
  ],
  territoryText: 'HVAC territory protection is especially valuable because of the seasonal revenue concentration. During peak weeks, the company that ranks #1 locally captures a disproportionate share of emergency calls. We guarantee that revenue advantage is yours — no competing HVAC company in your territory will receive our services.',
  salesPitch: '"Your busiest weeks generate the majority of your annual revenue — and those weeks are won or lost in local search. GeoGrid puts you at #1 for \'AC repair near me\' when it\'s 100 degrees outside, and we guarantee your competitor across town won\'t get the same advantage. Your technicians are handling 5-6 calls a day during peak season on personal phones. BYON gives each of them a managed business line for dispatch, customer updates, and route tracking. One vendor. Both problems. Exclusive territory."',
};

export default function BigMarketHVACPage() {
  return <BigMarketIndustryPage industry={data} />;
}
