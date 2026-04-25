import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api/cm`;
const TOKEN_KEY = 'cm_token';

const CmAuthContext = createContext(null);

export const CmAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async (token) => {
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('not auth');
      const data = await res.json();
      setUser(data);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setLoading(false); return; }
    fetchMe(token);
  }, [fetchMe]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const detail = data?.detail;
      throw new Error(typeof detail === 'string' ? detail : 'Login failed');
    }
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const authedFetch = useCallback(async (path, opts = {}) => {
    const token = localStorage.getItem(TOKEN_KEY);
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: {
        ...(opts.headers || {}),
        Authorization: `Bearer ${token}`,
        ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    if (res.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      throw new Error('Session expired');
    }
    return res;
  }, []);

  return (
    <CmAuthContext.Provider value={{ user, loading, login, logout, authedFetch }}>
      {children}
    </CmAuthContext.Provider>
  );
};

export const useCmAuth = () => useContext(CmAuthContext);
