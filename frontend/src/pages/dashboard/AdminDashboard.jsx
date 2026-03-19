import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDashboardAuth } from '../../contexts/DashboardAuthContext';
import { useDashboardTheme } from '../../contexts/DashboardThemeContext';
import { Users, TrendingUp, Crown, AlertCircle, Search, Scan, FileDown, Star } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

function ClientsTable({ token }) {
  const { theme } = useDashboardTheme();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/dashboard/admin/clients`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => { setClients(res.data.clients); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ color: theme.textSecondary, padding: 20 }}>Loading clients...</div>;

  return (
    <div data-testid="clients-table" style={{
      background: theme.cardBg,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.tableBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Client Management</h3>
        <span style={{ color: theme.textSecondary, fontSize: 12 }}>{clients.length} clients</span>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.tableBorder}`, background: theme.tableHeaderBg }}>
              {['Client', 'Business', 'Score', 'Tier', 'Status', 'Location'].map(h => (
                <th key={h} style={{ padding: '10px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map(c => {
              const bp = c.business_profiles?.[0];
              const score = bp?.local_authority_score || 0;
              const scoreColor = score >= 70 ? theme.green : score >= 40 ? theme.yellow : theme.red;
              return (
                <tr key={c.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ color: theme.text, fontSize: 13, fontWeight: 500 }}>{c.full_name}</div>
                    <div style={{ color: theme.textMuted, fontSize: 11 }}>{c.email}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: theme.textSecondary, fontSize: 13 }}>{bp?.business_name || 'No profile'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ color: scoreColor, fontSize: 14, fontWeight: 700 }}>{score}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: bp?.subscription_tier === 3 ? 'rgba(139,92,246,0.15)' : bp?.subscription_tier === 2 ? theme.blueBg : theme.badgeBg,
                      color: bp?.subscription_tier === 3 ? '#a78bfa' : bp?.subscription_tier === 2 ? theme.blue : theme.textSecondary,
                    }}>Tier {bp?.subscription_tier || 1}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                      background: bp?.subscription_status === 'active' ? theme.greenBg : theme.yellowBg,
                      color: bp?.subscription_status === 'active' ? theme.green : theme.yellow,
                    }}>{bp?.subscription_status || 'N/A'}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: theme.textSecondary, fontSize: 12 }}>
                    {bp ? `${bp.city}, ${bp.state}` : '-'}
                  </td>
                </tr>
              );
            })}
            {clients.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 30, textAlign: 'center', color: theme.textMuted, fontSize: 13 }}>No clients yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickScanTool({ token }) {
  const { mode, theme } = useDashboardTheme();
  const [form, setForm] = useState({ business_name: '', address: '', city: '', state: '' });
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    setScanning(true);
    setResult(null);
    try {
      const res = await axios.post(`${API}/api/dashboard/admin/quick-scan`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: 'Scan failed' });
    }
    setScanning(false);
  };

  return (
    <div data-testid="quick-scan-tool" style={{
      background: theme.cardBg,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: 12,
    }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.tableBorder}` }}>
        <h3 style={{ color: theme.text, fontSize: 15, fontWeight: 600, margin: 0 }}>Quick Geo-Health Scan</h3>
        <p style={{ color: theme.textSecondary, fontSize: 12, margin: '4px 0 0' }}>Generate a prospect report for any business</p>
      </div>
      <div style={{ padding: 20 }}>
        <form onSubmit={handleScan}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { key: 'business_name', label: 'Business Name', placeholder: "Joe's Pizza" },
              { key: 'address', label: 'Address', placeholder: '123 Main St' },
              { key: 'city', label: 'City', placeholder: 'Austin' },
              { key: 'state', label: 'State', placeholder: 'TX' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', color: theme.textSecondary, fontSize: 11, fontWeight: 500, marginBottom: 4 }}>{f.label}</label>
                <input
                  data-testid={`scan-input-${f.key}`}
                  value={form[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  required
                  placeholder={f.placeholder}
                  style={{
                    width: '100%', padding: '9px 12px',
                    background: theme.inputBg,
                    border: `1px solid ${theme.inputBorder}`,
                    borderRadius: 6, color: theme.inputText, fontSize: 13,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>
          <button
            data-testid="scan-submit-button"
            type="submit"
            disabled={scanning}
            style={{
              padding: '10px 24px',
              background: scanning ? '#4b5563' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              border: 'none', borderRadius: 8, color: '#fff',
              fontSize: 13, fontWeight: 600, cursor: scanning ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          ><Scan size={14} /> {scanning ? 'Scanning...' : 'Run Scan'}</button>
        </form>

        {result && !result.error && (
          <div data-testid="scan-result" style={{ marginTop: 20, padding: 20, background: mode === 'dark' ? 'rgba(139,92,246,0.06)' : 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h4 style={{ color: theme.text, fontSize: 16, fontWeight: 600, margin: 0 }}>{result.business_name}</h4>
                <p style={{ color: theme.textSecondary, fontSize: 12, margin: '2px 0 0' }}>{result.address}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: result.local_authority_score >= 70 ? theme.greenBg : result.local_authority_score >= 40 ? theme.yellowBg : theme.redBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: result.local_authority_score >= 70 ? theme.green : result.local_authority_score >= 40 ? theme.yellow : theme.red,
                  fontSize: 22, fontWeight: 700,
                }}>{result.local_authority_score}</div>
                <div style={{ color: theme.textSecondary, fontSize: 10, marginTop: 4 }}>vs Avg {result.competitor_avg_score}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginBottom: 16 }}>
              {result.grid_data?.flat().map((cell, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 4,
                  background: cell.color === 'green' ? '#00FF0030' : cell.color === 'yellow' ? '#FFFF0030' : '#FF000030',
                  border: `1px solid ${cell.color === 'green' ? '#00FF00' : cell.color === 'yellow' ? '#FFFF00' : '#FF0000'}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cell.color === 'green' ? '#00FF00' : cell.color === 'yellow' ? '#FFFF00' : '#FF0000',
                  fontSize: 12, fontWeight: 700,
                }}>{cell.rank}</div>
              ))}
            </div>

            <h5 style={{ color: theme.text, fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}>Issues Found:</h5>
            {result.recommendations?.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <AlertCircle size={14} style={{ color: theme.yellow, flexShrink: 0, marginTop: 1 }} />
                <span style={{ color: theme.textSecondary, fontSize: 12 }}>{r}</span>
              </div>
            ))}

            <button data-testid="export-pdf-button" style={{
              marginTop: 16, padding: '8px 18px',
              background: theme.badgeBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 6, color: theme.text, fontSize: 12,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            }}><FileDown size={14} /> Export as PDF (Coming Soon)</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useDashboardAuth();
  const { theme } = useDashboardTheme();

  return (
    <div data-testid="admin-dashboard" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: theme.text, fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Admin Dashboard</h2>
        <p style={{ color: theme.textSecondary, fontSize: 13, margin: 0 }}>Lead generation and client management</p>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        <QuickScanTool token={token} />
        <ClientsTable token={token} />
      </div>
    </div>
  );
}
