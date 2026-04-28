import React from 'react';
import HeroValueLight from '../components/HeroValueLight';
import HeroResultsCheck from '../components/HeroResultsCheck';
import MarketingMission from '../components/MarketingMission';
import MarketTerritories from '../components/MarketTerritories';
import SingleSourceTruth from '../components/SingleSourceTruth';
import DomainFreedom from '../components/DomainFreedom';
const HomePage = () => {
  return (
    <>
      <HeroValueLight />
      <HeroResultsCheck />
      <MarketingMission />
      <MarketTerritories />
      <SingleSourceTruth />
      <DomainFreedom />
    </>
  );
};

export default HomePage;
