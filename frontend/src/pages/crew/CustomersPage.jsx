import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, AlertCircle, Users } from 'lucide-react';
import { useCmAuth } from '../../contexts/CmAuthContext';

const CustomersPage = () => {
  const { authedFetch } = useCmAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await authedFetch('/customers');
      const d = await r.json();
      setCustomers(d.customers || []);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }, [authedFetch]);

  useEffect(() => { load(); }, [load]);

  const filtered = customers.filter((c) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return [c.full_name, c.email, c.phone, c.address].some((f) => (f || '').toLowerCase().includes(q));
  });

  const handleDelete = async (cust) => {
    if (!window.confirm(`Delete ${cust.full_name}?`)) return;
    try {
      const r = await authedFetch(`/customers/${cust.id}`, { method: 'DELETE' });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.detail || 'Failed to delete');
      }
      load();
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="cm-list-page" data-testid="cm-customers-page">
      <div className="cm-list-head">
        <div>
          <div className="cm-sched-eyebrow">CUSTOMERS</div>
          <h1 className="cm-sched-title">Your Customers</h1>
          <p className="cm-list-sub">Everyone you do work for. You can also create a customer directly when scheduling a new visit.</p>
        </div>
        <button className="cm-new-btn" onClick={() => setEditing('new')} data-testid="cm-new-customer-btn">
          <Plus size={14} /> New Customer
        </button>
      </div>

      <div className="cm-search-row">
        <input type="text" placeholder="Search by name, phone, address…"
               value={query} onChange={(e) => setQuery(e.target.value)}
               data-testid="cm-customer-search" />
      </div>

      {error && <div className="cm-error">{error}</div>}

      {loading ? <div className="cm-loading">Loading…</div>
       : customers.length === 0 ? (
        <div className="cm-empty-state">
          <Users size={34} /><h3>No customers yet</h3>
          <p>Add your first customer, or create one while scheduling.</p>
          <button className="cm-btn-primary" onClick={() => setEditing('new')}>
            <Plus size={14} /> Create your first customer
          </button>
        </div>
      ) : (
        <div className="cm-simple-table">
          <div className="cm-simple-table-head">
            <div>Name</div>
            <div>Phone</div>
            <div style={{ flex: 2 }}>Address</div>
            <div style={{ width: 160, textAlign: 'right' }}>Actions</div>
          </div>
          {filtered.map((c) => (
            <div key={c.id} className="cm-simple-table-row" data-testid={`cm-customer-row-${c.id}`}>
              <div><strong>{c.full_name}</strong>{c.email && <div className="cm-cell-sub">{c.email}</div>}</div>
              <div>{c.phone || <span className="cm-muted">—</span>}</div>
              <div style={{ flex: 2 }}>{c.address || <span className="cm-muted">—</span>}</div>
              <div style={{ textAlign: 'right' }}>
                <button className="cm-btn-mini" onClick={() => setEditing(c)}><Pencil size={12}/> Edit</button>
                <button className="cm-btn-mini cm-btn-mini-danger" onClick={() => handleDelete(c)}><Trash2 size={12}/> Delete</button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="cm-simple-table-row"><div className="cm-muted">No matches.</div></div>}
        </div>
      )}

      {editing && (
        <CustomerModal customer={editing === 'new' ? null : editing}
                       onClose={() => setEditing(null)}
                       onSaved={() => { setEditing(null); load(); }} />
      )}
    </div>
  );
};

const CustomerModal = ({ customer, onClose, onSaved }) => {
  const { authedFetch } = useCmAuth();
  const [form, setForm] = useState({
    full_name: customer?.full_name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    notes: customer?.notes || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSubmitting(true);
    try {
      const res = customer
        ? await authedFetch(`/customers/${customer.id}`, { method: 'PATCH', body: JSON.stringify(form) })
        : await authedFetch('/customers', { method: 'POST', body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.detail || 'Failed to save'); }
      onSaved();
    } catch (err) { setError(err.message); setSubmitting(false); }
  };

  const field = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="cm-modal-overlay" onClick={onClose}>
      <div className="cm-modal cm-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="cm-modal-head">
          <h2>{customer ? 'Edit Customer' : 'New Customer'}</h2>
          <button type="button" className="cm-modal-close" onClick={onClose}><X size={18}/></button>
        </div>
        <form onSubmit={onSubmit} className="cm-modal-body">
          <div className="cm-form-row">
            <label>Full name *</label>
            <input type="text" value={form.full_name} onChange={field('full_name')}
                   required autoFocus data-testid="cm-customer-name-input" />
          </div>
          <div className="cm-form-grid-2">
            <div className="cm-form-row">
              <label>Phone</label>
              <input type="text" value={form.phone} onChange={field('phone')} />
            </div>
            <div className="cm-form-row">
              <label>Email</label>
              <input type="email" value={form.email} onChange={field('email')} />
            </div>
          </div>
          <div className="cm-form-row">
            <label>Address</label>
            <input type="text" value={form.address} onChange={field('address')} />
          </div>
          <div className="cm-form-row">
            <label>Notes</label>
            <textarea rows={3} value={form.notes} onChange={field('notes')}
                      placeholder="Internal notes about this customer" />
          </div>
          {error && <div className="cm-form-error"><AlertCircle size={14}/> {error}</div>}
          <div className="cm-modal-actions">
            <div className="cm-modal-actions-right">
              <button type="button" className="cm-btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="cm-btn-primary" disabled={submitting} data-testid="cm-customer-save">
                {submitting ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomersPage;
