import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <img 
                src="/logo.png" 
                alt="Gateway AI Systems" 
                className="footer-logo-image"
              />
            </div>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul className="footer-links">
              <li><a href="tel:(386)266-0925">(386)266-0925</a></li>
              <li><a href="mailto:stephen@gatewayaisystems.com">stephen@gatewayaisystems.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Gateway AI Systems. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;