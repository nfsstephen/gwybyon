import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDashboardAuth } from '../contexts/DashboardAuthContext';
import DashboardLogin from '../pages/dashboard/DashboardLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import ClientDashboard from '../pages/dashboard/ClientDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import TechnicalDashboard from '../pages/dashboard/TechnicalDashboard';

function ProtectedDashboard({ allowedRoles }) {
  const { user, loading } = useDashboardAuth();
  if (loading) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: 60, background: '#0a0e1a', minHeight: '100vh' }}>Loading...</div>;
  if (!user) return <Navigate to="/dashboard/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleRoutes = { admin: '/dashboard/admin', client: '/dashboard/client', technical: '/dashboard/technical' };
    return <Navigate to={roleRoutes[user.role] || '/dashboard/client'} replace />;
  }
  return <DashboardLayout />;
}

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/login" element={<DashboardLogin />} />
      <Route element={<ProtectedDashboard allowedRoles={['client', 'admin']} />}>
        <Route path="/dashboard/client" element={<ClientDashboard />} />
        <Route path="/dashboard/client/map" element={<ClientDashboard />} />
        <Route path="/dashboard/client/activity" element={<ClientDashboard />} />
        <Route path="/dashboard/client/analytics" element={<ClientDashboard />} />
      </Route>
      <Route element={<ProtectedDashboard allowedRoles={['admin']} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/clients" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/scan" element={<AdminDashboard />} />
      </Route>
      <Route element={<ProtectedDashboard allowedRoles={['technical', 'admin']} />}>
        <Route path="/dashboard/technical" element={<TechnicalDashboard />} />
        <Route path="/dashboard/technical/api-usage" element={<TechnicalDashboard />} />
        <Route path="/dashboard/technical/content" element={<TechnicalDashboard />} />
      </Route>
      <Route path="/dashboard" element={<Navigate to="/dashboard/login" replace />} />
    </Routes>
  );
}
