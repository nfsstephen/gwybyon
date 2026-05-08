import React from 'react';
import { Check, Globe, RefreshCw } from 'lucide-react';

const ICONS = { Globe, RefreshCw };

export const WebsiteSelection = ({ options, websiteChoice, serviceType, onSelect }) => (
  <div className="sub-website-options">
    {options.map(opt => {
      const Icon = ICONS[opt.iconName] || Globe;
      const isBuildSelected = websiteChoice === opt.id && serviceType === 'build';
      const isUpgradeSelected = websiteChoice === opt.id && serviceType === 'upgrade';
      const isCardActive = websiteChoice === opt.id;
      return (
        <div
          key={opt.id}
          data-testid={`website-${opt.id}`}
          className={`sub-website-card ${isCardActive ? 'selected' : ''}`}
        >
          <div className="sub-website-card-header">
            <Icon size={20} className="sub-website-icon" />
            <div className="sub-website-info">
              <div className="sub-website-name">{opt.label}</div>
              <div className="sub-website-desc">{opt.description}</div>
            </div>
          </div>
          <div className="sub-website-suboptions">
            <button
              data-testid={`website-${opt.id}-build`}
              className={`sub-website-suboption ${isBuildSelected ? 'active' : ''}`}
              onClick={() => onSelect(opt.id, 'build')}
            >
              <div className="sub-suboption-check">
                {isBuildSelected ? <Check size={14} /> : <div className="sub-tier-circle" />}
              </div>
              <span className="sub-suboption-label">{opt.buildLabel}</span>
              <span className="sub-suboption-price">${opt.buildPrice}</span>
            </button>
            <p className="sub-upgrade-explainer" data-testid={`upgrade-explainer-${opt.id}`}>
              ONCE basic build or rebuild accepted any upgrades later only have a set cost of:
            </p>
            <button
              data-testid={`website-${opt.id}-upgrade`}
              className={`sub-website-suboption ${isUpgradeSelected ? 'active' : ''}`}
              onClick={() => onSelect(opt.id, 'upgrade')}
            >
              <div className="sub-suboption-check">
                {isUpgradeSelected ? <Check size={14} /> : <div className="sub-tier-circle" />}
              </div>
              <span className="sub-suboption-label">Upgrade</span>
              <span className="sub-suboption-price">${opt.upgradePrice}</span>
            </button>
            {isUpgradeSelected && (
              <p className="sub-upgrade-note" data-testid={`upgrade-note-${opt.id}`}>
                Someone will be in contact with you to learn what upgrades you desire.
              </p>
            )}
          </div>
        </div>
      );
    })}
  </div>
);
