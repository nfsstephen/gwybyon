import React from 'react';
import { Scale } from 'lucide-react';
import './AlignedObjectivesBanner.css';

/**
 * Reusable "Our Objectives Are Aligned" banner.
 * Used on the homepage and the eight-industries page so the
 * structural-alignment message lands wherever the prospect enters.
 */
const AlignedObjectivesBanner = ({ wrap = true }) => {
  const inner = (
    <div className="aob-banner" data-testid="aligned-objectives-banner">
      <div className="aob-icon">
        <Scale size={26} />
      </div>
      <div className="aob-text">
        <span className="aob-eyebrow">OUR OBJECTIVES ARE ALIGNED</span>
        <p>
          This is the product that joins our objectives together.
          As we help you grow your sales, we also grow the need for our
          Crew Management Tool. <strong>We don't make money when you stand
          still — we make money when you grow.</strong> Our incentives are
          structurally aligned with yours, not just promised to be.
        </p>
      </div>
    </div>
  );

  // When `wrap` is true, the banner gets its own <section> with padding so
  // it stands alone (used between full sections). When false, the caller
  // controls the surrounding container (used inside another section).
  if (!wrap) return inner;

  return (
    <section className="aob-section">
      <div className="aob-container">{inner}</div>
    </section>
  );
};

export default AlignedObjectivesBanner;
