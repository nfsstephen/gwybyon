import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import HomePage from '../pages/HomePage';
import ByonOverviewPage from '../pages/ByonOverviewPage';
import TruckingDivisionPage from '../pages/TruckingDivisionPage';
import BigMarketWellSepticPage from '../pages/BigMarketWellSepticPage';
import BigMarketPlumbersPage from '../pages/BigMarketPlumbersPage';
import BigMarketElectriciansPage from '../pages/BigMarketElectriciansPage';
import BigMarketHVACPage from '../pages/BigMarketHVACPage';
import BigMarketPestControlPage from '../pages/BigMarketPestControlPage';
import BigMarketRealEstatePage from '../pages/BigMarketRealEstatePage';
import WebServiceV2Page from '../pages/WebServiceV2Page';
import ServicesAndPricingPage from '../pages/ServicesAndPricingPage';
import SubscribePage from '../pages/SubscribePage';
import AdminPreviewPage from '../pages/AdminPreviewPage';

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
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/byon" element={<ByonOverviewPage />} />
        <Route path="/admin-preview" element={<AdminPreviewPage />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}
