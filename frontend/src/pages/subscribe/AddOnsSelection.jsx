import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Plus, Check, ArrowRight, Sparkles } from 'lucide-react';

const ICONS = { CalendarClock };

/**
 * Add-On Tools selection card list.
 * Add-ons are optional layered features on top of a tier.
 * Pricing may be null (TBD) — UI shows "Pricing TBD" instead of a number.
 */
export const AddOnsSelection = ({ addOns, selectedAddOns, onToggle }) => {
  return (
    <div className="sub-addons" data-testid="addons-selection">
      {addOns.map((addon) => {
        const Icon = ICONS[addon.iconName] || CalendarClock;
        const isSelected = selectedAddOns.includes(addon.id);
        return (
          <div
            key={addon.id}
            className={`sub-addon-card ${isSelected ? 'sub-addon-selected' : ''}`}
            data-testid={`addon-card-${addon.id}`}
          >
            {addon.badge && (
              <span className="sub-addon-badge">
                <Sparkles size={11} />
                {addon.badge}
              </span>
            )}

            <div className="sub-addon-head">
              <div className="sub-addon-icon">
                <Icon size={22} />
              </div>
              <div className="sub-addon-title-block">
                <h3 className="sub-addon-name">{addon.name}</h3>
                <p className="sub-addon-tagline"><em>{addon.tagline}</em></p>
              </div>
            </div>

            <p className="sub-addon-desc">{addon.description}</p>

            <div className="sub-addon-pricing">
              <div className="sub-addon-price-block">
                <div className="sub-addon-price-label">Monthly</div>
                <div className="sub-addon-price-value">
                  {addon.monthlyPrice == null ? <span className="sub-addon-tbd">Pricing TBD</span> : `$${addon.monthlyPrice}/mo`}
                </div>
              </div>
              <div className="sub-addon-price-divider" />
              <div className="sub-addon-price-block">
                <div className="sub-addon-price-label">Setup</div>
                <div className="sub-addon-price-value">
                  {addon.setupPrice == null ? <span className="sub-addon-tbd">Pricing TBD</span> : `$${addon.setupPrice}`}
                </div>
              </div>
            </div>

            <div className="sub-addon-actions">
              <button
                type="button"
                className={`sub-addon-toggle ${isSelected ? 'sub-addon-toggle-on' : ''}`}
                onClick={() => onToggle(addon.id)}
                data-testid={`addon-toggle-${addon.id}`}
              >
                {isSelected ? (
                  <>
                    <Check size={16} />
                    Added to Subscription
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add To My Subscription
                  </>
                )}
              </button>

              {addon.learnMorePath && (
                <Link
                  to={addon.learnMorePath}
                  className="sub-addon-learn"
                  data-testid={`addon-learn-${addon.id}`}
                >
                  Learn More
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
