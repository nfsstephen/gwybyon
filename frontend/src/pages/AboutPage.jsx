import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 data-testid="about-page-title">About Us</h1>
          <p className="about-hero-subtitle">New Frontier Systems</p>
          <p className="about-hero-subline">NOW Gateway AI Systems, Inc.</p>
        </div>
      </section>

      {/* Mission Statements */}
      <section className="about-statements">
        <div className="about-container">
          <div className="statement-card">
            <h2>Wealth is not an OBJECTIVE it is a BY-PRODUCT of Creating Value.</h2>
          </div>
        </div>
      </section>

      {/* Company Description */}
      <section className="about-description">
        <div className="about-container">
          <div className="description-content">
            <div className="description-text">
              <h2>Not About us -<br />the focus is on our customers.<br />The people we serve.</h2>
              <p>
                Our objective is to implement new technologies and solutions into business models 
                that have historically resisted change.
              </p>
              <p>
                Trucking fits that mold. Overnight Truck parking was a HUGE problem and with the 
                advent of Electronic Drivers Logs overnight parking has morphed into a crisis.
              </p>
              <p>
                By utilizing Cloud Computing, AI (LPR – License Plate Reader) and now Blockchain 
                technology, we can truly solve a myriad of problems that affect industries and people.
              </p>
            </div>
            <div className="description-images">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2023/03/about-us-newfrontier-systems.jpg" 
                alt="About New Frontier Systems" 
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="about-journey">
        <div className="about-container">
          <h2>Our Journey</h2>
          <div className="journey-content">
            <p>
              After a lifetime of working in technology, agriculture, construction and trucking 
              industries, I formed New Frontier Systems, Inc. as a platform to utilize life changing 
              technologies – the Internet, Cloud Computing and now AI technology. I could utilize my 
              real world experience to build solutions with technology, but I needed a partner that 
              knew technology.
            </p>
            <p>
              Thus began a two year search for a young person that has the skill set needed to be a 
              leader in the technology field. But more importantly had the morals and values needed 
              to develop into the type of leader needed to truly succeed.
            </p>
            <p>
              I knew after working with Soumitri for only a few months that he was that young man. 
              I am honored that he has decided to join me on this journey.
            </p>
            <p>
              If you are deciding to join the journey as either a Team Member or Customer just know 
              that you are our purpose and we Welcome you on the journey. It is our objective to serve you.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="about-container">
          <h2>The Buck Stops Here</h2>
          <div className="team-grid">
            <div className="team-member" data-testid="team-stephen">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2023/02/stephen-hendricks.jpg" 
                alt="Stephen Hendricks" 
                className="team-photo"
              />
              <h3>Stephen Hendricks</h3>
              <p className="team-role">Co - Founder</p>
            </div>
            <div className="team-member" data-testid="team-soumitri">
              <img 
                src="https://gatewayaisystems.com/wp-content/uploads/2023/02/soumitri-panda.jpg" 
                alt="Soumitri Panda" 
                className="team-photo"
              />
              <h3>Soumitri Panda</h3>
              <p className="team-role">Co - Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grit Statement */}
      <section className="about-grit">
        <div className="about-container">
          <div className="statement-card highlight">
            <p>Looking for an easy JOB?<br />
            We have great challenges ahead of us.<br />
            If you don't have GRIT do us all a favor and move on.<br />
            We are searching for people with both Passion and Perseverance.</p>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="about-quotes">
        <div className="about-container">
          <div className="quotes-grid">
            <blockquote>"IF you want to go FAST go Alone, if you want to go FAR go together."</blockquote>
            <blockquote>"People do not fail, they give up."</blockquote>
            <blockquote>"I can promise Change will happen! With or without you."</blockquote>
            <blockquote>"LEARN to accept and enjoy change OR at the very least quit fighting it."</blockquote>
            <blockquote>"To help others help themselves is the best way to help yourself."</blockquote>
            <blockquote>"People do not care how much you know until they know how much you care."</blockquote>
            <blockquote>"Mistakes are lessons, what you learn from them is the question!"</blockquote>
            <blockquote>"We can never learn from a mistake that is not acknowledged!"</blockquote>
            <blockquote>"Does what I am doing matter and am I good at it?"</blockquote>
            <blockquote>"The correct lesson to learn from surprises is that the world is surprising."</blockquote>
            <blockquote>"The most important part of every plan is planning on your plan not going according to plan."</blockquote>
            <blockquote>"Never Let the Perfect stand in the way of the GOOD."</blockquote>
            <blockquote>"It takes Teamwork to make the Dream work." — Martin Oneya</blockquote>
          </div>
          <p className="quotes-attribution">— Stephen Hendricks / Founder</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-container">
          <div className="mission-grid">
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e" 
                alt="Our Mission" 
              />
            </div>
            <div className="mission-content">
              <h2>Our Mission</h2>
              <h3>Trucking Industry</h3>
              <ul className="mission-list">
                <li>Increased Overnight Parking Spaces<br />for Long Haul Truck Drivers.</li>
                <li>Increased Truck Stop Store Revenue.</li>
              </ul>
              <h3>Agriculture & Commercial Real Estate</h3>
              <p>Facing a Depression, Asset Owners need a process for Outside Investors to take an ownership stake and decrease the Debt/Equity Ratio for Present Owners, Blockchain technology can provide this process. We are building the structure and will begin the implementation. This is not going to be a quick process. Thanks for your patience. We have to get this right.</p>
              <div className="mission-buttons">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
