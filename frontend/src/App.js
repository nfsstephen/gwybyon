import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import PasswordGate from './components/PasswordGate';
import AdminChatPage from './pages/AdminChatPage';
import AdminPreviewPage from './pages/AdminPreviewPage';
import TrackPage from './pages/track/TrackPage';
import { DashboardAuthProvider } from './contexts/DashboardAuthContext';
import DashboardRoutes from './routes/DashboardRoutes';
import SiteRoutes from './routes/SiteRoutes';

function AppContent({ scrolled }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isTrack = location.pathname.startsWith('/track');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/chat" element={<AdminChatPage />} />
        <Route path="/admin/preview" element={<AdminPreviewPage />} />
      </Routes>
    );
  }

  if (isDashboard) {
    return (
      <DashboardAuthProvider>
        <DashboardRoutes />
      </DashboardAuthProvider>
    );
  }

  if (isTrack) {
    return (
      <Routes>
        <Route path="/track/:token" element={<TrackPage />} />
      </Routes>
    );
  }

  return (
    <PasswordGate>
      <SiteRoutes scrolled={scrolled} />
    </PasswordGate>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <AppContent scrolled={scrolled} />
    </Router>
  );
}

export default App;
