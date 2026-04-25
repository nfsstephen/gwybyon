import React from 'react';
import { Check, MapPin, Crown } from 'lucide-react';
import { TIERS } from './constants';

export const TierSelection = ({ selectedTier, onSelectTier }) => (
  <>
    <div className="sub-tier-group">
      <div className="sub-tier-group-label sub-tier-group-small">
        <MapPin size={14} /> Small Market Territory
      </div>
      <div className="sub-tiers sub-tiers-2col">
        {TIERS.filter(s => s.market === 'small').map(svc => {
          const isSelected = selectedTier === svc.id;
          return (
            <button
              key={svc.id}
              data-testid={`tier-select-${svc.id}`}
              className={`sub-tier-card ${isSelected ? 'selected' : ''} ${svc.popular ? 'popular' : ''}`}
              onClick={() => onSelectTier(isSelected ? null : svc.id)}
            >
              {svc.popular && <span className="sub-popular-badge">Recommended</span>}
              <div className="sub-tier-top">
                <div className="sub-tier-check">
                  {isSelected ? <Check size={18} /> : <div className="sub-tier-circle" />}
                </div>
                <div>
                  <div className="sub-tier-label">{svc.tools} Tools</div>
                  <div className="sub-tier-name">{svc.name}</div>
                </div>
                <div className="sub-tier-price">
                  ${svc.monthlyPrice.toLocaleString()}<span>/mo</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>

    <div className="sub-tier-group">
      <div className="sub-tier-group-label sub-tier-group-large">
        <Crown size={14} /> Large Market Territory
      </div>
      <div className="sub-tiers sub-tiers-1col">
        {TIERS.filter(s => s.market === 'large').map(svc => {
          const isSelected = selectedTier === svc.id;
          return (
            <button
              key={svc.id}
              data-testid={`tier-select-${svc.id}`}
              className={`sub-tier-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectTier(isSelected ? null : svc.id)}
            >
              <div className="sub-tier-top">
                <div className="sub-tier-check">
                  {isSelected ? <Check size={18} /> : <div className="sub-tier-circle" />}
                </div>
                <div>
                  <div className="sub-tier-label">{svc.tools} Tools</div>
                  <div className="sub-tier-name">{svc.name}</div>
                </div>
                <div className="sub-tier-price">
                  ${svc.monthlyPrice.toLocaleString()}<span>/mo</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </>
);
