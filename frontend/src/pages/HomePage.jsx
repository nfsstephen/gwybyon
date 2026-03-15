import React from 'react';
import StrategyOverview from '../components/StrategyOverview';
import TruckingStrategy from '../components/TruckingStrategy';
import CrossSellStrategy from '../components/CrossSellStrategy';
import MarketTerritories from '../components/MarketTerritories';
import ByonShowcase from '../components/ByonShowcase';

const HomePage = () => {
  return (
    <>
      <StrategyOverview />
      <TruckingStrategy />
      <CrossSellStrategy />
      <MarketTerritories />
      <ByonShowcase />
    </>
  );
};

export default HomePage;
