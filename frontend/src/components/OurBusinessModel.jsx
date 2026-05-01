import React from 'react';
import { Mail } from 'lucide-react';
import './OurBusinessModel.css';

const OurBusinessModel = () => {
  return (
    <section className="obm-section" data-testid="our-business-model">
      <div className="obm-container">
        <div className="obm-badge">OUR BUSINESS MODEL</div>
        <h2 className="obm-title">
          How Gateway AI Systems Works
        </h2>
        <p className="obm-subtitle">
          There's only one company in your county we can profit from — you.
          When you buy your territory, you put us in the same boat: we don't
          get paid by your competitors, we don't sell them the tools to beat
          you, and the only way we make money is by making you the name that
          shows up first.
        </p>

        <div className="obm-approach">
          <div className="obm-approach-header">
            <Mail size={22} />
            <h3>The Three Commitments</h3>
          </div>
          <div className="obm-approach-grid">
            <div className="obm-approach-card">
              <div className="obm-approach-step">01</div>
              <h4>Invitation Only</h4>
              <p>
                Our customers are selected, not solicited. We hope that makes
                you feel important because you are, at least to us. You have
                received an invitation email because we've identified your
                company as a "Local Authority" but yet because of an
                inadequate website you are not recognized as such. We work
                with one business per industry per territory, using that
                process we can guarantee you will begin to attract the
                customers that have been looking for you all along.
              </p>
            </div>
            <div className="obm-approach-card">
              <div className="obm-approach-step">02</div>
              <h4>Exclusive Market Territory</h4>
              <p>
                By purchasing the rights to an exclusive market territory,
                you have purchased our commitment to your success. You will
                have received our promise that we will work for you and you
                alone. To promote the "Local Authority" badge that you have
                earned in your industry. Search engine results can only
                promise one company the top of page view. We will be working
                to get you there.
              </p>
            </div>
            <div className="obm-approach-card">
              <div className="obm-approach-step">03</div>
              <h4>Results Based Pricing</h4>
              <p>
                You pay for marketing because you expect customers in return
                — that is a fair expectation, and it's the only one we hold
                ourselves to. So why does the industry charge a small-town
                shop the same as a big-city competitor whose market is ten
                times the size? In marketing, what costs isn't the labor —
                it's the expertise. Knowing what actually delivers customers
                in your specific market. We price our work based on the size
                of your market and the effort it takes to win it. Then we
                hand you the tools to see exactly what you're getting back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBusinessModel;
