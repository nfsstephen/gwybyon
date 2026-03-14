import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Restaurants & Cafes',
  heroTitle: 'Your Next Regular Is Searching "Restaurants Near Me" Right Now',
  heroSubtitle: 'If they find your competitor instead, that\'s a customer lost forever. GeoGrid ensures your restaurant dominates every local search within a 5-mile radius.',
  painPoints: [
    {
      title: 'The 3-Block Problem',
      description: 'You rank #1 right at your location but completely disappear two blocks away. The lunch crowd just three streets over has no idea you exist.'
    },
    {
      title: 'Inconsistent Listings',
      description: 'Your hours are wrong on Apple Maps, your address differs on Yelp, and your phone number is outdated on Bing. Every mismatch tanks your ranking.'
    },
    {
      title: 'Review Drought',
      description: 'Your food is amazing but your review count is half your competitor\'s. Without location-tagged reviews, the algorithm favors the place down the street.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'See exactly where hungry customers can find you — and where they can\'t. Block-by-block visibility mapping for your restaurant.',
      features: ['5-mile radius heat map', 'Competitor positioning analysis', 'Mealtime search pattern tracking']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Keep your hours, menu link, address, and phone number perfectly synced across Google, Apple Maps, Yelp, TripAdvisor, and 60+ platforms.',
      features: ['One-click updates across all platforms', 'Holiday hours automation', 'Menu link consistency']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'AI generates hyper-local posts that tell Google exactly where you serve. "Fresh-baked pastries just steps from Lincoln Park" signals your geographic relevance.',
      features: ['Landmark-based content generation', 'Neighborhood event tie-ins', 'Seasonal local specials promotion']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'Automatically prompt happy diners to leave geo-tagged reviews mentioning your food AND your location. This is rocket fuel for local rankings.',
      features: ['Post-visit SMS/email prompts', 'Location-specific review templates', 'Multi-platform review management']
    }
  ],
  localExample: {
    title: 'The Coffee Shop Two Blocks Away That No One Finds',
    description: 'A specialty coffee shop with 4.8 stars was invisible to anyone searching from the nearby university campus — just 4 blocks away. Their competitor, a chain with worse reviews, dominated because of better geographic signals.',
    quote: 'We had the best reviews in the neighborhood but only people who already knew us could find us online. GeoGrid changed that in 30 days.'
  },
  stats: [
    { value: '72%', label: 'of diners choose restaurants from map search results' },
    { value: '3x', label: 'more foot traffic from "near me" vs. direct search' },
    { value: '88%', label: 'of local searches on mobile lead to a visit within 24hrs' },
    { value: '$47K', label: 'average annual revenue lost to the "invisible radius"' }
  ],
  ctaText: 'Stop Losing Hungry Customers to the Restaurant Down the Street'
};

export default function GeoGridRestaurantsPage() {
  return <GeoGridIndustryPage config={config} />;
}
