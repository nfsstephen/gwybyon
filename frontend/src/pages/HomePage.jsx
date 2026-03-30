import React from 'react';
import HeroValue from '../components/HeroValue';
import HeroValueLight from '../components/HeroValueLight';
import StrategyOverview from '../components/StrategyOverview';
import MarketingMission from '../components/MarketingMission';
import CrossSellStrategy from '../components/CrossSellStrategy';
import MarketTerritories from '../components/MarketTerritories';
const HomePage = () => {
  return (
    <>
      <HeroValue />
      <HeroValueLight />
      <MarketingMission />
      <MarketTerritories />
      <CrossSellStrategy />
    </>
  );
};

export default HomePage;
