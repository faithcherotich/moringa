import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import ProfileIcon from './ProfileIcon'; // Assuming you already have a ProfileIcon component
import './Header.css';  // Import the CSS for styling

const Header = ({ toggleProfileForm }) => {
  const [isUserInfoVisible, setUserInfoVisible] = useState(false); // State to toggle user info visibility
  const [userInfo, setUserInfo] = useState(null); // State to store user data

  // Fetch user data when the component mounts
  useEffect(() => {
    // Fetch the user data from db.json
    fetch('http://localhost:5000/techwriter')  // Assuming your db.json is served at the root of your project
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.techWriter); // Set the user data to state
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const toggleUserInfo = () => {
    setUserInfoVisible(!isUserInfoVisible); // Toggle the visibility of user information
  };

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
        <ProfileIcon onClick={toggleUserInfo} />

        {/* Button to open Profile Form */}
        <button className="create-profile-btn" onClick={toggleProfileForm}>
          Create Profile
        </button>
      </div>

      {/* Conditionally Render User Info */}
      {isUserInfoVisible && userInfo && (
        <div className="user-info">
          <img
            src={userInfo.profilePicture} // Show the profile picture
            alt="Profile"
            className="profile-picture"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      )}
    </header>
  );
};

export default Header;