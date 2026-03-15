import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Auto Repair & Service',
  heroTitle: 'When Check Engine Lights Up, They Search "Mechanic Near Me"',
  heroSubtitle: 'Car trouble is stressful and urgent. Drivers choose the nearest trusted shop that appears on their phone. If that\'s not you, it\'s your competitor — and they just earned a lifetime customer.',
  painPoints: [
    {
      title: 'The Trust-Distance Tradeoff',
      description: 'Drivers want a trustworthy mechanic that\'s also close by. If your shop has great reviews but doesn\'t appear in map results for surrounding neighborhoods, the driver picks the closer option — even if it has worse ratings.'
    },
    {
      title: 'Specialty Service Blindness',
      description: 'You do brake work, transmission repair, oil changes, and diagnostics. But Google might only associate your shop with one or two services. "Transmission repair near me" returns your competitor because their geographic signals are stronger for that keyword.'
    },
    {
      title: 'Fleet & Commercial Misses',
      description: 'Local businesses with vehicle fleets search for reliable nearby shops. If you\'re not visible in their search radius, you\'re missing recurring, high-volume commercial accounts.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'See your shop\'s visibility for every auto service keyword — from "oil change near me" to "transmission repair [neighborhood]" — across a 5-mile radius.',
      features: ['Service-specific keyword mapping', 'Competitor shop positioning', 'Fleet service area visibility']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Sync your services, certifications (ASE, AAA), hours, and contact info across Google, Apple Maps, Yelp, RepairPal, and automotive directories.',
      features: ['Automotive directory sync', 'Certification & badge listings', 'Service menu consistency']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'Generate local auto care content that builds geographic relevance. "Winter tire service for Lakewood Heights drivers" — specific, local, and exactly what the algorithm wants.',
      features: ['Seasonal maintenance guides', 'Neighborhood-specific content', 'Vehicle care tips with local context']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'After every service, request a review that mentions the repair and the area. "Great brake job — my go-to shop near the Westside Mall" builds the geographic trust signals that drive rankings.',
      features: ['Post-service review automation', 'Service-specific prompts', 'Reputation score tracking']
    }
  ],
  localExample: {
    title: 'The Family Shop Losing to the Chain',
    description: 'A 25-year family-owned repair shop with ASE-certified mechanics was losing customers to a Jiffy Lube 2 miles away. Not because Jiffy Lube was better — but because their franchise system had automated geographic search optimization that the family shop never knew existed.',
    quote: 'We thought our reputation would speak for itself. Turns out, if Google can\'t see you, neither can your customers. GeoGrid leveled the playing field against the chains.'
  },
  stats: [
    { value: '69%', label: 'of drivers choose auto shops from map search results' },
    { value: '3.1mi', label: 'average distance drivers travel for auto repair' },
    { value: '$356', label: 'average ticket per repair visit' },
    { value: '$4,200', label: 'lifetime value of a loyal auto repair customer' }
  ],
  ctaText: 'Be the First Shop Every Driver in Your Area Finds'
};

export default function GeoGridAutoRepairPage() {
  return <GeoGridIndustryPage config={config} />;
}
