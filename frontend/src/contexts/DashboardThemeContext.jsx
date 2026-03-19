import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  dark: {
    bg: '#0a0e1a',
    sidebarBg: 'rgba(255,255,255,0.03)',
    sidebarBorder: 'rgba(255,255,255,0.06)',
    headerBg: 'rgba(255,255,255,0.02)',
    headerBorder: 'rgba(255,255,255,0.06)',
    cardBg: 'rgba(255,255,255,0.04)',
    cardBorder: 'rgba(255,255,255,0.06)',
    cardHoverBorder: 'rgba(255,255,255,0.12)',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.1)',
    inputText: '#e2e8f0',
    tableBg: 'rgba(255,255,255,0.02)',
    tableHeaderBg: 'rgba(255,255,255,0.04)',
    tableRowHover: 'rgba(255,255,255,0.03)',
    tableBorder: 'rgba(255,255,255,0.06)',
    badgeBg: 'rgba(255,255,255,0.06)',
    badgeText: '#94a3b8',
    overlay: 'rgba(0,0,0,0.5)',
    green: '#10b981',
    greenBg: 'rgba(16,185,129,0.12)',
    yellow: '#f59e0b',
    yellowBg: 'rgba(245,158,11,0.12)',
    red: '#ef4444',
    redBg: 'rgba(239,68,68,0.08)',
    blue: '#3b82f6',
    blueBg: 'rgba(59,130,246,0.12)',
  },
  light: {
    bg: '#f1f5f9',
    sidebarBg: '#ffffff',
    sidebarBorder: '#e2e8f0',
    headerBg: '#ffffff',
    headerBorder: '#e2e8f0',
    cardBg: '#ffffff',
    cardBorder: '#e2e8f0',
    cardHoverBorder: '#cbd5e1',
    text: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    inputBg: '#f8fafc',
    inputBorder: '#e2e8f0',
    inputText: '#0f172a',
    tableBg: '#ffffff',
    tableHeaderBg: '#f8fafc',
    tableRowHover: '#f1f5f9',
    tableBorder: '#e2e8f0',
    badgeBg: '#f1f5f9',
    badgeText: '#475569',
    overlay: 'rgba(0,0,0,0.3)',
    green: '#059669',
    greenBg: 'rgba(5,150,105,0.1)',
    yellow: '#d97706',
    yellowBg: 'rgba(217,119,6,0.1)',
    red: '#dc2626',
    redBg: 'rgba(220,38,38,0.08)',
    blue: '#2563eb',
    blueBg: 'rgba(37,99,235,0.1)',
  },
};

export function DashboardThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('dashboard-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('dashboard-theme', mode);
  }, [mode]);

  const toggle = () => setMode(m => m === 'dark' ? 'light' : 'dark');
  const theme = themes[mode];

  return (
    <ThemeContext.Provider value={{ mode, theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useDashboardTheme must be used within DashboardThemeProvider');
  return ctx;
}
