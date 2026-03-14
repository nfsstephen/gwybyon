import React from 'react';
import './Implementation.css';

const Implementation = () => {
  return (
    <section className="implementation-section">
      <div className="container">
        <h2 className="section-title">implement <span style={{textTransform: 'uppercase'}}>AI</span> in your store</h2>
        <div className="implementation-grid">
          <div className="implementation-image">
            <img 
              src="https://images.unsplash.com/photo-1724556271642-e9acaf03ac23?crop=entropy&cs=srgb&fm=jpg&q=85" 
              alt="Trucks parked in parking lot" 
              loading="lazy"
            />
          </div>
          <div className="implementation-content">
            <h3>Use AI to gain Control<br />of your Parking Area</h3>
            <p>Government issued Tags on the front bumper of a Commercial Vehicle provides an Indisputable Validation of the Identity of each vehicle.</p>
            <p>Our System is based on a Mobile Cart that contains the hardware needed to identify and store individual truck information parked in your facility.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Implementation;