import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCmAuth } from '../../contexts/CmAuthContext';
import { CalendarClock, AlertCircle } from 'lucide-react';
import './CmLogin.css';

const CmLogin = () => {
  const { user, login, loading } = useCmAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (loading) return <div className="cmlogin-loading">Loading…</div>;
  if (user) return <Navigate to="/dashboard/crew" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard/crew');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cmlogin-page" data-testid="cm-login-page">
      <div className="cmlogin-card">
        <div className="cmlogin-icon">
          <CalendarClock size={28} />
        </div>
        <div className="cmlogin-eyebrow">CREW MANAGEMENT TOOL</div>
        <h1 className="cmlogin-title">Mission Control Login</h1>
        <p className="cmlogin-sub">
          Sign in to view today's schedule and dispatch your crews.
        </p>

        <form onSubmit={onSubmit} className="cmlogin-form">
          <label className="cmlogin-label">
            Email
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="cm-login-email"
              autoComplete="username"
            />
          </label>
          <label className="cmlogin-label">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="cm-login-password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div className="cmlogin-error" data-testid="cm-login-error">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="cmlogin-btn"
            disabled={submitting}
            data-testid="cm-login-submit"
          >
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="cmlogin-demo-hint">
          Demo: <strong>demo@gwyai.com</strong> / <strong>demo123</strong>
        </p>
      </div>
    </div>
  );
};

export default CmLogin;
