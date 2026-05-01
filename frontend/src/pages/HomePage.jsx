import React from 'react';
import HeroResultsCheck from '../components/HeroResultsCheck';
import OurBusinessModel from '../components/OurBusinessModel';
import AlignedObjectivesBanner from '../components/AlignedObjectivesBanner';
import MarketTerritories from '../components/MarketTerritories';
import MarketingMission from '../components/MarketingMission';
import DomainFreedom from '../components/DomainFreedom';
import SingleSourceTruth from '../components/SingleSourceTruth';

const HomePage = () => {
  return (
    <>
      <HeroResultsCheck />
      <OurBusinessModel />
      <AlignedObjectivesBanner />
      <MarketTerritories />
      <MarketingMission />
      <DomainFreedom />
      <SingleSourceTruth />
    </>
  );
};

export default HomePage;
