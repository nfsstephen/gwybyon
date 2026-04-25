import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, RotateCw } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';
import './CmSchedule.css';

// --- helpers ---
const startOfWeek = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const day = x.getDay(); // 0 Sun .. 6 Sat
  const diff = (day + 6) % 7; // back to Monday
  x.setDate(x.getDate() - diff);
  return x;
};
const startOfMonth = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(1);
  return x;
};
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const addMonths = (d, n) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
const fmtMonthYear = (d) => d.toLocaleString(undefined, { month: 'long', year: 'numeric' });
const fmtDayShort = (d) => d.toLocaleString(undefined, { weekday: 'short' });
const fmtDayNum = (d) => d.getDate();
const fmtTime = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const CmSchedule = () => {
  const { authedFetch } = useCmAuth();
  const [view, setView] = useState('week'); // 'week' | 'month'
  const [anchor, setAnchor] = useState(() => new Date());
  const [visits, setVisits] = useState([]);
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Compute the date range to query based on view + anchor
  const range = useMemo(() => {
    if (view === 'week') {
      const start = startOfWeek(anchor);
      const end = addDays(start, 7);
      return { start, end };
    }
    // Month view: load entire month + buffer for spillover days from neighbors
    const monthStart = startOfMonth(anchor);
    const start = startOfWeek(monthStart);
    const monthEnd = addMonths(monthStart, 1);
    const end = addDays(startOfWeek(addDays(monthEnd, 6)), 0); // safe upper bound
    return { start, end: addDays(start, 42) };
  }, [view, anchor]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [vRes, cRes] = await Promise.all([
        authedFetch(`/visits?start=${range.start.toISOString()}&end=${range.end.toISOString()}`),
        authedFetch('/crews'),
      ]);
      const vData = await vRes.json();
      const cData = await cRes.json();
      setVisits(vData.visits || []);
      setCrews(cData.crews || []);
    } catch (err) {
      setError(err.message || 'Failed to load schedule');
    } finally {
      setLoading(false);
    }
  }, [authedFetch, range.start, range.end]);

  useEffect(() => { load(); }, [load]);

  const onPrev = () => setAnchor(view === 'week' ? addDays(anchor, -7) : addMonths(anchor, -1));
  const onNext = () => setAnchor(view === 'week' ? addDays(anchor, 7) : addMonths(anchor, 1));
  const onToday = () => setAnchor(new Date());

  // ---- WEEK VIEW ----
  const weekDays = useMemo(() => {
    const start = startOfWeek(anchor);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [anchor]);

  const visitsByDay = useMemo(() => {
    const map = new Map();
    weekDays.forEach((d) => map.set(d.toDateString(), []));
    visits.forEach((v) => {
      const key = new Date(v.start_at).toDateString();
      if (map.has(key)) map.get(key).push(v);
    });
    map.forEach((arr) => arr.sort((a, b) => new Date(a.start_at) - new Date(b.start_at)));
    return map;
  }, [visits, weekDays]);

  // ---- MONTH VIEW ----
  const monthCells = useMemo(() => {
    const monthStart = startOfMonth(anchor);
    const gridStart = startOfWeek(monthStart);
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  }, [anchor]);

  const visitsByMonthDay = useMemo(() => {
    const map = new Map();
    visits.forEach((v) => {
      const d = new Date(v.start_at);
      const key = d.toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(v);
    });
    return map;
  }, [visits]);

  // ---- HEADER ----
  const headerLabel = view === 'week'
    ? `${weekDays[0].toLocaleString(undefined, { month: 'short', day: 'numeric' })} – ${weekDays[6].toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
    : fmtMonthYear(anchor);

  return (
    <div className="cm-sched" data-testid="cm-schedule">
      <div className="cm-sched-head">
        <div>
          <div className="cm-sched-eyebrow">SCHEDULE</div>
          <h1 className="cm-sched-title">{headerLabel}</h1>
        </div>
        <div className="cm-sched-actions">
          <div className="cm-view-toggle" data-testid="cm-view-toggle">
            <button
              type="button"
              className={`cm-view-btn ${view === 'week' ? 'is-active' : ''}`}
              onClick={() => setView('week')}
              data-testid="cm-view-week"
            >
              <CalendarDays size={14} /> Week
            </button>
            <button
              type="button"
              className={`cm-view-btn ${view === 'month' ? 'is-active' : ''}`}
              onClick={() => setView('month')}
              data-testid="cm-view-month"
            >
              <Calendar size={14} /> Month
            </button>
          </div>

          <div className="cm-nav-group">
            <button onClick={onPrev} className="cm-icon-btn" data-testid="cm-prev"><ChevronLeft size={16} /></button>
            <button onClick={onToday} className="cm-today-btn" data-testid="cm-today">Today</button>
            <button onClick={onNext} className="cm-icon-btn" data-testid="cm-next"><ChevronRight size={16} /></button>
          </div>

          <button onClick={load} className="cm-icon-btn" title="Refresh" data-testid="cm-refresh">
            <RotateCw size={14} />
          </button>
        </div>
      </div>

      {/* Crew legend */}
      {crews.length > 0 && (
        <div className="cm-legend" data-testid="cm-legend">
          {crews.map((c) => (
            <span key={c.id} className="cm-legend-item">
              <span className="cm-legend-swatch" style={{ background: c.color }} />
              {c.name}
            </span>
          ))}
        </div>
      )}

      {error && <div className="cm-error">{error}</div>}

      {loading ? (
        <div className="cm-loading">Loading schedule…</div>
      ) : view === 'week' ? (
        <WeekView weekDays={weekDays} visitsByDay={visitsByDay} />
      ) : (
        <MonthView anchor={anchor} cells={monthCells} visitsByDay={visitsByMonthDay} onPickDay={(d) => { setAnchor(d); setView('week'); }} />
      )}
    </div>
  );
};

// ---- WEEK VIEW (vertical day columns with hour-blocked event cards) ----
const WeekView = ({ weekDays, visitsByDay }) => (
  <div className="cm-week" data-testid="cm-week-view">
    {weekDays.map((d) => {
      const today = sameDay(d, new Date());
      const dayVisits = visitsByDay.get(d.toDateString()) || [];
      return (
        <div key={d.toDateString()} className={`cm-day-col ${today ? 'is-today' : ''}`} data-testid={`cm-day-${d.toISOString().slice(0,10)}`}>
          <div className="cm-day-head">
            <div className="cm-day-name">{fmtDayShort(d)}</div>
            <div className="cm-day-num">{fmtDayNum(d)}</div>
          </div>
          <div className="cm-day-body">
            {dayVisits.length === 0 ? (
              <div className="cm-day-empty">—</div>
            ) : dayVisits.map((v) => (
              <VisitCard key={v.id} visit={v} compact={false} />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

// ---- MONTH VIEW (6×7 grid; click a day → opens that week) ----
const MonthView = ({ anchor, cells, visitsByDay, onPickDay }) => {
  const monthIdx = anchor.getMonth();
  const today = new Date();
  return (
    <div className="cm-month" data-testid="cm-month-view">
      <div className="cm-month-weekheader">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((w) => <div key={w}>{w}</div>)}
      </div>
      <div className="cm-month-grid">
        {cells.map((d) => {
          const isOther = d.getMonth() !== monthIdx;
          const isToday = sameDay(d, today);
          const dayVisits = visitsByDay.get(d.toDateString()) || [];
          return (
            <button
              type="button"
              key={d.toDateString()}
              className={`cm-month-cell ${isOther ? 'is-other' : ''} ${isToday ? 'is-today' : ''}`}
              onClick={() => onPickDay(d)}
              data-testid={`cm-month-cell-${d.toISOString().slice(0,10)}`}
            >
              <div className="cm-month-cell-num">{d.getDate()}</div>
              <div className="cm-month-cell-events">
                {dayVisits.slice(0, 3).map((v) => (
                  <div
                    key={v.id}
                    className="cm-month-pill"
                    style={{ background: v.crew_color || '#0d9488' }}
                    title={`${v.title} — ${v.customer_name || ''}`}
                  >
                    {fmtTime(v.start_at)} {v.crew_name}
                  </div>
                ))}
                {dayVisits.length > 3 && (
                  <div className="cm-month-more">+{dayVisits.length - 3} more</div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---- VISIT CARD (used in week view) ----
const VisitCard = ({ visit }) => {
  const color = visit.crew_color || '#0d9488';
  return (
    <div
      className="cm-visit"
      style={{ borderLeftColor: color }}
      data-testid={`cm-visit-${visit.id}`}
    >
      <div className="cm-visit-time">
        {fmtTime(visit.start_at)} – {fmtTime(visit.end_at)}
      </div>
      <div className="cm-visit-title">{visit.title}</div>
      <div className="cm-visit-meta">
        <span className="cm-visit-crew" style={{ color }}>{visit.crew_name}</span>
      </div>
      {visit.customer_name && (
        <div className="cm-visit-customer">{visit.customer_name}</div>
      )}
      {visit.customer_address && (
        <div className="cm-visit-address">{visit.customer_address}</div>
      )}
    </div>
  );
};

export default CmSchedule;
