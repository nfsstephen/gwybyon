import React, { useState, useEffect, useCallback } from 'react';
import { Briefcase, ExternalLink, Trash2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const JobsPage = () => {
  const { authedFetch } = useCmAuth();
  const [jobs, setJobs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [jRes, sRes] = await Promise.all([
        authedFetch('/jobs'),
        authedFetch('/services'),
      ]);
      const jData = await jRes.json();
      const sData = await sRes.json();
      setJobs(jData.jobs || []);
      setServices(sData.services || []);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [authedFetch]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (job, newStatus) => {
    try {
      const r = await authedFetch(`/jobs/${job.id}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
      if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.detail || 'Failed'); }
      load();
    } catch (err) { alert(err.message); }
  };

  const updateService = async (job, newServiceId) => {
    try {
      const r = await authedFetch(`/jobs/${job.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ service_id: newServiceId || null }),
      });
      if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.detail || 'Failed'); }
      load();
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (job) => {
    if (!window.confirm(`Delete job "${job.title}"? All visits for this job will also be deleted.`)) return;
    try {
      const r = await authedFetch(`/jobs/${job.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Failed');
      load();
    } catch (err) { alert(err.message); }
  };

  const copyTrackingLink = (job) => {
    const url = `${window.location.origin}/track/${job.public_token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="cm-list-page" data-testid="cm-jobs-page">
      <div className="cm-list-head">
        <div>
          <div className="cm-sched-eyebrow">PIPELINE</div>
          <h1 className="cm-sched-title">Jobs</h1>
          <p className="cm-list-sub">Every piece of work you've scheduled or are planning. To create a new job, use the Schedule page — it lets you add the customer, job, and first visit in one flow.</p>
        </div>
      </div>

      {error && <div className="cm-error">{error}</div>}

      {loading ? <div className="cm-loading">Loading jobs…</div>
       : jobs.length === 0 ? (
        <div className="cm-empty-state">
          <Briefcase size={34} />
          <h3>No jobs yet</h3>
          <p>Head to the Schedule page and click any day to create your first job.</p>
        </div>
      ) : (
        <div className="cm-simple-table">
          <div className="cm-simple-table-head">
            <div style={{ flex: 2 }}>Job</div>
            <div>Customer</div>
            <div style={{ width: 180 }}>Service</div>
            <div style={{ width: 140 }}>Status</div>
            <div style={{ width: 220, textAlign: 'right' }}>Tracking</div>
            <div style={{ width: 60, textAlign: 'right' }}></div>
          </div>
          {jobs.map((j) => (
            <div key={j.id} className="cm-simple-table-row" data-testid={`cm-job-row-${j.id}`}>
              <div style={{ flex: 2 }}>
                <strong>{j.title}</strong>
                {j.description && <div className="cm-cell-sub">{j.description}</div>}
              </div>
              <div>{j.customer_name || <span className="cm-muted">—</span>}</div>
              <div style={{ width: 180 }}>
                <div className="cm-service-cell">
                  {j.service_color && (
                    <span className="cm-color-swatch-sm" style={{ background: j.service_color }} />
                  )}
                  <select
                    value={j.service_id || ''}
                    onChange={(e) => updateService(j, e.target.value)}
                    className="cm-service-select"
                    data-testid={`cm-job-service-${j.id}`}
                  >
                    <option value="">— None —</option>
                    {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ width: 140 }}>
                <select value={j.status} onChange={(e) => updateStatus(j, e.target.value)}
                        className="cm-status-select" data-testid={`cm-job-status-${j.id}`}>
                  {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div style={{ width: 220, textAlign: 'right' }}>
                <button className="cm-btn-mini" onClick={() => copyTrackingLink(j)} data-testid={`cm-job-copy-${j.id}`}>
                  {copiedId === j.id ? <><CheckCircle2 size={12}/> Copied</> : <><Copy size={12}/> Copy link</>}
                </button>
                <a href={`/track/${j.public_token}`} target="_blank" rel="noreferrer" className="cm-btn-mini">
                  <ExternalLink size={12}/> Preview
                </a>
              </div>
              <div style={{ width: 60, textAlign: 'right' }}>
                <button className="cm-btn-mini cm-btn-mini-danger" onClick={() => handleDelete(j)}>
                  <Trash2 size={12}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
