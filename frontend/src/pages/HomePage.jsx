import React from 'react';
import Hero from '../components/Hero';
import ByonShowcase from '../components/ByonShowcase';
import GeoGridShowcase from '../components/GeoGridShowcase';
import PatentBanner from '../components/PatentBanner';
import FocusAreas from '../components/FocusAreas';
import IndustriesBanner from '../components/IndustriesBanner';

const HomePage = () => {
  return (
    <>
      <ByonShowcase />
      <GeoGridShowcase />
      <PatentBanner />
      <Hero />
      <IndustriesBanner />
      <FocusAreas />
    </>
  );
};

export default HomePage;