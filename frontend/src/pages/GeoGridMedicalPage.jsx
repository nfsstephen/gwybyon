import React from 'react';
import { Search, RefreshCw, FileText, MessageSquare } from 'lucide-react';
import GeoGridIndustryPage from '../components/geogrid/GeoGridIndustryPage';

const config = {
  industry: 'Medical & Dental',
  heroTitle: 'Patients Are Searching "Dentist Near Me" — Are They Finding Your Practice?',
  heroSubtitle: 'Healthcare decisions start with a local search. If your practice isn\'t visible across your entire neighborhood, patients default to whoever Google shows them first.',
  painPoints: [
    {
      title: 'The Insurance Search Problem',
      description: 'Patients search "dentist near me that accepts Aetna" — a hyper-local, high-intent query. If your listing doesn\'t surface for these specific searches, you lose the patient before they even see your website.'
    },
    {
      title: 'Multi-Location Confusion',
      description: 'If you have multiple offices, Google often cannibalizes your own listings. One location steals visibility from the other, and both suffer in the algorithm.'
    },
    {
      title: 'The Trust Gap',
      description: 'Patients trust map results more than ads. A practice with 200 location-tagged reviews outranks a better practice with 50 generic reviews — every time.'
    }
  ],
  solutions: [
    {
      icon: <Search size={28} />,
      title: 'Geo-Health Scanner',
      description: 'See your practice\'s visibility for "doctor near me," "urgent care near me," and specialty-specific searches across your patient catchment area.',
      features: ['Specialty keyword mapping', 'Insurance-specific search visibility', 'Patient radius analysis']
    },
    {
      icon: <RefreshCw size={28} />,
      title: 'Entity-Sync Dashboard',
      description: 'Sync your practice details, specialties, accepted insurance, hours, and provider information across every healthcare directory and map platform.',
      features: ['Healthcare directory sync', 'Provider profile management', 'Insurance network listings']
    },
    {
      icon: <FileText size={28} />,
      title: 'Neighborhood Content Engine',
      description: 'Generate HIPAA-safe, locally-relevant content like "Family dentistry serving the Riverside community" that signals geographic authority without compliance risk.',
      features: ['Compliance-safe content generation', 'Community health topic articles', 'Neighborhood-specific landing pages']
    },
    {
      icon: <MessageSquare size={28} />,
      title: 'Review Magnet',
      description: 'HIPAA-compliant review requests that encourage patients to mention your location and specialty — without exposing any protected health information.',
      features: ['HIPAA-compliant review prompts', 'Specialty-tagged review guidance', 'Reputation monitoring dashboard']
    }
  ],
  localExample: {
    title: 'The Pediatric Dentist Hidden from Young Families',
    description: 'A highly-rated pediatric dental practice was invisible to families in the new housing development just 1.5 miles away. The families were all going to a lower-rated chain practice that had better geographic search signals.',
    quote: 'We spent $3K/month on ads targeting those families. GeoGrid got us ranking organically in their neighborhood for $300/month. The ROI was immediate.'
  },
  stats: [
    { value: '77%', label: 'of patients use search engines before booking a provider' },
    { value: '1.5mi', label: 'average distance patients travel for routine care' },
    { value: '3x', label: 'higher booking rate from Google Map results vs. website visits' },
    { value: '$125K', label: 'lifetime value of a single new patient family' }
  ],
  ctaText: 'Make Your Practice the First Choice in Every Neighborhood You Serve'
};

export default function GeoGridMedicalPage() {
  return <GeoGridIndustryPage config={config} />;
}
