import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import HomePage from '../pages/HomePage';
import TruckingOverviewPage from '../pages/TruckingOverviewPage';
import ParkingLotControlPage from '../pages/ParkingLotControlPage';
import FuelLaneControlPage from '../pages/FuelLaneControlPage';
import PhoneAppPage from '../pages/PhoneAppPage';
import ByonTruckingCompaniesPage from '../pages/ByonTruckingCompaniesPage';
import ByonLastMilePage from '../pages/ByonLastMilePage';
import ByonRealEstatePage from '../pages/ByonRealEstatePage';
import ByonFinancePage from '../pages/ByonFinancePage';
import ByonHealthcarePage from '../pages/ByonHealthcarePage';
import ByonFieldServicesPage from '../pages/ByonFieldServicesPage';
import ByonGovernmentPage from '../pages/ByonGovernmentPage';
import ByonConstructionPage from '../pages/ByonConstructionPage';
import BlockchainPage from '../pages/BlockchainPage';
import BlockchainOverviewPage from '../pages/BlockchainOverviewPage';
import LandSharesPage from '../pages/LandSharesPage';
import BuildingSharesPage from '../pages/BuildingSharesPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import CorporateCalculatorPage from '../pages/CorporateCalculatorPage';
import StoreCalculatorPage from '../pages/StoreCalculatorPage';
import GeoGridLandingPage from '../pages/GeoGridLandingPage';
import GeoGridRestaurantsPage from '../pages/GeoGridRestaurantsPage';
import GeoGridHomeServicesPage from '../pages/GeoGridHomeServicesPage';
import GeoGridMedicalPage from '../pages/GeoGridMedicalPage';
import GeoGridLawFirmsPage from '../pages/GeoGridLawFirmsPage';
import GeoGridFitnessPage from '../pages/GeoGridFitnessPage';
import GeoGridAutoRepairPage from '../pages/GeoGridAutoRepairPage';

export default function SiteRoutes({ scrolled }) {
  return (
    <div className="App">
      <Navigation scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trucking-overview" element={<TruckingOverviewPage />} />
        <Route path="/parking-lot-control" element={<ParkingLotControlPage />} />
        <Route path="/fuel-lane-control" element={<FuelLaneControlPage />} />
        <Route path="/phone-app" element={<PhoneAppPage />} />
        <Route path="/byon-trucking-companies" element={<ByonTruckingCompaniesPage />} />
        <Route path="/byon-last-mile" element={<ByonLastMilePage />} />
        <Route path="/byon-real-estate" element={<ByonRealEstatePage />} />
        <Route path="/byon-finance" element={<ByonFinancePage />} />
        <Route path="/byon-healthcare" element={<ByonHealthcarePage />} />
        <Route path="/byon-field-services" element={<ByonFieldServicesPage />} />
        <Route path="/byon-government" element={<ByonGovernmentPage />} />
        <Route path="/byon-construction" element={<ByonConstructionPage />} />
        <Route path="/blockchain" element={<BlockchainPage />} />
        <Route path="/blockchain-overview" element={<BlockchainOverviewPage />} />
        <Route path="/land-shares" element={<LandSharesPage />} />
        <Route path="/building-shares" element={<BuildingSharesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/calculator/corporate" element={<CorporateCalculatorPage />} />
        <Route path="/calculator/store" element={<StoreCalculatorPage />} />
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
