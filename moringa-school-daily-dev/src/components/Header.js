import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookmark } from '@fortawesome/free-regular-svg-icons';
import ProfileIcon from './ProfileIcon'; // Assuming you already have a ProfileIcon component
import './Header.css';  // Import the CSS for styling

const Header = ({ toggleProfileForm }) => {
  const [isUserInfoVisible, setUserInfoVisible] = useState(false); // State to toggle user info visibility
  const [userInfo, setUserInfo] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state for fetching user info

  // Fetch user data when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/techwriter')
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data.techWriter);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false if there was an error
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
          <li><Link to="/backend">Backend</Link></li>
          <li><Link to="/cloudcomputing">Cloud Computing</Link></li>
        </ul>
      </nav>

      {/* Icons on the right */}
      <div className="icons-container">
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
        <FontAwesomeIcon icon={faBookmark} className="bookmark-icon" />
        
        {/* Profile Icon */}
        <ProfileIcon onClick={toggleUserInfo} />

        {/* Button to open Profile Form */}
        <Link to="/create-profile">
          <button className="create-profile-btn">
            Create Profile
          </button>
        </Link>

        {/* Button to navigate to Content Approval page */}
        <Link to="/approve-content">
          <button className="approve-content-btn">
            Approve Content
          </button>
        </Link>
      </div>

      {/* Conditionally Render User Info */}
      {loading && <p>Loading user info...</p>} {/* Show loading message */}
      
      {isUserInfoVisible && !loading && userInfo && (
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