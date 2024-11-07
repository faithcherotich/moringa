import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookmark } from '@fortawesome/free-regular-svg-icons';
import ProfileIcon from './ProfileIcon'; // Import ProfileIcon component
import './Header.css';  // Import the CSS for styling

const Header = () => {
  return (
    <header className="header">
      {/* Logo on the left */}
      <div className="logo-container">
        <img src="/assets/moringa-school-logo.jpeg" alt="Logo" className="logo" />
      </div>

      {/* Navbar Links */}
      <nav className="navbar">
        <ul>
          <li><Link to="/foryou">For You</Link></li>
          <li><Link to="/devops">DevOps</Link></li>
          <li><Link to="/frontend">Front-End</Link></li>
          <li><Link to="/fullstack">Fullstack</Link></li>
        </ul>
      </nav>

      {/* Icons on the right */}
      <div className="icons-container">
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
        <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
        
        {/* Profile Icon */}
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;