import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Gateway AI Systems" 
                className="logo-image"
              />
            </Link>
          </div>
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" className={isActive('/')} onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/eight-industries" className={isActive('/eight-industries')} onClick={closeMobileMenu}>Eight Industries</Link></li>
            <li><Link to="/five-tools" className={isActive('/five-tools')} onClick={closeMobileMenu}>Five Tools</Link></li>
            <li><Link to="/web-service-v2" className={isActive('/web-service-v2')} onClick={closeMobileMenu}>Web Services</Link></li>
            <li><Link to="/services-pricing" className={isActive('/services-pricing')} onClick={closeMobileMenu}>Services & Pricing</Link></li>

            <li className="nav-subscribe">
              <Link to="/subscribe" className="subscribe-btn" onClick={closeMobileMenu} data-testid="nav-subscribe-btn">
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
