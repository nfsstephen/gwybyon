import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Law Firms',
  heroTitle: 'When Someone Needs a Lawyer, They Search Locally First',
  heroSubtitle: 'Legal clients search "personal injury lawyer near me" or "family law attorney [city]." If your firm isn\'t dominating these geographic searches, you\'re losing high-value cases to less qualified competitors.',
  painPoints: [
    {
      title: 'High-Value Invisibility',
      description: 'A single personal injury case can be worth $50K-$500K+ in fees. If someone 3 miles away searches for your specialty and finds your competitor instead, that\'s not just a missed lead — it\'s a missed fortune.'
    },
    {
      title: 'Practice Area Dilution',
      description: 'Your firm handles 6 practice areas, but Google only associates you with 1-2. The rest of your specialties are invisible in local search, especially outside your immediate block.'
    },
    {
      title: 'The Courthouse Effect',
      description: 'Firms near the courthouse dominate local legal searches by default. If your office is even a mile away, the algorithm penalizes you — unless you actively build geographic signals.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'Map your firm\'s visibility for every practice area keyword across your jurisdiction. See exactly where potential clients can find you — and where they can\'t.',
      features: ['Practice area keyword mapping', 'Jurisdiction-wide visibility analysis', 'Competitor firm positioning']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Sync your firm\'s details, attorney profiles, practice areas, and bar information across legal directories, Google, and map platforms.',
      features: ['Legal directory integration', 'Attorney profile syncing', 'Bar association listing management']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'Generate jurisdiction-appropriate content that establishes your firm as the local authority. "Serving families in the Greater Oak Park area with estate planning expertise."',
      features: ['Jurisdiction-specific content', 'Local case result mentions', 'Community legal education articles']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'Ethically compliant review requests that encourage former clients to mention your practice area and location — building the exact signals that dominate local legal search.',
      features: ['Bar-compliant review requests', 'Practice area review guidance', 'Professional reputation monitoring']
    }
  ],
  localExample: {
    title: 'The Family Law Firm Invisible to Divorcing Couples',
    description: 'A respected family law firm with 30 years of experience was losing consultations to a 2-year-old firm that had better Google Map visibility. The newer firm wasn\'t better — they just had stronger geographic search signals across more neighborhoods.',
    quote: 'We built our reputation on referrals for 30 years. But referrals weren\'t enough anymore — everyone Googles first. GeoGrid made us visible again.'
  },
  stats: [
    { value: '96%', label: 'of people seeking legal advice use a search engine' },
    { value: '74%', label: 'contact a firm found in map/local search results' },
    { value: '$7,200', label: 'average value of a single new legal client' },
    { value: '10mi', label: 'typical radius clients search for legal representation' }
  ],
  ctaText: 'Own the Local Search Results for Your Practice Areas'
};

export default function GeoGridLawFirmsPage() {
  return <GeoGridIndustryPage config={config} />;
}
