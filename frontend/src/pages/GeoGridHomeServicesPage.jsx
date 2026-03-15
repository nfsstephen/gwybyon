import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Home Services',
  heroTitle: 'When a Pipe Bursts, They Search "Plumber Near Me" — Will They Find You?',
  heroSubtitle: 'Emergency searches are the highest-converting searches in existence. GeoGrid ensures your home services business owns every urgent local query in your territory.',
  painPoints: [
    {
      title: 'Emergency Visibility Gap',
      description: 'When someone\'s basement is flooding at 9 PM, they search "emergency plumber near me." If you don\'t dominate that 5-mile radius, you don\'t exist.'
    },
    {
      title: 'Service Area Confusion',
      description: 'Google doesn\'t know you serve the entire north side. Your listing says one address, but your actual service area spans 15 neighborhoods. The algorithm doesn\'t care about what you claim — it cares about what it can prove.'
    },
    {
      title: 'Competitor Ad Spend',
      description: 'Larger companies spend thousands on Google Ads to appear above you. But organic map rankings — the ones GeoGrid optimizes — get 3x more trust clicks than paid ads.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'Map your exact visibility for "plumber near me," "HVAC repair near me," and "electrician near me" across your entire service territory.',
      features: ['Service-area radius mapping', 'Emergency keyword visibility', 'Competitor territory analysis']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Your business name, license info, service areas, and contact details — perfectly consistent across every platform that feeds the local algorithm.',
      features: ['60+ directory sync', 'Service area optimization', 'License & certification listings']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'AI generates content that proves to Google you serve specific neighborhoods. "HVAC repair serving the Oakwood Heights community since 2015" — this is what algorithms eat.',
      features: ['Neighborhood service pages', 'Local project case studies', 'Community involvement content']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'After every job, automatically request a review that mentions both the service and the neighborhood. "Fixed our furnace in Cedar Hills — same day!" is SEO gold.',
      features: ['Post-service automated requests', 'Location-tagged review prompts', 'Response management dashboard']
    }
  ],
  localExample: {
    title: 'The HVAC Company No One Called in Winter',
    description: 'A family-owned HVAC company with 20 years of experience was losing emergency calls to a newer competitor because their Google Map listing only showed strong visibility within 2 blocks of their office — not across the 12 neighborhoods they actually served.',
    quote: 'We were the best-kept secret in the county. After GeoGrid synced our service areas and generated neighborhood content, our emergency calls doubled in 6 weeks.'
  },
  stats: [
    { value: '92%', label: 'of home service searches happen on mobile' },
    { value: '5min', label: 'average decision time for emergency service searches' },
    { value: '4.2x', label: 'higher conversion from map pack vs. standard results' },
    { value: '$83K', label: 'average revenue lost annually from invisible service areas' }
  ],
  ctaText: 'Own Every Emergency Search in Your Service Territory'
};

export default function GeoGridHomeServicesPage() {
  return <GeoGridIndustryPage config={config} />;
}
