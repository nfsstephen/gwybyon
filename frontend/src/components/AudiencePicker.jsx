import React from 'react';
import { Wrench, Building2, Sprout, ArrowRight } from 'lucide-react';
import './AudiencePicker.css';

/**
 * The three-pill self-segmenter that sits above the heroes on the
 * default homepage. Clicking a pill collapses the other two heroes
 * and persists the choice (handled by the parent via setAudience).
 */
const AudiencePicker = ({ audience, setAudience, variant = 'top' }) => {
  const options = [
    { value: 'agency',  Icon: Building2, line1: 'I hired a website agency',     line2: 'and the rankings still aren\'t there' },
    { value: 'diy',     Icon: Wrench,    line1: 'I built it myself',            line2: 'to save money — but no leads' },
    { value: 'no-site', Icon: Sprout,    line1: "I don't have a website yet",   line2: 'or just a Facebook / Google page' },
  ];

  const isCompact = variant === 'compact';

  return (
    <div className={`ap-wrap ap-${variant}`} data-testid="audience-picker">
      <div className="ap-prompt">
        <span className="ap-eyebrow">SHOW ME WHAT FITS</span>
        <h3 className="ap-headline">
          Which describes your business right now?
        </h3>
      </div>

      <div className="ap-grid" role="radiogroup" aria-label="Choose your situation">
        {options.map(({ value, Icon, line1, line2 }) => {
          const isActive = audience === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`ap-pill ${isActive ? 'is-active' : ''}`}
              onClick={() => setAudience(value)}
              data-testid={`audience-pick-${value}`}
            >
              <span className="ap-pill-icon"><Icon size={isCompact ? 18 : 22} /></span>
              <span className="ap-pill-text">
                <span className="ap-pill-line1">{line1}</span>
                <span className="ap-pill-line2">{line2}</span>
              </span>
              <span className="ap-pill-arrow"><ArrowRight size={14} /></span>
            </button>
          );
        })}
      </div>

      {audience !== 'all' && (
        <button
          type="button"
          className="ap-reset"
          onClick={() => setAudience('all')}
          data-testid="audience-reset"
        >
          ← see all options
        </button>
      )}
    </div>
  );
};

export default AudiencePicker;
