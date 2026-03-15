import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [byonDropdownOpen, setByonDropdownOpen] = useState(false);
  const [geogridDropdownOpen, setGeogridDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setByonDropdownOpen(false);
    setGeogridDropdownOpen(false);
  };

  const toggleByonDropdown = () => {
    setByonDropdownOpen(!byonDropdownOpen);
  };

  const toggleGeogridDropdown = () => {
    setGeogridDropdownOpen(!geogridDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isByonActive = () => {
    return location.pathname.includes('byon') ? 'active' : '';
  };

  const isGeogridActive = () => {
    return location.pathname.includes('geogrid') ? 'active' : '';
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
                className={`dropdown-toggle ${isByonActive()}`}
                onClick={toggleByonDropdown}
              >
                BYON Applications <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${byonDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/byon-trucking-companies" onClick={closeMobileMenu}>Trucking Companies</Link></li>
                <li><Link to="/byon-construction" onClick={closeMobileMenu}>Construction Companies</Link></li>
                <li><Link to="/byon-real-estate" onClick={closeMobileMenu}>Real Estate</Link></li>
                <li><Link to="/byon-field-services" onClick={closeMobileMenu}>Field Services (Plumbers, Electricians, HVAC)</Link></li>
                <li><Link to="/byon-finance" onClick={closeMobileMenu}>Finance & Wealth Management</Link></li>
                <li><Link to="/byon-last-mile" onClick={closeMobileMenu}>Last-Mile Delivery & Gig Economy</Link></li>
                <li><Link to="/byon-healthcare" onClick={closeMobileMenu}>Healthcare (Home Health & Visiting Nurses)</Link></li>
                <li><Link to="/byon-government" onClick={closeMobileMenu}>Government & Defense Contractors</Link></li>
              </ul>
            </li>

            <li className="dropdown">
              <button 
                className={`dropdown-toggle ${isGeogridActive()}`}
                onClick={toggleGeogridDropdown}
              >
                GeoGrid <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${geogridDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/geogrid" onClick={closeMobileMenu}>Overview</Link></li>
                <li><Link to="/geogrid/restaurants" onClick={closeMobileMenu}>Restaurants & Cafes</Link></li>
                <li><Link to="/geogrid/home-services" onClick={closeMobileMenu}>Home Services</Link></li>
                <li><Link to="/geogrid/medical" onClick={closeMobileMenu}>Medical & Dental</Link></li>
                <li><Link to="/geogrid/law-firms" onClick={closeMobileMenu}>Law Firms</Link></li>
                <li><Link to="/geogrid/fitness" onClick={closeMobileMenu}>Fitness & Wellness</Link></li>
                <li><Link to="/geogrid/auto-repair" onClick={closeMobileMenu}>Auto Repair & Service</Link></li>
              </ul>
            </li>

            <li><Link to="/about" className={isActive('/about')} onClick={closeMobileMenu}>About</Link></li>
            <li><Link to="/contact" className={isActive('/contact')} onClick={closeMobileMenu}>Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
