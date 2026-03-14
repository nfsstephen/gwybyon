import React from 'react';
import ByonShowcase from '../components/ByonShowcase';
import PatentBanner from '../components/PatentBanner';
import Hero from '../components/Hero';
import IndustriesBanner from '../components/IndustriesBanner';
import FocusAreas from '../components/FocusAreas';

const HomePage = () => {
  return (
    <>
      <ByonShowcase />
      <PatentBanner />
      <Hero />
      <IndustriesBanner />
      <FocusAreas />
    </>
  );
};

export default HomePage;
