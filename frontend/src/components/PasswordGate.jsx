import React, { useState, useEffect } from 'react';
import './PasswordGate.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PasswordGate = ({ children }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('siteAuthenticated') === 'true'
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-site`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.valid) {
        sessionStorage.setItem('siteAuthenticated', 'true');
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.error || 'Incorrect password. Please try again.');
      }
    } catch (err) {
      console.error('Password verification failed:', err);
      setError('Unable to connect to the server. Please check your connection and try again.');
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="password-gate">
      <div className="password-gate-box">
        <div className="password-gate-logo">Gateway AI Systems</div>
        <h2>Enter Password to Continue</h2>

        {isMobile && !nudgeDismissed && (
          <div className="password-gate-mobile-nudge" data-testid="mobile-nudge">
            <div className="mobile-nudge-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <p>For the best experience, we recommend viewing this site on a <strong>desktop</strong> or <strong>tablet</strong>.</p>
            <button
              className="mobile-nudge-dismiss"
              onClick={() => setNudgeDismissed(true)}
              data-testid="mobile-nudge-dismiss"
            >
              Got it
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            data-testid="password-input"
          />
          {error && <div className="password-gate-error">{error}</div>}
          <button type="submit" data-testid="password-submit">Enter Site</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
