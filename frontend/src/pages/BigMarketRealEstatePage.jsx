import React from 'react';
import { Home } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Real Estate',
  shortName: 'Real Estate Agencies',
  icon: Home,
  color: '#0d9488',
  heroText: 'Real estate agents live on their phones. Every call could be a buyer, seller, or referral. But when personal and business calls come from the same number, agents burn out and agencies lose control. Meanwhile, local search determines which agencies get found first.',
  searchProblem: 'Home buyers and sellers search "real estate agent near me," "homes for sale in [city]," and "best realtor [neighborhood]." For agencies, ranking in local search is the difference between a steady pipeline and buying leads from Zillow. The agency that dominates local search builds its brand independently — not dependent on third-party lead platforms.',
  teamProblem: 'Real estate agents are always reachable — or they lose the deal. They share personal numbers with clients, get calls at all hours, and have no boundary between work and life. When an agent leaves your agency, they take their phone number — and every client relationship with it. Agencies have almost zero control over agent communications.',
  geogridIntro: 'GeoGrid builds your agency\'s local search presence so you generate your own leads instead of buying them.',
  geogridBenefits: [
    { title: 'Agency Brand Building', desc: 'Rank for "real estate agency [city]," "top realtors near me," and neighborhood-specific searches. Build your agency brand in local search instead of depending on Zillow and Realtor.com.' },
    { title: 'Neighborhood Expertise Positioning', desc: 'Optimize for hyper-local searches — specific neighborhoods, school districts, and communities. Position your agency as the local expert that national platforms can\'t match.' },
    { title: 'Listing Visibility', desc: 'Ensure your current listings appear in local search results. When buyers search for homes in your area, your listings and your agency appear together.' },
    { title: 'Market Report Content', desc: 'GeoGrid\'s content optimization helps your market reports, neighborhood guides, and blog posts rank locally — establishing authority and driving organic leads.' },
  ],
  byonIntro: 'BYON gives your agents a professional business line that protects both the agent and the agency.',
  byonBenefits: [
    { title: 'Client-Agent Separation', desc: 'Agents give clients their business number, not their personal cell. When they\'re off the clock, business calls can be forwarded to another agent or to voicemail — boundaries that prevent burnout.' },
    { title: 'Agency Number Retention', desc: 'When an agent leaves your agency, their business line stays with you. The client relationships and contact history remain agency assets — not personal ones.' },
    { title: 'Transaction Documentation', desc: 'Call logs on the business line create records of client communications — valuable for transaction documentation, dispute resolution, and compliance.' },
    { title: 'Team Coordination', desc: 'Showing agents, listing agents, and transaction coordinators communicate through managed business lines. Professional, trackable, and integrated with your agency operations.' },
  ],
  territoryText: 'Real estate is inherently local and territorial. Our territory guarantee means no competing agency in your market area receives GeoGrid or BYON services from us. You invest in dominating local search — and we ensure that investment isn\'t undermined by us helping your competitor do the same thing.',
  salesPitch: '"Your agency depends on local search to generate leads independently — GeoGrid puts you at the top of \'realtor near me\' and neighborhood-specific searches, so you\'re not buying leads from Zillow. And your agents are sharing personal numbers with every client, losing those relationships when they leave. BYON gives each agent a managed business line that stays with the agency. One vendor. Two solutions. And we guarantee no competing agency in your market gets our services."',
};

export default function BigMarketRealEstatePage() {
  return <BigMarketIndustryPage industry={data} />;
}
