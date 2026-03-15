import React from 'react';
import MarketTerritories from '../components/MarketTerritories';
import TruckingStrategy from '../components/TruckingStrategy';
import CrossSellStrategy from '../components/CrossSellStrategy';
import ByonShowcase from '../components/ByonShowcase';

const HomePage = () => {
  return (
    <>
      <MarketTerritories />
      <TruckingStrategy />
      <CrossSellStrategy />
      <ByonShowcase />
    </>
  );
};

export default HomePage;
