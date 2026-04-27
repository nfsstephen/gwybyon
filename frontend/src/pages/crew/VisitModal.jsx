import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { X, Plus, CheckCircle2, Trash2, AlertCircle } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';

// ISO helper: convert Date -> local datetime-input value "YYYY-MM-DDTHH:mm"
const toLocalInput = (d) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const fromLocalInput = (v) => new Date(v).toISOString();

/**
 * Universal visit modal: create OR edit a visit.
 * Supports inline creation of a new customer and/or new job in the same flow.
 *
 * Props:
 *   mode: 'create' | 'edit'
 *   initialStart: Date (for create)
 *   visit: existing visit row (for edit)
 *   crews, customers, jobs: current lists (caller passes)
 *   onClose, onSaved
 */
export const VisitModal = ({ mode, initialStart, visit, crews, customers, jobs, onClose, onSaved, onRefreshLists }) => {
  const { authedFetch } = useCmAuth();

  // ---- state ----
  const [crewId, setCrewId] = useState(visit?.crew_id || crews[0]?.id || '');
  const [jobPickerMode, setJobPickerMode] = useState(visit ? 'existing' : 'new'); // 'existing' | 'new'
  const [existingJobId, setExistingJobId] = useState(visit?.job_id || '');

  // When creating a new job, also optionally create a new customer
  const [customerMode, setCustomerMode] = useState('existing'); // 'existing' | 'new'
  const [existingCustomerId, setExistingCustomerId] = useState(customers[0]?.id || '');
  const [newCustomer, setNewCustomer] = useState({ full_name: '', phone: '', address: '' });
  const [newJob, setNewJob] = useState({ title: '', description: '' });

  // Visit fields
  const defaultStart = initialStart || new Date();
  const defaultEnd = new Date((initialStart || new Date()).getTime() + 2 * 60 * 60 * 1000);
  const [visitTitle, setVisitTitle] = useState(visit?.title || '');
  const [startAt, setStartAt] = useState(visit ? toLocalInput(new Date(visit.start_at)) : toLocalInput(defaultStart));
  const [endAt, setEndAt] = useState(visit ? toLocalInput(new Date(visit.end_at)) : toLocalInput(defaultEnd));
  const [status, setStatus] = useState(visit?.status || 'scheduled');
  const [notesInternal, setNotesInternal] = useState(visit?.notes_internal || '');
  const [notesCustomer, setNotesCustomer] = useState(visit?.notes_customer || '');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Deriving: when existing job chosen, auto-fill visit title if empty
  useEffect(() => {
    if (mode === 'create' && jobPickerMode === 'existing' && !visitTitle) {
      const j = jobs.find((x) => x.id === existingJobId);
      if (j) setVisitTitle(j.title);
    }
  }, [mode, jobPickerMode, existingJobId, jobs, visitTitle]);

  // ---- submission ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      let jobIdToUse = existingJobId;

      if (jobPickerMode === 'new' && mode === 'create') {
        // Ensure we have a customer
        let custId = existingCustomerId;
        if (customerMode === 'new') {
          if (!newCustomer.full_name.trim()) throw new Error('Customer name is required');
          const cr = await authedFetch('/customers', { method: 'POST', body: JSON.stringify(newCustomer) });
          const cData = await cr.json();
          if (!cr.ok) throw new Error(cData.detail || 'Failed to create customer');
          custId = cData.id;
        }
        if (!custId) throw new Error('Please select a customer or create a new one');

        if (!newJob.title.trim()) throw new Error('Job title is required');
        const jr = await authedFetch('/jobs', {
          method: 'POST',
          body: JSON.stringify({ customer_id: custId, title: newJob.title, description: newJob.description || null, status: 'scheduled' }),
        });
        const jData = await jr.json();
        if (!jr.ok) throw new Error(jData.detail || 'Failed to create job');
        jobIdToUse = jData.id;
      }

      if (!jobIdToUse) throw new Error('Please pick or create a job');
      if (!visitTitle.trim()) throw new Error('Visit title is required');

      const payload = {
        job_id: jobIdToUse,
        crew_id: crewId || null,
        title: visitTitle,
        start_at: fromLocalInput(startAt),
        end_at: fromLocalInput(endAt),
        status,
        notes_internal: notesInternal || null,
        notes_customer: notesCustomer || null,
      };

      if (mode === 'edit' && visit) {
        const { job_id: _jobId, ...updates } = payload;
        const ur = await authedFetch(`/visits/${visit.id}`, { method: 'PATCH', body: JSON.stringify(updates) });
        const uData = await ur.json();
        if (!ur.ok) throw new Error(uData.detail || 'Failed to update visit');
      } else {
        const cr = await authedFetch('/visits', { method: 'POST', body: JSON.stringify(payload) });
        const cData = await cr.json();
        if (!cr.ok) throw new Error(cData.detail || 'Failed to create visit');
      }

      if (onRefreshLists) await onRefreshLists();
      onSaved?.();
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!visit) return;
    if (!window.confirm('Delete this visit? This cannot be undone.')) return;
    setSubmitting(true);
    try {
      const r = await authedFetch(`/visits/${visit.id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Failed to delete');
      onSaved?.();
      onClose?.();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="cm-modal-overlay" onClick={onClose} data-testid="cm-visit-modal">
      <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-head">
          <h2>{mode === 'edit' ? 'Edit Visit' : 'Schedule a Visit'}</h2>
          <button type="button" className="cm-modal-close" onClick={onClose} data-testid="cm-modal-close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cm-modal-body">
          {/* Job selection */}
          {mode === 'create' && (
            <>
              <div className="cm-form-row">
                <label>Job</label>
                <div className="cm-tab-toggle">
                  <button type="button" className={jobPickerMode === 'existing' ? 'is-active' : ''}
                          onClick={() => setJobPickerMode('existing')}
                          data-testid="cm-job-tab-existing">Existing Job</button>
                  <button type="button" className={jobPickerMode === 'new' ? 'is-active' : ''}
                          onClick={() => setJobPickerMode('new')}
                          data-testid="cm-job-tab-new">New Job</button>
                </div>
              </div>

              {jobPickerMode === 'existing' ? (
                <div className="cm-form-row">
                  <select value={existingJobId} onChange={(e) => setExistingJobId(e.target.value)}
                          required data-testid="cm-existing-job">
                    <option value="">— Choose a job —</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.customer_name ? `${j.customer_name} — ` : ''}{j.title}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="cm-form-block">
                  {/* Customer sub-picker */}
                  <div className="cm-form-row">
                    <label>Customer</label>
                    <div className="cm-tab-toggle cm-tab-toggle-sm">
                      <button type="button" className={customerMode === 'existing' ? 'is-active' : ''}
                              onClick={() => setCustomerMode('existing')}>Existing</button>
                      <button type="button" className={customerMode === 'new' ? 'is-active' : ''}
                              onClick={() => setCustomerMode('new')}>New</button>
                    </div>
                  </div>
                  {customerMode === 'existing' ? (
                    <select value={existingCustomerId} onChange={(e) => setExistingCustomerId(e.target.value)}
                            required data-testid="cm-existing-customer">
                      <option value="">— Choose a customer —</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>{c.full_name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="cm-inline-fields">
                      <input type="text" placeholder="Full name *"
                             value={newCustomer.full_name}
                             onChange={(e) => setNewCustomer({ ...newCustomer, full_name: e.target.value })}
                             data-testid="cm-new-customer-name" required />
                      <input type="text" placeholder="Phone"
                             value={newCustomer.phone}
                             onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
                      <input type="text" placeholder="Address"
                             value={newCustomer.address}
                             onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} />
                    </div>
                  )}

                  {/* New job fields */}
                  <div className="cm-form-row">
                    <label>Job title *</label>
                    <input type="text"
                           value={newJob.title}
                           onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                           placeholder="e.g., 200ft Residential Well"
                           required data-testid="cm-new-job-title" />
                  </div>
                  <div className="cm-form-row">
                    <label>Job description</label>
                    <textarea rows={2}
                              value={newJob.description}
                              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                              placeholder="Optional — full scope of work" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Visit details */}
          <div className="cm-form-row">
            <label>Visit title *</label>
            <input type="text" value={visitTitle} onChange={(e) => setVisitTitle(e.target.value)}
                   placeholder="e.g., Drilling Day 1" required data-testid="cm-visit-title" />
          </div>

          <div className="cm-form-grid-2">
            <div className="cm-form-row">
              <label>Start</label>
              <input type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)}
                     required data-testid="cm-visit-start" />
            </div>
            <div className="cm-form-row">
              <label>End</label>
              <input type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)}
                     required data-testid="cm-visit-end" />
            </div>
          </div>

          <div className="cm-form-grid-2">
            <div className="cm-form-row">
              <label>Crew</label>
              <select value={crewId} onChange={(e) => setCrewId(e.target.value)} data-testid="cm-visit-crew">
                <option value="">— Unassigned —</option>
                {crews.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="cm-form-row">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} data-testid="cm-visit-status">
                <option value="scheduled">Scheduled</option>
                <option value="on_site">On Site</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="cm-form-row">
            <label>Internal notes <span>(office + crew only)</span></label>
            <textarea rows={2} value={notesInternal} onChange={(e) => setNotesInternal(e.target.value)}
                      placeholder="Gate codes, special instructions, etc." />
          </div>

          <div className="cm-form-row">
            <label>Customer-facing notes <span>(visible on tracker page)</span></label>
            <textarea rows={2} value={notesCustomer} onChange={(e) => setNotesCustomer(e.target.value)}
                      placeholder="e.g., Drill rig arrives between 8-9 AM." />
          </div>

          {error && (
            <div className="cm-form-error">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="cm-modal-actions">
            {mode === 'edit' && (
              <button type="button" className="cm-btn-danger" onClick={handleDelete} disabled={submitting}
                      data-testid="cm-visit-delete">
                <Trash2 size={14} /> Delete
              </button>
            )}
            <div className="cm-modal-actions-right">
              <button type="button" className="cm-btn-ghost" onClick={onClose} disabled={submitting}>Cancel</button>
              <button type="submit" className="cm-btn-primary" disabled={submitting} data-testid="cm-visit-save">
                {submitting ? 'Saving…' : (mode === 'edit' ? 'Save Changes' : 'Schedule Visit')}
                {!submitting && <CheckCircle2 size={15} />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
