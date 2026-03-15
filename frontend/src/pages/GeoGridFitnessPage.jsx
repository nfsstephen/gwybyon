import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Fitness & Wellness',
  heroTitle: 'People Are Searching "Gym Near Me" Right Now — Are They Finding Your Studio?',
  heroSubtitle: 'Fitness is hyper-local. People don\'t drive 20 minutes to work out — they search within a 3-mile radius. If you\'re not visible in that zone, you\'re losing members to the studio around the corner.',
  painPoints: [
    {
      title: 'The Convenience Radius',
      description: 'Fitness members choose based on proximity more than any other factor. If your studio doesn\'t appear when someone 1.5 miles away searches "yoga near me," they\'ll join your competitor by default.'
    },
    {
      title: 'Class-Specific Searches',
      description: 'People search for specific modalities — "CrossFit near me," "hot yoga [neighborhood]," "personal trainer near me." If Google doesn\'t associate your location with these specific services, you\'re invisible.'
    },
    {
      title: 'The New Year Surge Miss',
      description: 'January is your biggest month. But by the time resolution-makers search "gym near me," your ranking position is already locked in. If you haven\'t built geographic authority beforehand, you miss the wave.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'Map your studio\'s visibility for "gym near me," class-specific keywords, and competitor positioning across your entire member catchment area.',
      features: ['Class-type keyword visibility', 'Competitor studio mapping', 'Member radius analysis']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Sync your schedule, class offerings, trainer info, and amenities across Google, Apple Maps, ClassPass, Mindbody, and fitness directories.',
      features: ['Fitness platform integration', 'Schedule & class sync', 'Amenity listing management']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'Generate hyper-local fitness content. "Morning HIIT classes three blocks from the downtown transit hub" tells the algorithm exactly who you serve and where.',
      features: ['Neighborhood fitness guides', 'Local event & challenge content', 'Seasonal fitness campaigns']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'Prompt members to review your studio mentioning their neighborhood and favorite classes. "Love the 6AM spin class — so convenient from Maple District!" is algorithmic gold.',
      features: ['Post-class review prompts', 'Class-specific review templates', 'Member milestone celebrations']
    }
  ],
  localExample: {
    title: 'The Boutique Studio Lost in the Big Gym\'s Shadow',
    description: 'A boutique Pilates studio with rave reviews and a passionate community was invisible to the new apartment complex 0.8 miles away. Every new resident was joining the chain gym across the street because that\'s all Google showed them.',
    quote: 'We had a waitlist for our existing members\' favorite classes, but zero new walk-ins from the neighborhood. GeoGrid put us on the map — literally — and we filled 3 new class slots in the first month.'
  },
  stats: [
    { value: '81%', label: 'of gym members choose based on location proximity' },
    { value: '2.3mi', label: 'average distance people travel to their gym' },
    { value: '$1,800', label: 'average annual revenue per gym member' },
    { value: '67%', label: 'of fitness searches include "near me" or a location' }
  ],
  ctaText: 'Fill Your Classes with Members from Every Surrounding Block'
};

export default function GeoGridFitnessPage() {
  return <GeoGridIndustryPage config={config} />;
}
