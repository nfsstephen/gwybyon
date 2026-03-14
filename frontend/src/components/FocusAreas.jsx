import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Home } from 'lucide-react';
import './FocusAreas.css';

const FocusAreas = () => {
  return (
    <section className="focus-areas">
      <div className="container">
        <div className="focus-grid">
          <div className="focus-card">
            <div className="focus-icon">
              <Truck size={60} />
            </div>
            <h3>Trucking Industry</h3>
            <p>Parking revenue is pure profit<br/>on existing fixed costs</p>
            <div style={{ marginTop: '1rem', width: '100%' }}>
              <Link to="/trucking-overview" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="focus-card">
            <div className="focus-icon">
              <Home size={60} />
            </div>
            <h3>AG & Commercial Real Estate</h3>
            <p>Using Blockchain create the ability<br/>to tokenize Land & Buildings</p>
            <div style={{ marginTop: '1rem', width: '100%' }}>
              <Link to="/blockchain" className="btn btn-primary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;