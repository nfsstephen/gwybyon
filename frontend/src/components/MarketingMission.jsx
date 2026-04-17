import React from 'react';
import { Target, BookOpen, DollarSign, Mail, CheckCircle } from 'lucide-react';
import './MarketingMission.css';

const MarketingMission = () => {
  return (
    <section className="mm-section">
      <div className="mm-container">
        <div className="mm-badge">OUR MISSION</div>
        <h2 className="mm-title">
          Websites Are Built to Advertise.<br />
          <span className="mm-accent">It's Time Someone Remembered That.</span>
        </h2>
        <p className="mm-subtitle">
          Gateway AI Systems exists to return website development to its original purpose: 
          bringing new customers to your business. Not feeding egos. Not selling colors and fonts. 
          Marketing.
        </p>

        {/* The Problem: Industry Lost Its Way */}
        <div className="mm-narrative">
          <div className="mm-narrative-block">
            <div className="mm-narrative-icon"><BookOpen size={28} /></div>
            <div className="mm-narrative-content">
              <h3>How the Industry Lost Its Way</h3>
              <p>
                Websites are a technology born from the digital revolution — first with personal computers, 
                then reshaped by mobile phones and responsive design. But somewhere along the way, the people 
                building websites started selling the wrong things. Design trends. Color palettes. Domain names. 
                Features that had little to do with the actual purpose of a website, but everything to do with 
                the amount of labor and expertise it took to build one.
              </p>
              <p>
                The result? An entire industry that prices websites based on how they look — appealing 
                to the ego of the company owner — instead of what they do: advertise your business 
                and bring customers through your door.
              </p>
            </div>
          </div>

          <div className="mm-narrative-block">
            <div className="mm-narrative-icon"><Target size={28} /></div>
            <div className="mm-narrative-content">
              <h3>Remember the Yellow Pages?</h3>
              <p>
                Before websites existed, local businesses advertised in the Yellow Pages. And the Yellow Pages 
                got one thing exactly right: pricing was based on <strong>market size and potential</strong>. 
                A full-page ad in a large metropolitan area with a massive customer base cost more than the same 
                ad in a small rural market. That made sense — because the value of advertising is directly 
                tied to how many potential customers it reaches.
              </p>
              <p>
                Websites replaced the Yellow Pages. But the pricing philosophy was thrown out entirely. 
                Today, a small-town plumber pays the same as a plumber in a major metro — even though the 
                metro plumber has ten times the customer base and ten times the competition.
              </p>
            </div>
          </div>

          <div className="mm-narrative-block">
            <div className="mm-narrative-icon"><DollarSign size={28} /></div>
            <div className="mm-narrative-content">
              <h3>Pricing Should Reflect Results, Not Labor</h3>
              <p>
                Here's what the industry won't tell you: getting your website to the top of search results 
                is <strong>significantly easier in small markets</strong>. Less competition. Fewer businesses 
                fighting for the same results — placing your business at the top of the page. The work required to produce results — actual customers walking 
                through your door — is simply less.
              </p>
              <p>
                So why would we charge a small-market business the same as a large-market business? We wouldn't. 
                The cost to our customers is based on the market potential and the effort required to deliver 
                results — not the ego of the buyer and not a one-size-fits-all price tag.
              </p>
            </div>
          </div>
        </div>

        {/* The Gateway Approach */}
        <div className="mm-approach">
          <div className="mm-approach-header">
            <Mail size={24} />
            <h3>How our Business Model works</h3>
          </div>
          <div className="mm-approach-grid">
            <div className="mm-approach-card">
              <div className="mm-approach-step">01</div>
              <h4>Invitation Only</h4>
              <p>
                Our customers are selected, not solicited. We hope that makes you feel important because you are, at least to us. You have received an invitation email because we've identified your company as a "Local Authority" but yet because of an inadequate website you are not recognized as such. We work with one business per industry per territory, using that process we can guarantee you will begin to attract the customers that have been looking for you all along.
              </p>
            </div>
            <div className="mm-approach-card">
              <div className="mm-approach-step">02</div>
              <h4>Exclusive Market Territory</h4>
              <p>
                By purchasing the rights to an exclusive market territory, you have purchased our commitment to your success. You will have received our promise that we will work for you and you alone. To promote the "Local Authority" badge that you have earned in your industry. Search engine results can only promise one company the top of page view. We will be working to get you there.
              </p>
            </div>
            <div className="mm-approach-card">
              <div className="mm-approach-step">03</div>
              <h4>Results Based Pricing</h4>
              <p>
                As stated earlier in the page, websites are about marketing. It is fair for you to expect results for your marketing costs. Your marketing costs should be fair. Why should small market customers pay Large market prices? In marketing it is not the labor that costs it is the expertise, knowing what delivers results. You deserve that and we commit to deliver results. Results that can be measured, and the tools to make those measurements.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mm-bottom-line">
          <CheckCircle size={22} />
          <p>
            <strong>The bottom line:</strong> It's time for website developers to be honest with their 
            customers. The cost of building a site is irrelevant. What matters is the cost to produce 
            the results your business needs — new customers. All of our pricing is based on the time 
            and effort it takes to get your business to the top of the search results in your market. 
            Nothing more, nothing less.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketingMission;
