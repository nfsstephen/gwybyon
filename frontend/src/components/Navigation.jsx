import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navigation.css';

const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [truckingDropdownOpen, setTruckingDropdownOpen] = useState(false);
  const [webServicesDropdownOpen, setWebServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTruckingDropdownOpen(false);
    setWebServicesDropdownOpen(false);
  };

  const toggleTruckingDropdown = () => {
    setTruckingDropdownOpen(!truckingDropdownOpen);
  };

  const toggleWebServicesDropdown = () => {
    setWebServicesDropdownOpen(!webServicesDropdownOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const isTruckingActive = () => {
    return (location.pathname.includes('trucking') || location.pathname === '/byon') ? 'active' : '';
  };

  const isWebServicesActive = () => {
    return (location.pathname.includes('web-service') || location.pathname.includes('big-market')) ? 'active' : '';
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
                className={`dropdown-toggle ${isTruckingActive()}`}
                onClick={toggleTruckingDropdown}
              >
                Trucking (BYON) <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${truckingDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/trucking-division" onClick={closeMobileMenu}>Trucking Division</Link></li>
                <li><Link to="/byon" onClick={closeMobileMenu}>Overview</Link></li>
              </ul>
            </li>
            
            <li className="dropdown">
              <button 
                className={`dropdown-toggle ${isWebServicesActive()}`}
                onClick={toggleWebServicesDropdown}
              >
                Web Services <ChevronDown size={16} />
              </button>
              <ul className={`dropdown-menu ${webServicesDropdownOpen ? 'show' : ''}`}>
                <li><Link to="/web-service-v2" onClick={closeMobileMenu}>Overview</Link></li>
                <li><Link to="/big-market/well-septic" onClick={closeMobileMenu}>Well & Septic Companies</Link></li>
                <li><Link to="/big-market/plumbers" onClick={closeMobileMenu}>Plumbers</Link></li>
                <li><Link to="/big-market/electricians" onClick={closeMobileMenu}>Electricians</Link></li>
                <li><Link to="/big-market/hvac" onClick={closeMobileMenu}>Air & Heating Companies</Link></li>
                <li><Link to="/big-market/pest-control" onClick={closeMobileMenu}>Pest Control Services</Link></li>
                <li><Link to="/big-market/real-estate" onClick={closeMobileMenu}>Real Estate</Link></li>
              </ul>
            </li>

            <li><Link to="/services-pricing" className={isActive('/services-pricing')} onClick={closeMobileMenu}>Services & Pricing</Link></li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
