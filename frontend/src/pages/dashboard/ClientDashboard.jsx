import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDashboardAuth } from '../../contexts/DashboardAuthContext';
import { MapPin, Activity, Phone, Navigation, Eye, Globe, Lock, TrendingUp, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const API = process.env.REACT_APP_BACKEND_URL;

function StatCard({ icon: Icon, label, value, color, testId }) {
  return (
    <div data-testid={testId} style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '18px 20px',
      flex: '1 1 200px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: '-1px' }}>{value}</div>
    </div>
  );
}

function ScoreGauge({ score }) {
  const color = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444';
  const pct = (score / 100) * 283;
  return (
    <div data-testid="authority-score" style={{ position: 'relative', width: 120, height: 120 }}>
      <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${pct} 283`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>{score}</span>
        <span style={{ color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Authority</span>
      </div>
    </div>
  );
}

function HeatMapGrid({ gridData, mapboxToken }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapboxToken || !gridData || mapRef.current) return;
    mapboxgl.accessToken = mapboxToken;

    const centerLat = 30.2672;
    const centerLng = -97.7431;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [centerLng, centerLat],
      zoom: 13,
      interactive: true,
    });

    map.on('load', () => {
      const features = [];
      gridData.forEach((row, r) => {
        row.forEach((cell, c) => {
          const lat = centerLat + (r - 2) * 0.005;
          const lng = centerLng + (c - 2) * 0.005;
          const colorMap = { green: '#00FF00', yellow: '#FFFF00', red: '#FF0000' };
          features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [lng, lat] },
            properties: { rank: cell.rank, color: colorMap[cell.color] || '#FF0000' },
          });
        });
      });

      map.addSource('grid-points', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features },
      });

      map.addLayer({
        id: 'grid-dots',
        type: 'circle',
        source: 'grid-points',
        paint: {
          'circle-radius': 14,
          'circle-color': ['get', 'color'],
          'circle-opacity': 0.85,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'rgba(255,255,255,0.3)',
        },
      });

      map.addLayer({
        id: 'grid-labels',
        type: 'symbol',
        source: 'grid-points',
        layout: {
          'text-field': ['to-string', ['get', 'rank']],
          'text-size': 11,
          'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
          'text-allow-overlap': true,
        },
        paint: { 'text-color': '#000' },
      });

      // Add center marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([centerLng, centerLat])
        .setPopup(new mapboxgl.Popup().setHTML('<strong>Your Business</strong>'))
        .addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [mapboxToken, gridData]);

  return (
    <div data-testid="heat-map" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: 0 }}>Neighborhood Ranking Map</h3>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: '4px 0 0' }}>5x5 grid showing your ranking in nearby searches</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[{ color: '#00FF00', label: 'Top 3' }, { color: '#FFFF00', label: '4-7' }, { color: '#FF0000', label: '8+' }].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
              <span style={{ color: '#94a3b8', fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div ref={mapContainer} style={{ height: 400 }} />
    </div>
  );
}

function ActionFeed({ actions }) {
  const iconMap = {
    sync: Zap,
    content: Globe,
    review: Activity,
    optimization: TrendingUp,
  };
  const colorMap = {
    sync: '#3b82f6',
    content: '#8b5cf6',
    review: '#f59e0b',
    optimization: '#10b981',
  };

  return (
    <div data-testid="action-feed" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: 0 }}>Automated AI Tasks</h3>
        <p style={{ color: '#94a3b8', fontSize: 12, margin: '4px 0 0' }}>Recent actions taken on your behalf</p>
      </div>
      <div style={{ maxHeight: 400, overflowY: 'auto', padding: '8px 0' }}>
        {actions.map((a, i) => {
          const Icon = iconMap[a.action_type] || Activity;
          const c = colorMap[a.action_type] || '#3b82f6';
          const timeAgo = getTimeAgo(a.created_at);
          return (
            <div key={a.id || i} style={{
              display: 'flex', gap: 12, padding: '12px 20px',
              borderBottom: i < actions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: `${c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={14} style={{ color: c }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: '#e2e8f0', fontSize: 13, margin: 0, lineHeight: 1.4 }}>{a.description}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{a.platform}</span>
                  <span style={{ color: '#475569', fontSize: 11 }}>|</span>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{timeAgo}</span>
                  {a.status === 'pending' && (
                    <span style={{ color: '#f59e0b', fontSize: 11, fontWeight: 500 }}>Pending</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LockedFeature({ title, description, testId }) {
  return (
    <div data-testid={testId} style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px dashed rgba(255,255,255,0.12)',
      borderRadius: 12,
      padding: 24,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'rgba(245,158,11,0.15)',
        border: '1px solid rgba(245,158,11,0.3)',
        borderRadius: 6, padding: '4px 10px',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <Lock size={12} style={{ color: '#f59e0b' }} />
        <span style={{ color: '#f59e0b', fontSize: 11, fontWeight: 600 }}>PRO</span>
      </div>
      <div style={{ opacity: 0.4 }}>
        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0 0 8px' }}>{title}</h3>
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{description}</p>
      </div>
      <button style={{
        marginTop: 16,
        padding: '8px 20px',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        border: 'none',
        borderRadius: 6,
        color: '#fff',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
      }}>Upgrade to Unlock</button>
    </div>
  );
}

function GrowthTracker({ scans }) {
  if (!scans || scans.length < 2) return null;

  const sorted = [...scans].sort((a, b) => new Date(a.scan_date) - new Date(b.scan_date));
  const scores = sorted.map(s => s.local_authority_score);
  const dates = sorted.map(s => new Date(s.scan_date));
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const range = maxScore - minScore || 1;

  const currentScore = scores[scores.length - 1];
  const prevScore = scores[scores.length - 2];
  const firstScore = scores[0];
  const totalGain = currentScore - firstScore;
  const recentChange = currentScore - prevScore;

  // Build SVG sparkline path
  const width = 600;
  const height = 80;
  const padding = 4;
  const points = scores.map((s, i) => {
    const x = padding + (i / (scores.length - 1)) * (width - padding * 2);
    const y = height - padding - ((s - minScore) / range) * (height - padding * 2);
    return { x, y };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;

  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

  return (
    <div data-testid="growth-tracker" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12,
      padding: '20px 24px',
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <TrendingUp size={18} style={{ color: '#10b981' }} />
            <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 600, margin: 0 }}>Growth Tracker</h3>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
            Your Local Authority Score over the last {sorted.length} scans ({formatDate(dates[0])} - {formatDate(dates[dates.length - 1])})
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Total Growth</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
              {totalGain >= 0 ? <ArrowUp size={14} style={{ color: '#10b981' }} /> : <ArrowDown size={14} style={{ color: '#ef4444' }} />}
              <span style={{ color: totalGain >= 0 ? '#10b981' : '#ef4444', fontSize: 18, fontWeight: 700 }}>+{totalGain}</span>
            </div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Last Scan</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
              {recentChange >= 0 ? <ArrowUp size={14} style={{ color: '#10b981' }} /> : <ArrowDown size={14} style={{ color: '#ef4444' }} />}
              <span style={{ color: recentChange >= 0 ? '#10b981' : '#ef4444', fontSize: 18, fontWeight: 700 }}>
                {recentChange >= 0 ? '+' : ''}{recentChange}
              </span>
            </div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Started At</div>
            <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 700 }}>{firstScore}</span>
          </div>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div style={{ position: 'relative' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 100 }}>
          {/* Gradient fill under line */}
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#growthGrad)" />
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Endpoint dot */}
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="4" fill="#10b981" stroke="#0a0e1a" strokeWidth="2" />
          {/* Start dot */}
          <circle cx={points[0].x} cy={points[0].y} r="3" fill="#f59e0b" stroke="#0a0e1a" strokeWidth="2" />
        </svg>

        {/* Labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ color: '#64748b', fontSize: 10 }}>{formatDate(dates[0])} (Score: {firstScore})</span>
          <span style={{ color: '#10b981', fontSize: 10, fontWeight: 600 }}>Now: {currentScore}</span>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function ClientDashboard() {
  const { token } = useDashboardAuth();
  const [data, setData] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      axios.get(`${API}/api/dashboard/client/overview`, { headers }),
      axios.get(`${API}/api/dashboard/config`),
      axios.get(`${API}/api/dashboard/client/scan-history`, { headers }),
    ]).then(([overview, config, history]) => {
      setData(overview.data);
      setMapboxToken(config.data.mapbox_token);
      setScanHistory(history.data.scans || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  if (loading) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: 60 }}>Loading dashboard...</div>;
  if (!data?.profile) return <div style={{ color: '#94a3b8', textAlign: 'center', padding: 60 }}>No business profile found.</div>;

  const { profile, latest_scan, recent_actions, gbp_summary } = data;

  return (
    <div data-testid="client-dashboard" style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>{profile.business_name}</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>
            {profile.address}, {profile.city}, {profile.state} {profile.zip_code}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            padding: '4px 12px',
            background: profile.subscription_status === 'active' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
            border: `1px solid ${profile.subscription_status === 'active' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
            borderRadius: 20,
            color: profile.subscription_status === 'active' ? '#34d399' : '#fbbf24',
            fontSize: 12, fontWeight: 500,
          }}>Tier {profile.subscription_tier} - {profile.subscription_status}</span>
          <ScoreGauge score={profile.local_authority_score} />
        </div>
      </div>

      {/* Growth Tracker */}
      <GrowthTracker scans={scanHistory} />

      {/* GBP Stats Row */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatCard icon={Phone} label="Calls (30d)" value={gbp_summary.calls} color="#3b82f6" testId="stat-calls" />
        <StatCard icon={Navigation} label="Directions (30d)" value={gbp_summary.directions} color="#8b5cf6" testId="stat-directions" />
        <StatCard icon={Eye} label="Map Views (30d)" value={gbp_summary.map_views} color="#10b981" testId="stat-map-views" />
        <StatCard icon={Globe} label="Website Clicks (30d)" value={gbp_summary.website_clicks} color="#f59e0b" testId="stat-website-clicks" />
      </div>

      {/* Map */}
      {latest_scan?.grid_data && (
        <div style={{ marginBottom: 24 }}>
          <HeatMapGrid gridData={latest_scan.grid_data} mapboxToken={mapboxToken} />
        </div>
      )}

      {/* Action Feed + Locked Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <ActionFeed actions={recent_actions} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <LockedFeature
            testId="locked-neighborhood-content"
            title="Neighborhood Content Engine"
            description="AI-generated, geo-targeted posts published automatically to your Google Business Profile."
          />
          <LockedFeature
            testId="locked-review-magnet"
            title="Review Magnet"
            description="Automated review solicitation and smart response system to boost your reputation."
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-testid="client-dashboard"] > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
