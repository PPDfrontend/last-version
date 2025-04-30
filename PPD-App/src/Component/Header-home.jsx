import './Header.css';
import logo from '../assets/images/logo.png';
import myaccPic from '../assets/myacc-pic.png'; // replace with the correct path
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <img src={logo} alt="Tabibi Logo" className="logo" />
      </div>

      <nav className="header-center">
        <Link to="/Home2">Home</Link>
        <Link to="/All2">Doctors</Link>
        <Link to="/About2">About</Link>
        <Link to="/Contact2">Contact</Link>
      </nav>

      <div className="header-right" ref={dropdownRef}>
        <div
          className="filter-dropdown-header"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={myaccPic}
            alt="Profile"
            className="profile-image"
          />
          <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>
        </div>

        {dropdownOpen && (
          <div className="dropdown-content right-aligned-dropdown">
            <div className="dropdown-item" onClick={() => handleNavigation('/MyAcc')}>My Profile</div>
            <div className="dropdown-item" onClick={() => handleNavigation('/All2')}>My Appointments</div>
            <div className="dropdown-item" onClick={() => handleNavigation('/Login')}>Log Out</div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;