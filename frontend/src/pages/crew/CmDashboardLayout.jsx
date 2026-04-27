import React from 'react';
import { Outlet, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { CalendarClock, LogOut, LayoutDashboard, Users, Briefcase, HardHat } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';
import './CmSchedule.css';

const CmDashboardLayout = () => {
  const { user, loading, logout } = useCmAuth();
  const navigate = useNavigate();

  if (loading) return <div className="cm-dash-loading">Loading…</div>;
  if (!user) return <Navigate to="/dashboard/crew/login" replace />;

  const handleLogout = () => {
    logout();
    navigate('/dashboard/crew/login');
  };

  return (
    <div className="cm-dash" data-testid="cm-dashboard">
      <aside className="cm-sidebar">
        <div className="cm-sidebar-brand">
          <div className="cm-brand-icon"><CalendarClock size={20} /></div>
          <div>
            <div className="cm-brand-title">Crew Mgmt</div>
            <div className="cm-brand-sub">{user.client?.business_name}</div>
          </div>
        </div>

        <nav className="cm-sidebar-nav">
          <NavLink to="/dashboard/crew" end className="cm-nav-link" data-testid="cm-nav-schedule">
            <LayoutDashboard size={16} />
            <span>Schedule</span>
          </NavLink>
          <NavLink to="/dashboard/crew/jobs" className="cm-nav-link" data-testid="cm-nav-jobs">
            <Briefcase size={16} />
            <span>Jobs</span>
          </NavLink>
          <NavLink to="/dashboard/crew/customers" className="cm-nav-link" data-testid="cm-nav-customers">
            <Users size={16} />
            <span>Customers</span>
          </NavLink>
          <NavLink to="/dashboard/crew/crews" className="cm-nav-link" data-testid="cm-nav-crews">
            <HardHat size={16} />
            <span>Crews</span>
          </NavLink>
        </nav>

        <div className="cm-sidebar-footer">
          <div className="cm-user-block">
            <div className="cm-user-avatar">{(user.full_name || '?').slice(0, 1)}</div>
            <div>
              <div className="cm-user-name">{user.full_name}</div>
              <div className="cm-user-role">{user.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="cm-logout-btn" data-testid="cm-logout-btn">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="cm-main">
        <Outlet />
      </main>
    </div>
  );
};

export default CmDashboardLayout;
