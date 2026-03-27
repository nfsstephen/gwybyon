import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import HomePage from '../pages/HomePage';
import SevenIndustriesPage from '../pages/SevenIndustriesPage';
import FiveToolsPage from '../pages/FiveToolsPage';
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
        <Route path="/seven-industries" element={<SevenIndustriesPage />} />
        <Route path="/five-tools" element={<FiveToolsPage />} />
        <Route path="/web-service-v2" element={<WebServiceV2Page />} />
        <Route path="/services-pricing" element={<ServicesAndPricingPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/admin-preview" element={<AdminPreviewPage />} />
        {/* Redirect old industry routes to consolidated page */}
        <Route path="/big-market/*" element={<Navigate to="/seven-industries" replace />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </div>
  );
}
