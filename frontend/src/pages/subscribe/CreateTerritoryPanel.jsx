import React from 'react';

export const CreateTerritoryPanel = ({
  createTerritory,
  setCreateTerritory,
  industry,
  newTerritoryName,
  setNewTerritoryName,
  selectedCounties,
  countyNames,
  territorySubmitted,
  setTerritorySubmitted,
  territoryConfirmed,
  setTerritoryConfirmed,
  territoryLoading,
  territoryError,
  setTerritoryError,
  onSubmit,
}) => (
  <div className="sub-new-territory-panel" data-testid="new-territory-panel">
    <label className="sub-new-territory-toggle" data-testid="create-territory-checkbox">
      <input
        type="checkbox"
        checked={createTerritory}
        onChange={e => {
          setCreateTerritory(e.target.checked);
          setTerritorySubmitted(false);
          setTerritoryError(null);
          setTerritoryConfirmed(false);
          setNewTerritoryName('');
        }}
      />
      <span className="sub-new-territory-checkmark" />
      <span className="sub-new-territory-toggle-label">Create New Territory</span>
    </label>
    <p className="sub-new-territory-hint">
      Any adjoining counties not already taken can be selected to form a new territory
    </p>

    {createTerritory && !industry && (
      <p className="sub-new-territory-error" data-testid="territory-no-industry-warning" style={{ color: '#f4b400', marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
        Please select an industry above before creating a territory. Each territory is specific to an industry.
      </p>
    )}

    {createTerritory && industry && (
      <div className="sub-new-territory-form" data-testid="new-territory-form">
        <p className="sub-new-territory-industry-tag" data-testid="territory-industry-label" style={{ color: '#0d9488', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          Creating territory for: {industry}
        </p>
        <div className="sub-new-territory-field">
          <label>New Territory Name</label>
          <input
            type="text"
            data-testid="new-territory-name-input"
            value={newTerritoryName}
            onChange={e => { setNewTerritoryName(e.target.value); setTerritoryConfirmed(false); }}
            placeholder="Bodacious Electrical"
          />
        </div>
        <p className="sub-new-territory-select-label">
          Select counties to add to your new territory
        </p>

        {selectedCounties.length > 0 && (
          <div className="sub-new-territory-counties" data-testid="new-territory-counties">
            {selectedCounties.map(id => (
              <span key={id} className="sub-new-territory-county-chip">
                {countyNames[id] || id}
              </span>
            ))}
          </div>
        )}

        {/* Step 1: SUBMIT checkbox */}
        <label className="sub-new-territory-submit" data-testid="submit-territory-checkbox">
          <input
            type="checkbox"
            checked={territoryConfirmed || territorySubmitted}
            onChange={e => {
              if (e.target.checked) {
                setTerritoryConfirmed(true);
              } else {
                setTerritoryConfirmed(false);
              }
            }}
            disabled={!newTerritoryName.trim() || selectedCounties.length === 0 || territoryLoading || territorySubmitted}
          />
          <span className="sub-new-territory-checkmark" />
          <span className="sub-new-territory-submit-label">SUBMIT</span>
        </label>

        {/* Step 2: Confirmation */}
        {territoryConfirmed && !territorySubmitted && (
          <div className="sub-new-territory-confirm" data-testid="territory-confirm-panel" style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #f59e0b' }}>
            <p style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Verify this new territory is for the <strong>"{industry}"</strong> industry.
            </p>
            <label className="sub-new-territory-submit" data-testid="confirm-industry-checkbox" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                onChange={e => {
                  if (e.target.checked) {
                    onSubmit();
                  }
                }}
                disabled={territoryLoading}
              />
              <span className="sub-new-territory-checkmark" />
              <span className="sub-new-territory-submit-label" style={{ color: '#92400e' }}>
                {territoryLoading ? 'SAVING...' : 'CONFIRM & CREATE TERRITORY'}
              </span>
            </label>
          </div>
        )}

        {territoryError && (
          <p className="sub-new-territory-error" data-testid="territory-error-msg" style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.85rem' }}>
            {territoryError}
          </p>
        )}
        {territorySubmitted && (
          <p className="sub-new-territory-confirmation" data-testid="territory-submitted-msg">
            Territory "{newTerritoryName}" has been <strong>reserved</strong> for the <strong>{industry}</strong> industry. Your selected counties are now held pending deposit. The territory will be confirmed once the 25% deposit is received.
          </p>
        )}
      </div>
    )}
  </div>
);
