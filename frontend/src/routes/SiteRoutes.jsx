import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import HomePage from '../pages/HomePage';
import ByonTruckingCompaniesPage from '../pages/ByonTruckingCompaniesPage';
import ByonLastMilePage from '../pages/ByonLastMilePage';
import ByonRealEstatePage from '../pages/ByonRealEstatePage';
import ByonFinancePage from '../pages/ByonFinancePage';
import ByonHealthcarePage from '../pages/ByonHealthcarePage';
import ByonFieldServicesPage from '../pages/ByonFieldServicesPage';
import ByonGovernmentPage from '../pages/ByonGovernmentPage';
import ByonConstructionPage from '../pages/ByonConstructionPage';
import GeoGridLandingPage from '../pages/GeoGridLandingPage';
import GeoGridRestaurantsPage from '../pages/GeoGridRestaurantsPage';
import GeoGridHomeServicesPage from '../pages/GeoGridHomeServicesPage';
import GeoGridMedicalPage from '../pages/GeoGridMedicalPage';
import GeoGridLawFirmsPage from '../pages/GeoGridLawFirmsPage';
import GeoGridFitnessPage from '../pages/GeoGridFitnessPage';
import GeoGridAutoRepairPage from '../pages/GeoGridAutoRepairPage';
import TruckingDivisionPage from '../pages/TruckingDivisionPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';

export default function SiteRoutes({ scrolled }) {
  return (
    <div className="App">
      <Navigation scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/byon-trucking-companies" element={<ByonTruckingCompaniesPage />} />
        <Route path="/byon-last-mile" element={<ByonLastMilePage />} />
        <Route path="/byon-real-estate" element={<ByonRealEstatePage />} />
        <Route path="/byon-finance" element={<ByonFinancePage />} />
        <Route path="/byon-healthcare" element={<ByonHealthcarePage />} />
        <Route path="/byon-field-services" element={<ByonFieldServicesPage />} />
        <Route path="/byon-government" element={<ByonGovernmentPage />} />
        <Route path="/byon-construction" element={<ByonConstructionPage />} />
        <Route path="/geogrid" element={<GeoGridLandingPage />} />
        <Route path="/geogrid/restaurants" element={<GeoGridRestaurantsPage />} />
        <Route path="/geogrid/home-services" element={<GeoGridHomeServicesPage />} />
        <Route path="/geogrid/medical" element={<GeoGridMedicalPage />} />
        <Route path="/geogrid/law-firms" element={<GeoGridLawFirmsPage />} />
        <Route path="/geogrid/fitness" element={<GeoGridFitnessPage />} />
        <Route path="/geogrid/auto-repair" element={<GeoGridAutoRepairPage />} />
        <Route path="/trucking-division" element={<TruckingDivisionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}
