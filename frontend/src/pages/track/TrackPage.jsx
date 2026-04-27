import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  CalendarClock, MapPin, AlertCircle, CheckCircle2, Clock,
  CalendarDays, Info, Sparkles
} from 'lucide-react';
import './TrackPage.css';

const API = process.env.REACT_APP_BACKEND_URL;

const fmtDate = (iso) => new Date(iso).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
const fmtShortDate = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
const fmtTime = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

const STATUS_STEPS = [
  { key: 'draft', label: 'Pending', icon: Clock },
  { key: 'scheduled', label: 'Scheduled', icon: CalendarDays },
  { key: 'in_progress', label: 'On Site', icon: CalendarClock },
  { key: 'completed', label: 'Completed', icon: CheckCircle2 },
];

const TrackPage = () => {
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === '1';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // When embedded, set body background to transparent so host site shows through
  useEffect(() => {
    if (isEmbed) {
      document.body.classList.add('tp-embed-mode');
      document.documentElement.classList.add('tp-embed-mode');
    }
    return () => {
      document.body.classList.remove('tp-embed-mode');
      document.documentElement.classList.remove('tp-embed-mode');
    };
  }, [isEmbed]);

  useEffect(() => {
    let cancelled = false;
    const doFetch = async (attempt = 1) => {
      if (!cancelled) { setError(null); setLoading(true); }
      try {
        const res = await fetch(`${API}/api/cm/track/${token}`);
        if (!res.ok) {
          if (res.status >= 500 && attempt < 3) {
            await new Promise(r => setTimeout(r, 400 * attempt));
            return doFetch(attempt + 1);
          }
          const payload = await res.json().catch(() => ({}));
          throw new Error(payload.detail || 'Unable to load your job status');
        }
        const json = await res.json();
        if (!cancelled) { setData(json); setError(null); }
      } catch (err) {
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 400));
          return doFetch(attempt + 1);
        }
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    doFetch();
    return () => { cancelled = true; };
  }, [token]);

  // Countdown to next upcoming visit
  const countdown = useMemo(() => {
    if (!data?.visits?.length) return null;
    const now = new Date();
    const upcoming = data.visits
      .map(v => ({ v, start: new Date(v.start_at) }))
      .filter(x => x.start > now)
      .sort((a, b) => a.start - b.start)[0];
    if (!upcoming) return null;
    const ms = upcoming.start - now;
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    return { visit: upcoming.v, days, hours };
  }, [data]);

  const currentStep = data?.job?.status || 'scheduled';

  if (loading) return <div className="tp-shell tp-loading"><div>Loading your job status…</div></div>;
  if (error) {
    return (
      <div className="tp-shell tp-error-shell" data-testid="tp-error">
        <AlertCircle size={40} />
        <h1>Link Unavailable</h1>
        <p>{error}</p>
        <p className="tp-error-sub">If you believe this is a mistake, please contact your service provider.</p>
      </div>
    );
  }

  const { client, customer, job, visits, context } = data;

  return (
    <div className={`tp-shell ${isEmbed ? 'tp-shell-embed' : ''}`} data-testid="track-page">
      {/* Header — hidden in embed mode (host site has its own header) */}
      {!isEmbed && (
        <header className="tp-header">
          <div className="tp-header-inner">
            <div className="tp-brand">
              <div className="tp-brand-icon"><CalendarClock size={18} /></div>
              <div>
                <div className="tp-brand-name">{client.business_name}</div>
                <div className="tp-brand-sub">Job Tracker</div>
              </div>
            </div>
            {customer?.full_name && (
              <div className="tp-customer-chip">
                <span>Hi, {customer.full_name.split(' ')[0]}</span>
              </div>
            )}
          </div>
        </header>
      )}

      {/* Hero: countdown + job title */}
      <section className="tp-hero">
        <div className="tp-hero-inner">
          {isEmbed && customer?.full_name && (
            <div className="tp-embed-greet" data-testid="tp-embed-greet">
              Hi {customer.full_name.split(' ')[0]} — here's your job with <strong>{client.business_name}</strong>
            </div>
          )}
          <div className="tp-eyebrow">YOUR SCHEDULED JOB</div>
          <h1 className="tp-job-title" data-testid="tp-job-title">{job.title}</h1>
          {job.description && <p className="tp-job-desc">{job.description}</p>}

          {countdown ? (
            <div className="tp-countdown" data-testid="tp-countdown">
              <div className="tp-countdown-pulse" />
              <div className="tp-countdown-text">
                <div className="tp-countdown-label">Next on site</div>
                <div className="tp-countdown-big">
                  {countdown.days > 0 && <>{countdown.days}<span>d</span></>}
                  {countdown.hours}<span>h</span>
                </div>
                <div className="tp-countdown-visit">
                  {countdown.visit.crew_name} · {fmtDate(countdown.visit.start_at)} · {fmtTime(countdown.visit.start_at)}
                </div>
              </div>
            </div>
          ) : job.status === 'completed' ? (
            <div className="tp-done-badge">
              <CheckCircle2 size={18} /> Job completed
            </div>
          ) : (
            <div className="tp-idle-badge"><Info size={16} /> No upcoming visits scheduled yet.</div>
          )}
        </div>
      </section>

      {/* Status timeline */}
      <section className="tp-section">
        <div className="tp-section-inner">
          <h2 className="tp-section-title">Status</h2>
          <div className="tp-steps" data-testid="tp-status-timeline">
            {STATUS_STEPS.map((s, i) => {
              const activeIdx = STATUS_STEPS.findIndex(x => x.key === currentStep);
              const reached = i <= activeIdx && currentStep !== 'draft' ? true : i === 0 && currentStep === 'draft';
              const isCurrent = i === activeIdx;
              const Icon = s.icon;
              return (
                <React.Fragment key={s.key}>
                  <div className={`tp-step ${reached ? 'is-reached' : ''} ${isCurrent ? 'is-current' : ''}`}>
                    <div className="tp-step-dot"><Icon size={14} /></div>
                    <div className="tp-step-label">{s.label}</div>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`tp-step-line ${i < activeIdx ? 'is-reached' : ''}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Visits */}
      <section className="tp-section">
        <div className="tp-section-inner">
          <h2 className="tp-section-title">Your Visits</h2>
          <div className="tp-visits" data-testid="tp-visit-list">
            {visits.length === 0 && <p className="tp-muted">No visits scheduled yet.</p>}
            {visits.map(v => (
              <article
                key={v.id}
                className="tp-visit-card"
                style={{ borderLeftColor: v.crew_color || '#0d9488' }}
                data-testid={`tp-visit-${v.id}`}
              >
                <div className="tp-visit-top">
                  <div className="tp-visit-date">{fmtDate(v.start_at)}</div>
                  <span
                    className="tp-visit-crewbadge"
                    style={{ background: v.crew_color || '#0d9488' }}
                  >
                    {v.crew_name || 'Crew'}
                  </span>
                </div>
                <h3 className="tp-visit-title">{v.title}</h3>
                <div className="tp-visit-time">
                  <Clock size={14} />
                  {fmtTime(v.start_at)} – {fmtTime(v.end_at)}
                </div>
                {v.notes_customer && (
                  <p className="tp-visit-note">{v.notes_customer}</p>
                )}
              </article>
            ))}
          </div>
          {customer?.address && (
            <div className="tp-address" data-testid="tp-address">
              <MapPin size={14} />
              <span>Service address: <strong>{customer.address}</strong></span>
            </div>
          )}
        </div>
      </section>

      {/* Crew Surrounding Commitments */}
      {context?.visits?.length > 0 && (
        <section className="tp-section tp-context" data-testid="tp-context-section">
          <div className="tp-section-inner">
            <h2 className="tp-section-title">Your Crew's Schedule</h2>
            <p className="tp-context-sub">
              Full transparency: here's what else your assigned crews are doing in the
              {` ±${context.window_days} days`} around your job. Details of other customers
              are private — we show only the crew commitment so you understand timing.
            </p>

            <CrewContextStrip visits={context.visits} crews={context.crews} />
          </div>
        </section>
      )}

      {/* Footer — hidden in embed mode (no Gateway attribution inside host site) */}
      {!isEmbed && (
        <footer className="tp-footer" data-testid="tp-footer">
          <div className="tp-footer-inner">
            <div className="tp-footer-brand">{client.business_name}</div>
            <div className="tp-footer-powered">
              <Sparkles size={12} />
              Powered by <a href="https://gwyai.com" target="_blank" rel="noreferrer">Gateway AI Systems</a> — A Single Source of Truth.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

// Group context visits by day for a compact strip display
const CrewContextStrip = ({ visits, crews }) => {
  const byDay = useMemo(() => {
    const map = new Map();
    for (const v of visits) {
      const key = new Date(v.start_at).toDateString();
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(v);
    }
    return [...map.entries()].sort(
      (a, b) => new Date(a[1][0].start_at) - new Date(b[1][0].start_at)
    );
  }, [visits]);

  return (
    <>
      <div className="tp-context-legend">
        {crews.map(c => (
          <span key={c.id} className="tp-context-legend-item">
            <span className="tp-context-swatch" style={{ background: c.color }} />
            {c.name}
          </span>
        ))}
      </div>
      <div className="tp-context-days">
        {byDay.map(([dayKey, dayVisits]) => (
          <div key={dayKey} className="tp-context-day">
            <div className="tp-context-day-label">{fmtShortDate(dayVisits[0].start_at)}</div>
            <div className="tp-context-day-visits">
              {dayVisits
                .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
                .map(v => (
                  <div
                    key={v.id}
                    className={`tp-context-pill ${v.is_mine ? 'is-mine' : ''}`}
                    style={{ borderLeftColor: v.crew_color || '#0d9488' }}
                    data-testid={`tp-ctx-${v.id}`}
                  >
                    <div className="tp-ctx-time">{fmtTime(v.start_at)} – {fmtTime(v.end_at)}</div>
                    <div className="tp-ctx-label">
                      {v.is_mine ? (
                        <span className="tp-ctx-mine">★ Your job</span>
                      ) : (
                        <span>{v.job_label}</span>
                      )}
                    </div>
                    <div className="tp-ctx-crew" style={{ color: v.crew_color }}>{v.crew_name}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrackPage;
