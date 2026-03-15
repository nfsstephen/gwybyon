import React from 'react';
import StrategyOverview from '../components/StrategyOverview';
import CrossSellStrategy from '../components/CrossSellStrategy';
import MarketTerritories from '../components/MarketTerritories';
import ByonShowcase from '../components/ByonShowcase';

const HomePage = () => {
  return (
    <>
      <StrategyOverview />
      <CrossSellStrategy />
      <MarketTerritories />
      <ByonShowcase />
    </>
  );
};

export default HomePage;
