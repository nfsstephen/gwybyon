import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setIndustriesDropdownOpen(false);
  };

  const toggleIndustriesDropdown = () => {
    setIndustriesDropdownOpen(!industriesDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isIndustriesActive = () => {
    return (location.pathname.includes('seven-industries') || location.pathname.includes('web-service')) ? 'active' : '';
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
            
            <li className="dropdown">
              <button 
                className={`dropdown-toggle ${isIndustriesActive()}`}
                onClick={toggleIndustriesDropdown}
              >
                Seven Industries <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${industriesDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/seven-industries" onClick={closeMobileMenu}>All Industries</Link></li>
                <li><Link to="/web-service-v2" onClick={closeMobileMenu}>Web Services Overview</Link></li>
              </ul>
            </li>

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
