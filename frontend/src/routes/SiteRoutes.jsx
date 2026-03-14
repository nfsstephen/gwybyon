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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}
