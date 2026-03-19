import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import PasswordGate from './components/PasswordGate';
import AdminChatPage from './pages/AdminChatPage';
import { DashboardAuthProvider } from './contexts/DashboardAuthContext';
import DashboardRoutes from './routes/DashboardRoutes';
import SiteRoutes from './routes/SiteRoutes';

function AppContent({ scrolled }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/chat" element={<AdminChatPage />} />
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
