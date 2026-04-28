import React from 'react';
import { Wrench, Building2, Sprout, ArrowRight, ArrowDown } from 'lucide-react';
import './AudiencePicker.css';

/**
 * Three-pill self-segmenter that sits above the heroes on the homepage.
 * Designed to be IMPOSSIBLE TO MISS — dark contrast band, numbered pills,
 * staggered entrance animation, prominent headline.
 */
const AudiencePicker = ({ audience, setAudience }) => {
  const showFullPrompt = audience === 'all';

  const options = [
    {
      value: 'agency',
      num: '01',
      Icon: Building2,
      accent: '#2563eb',
      headline: 'I hired a website agency',
      sub: 'and the rankings still aren\'t there',
    },
    {
      value: 'diy',
      num: '02',
      Icon: Wrench,
      accent: '#d97706',
      headline: 'I built it myself',
      sub: 'to save money — but no leads',
    },
    {
      value: 'no-site',
      num: '03',
      Icon: Sprout,
      accent: '#0D9488',
      headline: "I don't have a website yet",
      sub: 'or just a Facebook / Google page',
    },
  ];

  return (
    <section className="ap-band" data-testid="audience-picker">
      <div className="ap-glow" aria-hidden />
      <div className="ap-container">
        {showFullPrompt ? (
          <div className="ap-prompt">
            <span className="ap-eyebrow">START HERE</span>
            <h2 className="ap-headline">
              Which one is you?
            </h2>
            <p className="ap-sub">
              Tap the box that fits your business. We'll tailor the rest of
              this page to your situation — and stop wasting your time on the
              two pitches that don't apply to you.
            </p>
          </div>
        ) : (
          <div className="ap-prompt ap-prompt-compact">
            <span className="ap-eyebrow">CURRENTLY SHOWING</span>
            <h2 className="ap-headline ap-headline-compact">
              Wrong one? Switch below.
            </h2>
          </div>
        )}

        <div className="ap-grid" role="radiogroup" aria-label="Choose your situation">
          {options.map(({ value, num, Icon, accent, headline, sub }, idx) => {
            const isActive = audience === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`ap-pill ${isActive ? 'is-active' : ''}`}
                style={{ '--accent': accent, '--delay': `${idx * 90}ms` }}
                onClick={() => setAudience(value)}
                data-testid={`audience-pick-${value}`}
              >
                <span className="ap-pill-num">{num}</span>
                <span className="ap-pill-icon">
                  <Icon size={26} strokeWidth={2.2} />
                </span>
                <span className="ap-pill-text">
                  <span className="ap-pill-line1">{headline}</span>
                  <span className="ap-pill-line2">{sub}</span>
                </span>
                <span className="ap-pill-arrow"><ArrowRight size={18} strokeWidth={2.4} /></span>
                {isActive && <span className="ap-pill-active-tag">SHOWING</span>}
              </button>
            );
          })}
        </div>

        {showFullPrompt ? (
          <div className="ap-hint">
            <ArrowDown size={14} className="ap-hint-arrow" />
            <span>or scroll on for the full overview</span>
          </div>
        ) : (
          <button
            type="button"
            className="ap-reset"
            onClick={() => setAudience('all')}
            data-testid="audience-reset"
          >
            ← see all three options
          </button>
        )}
      </div>
    </section>
  );
};

export default AudiencePicker;
