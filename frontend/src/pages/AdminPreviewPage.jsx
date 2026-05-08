import React, { useState } from 'react';
import { 
  MapPin, Users, Mail, MessageSquare, UserCheck, 
  ExternalLink, LogOut, Eye, Send, Sun, Moon
} from 'lucide-react';

// Mock data for UI demonstration - will be replaced with real API calls
const mockStats = {
  territoryTokens: 12,
  territoriesClaimed: 3,
  pendingInvitations: 5,
  contactRequests: 2,
  activeClients: 3,
};

const mockTerritoryTokens = [
  { id: 1, token: 'TKN-FL-32114-PLUMB', territory: 'Daytona Beach, FL', industry: 'Plumbing', zipCodes: '32114, 32118, 32119', status: 'available', created: 'Mar 15, 2026' },
  { id: 2, token: 'TKN-FL-32114-HVAC', territory: 'Daytona Beach, FL', industry: 'HVAC', zipCodes: '32114, 32118, 32119', status: 'sent', created: 'Mar 14, 2026' },
  { id: 3, token: 'TKN-FL-32127-PEST', territory: 'Port Orange, FL', industry: 'Pest Control', zipCodes: '32127, 32128, 32129', status: 'claimed', created: 'Mar 10, 2026' },
];

const mockInvitations = [
  { id: 1, date: 'Mar 18, 2026, 2:30 PM', recipient: 'Mike Johnson', email: 'mike@jplumbing.com', territory: 'Daytona Beach, FL', industry: 'Plumbing', status: 'pending', token: 'TKN-FL-32114-PLUMB' },
  { id: 2, date: 'Mar 15, 2026, 10:15 AM', recipient: 'Sarah Williams', email: 'sarah@coolairhvac.com', territory: 'Daytona Beach, FL', industry: 'HVAC', status: 'opened', token: 'TKN-FL-32114-HVAC' },
  { id: 3, date: 'Mar 10, 2026, 9:00 AM', recipient: 'Tom Davis', email: 'tom@pestaway.com', territory: 'Port Orange, FL', industry: 'Pest Control', status: 'accepted', token: 'TKN-FL-32127-PEST' },
];

const mockClients = [
  { id: 1, date: 'Mar 12, 2026', name: 'Tom Davis', email: 'tom@pestaway.com', business: 'PestAway Services', territory: 'Port Orange, FL', industry: 'Pest Control', status: 'active' },
  { id: 2, date: 'Mar 5, 2026', name: 'Lisa Chen', email: 'lisa@chenelectric.com', business: 'Chen Electric', territory: 'Ormond Beach, FL', industry: 'Electrical', status: 'active' },
  { id: 3, date: 'Feb 28, 2026', name: 'Robert Smith', email: 'robert@smithplumb.com', business: 'Smith Plumbing', territory: 'Palm Coast, FL', industry: 'Plumbing', status: 'active' },
];

const mockContactRequests = [
  { id: 1, date: 'Mar 19, 2026, 11:45 AM', name: 'Jennifer Lee', email: 'jlee@gmail.com', business: 'Lee HVAC Solutions', message: 'Interested in your territory program for the Orlando area.' },
  { id: 2, date: 'Mar 17, 2026, 3:20 PM', name: 'Mark Thompson', email: 'mark@tpestcontrol.com', business: 'Thompson Pest Control', message: 'How do I check if my area is available?' },
];

const mockFeedback = [
  { id: 1, date: 'Mar 16, 2026', client: 'Tom Davis', business: 'PestAway Services', rating: 5, message: 'The territory map feature is exactly what I needed to understand my service area.' },
  { id: 2, date: 'Mar 8, 2026', client: 'Lisa Chen', business: 'Chen Electric', rating: 4, message: 'Great concept. Would love to see more detailed analytics.' },
];

// Light theme
const lightTheme = {
  bg: '#f3f4f6',
  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  text: '#111827',
  textSecondary: '#4b5563',
  textMuted: '#9ca3af',
  tableBorder: '#e5e7eb',
  badgeBg: '#f3f4f6',
};

// Dark theme  
const darkTheme = {
  bg: '#0f172a',
  cardBg: '#1e293b',
  cardBorder: '#334155',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  tableBorder: '#334155',
  badgeBg: '#334155',
};

function StatCard({ label, value, color, icon: Icon, theme }) {
  return (
    <div style={{
      background: theme.cardBg,
      border: `1px solid ${theme.cardBorder}`,
      borderRadius: 12,
      padding: '20px 24px',
      minWidth: 160,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Icon size={16} style={{ color: theme.textMuted }} />
        <span style={{ color: theme.textSecondary, fontSize: 13 }}>{label}</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: color || theme.text }}>{value}</div>
    </div>
  );
}

function TabButton({ active, children, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 20px',
        background: 'none',
        border: 'none',
        borderBottom: active ? '2px solid #3b82f6' : '2px solid transparent',
        color: active ? '#3b82f6' : theme.textSecondary,
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const colors = {
    available: { bg: '#dbeafe', text: '#2563eb' },
    sent: { bg: '#fef3c7', text: '#d97706' },
    claimed: { bg: '#d1fae5', text: '#059669' },
    pending: { bg: '#fef3c7', text: '#d97706' },
    opened: { bg: '#e0e7ff', text: '#4f46e5' },
    accepted: { bg: '#d1fae5', text: '#059669' },
    active: { bg: '#d1fae5', text: '#059669' },
    expired: { bg: '#fee2e2', text: '#dc2626' },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 500,
      background: c.bg,
      color: c.text,
      textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
}

function TerritoryTokensTab({ theme }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
            {['TOKEN', 'TERRITORY', 'INDUSTRY', 'ZIP CODES', 'STATUS', 'CREATED', 'ACTIONS'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockTerritoryTokens.map(t => (
            <tr key={t.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
              <td style={{ padding: '14px 16px' }}>
                <code style={{ background: theme.badgeBg, padding: '4px 8px', borderRadius: 4, fontSize: 12, color: theme.text }}>{t.token}</code>
              </td>
              <td style={{ padding: '14px 16px', color: theme.text, fontSize: 13 }}>{t.territory}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{t.industry}</td>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{t.zipCodes}</td>
              <td style={{ padding: '14px 16px' }}><StatusBadge status={t.status} /></td>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{t.created}</td>
              <td style={{ padding: '14px 16px' }}>
                <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Eye size={14} /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InvitationsTab({ theme }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
            {['DATE', 'RECIPIENT', 'TERRITORY', 'INDUSTRY', 'STATUS', 'ACTIONS'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockInvitations.map(inv => (
            <tr key={inv.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{inv.date}</td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ color: theme.text, fontSize: 13, fontWeight: 500 }}>{inv.recipient}</div>
                <div style={{ color: theme.textMuted, fontSize: 11 }}>{inv.email}</div>
              </td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{inv.territory}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{inv.industry}</td>
              <td style={{ padding: '14px 16px' }}><StatusBadge status={inv.status} /></td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 13 }}>View</button>
                  {inv.status === 'pending' && (
                    <button style={{ background: 'none', border: 'none', color: '#d97706', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Send size={12} /> Resend
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClientsTab({ theme }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
            {['DATE', 'CLIENT', 'BUSINESS', 'TERRITORY', 'INDUSTRY', 'STATUS', 'ACTIONS'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockClients.map(c => (
            <tr key={c.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{c.date}</td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ color: theme.text, fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                <div style={{ color: theme.textMuted, fontSize: 11 }}>{c.email}</div>
              </td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{c.business}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{c.territory}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{c.industry}</td>
              <td style={{ padding: '14px 16px' }}><StatusBadge status={c.status} /></td>
              <td style={{ padding: '14px 16px' }}>
                <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 13 }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactRequestsTab({ theme }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
            {['DATE', 'CONTACT', 'BUSINESS', 'MESSAGE', 'ACTIONS'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockContactRequests.map(cr => (
            <tr key={cr.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{cr.date}</td>
              <td style={{ padding: '14px 16px' }}>
                <div style={{ color: theme.text, fontSize: 13, fontWeight: 500 }}>{cr.name}</div>
                <div style={{ color: theme.textMuted, fontSize: 11 }}>{cr.email}</div>
              </td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{cr.business}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13, maxWidth: 300 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cr.message}</div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 13 }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeedbackTab({ theme }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
            {['DATE', 'CLIENT', 'BUSINESS', 'RATING', 'MESSAGE', 'ACTIONS'].map(h => (
              <th key={h} style={{ padding: '12px 16px', color: theme.textMuted, fontSize: 11, fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockFeedback.map(fb => (
            <tr key={fb.id} style={{ borderBottom: `1px solid ${theme.tableBorder}` }}>
              <td style={{ padding: '14px 16px', color: theme.textMuted, fontSize: 12 }}>{fb.date}</td>
              <td style={{ padding: '14px 16px', color: theme.text, fontSize: 13, fontWeight: 500 }}>{fb.client}</td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13 }}>{fb.business}</td>
              <td style={{ padding: '14px 16px' }}>
                <span style={{ color: '#f59e0b', fontSize: 14 }}>{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</span>
              </td>
              <td style={{ padding: '14px 16px', color: theme.textSecondary, fontSize: 13, maxWidth: 300 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fb.message}</div>
              </td>
              <td style={{ padding: '14px 16px' }}>
                <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: 13 }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminPreviewPage() {
  const [activeTab, setActiveTab] = useState('tokens');
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const tabs = [
    { id: 'tokens', label: 'Territory Tokens' },
    { id: 'invitations', label: 'Invitations' },
    { id: 'clients', label: 'Clients' },
    { id: 'contacts', label: 'Contact Requests' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.bg, 
      padding: 24,
      fontFamily: "'Inter', -apple-system, sans-serif",
      transition: 'background 0.3s ease',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MapPin size={22} color="#fff" />
            </div>
            <span style={{ color: theme.text, fontSize: 20, fontWeight: 700 }}>Gateway AI Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 8,
                padding: '8px 12px',
                color: theme.textSecondary,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? 'Light' : 'Dark'}
            </button>
            <a href="/" style={{ color: theme.textSecondary, fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              <ExternalLink size={14} /> View Site
            </a>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
          marginBottom: 32,
        }}>
          <StatCard label="Territory Tokens" value={mockStats.territoryTokens} icon={MapPin} theme={theme} />
          <StatCard label="Territories Claimed" value={mockStats.territoriesClaimed} color="#059669" icon={UserCheck} theme={theme} />
          <StatCard label="Pending Invitations" value={mockStats.pendingInvitations} icon={Mail} theme={theme} />
          <StatCard label="Contact Requests" value={mockStats.contactRequests} icon={MessageSquare} theme={theme} />
          <StatCard label="Active Clients" value={mockStats.activeClients} icon={Users} theme={theme} />
        </div>

        {/* Tabs Section */}
        <div style={{
          background: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {/* Tab Headers */}
          <div style={{ 
            display: 'flex', 
            borderBottom: `1px solid ${theme.tableBorder}`,
            overflowX: 'auto',
          }}>
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                theme={theme}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ minHeight: 300 }}>
            {activeTab === 'tokens' && <TerritoryTokensTab theme={theme} />}
            {activeTab === 'invitations' && <InvitationsTab theme={theme} />}
            {activeTab === 'clients' && <ClientsTab theme={theme} />}
            {activeTab === 'contacts' && <ContactRequestsTab theme={theme} />}
            {activeTab === 'feedback' && <FeedbackTab theme={theme} />}
          </div>
        </div>

        {/* Preview Notice */}
        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: '#fef3c7', 
          borderRadius: 8, 
          border: '1px solid #fcd34d',
          color: '#92400e',
          fontSize: 13,
          textAlign: 'center',
        }}>
          <strong>UI Preview Mode</strong> - This is a preview of the admin dashboard UI with mock data. Backend infrastructure will be connected next.
        </div>
      </div>
    </div>
  );
}
