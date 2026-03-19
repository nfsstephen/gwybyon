import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useDashboardAuth } from '../../contexts/DashboardAuthContext';
import { useDashboardTheme } from '../../contexts/DashboardThemeContext';
import {
  LayoutDashboard, Users, Scan, Activity, BarChart3, FileText,
  Settings, LogOut, Menu, X, ChevronRight, MapPin, Sun, Moon
} from 'lucide-react';

const navConfig = {
  admin: [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/admin' },
    { label: 'Clients', icon: Users, path: '/dashboard/admin/clients' },
    { label: 'Quick Scan', icon: Scan, path: '/dashboard/admin/scan' },
  ],
  client: [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/client' },
    { label: 'Geo Map', icon: MapPin, path: '/dashboard/client/map' },
    { label: 'Activity', icon: Activity, path: '/dashboard/client/activity' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/client/analytics' },
  ],
  technical: [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard/technical' },
    { label: 'API Usage', icon: BarChart3, path: '/dashboard/technical/api-usage' },
    { label: 'Content Queue', icon: FileText, path: '/dashboard/technical/content' },
  ],
};

export default function DashboardLayout() {
  const { user, logout } = useDashboardAuth();
  const { mode, theme, toggle } = useDashboardTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const items = navConfig[user.role] || navConfig.client;
  const roleLabel = { admin: 'Admin', client: 'Business', technical: 'Technical' }[user.role] || 'Dashboard';
  const roleColor = { admin: '#8b5cf6', client: '#3b82f6', technical: '#10b981' }[user.role];

  const handleLogout = () => { logout(); navigate('/dashboard/login'); };
  const isActive = (path) => location.pathname === path;

  return (
    <div data-testid="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', background: theme.bg, fontFamily: "'Inter', -apple-system, sans-serif", transition: 'background 0.3s ease' }}>
      {/* Sidebar */}
      <aside style={{
        width: 260,
        background: theme.sidebarBg,
        borderRight: `1px solid ${theme.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: sidebarOpen ? 0 : -260,
        height: '100vh',
        zIndex: 50,
        transition: 'left 0.3s ease, background 0.3s ease',
      }}
        className="dashboard-sidebar"
      >
        {/* Brand */}
        <div style={{ padding: '20px 20px 16px', borderBottom: `1px solid ${theme.sidebarBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: `linear-gradient(135deg, ${roleColor}, ${roleColor}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700, color: '#fff',
            }}>G</div>
            <div>
              <div style={{ color: theme.text, fontSize: 15, fontWeight: 600 }}>GeoGrid</div>
              <div style={{ color: roleColor, fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{roleLabel} Panel</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {items.map(item => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: 2,
                  background: active ? `${roleColor}18` : 'transparent',
                  border: 'none',
                  borderRadius: 8,
                  color: active ? theme.text : theme.textSecondary,
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textAlign: 'left',
                }}
              >
                <item.icon size={18} style={{ color: active ? roleColor : theme.textMuted }} />
                {item.label}
                {active && <ChevronRight size={14} style={{ marginLeft: 'auto', color: roleColor }} />}
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div style={{ padding: '8px 14px' }}>
          <button
            data-testid="theme-toggle"
            onClick={toggle}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '8px 10px',
              background: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 6, color: theme.textSecondary, fontSize: 12,
              cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s',
            }}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* User Footer */}
        <div style={{ padding: '12px 14px', borderTop: `1px solid ${theme.sidebarBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: `${roleColor}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: roleColor, fontSize: 13, fontWeight: 600,
            }}>{user.full_name?.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: theme.text, fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.full_name}</div>
              <div style={{ color: theme.textMuted, fontSize: 11 }}>{user.email}</div>
            </div>
          </div>
          <button
            data-testid="logout-button"
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              width: '100%', padding: '8px 10px',
              background: theme.redBg,
              border: `1px solid ${mode === 'dark' ? 'rgba(239,68,68,0.15)' : 'rgba(220,38,38,0.15)'}`,
              borderRadius: 6, color: theme.red, fontSize: 12,
              cursor: 'pointer', fontWeight: 500,
            }}
          ><LogOut size={14} /> Sign Out</button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: theme.overlay, zIndex: 40 }}
        />
      )}

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: 0, minWidth: 0 }} className="dashboard-main">
        {/* Top Bar */}
        <header style={{
          height: 56,
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.headerBorder}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backdropFilter: 'blur(12px)',
          transition: 'background 0.3s ease',
        }}>
          <button
            data-testid="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: theme.textSecondary, cursor: 'pointer', padding: 4, marginRight: 12 }}
            className="sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 style={{ color: theme.text, fontSize: 16, fontWeight: 600, margin: 0 }}>
            {items.find(i => isActive(i.path))?.label || 'Dashboard'}
          </h1>
        </header>

        {/* Page Content */}
        <main style={{ padding: 24 }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .dashboard-sidebar { left: 0 !important; }
          .dashboard-main { margin-left: 260px !important; }
          .sidebar-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
}
