import React, { useState } from 'react';
import './PasswordGate.css';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PasswordGate = ({ children }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('siteAuthenticated') === 'true'
  );

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
        setError('Incorrect password. Please try again.');
      }
    } catch {
      setError('Unable to verify password. Please try again.');
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
