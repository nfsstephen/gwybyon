import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, HardHat } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';

const PALETTE = ['#0d9488', '#2563eb', '#d97706', '#7c3aed', '#db2777', '#059669', '#dc2626'];

const CrewsPage = () => {
  const { authedFetch } = useCmAuth();
  const [crews, setCrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | 'new' | crew object
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authedFetch('/crews');
      const data = await res.json();
      setCrews(data.crews || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authedFetch]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (crew) => {
    if (!window.confirm(`Delete crew "${crew.name}"? Any visits assigned to this crew will become unassigned.`)) return;
    try {
      const r = await authedFetch(`/crews/${crew.id}`, { method: 'DELETE' });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to delete crew');
      }
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="cm-list-page" data-testid="cm-crews-page">
      <div className="cm-list-head">
        <div>
          <div className="cm-sched-eyebrow">SETTINGS</div>
          <h1 className="cm-sched-title">Crews</h1>
          <p className="cm-list-sub">
            A crew is any team, truck, or rig you assign jobs to. Create one per distinct resource you schedule.
          </p>
        </div>
        <button className="cm-new-btn" onClick={() => setEditing('new')} data-testid="cm-new-crew-btn">
          <Plus size={14} /> New Crew
        </button>
      </div>

      {error && <div className="cm-error">{error}</div>}

      {loading ? (
        <div className="cm-loading">Loading crews…</div>
      ) : crews.length === 0 ? (
        <div className="cm-empty-state">
          <HardHat size={34} />
          <h3>No crews yet</h3>
          <p>Add your first crew to start assigning jobs.</p>
          <button className="cm-btn-primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Create your first crew
          </button>
        </div>
      ) : (
        <div className="cm-simple-table">
          <div className="cm-simple-table-head">
            <div style={{ width: 40 }}></div>
            <div>Name</div>
            <div style={{ width: 120 }}>Status</div>
            <div style={{ width: 120, textAlign: 'right' }}>Actions</div>
          </div>
          {crews.map((c) => (
            <div key={c.id} className="cm-simple-table-row" data-testid={`cm-crew-row-${c.id}`}>
              <div><span className="cm-color-swatch-lg" style={{ background: c.color }}></span></div>
              <div><strong>{c.name}</strong></div>
              <div>
                <span className={`cm-badge ${c.is_active ? 'cm-badge-green' : 'cm-badge-grey'}`}>
                  {c.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button className="cm-btn-mini" onClick={() => setEditing(c)} data-testid={`cm-crew-edit-${c.id}`}>
                  <Pencil size={12} /> Edit
                </button>
                <button className="cm-btn-mini cm-btn-mini-danger" onClick={() => handleDelete(c)}>
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <CrewEditModal
          crew={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
    </div>
  );
};

const CrewEditModal = ({ crew, onClose, onSaved }) => {
  const { authedFetch } = useCmAuth();
  const [name, setName] = useState(crew?.name || '');
  const [color, setColor] = useState(crew?.color || PALETTE[0]);
  const [isActive, setIsActive] = useState(crew?.is_active !== false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const body = { name, color, is_active: isActive };
      const res = crew
        ? await authedFetch(`/crews/${crew.id}`, { method: 'PATCH', body: JSON.stringify(body) })
        : await authedFetch('/crews', { method: 'POST', body: JSON.stringify(body) });
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
      <div className="cm-modal cm-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-head">
          <h2>{crew ? 'Edit Crew' : 'New Crew'}</h2>
          <button type="button" className="cm-modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={onSubmit} className="cm-modal-body">
          <div className="cm-form-row">
            <label>Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                   placeholder="e.g., Drill Rig 1" required autoFocus data-testid="cm-crew-name-input" />
          </div>
          <div className="cm-form-row">
            <label>Color</label>
            <div className="cm-palette" data-testid="cm-crew-palette">
              {PALETTE.map((p) => (
                <button type="button" key={p}
                        className={`cm-palette-swatch ${color === p ? 'is-selected' : ''}`}
                        style={{ background: p }}
                        onClick={() => setColor(p)} />
              ))}
            </div>
          </div>
          {crew && (
            <div className="cm-form-row cm-form-row-inline">
              <label>
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span>Active</span>
              </label>
            </div>
          )}
          {error && <div className="cm-form-error"><AlertCircle size={14} /> {error}</div>}
          <div className="cm-modal-actions">
            <div className="cm-modal-actions-right">
              <button type="button" className="cm-btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="cm-btn-primary" disabled={submitting} data-testid="cm-crew-save">
                {submitting ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrewsPage;
