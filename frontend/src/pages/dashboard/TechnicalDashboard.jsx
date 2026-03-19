import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDashboardAuth } from '../../contexts/DashboardAuthContext';
import { BarChart3, DollarSign, Cpu, Zap, Check, X, Clock, FileText, Eye } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

function UsageCard({ service, data, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h4 style={{ color: '#fff', fontSize: 14, fontWeight: 600, margin: 0 }}>{service}</h4>
        <span style={{
          padding: '2px 8px', borderRadius: 4,
          background: `${color}18`, color, fontSize: 11, fontWeight: 600,
        }}>Active</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Credits</div>
          <div style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700 }}>{Math.round(data.credits).toLocaleString()}</div>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Tokens</div>
          <div style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700 }}>{data.tokens.toLocaleString()}</div>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Cost</div>
          <div style={{ color: '#10b981', fontSize: 18, fontWeight: 700 }}>${data.cost.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function CostChart({ daily }) {
  if (!daily.length) return null;

  // Aggregate daily costs
  const byDate = {};
  daily.forEach(d => {
    byDate[d.date] = (byDate[d.date] || 0) + d.cost;
  });
  const dates = Object.keys(byDate).sort();
  const costs = dates.map(d => byDate[d]);
  const maxCost = Math.max(...costs, 0.01);

  return (
    <div data-testid="cost-chart" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '16px 20px',
    }}>
      <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: '0 0 16px' }}>Daily Cost Trend (30d)</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 120, padding: '0 4px' }}>
        {costs.map((c, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              height: `${(c / maxCost) * 100}%`,
              minHeight: 2,
              background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
              borderRadius: '2px 2px 0 0',
              transition: 'height 0.3s',
            }} title={`${dates[i]}: $${c.toFixed(2)}`} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ color: '#64748b', fontSize: 10 }}>{dates[0]}</span>
        <span style={{ color: '#64748b', fontSize: 10 }}>{dates[dates.length - 1]}</span>
      </div>
    </div>
  );
}

function ContentQueue({ token }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    axios.get(`${API}/api/dashboard/technical/content-queue`, {
      params: { status_filter: filter || undefined },
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => { setItems(res.data.items); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, [token, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReview = async (id, action) => {
    await axios.put(`${API}/api/dashboard/technical/content-queue/${id}`, { action }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  const statusColors = { pending: '#f59e0b', approved: '#10b981', rejected: '#ef4444' };
  const StatusIcon = { pending: Clock, approved: Check, rejected: X };

  return (
    <div data-testid="content-queue" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: 0 }}>Content Moderation Queue</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          {['pending', 'approved', 'rejected', ''].map(s => (
            <button
              key={s}
              data-testid={`filter-${s || 'all'}`}
              onClick={() => setFilter(s)}
              style={{
                padding: '4px 12px', borderRadius: 20,
                background: filter === s ? 'rgba(59,130,246,0.15)' : 'transparent',
                border: `1px solid ${filter === s ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
                color: filter === s ? '#60a5fa' : '#94a3b8',
                fontSize: 11, fontWeight: 500, cursor: 'pointer',
              }}
            >{s || 'All'}</button>
          ))}
        </div>
      </div>

      <div style={{ maxHeight: 500, overflowY: 'auto' }}>
        {loading ? (
          <div style={{ padding: 30, textAlign: 'center', color: '#64748b' }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: 30, textAlign: 'center', color: '#64748b' }}>No items found</div>
        ) : items.map(item => {
          const SIcon = StatusIcon[item.status] || Clock;
          const sColor = statusColors[item.status] || '#94a3b8';
          return (
            <div key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '14px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SIcon size={14} style={{ color: sColor }} />
                  <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 500 }}>{item.title}</span>
                </div>
                <span style={{
                  padding: '2px 8px', borderRadius: 4,
                  background: `${sColor}15`, color: sColor, fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                }}>{item.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: '#64748b', fontSize: 11, background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>{item.content_type}</span>
                <span style={{ color: '#475569', fontSize: 11 }}>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>

              {expanded === item.id ? (
                <div style={{ marginTop: 8 }}>
                  <p style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.6, margin: '0 0 10px', background: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 6 }}>
                    {item.content_text}
                  </p>
                  {item.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        data-testid={`approve-${item.id}`}
                        onClick={() => handleReview(item.id, 'approve')}
                        style={{ padding: '6px 14px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 6, color: '#34d399', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      ><Check size={12} /> Approve</button>
                      <button
                        data-testid={`reject-${item.id}`}
                        onClick={() => handleReview(item.id, 'reject')}
                        style={{ padding: '6px 14px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 6, color: '#f87171', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                      ><X size={12} /> Reject</button>
                    </div>
                  )}
                  <button onClick={() => setExpanded(null)} style={{ marginTop: 6, background: 'none', border: 'none', color: '#64748b', fontSize: 11, cursor: 'pointer' }}>Collapse</button>
                </div>
              ) : (
                <button
                  onClick={() => setExpanded(item.id)}
                  style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 11, cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 4 }}
                ><Eye size={12} /> Preview content</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechnicalDashboard() {
  const { token } = useDashboardAuth();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/dashboard/technical/api-usage`, {
      params: { days: 30 },
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => { setUsage(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token]);

  const serviceColors = {
    'DataForSEO': '#3b82f6',
    'SerpApi': '#8b5cf6',
    'OpenAI GPT-4': '#10b981',
    'Google Places API': '#f59e0b',
  };

  const totalCost = usage ? Object.values(usage.by_service).reduce((s, v) => s + v.cost, 0) : 0;

  return (
    <div data-testid="technical-dashboard" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Technical Dashboard</h2>
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>System monitoring and profit margin tracking</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <DollarSign size={16} style={{ color: '#10b981' }} />
            <span style={{ color: '#94a3b8', fontSize: 12 }}>Total Cost (30d)</span>
          </div>
          <div data-testid="total-cost" style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>${totalCost.toFixed(2)}</div>
        </div>
        <div style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Cpu size={16} style={{ color: '#8b5cf6' }} />
            <span style={{ color: '#94a3b8', fontSize: 12 }}>Active Services</span>
          </div>
          <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>{usage ? Object.keys(usage.by_service).length : 0}</div>
        </div>
        <div style={{ flex: '1 1 200px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Zap size={16} style={{ color: '#f59e0b' }} />
            <span style={{ color: '#94a3b8', fontSize: 12 }}>AI Tokens (30d)</span>
          </div>
          <div style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>
            {usage ? Object.values(usage.by_service).reduce((s, v) => s + v.tokens, 0).toLocaleString() : 0}
          </div>
        </div>
      </div>

      {/* Service Usage Cards */}
      {!loading && usage && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
          {Object.entries(usage.by_service).map(([svc, data]) => (
            <UsageCard key={svc} service={svc} data={data} color={serviceColors[svc] || '#3b82f6'} />
          ))}
        </div>
      )}

      {/* Cost Chart */}
      {usage && <div style={{ marginBottom: 24 }}><CostChart daily={usage.daily} /></div>}

      {/* Content Queue */}
      <ContentQueue token={token} />
    </div>
  );
}
