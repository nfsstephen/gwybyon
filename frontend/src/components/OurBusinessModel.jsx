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
          Three commitments that shape every customer relationship — and the
          reason our customers don't have to compete with us, only with the
          markets we help them win.
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
              <h4>Fair Results Based Pricing</h4>
              <p>
                Websites are about marketing. It is fair for you to expect
                results for your marketing costs. Your marketing costs
                should be fair. Why should small market customers pay large
                market prices? In marketing it is not the labor that costs
                — it is the expertise, knowing what delivers results. You
                deserve that and we commit to deliver results. Results that
                can be measured, and the tools to make those measurements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBusinessModel;
