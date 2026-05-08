import React from 'react';
import { CONTINENTAL_STATES } from './constants';

export const BusinessForm = ({ businessDetails, onChange }) => (
  <div className="sub-business-form" data-testid="business-details-form">
    <div className="sub-business-field">
      <label htmlFor="biz-name">Business Name</label>
      <input
        id="biz-name"
        data-testid="business-name-input"
        type="text"
        placeholder="Your business name"
        value={businessDetails.name}
        onChange={e => onChange('name', e.target.value)}
        required
      />
    </div>
    <div className="sub-business-field">
      <label htmlFor="biz-address">Address</label>
      <input
        id="biz-address"
        data-testid="business-address-input"
        type="text"
        placeholder="Street address"
        value={businessDetails.address}
        onChange={e => onChange('address', e.target.value)}
        required
      />
    </div>
    <div className="sub-business-row sub-business-row-3col">
      <div className="sub-business-field">
        <label htmlFor="biz-city">City</label>
        <input
          id="biz-city"
          data-testid="business-city-input"
          type="text"
          placeholder="City"
          value={businessDetails.city}
          onChange={e => onChange('city', e.target.value)}
          required
        />
      </div>
      <div className="sub-business-field">
        <label htmlFor="biz-state">State</label>
        <select
          id="biz-state"
          data-testid="business-state-select"
          value={businessDetails.state}
          onChange={e => onChange('state', e.target.value)}
          required
        >
          <option value="">Select State</option>
          {CONTINENTAL_STATES.map(s => (
            <option key={s.abbr} value={s.abbr}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="sub-business-field sub-business-field-zip">
        <label htmlFor="biz-zip">Zip Code</label>
        <input
          id="biz-zip"
          data-testid="business-zip-input"
          type="text"
          placeholder="Zip"
          value={businessDetails.zip}
          onChange={e => onChange('zip', e.target.value)}
          required
        />
      </div>
    </div>
    <div className="sub-business-field">
      <label htmlFor="biz-email">Email Address</label>
      <input
        id="biz-email"
        data-testid="business-email-input"
        type="email"
        placeholder="you@example.com"
        value={businessDetails.email}
        onChange={e => onChange('email', e.target.value)}
      />
    </div>
  </div>
);
