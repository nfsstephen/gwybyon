import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, Wrench, Sparkles, Archive, RotateCw } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';

const PALETTE = ['#0d9488', '#2563eb', '#d97706', '#7c3aed', '#db2777', '#059669', '#dc2626', '#3b82f6', '#f59e0b'];

const ServicesPage = () => {
  const { authedFetch } = useCmAuth();
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | service object
  const [showInactive, setShowInactive] = useState(false);
  const [seedOpen, setSeedOpen] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      // Services list is critical; industries is only needed by the seed modal,
      // so don't block the page if the industries call transiently fails.
      const sRes = await authedFetch(`/services?include_inactive=${showInactive ? 'true' : 'false'}`);
      const sData = await sRes.json();
      if (!sRes.ok) throw new Error(sData.detail || 'Failed to load services');
      setServices(sData.services || []);

      try {
        const iRes = await authedFetch('/services/industries');
        if (iRes.ok) {
          const iData = await iRes.json();
          setIndustries(iData.industries || []);
        }
      } catch { /* non-fatal — seed modal will fall back to defaults */ }
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [authedFetch, showInactive]);

  useEffect(() => { load(); }, [load]);

  const handleArchive = async (svc) => {
    if (!window.confirm(`Archive "${svc.name}"? Old jobs keep it, but it disappears from the picker. You can restore it later.`)) return;
    try {
      const r = await authedFetch(`/services/${svc.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Failed to archive');
      load();
    } catch (err) { alert(err.message); }
  };

  const handleRestore = async (svc) => {
    try {
      const r = await authedFetch(`/services/${svc.id}`, {
        method: 'PATCH', body: JSON.stringify({ is_active: true }),
      });
      if (!r.ok) throw new Error('Failed to restore');
      load();
    } catch (err) { alert(err.message); }
  };

  const activeCount = services.filter((s) => s.is_active).length;

  return (
    <div className="cm-list-page" data-testid="cm-services-page">
      <div className="cm-list-head">
        <div>
          <div className="cm-sched-eyebrow">SETTINGS</div>
          <h1 className="cm-sched-title">Services</h1>
          <p className="cm-list-sub">
            Your menu of services. Every job and visit can be tagged with one, which color-codes the calendar and unlocks future reporting. Internal only — customers never see these.
          </p>
        </div>
        <div className="cm-list-head-actions">
          <button className="cm-btn-ghost" onClick={() => setSeedOpen(true)} data-testid="cm-seed-defaults-btn">
            <Sparkles size={14} /> Seed defaults
          </button>
          <button className="cm-new-btn" onClick={() => setEditing('new')} data-testid="cm-new-service-btn">
            <Plus size={14} /> New Service
          </button>
        </div>
      </div>

      <div className="cm-services-toolbar">
        <label className="cm-inline-check">
          <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} />
          Show archived
        </label>
        <span className="cm-muted-small">{activeCount} active service{activeCount === 1 ? '' : 's'}</span>
      </div>

      {error && <div className="cm-error">{error}</div>}

      {loading ? (
        <div className="cm-loading">Loading services…</div>
      ) : services.length === 0 ? (
        <div className="cm-empty-state">
          <Wrench size={34} />
          <h3>No services yet</h3>
          <p>Seed a preset based on your industry, or build your menu from scratch.</p>
          <div className="cm-empty-actions">
            <button className="cm-btn-primary" onClick={() => setSeedOpen(true)}>
              <Sparkles size={14} /> Seed defaults
            </button>
            <button className="cm-btn-ghost" onClick={() => setEditing('new')}>
              <Plus size={14} /> Add one manually
            </button>
          </div>
        </div>
      ) : (
        <div className="cm-simple-table">
          <div className="cm-simple-table-head">
            <div style={{ width: 40 }}></div>
            <div style={{ flex: 2 }}>Service</div>
            <div style={{ width: 120 }}>Duration</div>
            <div style={{ width: 120 }}>Status</div>
            <div style={{ width: 180, textAlign: 'right' }}>Actions</div>
          </div>
          {services.map((s) => (
            <div key={s.id} className={`cm-simple-table-row ${s.is_active ? '' : 'cm-row-muted'}`} data-testid={`cm-service-row-${s.id}`}>
              <div><span className="cm-color-swatch-lg" style={{ background: s.color }}></span></div>
              <div style={{ flex: 2 }}>
                <strong>{s.name}</strong>
                {s.description && <div className="cm-cell-sub">{s.description}</div>}
              </div>
              <div>{s.default_duration_hours ? `${s.default_duration_hours} hr` : <span className="cm-muted">—</span>}</div>
              <div>
                <span className={`cm-badge ${s.is_active ? 'cm-badge-green' : 'cm-badge-grey'}`}>
                  {s.is_active ? 'Active' : 'Archived'}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button className="cm-btn-mini" onClick={() => setEditing(s)} data-testid={`cm-service-edit-${s.id}`}>
                  <Pencil size={12} /> Edit
                </button>
                {s.is_active ? (
                  <button className="cm-btn-mini cm-btn-mini-danger" onClick={() => handleArchive(s)} data-testid={`cm-service-archive-${s.id}`}>
                    <Archive size={12} /> Archive
                  </button>
                ) : (
                  <button className="cm-btn-mini" onClick={() => handleRestore(s)}>
                    <RotateCw size={12} /> Restore
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <ServiceEditModal
          service={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}

      {seedOpen && (
        <SeedDefaultsModal
          industries={industries}
          onClose={() => setSeedOpen(false)}
          onSeeded={() => { setSeedOpen(false); load(); }}
        />
      )}
    </div>
  );
};

const ServiceEditModal = ({ service, onClose, onSaved }) => {
  const { authedFetch } = useCmAuth();
  const [name, setName] = useState(service?.name || '');
  const [description, setDescription] = useState(service?.description || '');
  const [duration, setDuration] = useState(service?.default_duration_hours ?? '');
  const [priceDollars, setPriceDollars] = useState(
    service?.default_price_cents != null ? (service.default_price_cents / 100).toFixed(2) : ''
  );
  const [color, setColor] = useState(service?.color || PALETTE[0]);
  const [sortOrder, setSortOrder] = useState(service?.sort_order ?? 0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const body = {
        name,
        description: description || null,
        default_duration_hours: duration === '' ? null : Number(duration),
        default_price_cents: priceDollars === '' ? null : Math.round(Number(priceDollars) * 100),
        color,
        sort_order: Number(sortOrder) || 0,
      };
      const res = service
        ? await authedFetch(`/services/${service.id}`, { method: 'PATCH', body: JSON.stringify(body) })
        : await authedFetch('/services', { method: 'POST', body: JSON.stringify(body) });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to save');
      }
      onSaved();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="cm-modal-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-head">
          <h2>{service ? 'Edit Service' : 'New Service'}</h2>
          <button type="button" className="cm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit} className="cm-modal-body">
          <div className="cm-form-row">
            <label>Service name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                   placeholder="e.g., Residential Well Drilling" required autoFocus
                   data-testid="cm-service-name-input" />
          </div>

          <div className="cm-form-row">
            <label>Description <span>(optional, internal)</span></label>
            <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)}
                      placeholder="A short note on what this service covers." />
          </div>

          <div className="cm-form-grid-2">
            <div className="cm-form-row">
              <label>Default duration (hours)</label>
              <input type="number" step="0.5" min="0" value={duration}
                     onChange={(e) => setDuration(e.target.value)} placeholder="e.g., 4" />
            </div>
            <div className="cm-form-row">
              <label>Default price (USD)</label>
              <input type="number" step="0.01" min="0" value={priceDollars}
                     onChange={(e) => setPriceDollars(e.target.value)} placeholder="optional" />
            </div>
          </div>

          <div className="cm-form-row">
            <label>Color</label>
            <div className="cm-palette">
              {PALETTE.map((p) => (
                <button type="button" key={p}
                        className={`cm-palette-swatch ${color === p ? 'is-selected' : ''}`}
                        style={{ background: p }}
                        onClick={() => setColor(p)} />
              ))}
            </div>
          </div>

          <div className="cm-form-row">
            <label>Display order <span>(lower = higher in dropdowns)</span></label>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </div>

          {error && <div className="cm-form-error"><AlertCircle size={14} /> {error}</div>}

          <div className="cm-modal-actions">
            <div className="cm-modal-actions-right">
              <button type="button" className="cm-btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="cm-btn-primary" disabled={submitting} data-testid="cm-service-save">
                {submitting ? 'Saving…' : 'Save Service'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const SeedDefaultsModal = ({ industries, onClose, onSeeded }) => {
  const { authedFetch } = useCmAuth();
  const [industry, setIndustry] = useState(industries[0]?.value || 'generic');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await authedFetch('/services/seed-defaults', {
        method: 'POST', body: JSON.stringify({ industry }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Seed failed');
      setResult(data);
      setTimeout(onSeeded, 1500);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="cm-modal-overlay" onClick={onClose}>
      <div className="cm-modal cm-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-head">
          <h2>Seed Default Services</h2>
          <button type="button" className="cm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit} className="cm-modal-body">
          <p className="cm-modal-blurb">
            Pick your industry — we'll add a starter set of common services. Nothing is deleted; duplicates by name are skipped. Edit or archive any of them afterward.
          </p>
          <div className="cm-form-row">
            <label>Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} data-testid="cm-seed-industry">
              {industries.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
          </div>

          {result && (
            <div className="cm-form-success">
              Added {result.created} new service{result.created === 1 ? '' : 's'} ({result.skipped} already existed).
            </div>
          )}
          {error && <div className="cm-form-error"><AlertCircle size={14} /> {error}</div>}

          <div className="cm-modal-actions">
            <div className="cm-modal-actions-right">
              <button type="button" className="cm-btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="cm-btn-primary" disabled={submitting || !!result} data-testid="cm-seed-submit">
                {submitting ? 'Seeding…' : (result ? 'Done' : 'Seed')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesPage;
