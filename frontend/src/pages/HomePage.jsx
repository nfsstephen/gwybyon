import React from 'react';
import StrategyOverview from '../components/StrategyOverview';
import MarketingMission from '../components/MarketingMission';
import CrossSellStrategy from '../components/CrossSellStrategy';
import MarketTerritories from '../components/MarketTerritories';
import ByonShowcase from '../components/ByonShowcase';

const HomePage = () => {
  return (
    <>
      <MarketingMission />
      <StrategyOverview />
      <CrossSellStrategy />
      <MarketTerritories />
      <ByonShowcase />
    </>
  );
};

export default HomePage;
