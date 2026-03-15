import React from 'react';
import TruckingStrategy from '../components/TruckingStrategy';
import CrossSellStrategy from '../components/CrossSellStrategy';
import ByonShowcase from '../components/ByonShowcase';

const HomePage = () => {
  return (
    <>
      <TruckingStrategy />
      <CrossSellStrategy />
      <ByonShowcase />
    </>
  );
};

export default HomePage;
