import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import HomePage from '../pages/HomePage';
import ByonOverviewPage from '../pages/ByonOverviewPage';
import ByonLastMilePage from '../pages/ByonLastMilePage';
import ByonFinancePage from '../pages/ByonFinancePage';
import ByonHealthcarePage from '../pages/ByonHealthcarePage';
import ByonGovernmentPage from '../pages/ByonGovernmentPage';
import GeoGridLandingPage from '../pages/GeoGridLandingPage';
import GeoGridRestaurantsPage from '../pages/GeoGridRestaurantsPage';
import GeoGridHomeServicesPage from '../pages/GeoGridHomeServicesPage';
import GeoGridMedicalPage from '../pages/GeoGridMedicalPage';
import GeoGridLawFirmsPage from '../pages/GeoGridLawFirmsPage';
import GeoGridFitnessPage from '../pages/GeoGridFitnessPage';
import GeoGridAutoRepairPage from '../pages/GeoGridAutoRepairPage';
import TruckingDivisionPage from '../pages/TruckingDivisionPage';
import BigMarketWellSepticPage from '../pages/BigMarketWellSepticPage';
import BigMarketPlumbersPage from '../pages/BigMarketPlumbersPage';
import BigMarketElectriciansPage from '../pages/BigMarketElectriciansPage';
import BigMarketHVACPage from '../pages/BigMarketHVACPage';
import BigMarketPestControlPage from '../pages/BigMarketPestControlPage';
import BigMarketRealEstatePage from '../pages/BigMarketRealEstatePage';
import WebServiceV2Page from '../pages/WebServiceV2Page';
import ServicesAndPricingPage from '../pages/ServicesAndPricingPage';

export default function SiteRoutes({ scrolled }) {
  return (
    <div className="App">
      <Navigation scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trucking-division" element={<TruckingDivisionPage />} />
        <Route path="/big-market/well-septic" element={<BigMarketWellSepticPage />} />
        <Route path="/big-market/plumbers" element={<BigMarketPlumbersPage />} />
        <Route path="/big-market/electricians" element={<BigMarketElectriciansPage />} />
        <Route path="/big-market/hvac" element={<BigMarketHVACPage />} />
        <Route path="/big-market/pest-control" element={<BigMarketPestControlPage />} />
        <Route path="/big-market/real-estate" element={<BigMarketRealEstatePage />} />
        <Route path="/web-service-v2" element={<WebServiceV2Page />} />
        <Route path="/services-pricing" element={<ServicesAndPricingPage />} />
        <Route path="/byon" element={<ByonOverviewPage />} />
        <Route path="/byon-last-mile" element={<ByonLastMilePage />} />
        <Route path="/byon-finance" element={<ByonFinancePage />} />
        <Route path="/byon-healthcare" element={<ByonHealthcarePage />} />
        <Route path="/byon-government" element={<ByonGovernmentPage />} />
        <Route path="/geogrid" element={<GeoGridLandingPage />} />
        <Route path="/geogrid/restaurants" element={<GeoGridRestaurantsPage />} />
        <Route path="/geogrid/home-services" element={<GeoGridHomeServicesPage />} />
        <Route path="/geogrid/medical" element={<GeoGridMedicalPage />} />
        <Route path="/geogrid/law-firms" element={<GeoGridLawFirmsPage />} />
        <Route path="/geogrid/fitness" element={<GeoGridFitnessPage />} />
        <Route path="/geogrid/auto-repair" element={<GeoGridAutoRepairPage />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}
