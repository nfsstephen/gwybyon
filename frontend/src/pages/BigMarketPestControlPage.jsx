import React from 'react';
import { Bug } from 'lucide-react';
import BigMarketIndustryPage from '../components/bigmarket/BigMarketIndustryPage';

const data = {
  name: 'Pest Control Services',
  shortName: 'Pest Control',
  icon: Bug,
  color: '#16a34a',
  heroText: 'Pest control is a recurring service business built on local trust. Customers search when they have an active problem and stay when the service is reliable. Your technicians cover assigned routes daily, making communication management essential at scale.',
  searchProblem: 'When someone finds termites, bed bugs, or a rodent problem, they search immediately — "pest control near me," "termite treatment [city]," "bed bug exterminator." These are urgent, emotional searches where the top-ranked company gets the call. Pest control is also highly seasonal — ant and mosquito searches spike in summer, rodent searches in fall. Missing these windows means missing revenue.',
  teamProblem: 'Pest control technicians run daily routes covering 8-12 stops. They coordinate schedules with dispatch, confirm appointments with customers, report findings, and handle callbacks — all from personal devices. As your fleet grows, the lack of communication oversight becomes a real operational risk.',
  geogridIntro: 'GeoGrid positions your pest control company as the go-to provider when customers discover they have a pest problem.',
  geogridBenefits: [
    { title: 'Urgent Search Capture', desc: 'Dominate "pest control near me," "termite inspection," "bed bug treatment," and other high-intent searches that indicate an active infestation and immediate need for service.' },
    { title: 'Recurring Service Visibility', desc: 'Rank for "monthly pest control," "quarterly pest service," and "pest prevention plan" — searches from customers looking for ongoing relationships, not one-time treatments.' },
    { title: 'Seasonal Pest Targeting', desc: 'Optimize visibility for seasonal queries — mosquito control in summer, rodent prevention in fall, termite inspections in spring — capturing revenue during each pest\'s peak season.' },
    { title: 'Neighborhood Reputation Building', desc: 'Strengthen your presence in specific neighborhoods and communities. When one homeowner on a street uses your service, their neighbors search for you by name.' },
  ],
  byonIntro: 'BYON streamlines communication for your pest control technicians as they run their daily routes.',
  byonBenefits: [
    { title: 'Route-Based Communication', desc: 'Technicians running 8-12 stops per day need efficient dispatch coordination. Business lines keep work calls separate and trackable across the entire route.' },
    { title: 'Appointment Confirmation', desc: 'Technicians confirm appointments and send ETAs from their business line. Customers see a consistent company number — professional and trustworthy.' },
    { title: 'Callback Management', desc: 'When customers call back about a pest issue, the call goes to the business line — not a personal number. You can route it to the right technician or to dispatch.' },
    { title: 'Fleet Scaling', desc: 'As you add routes and technicians, BYON scales with you. New tech gets a business line on day one. Tech leaves — the line and customer relationships stay with you.' },
  ],
  territoryText: 'Pest control is a territory-driven business by nature — your technicians already run geographic routes. Our market territory guarantee aligns with how you operate. We won\'t help a competing pest control company in your service area rank above you. Your routes, your territory, your customers.',
  salesPitch: '"Your pest control business runs on routes and reputation. GeoGrid makes sure that when homeowners in your territory search for pest control, you\'re the first name they see — and we won\'t provide that same service to your competitor working the same neighborhoods. Your technicians are running 10 stops a day on personal phones. BYON gives each of them a managed business line for dispatch, customer confirmations, and callbacks. One vendor. Two solutions. Your territory is protected."',
};

export default function BigMarketPestControlPage() {
  return <BigMarketIndustryPage industry={data} />;
}
