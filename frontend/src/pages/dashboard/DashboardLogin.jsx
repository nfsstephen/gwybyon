import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardAuth } from '../../contexts/DashboardAuthContext';
import { useDashboardTheme } from '../../contexts/DashboardThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function DashboardLogin() {
  const { login } = useDashboardAuth();
  const { mode, theme, toggle } = useDashboardTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      const roleRoutes = { admin: '/dashboard/admin', client: '/dashboard/client', technical: '/dashboard/technical' };
      navigate(roleRoutes[user.role] || '/dashboard/client');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="dashboard-login-page" style={{
      minHeight: '100vh',
      background: mode === 'dark'
        ? 'linear-gradient(135deg, #0a0e1a 0%, #111827 50%, #0a0e1a 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
      transition: 'background 0.3s ease',
    }}>
      {/* Theme toggle */}
      <button
        data-testid="login-theme-toggle"
        onClick={toggle}
        style={{
          position: 'fixed', top: 16, right: 16,
          background: theme.cardBg, border: `1px solid ${theme.cardBorder}`,
          borderRadius: 8, padding: '8px 12px',
          color: theme.textSecondary, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500,
        }}
      >
        {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        {mode === 'dark' ? 'Light' : 'Dark'}
      </button>

      <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700, color: '#fff',
            }}>G</div>
            <span style={{ fontSize: 24, fontWeight: 700, color: theme.text, letterSpacing: '-0.5px' }}>GeoGrid</span>
          </div>
          <p style={{ color: theme.textSecondary, fontSize: 14, margin: 0 }}>Sign in to your dashboard</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: 16,
          padding: 32,
          backdropFilter: 'blur(20px)',
        }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div data-testid="login-error" style={{
                background: theme.redBg,
                border: `1px solid ${theme.red}50`,
                borderRadius: 8,
                padding: '10px 14px',
                color: theme.red,
                fontSize: 13,
                marginBottom: 20,
              }}>{error}</div>
            )}

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: theme.textSecondary, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Email</label>
              <input
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@company.com"
                style={{
                  width: '100%', padding: '12px 14px',
                  background: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8, color: theme.inputText, fontSize: 14,
                  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                onBlur={e => e.target.style.borderColor = theme.inputBorder}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', color: theme.textSecondary, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Password</label>
              <input
                data-testid="login-password-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  width: '100%', padding: '12px 14px',
                  background: theme.inputBg,
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: 8, color: theme.inputText, fontSize: 14,
                  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                onBlur={e => e.target.style.borderColor = theme.inputBorder}
              />
            </div>

            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '12px',
                background: loading ? '#4b5563' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none', borderRadius: 8, color: '#fff',
                fontSize: 14, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s',
              }}
            >{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: 24,
          background: theme.blueBg,
          border: `1px solid ${theme.blue}30`,
          borderRadius: 12,
          padding: '16px 20px',
        }}>
          <p style={{ color: theme.blue, fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Demo Credentials</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { label: 'Admin', email: 'admin@geogrid.com', pw: 'admin123' },
              { label: 'Client', email: 'client@geogrid.com', pw: 'client123' },
              { label: 'Tech', email: 'tech@geogrid.com', pw: 'tech123' },
            ].map(cred => (
              <button
                key={cred.label}
                data-testid={`demo-login-${cred.label.toLowerCase()}`}
                onClick={() => { setEmail(cred.email); setPassword(cred.pw); }}
                style={{
                  background: 'none', border: 'none',
                  color: theme.textSecondary, fontSize: 12, cursor: 'pointer',
                  textAlign: 'left', padding: '4px 0',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span style={{ color: theme.blue, fontWeight: 600 }}>{cred.label}:</span> {cred.email} / {cred.pw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
