import React from 'react';
import HeroValueLight from '../components/HeroValueLight';
import HeroResultsCheck from '../components/HeroResultsCheck';
import HeroNoWebsite from '../components/HeroNoWebsite';
import AudiencePicker from '../components/AudiencePicker';
import MarketingMission from '../components/MarketingMission';
import MarketTerritories from '../components/MarketTerritories';
import SingleSourceTruth from '../components/SingleSourceTruth';
import DomainFreedom from '../components/DomainFreedom';
import { useAudience } from '../hooks/useAudience';

const HomePage = () => {
  const { audience, setAudience, resolved } = useAudience();
  if (!resolved) return null;

  const showAll     = audience === 'all';
  const showAgency  = showAll || audience === 'agency';
  const showDiy     = showAll || audience === 'diy';
  const showNoSite  = showAll || audience === 'no-site';

  return (
    <>
      <AudiencePicker
        audience={audience}
        setAudience={setAudience}
        variant={showAll ? 'top' : 'compact'}
      />
      {showAgency && <HeroValueLight />}
      {showDiy && <HeroResultsCheck />}
      {showNoSite && <HeroNoWebsite />}
      <MarketingMission />
      <MarketTerritories />
      <SingleSourceTruth />
      <DomainFreedom />
    </>
  );
};

export default HomePage;
