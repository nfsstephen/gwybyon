import React from 'react';
import HeroResultsCheck from '../components/HeroResultsCheck';
import MarketingMission from '../components/MarketingMission';
import MarketTerritories from '../components/MarketTerritories';
import SingleSourceTruth from '../components/SingleSourceTruth';
import DomainFreedom from '../components/DomainFreedom';

const HomePage = () => {
  return (
    <>
      <HeroResultsCheck />
      <MarketingMission />
      <MarketTerritories />
      <DomainFreedom />
      <SingleSourceTruth />
    </>
  );
};

export default HomePage;
