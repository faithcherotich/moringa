import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookmark, faUser } from '@fortawesome/free-regular-svg-icons';
import ProfileIcon from './ProfileIcon'; // Assuming you already have a ProfileIcon component
import './Header.css';  // Import the CSS for styling
import ContentApproval from './ContentApproval';  // Import the ContentApproval component

const Header = ({ toggleProfileForm }) => {
  const [isUserInfoVisible, setUserInfoVisible] = useState(false); // State to toggle user info visibility
  const [userInfo, setUserInfo] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state for fetching user info
  const [isContentApprovalVisible, setContentApprovalVisible] = useState(false); // State to toggle content approval visibility

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

  // Function to toggle content approval section visibility
  const toggleContentApproval = () => {
    setContentApprovalVisible(!isContentApprovalVisible); // Toggle the visibility of content approval
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
        <Link to="/create-profile">
          <button className="create-profile-btn">
            Create Profile
          </button>
        </Link>

        {/* Button to open Content Approval */}
        <button className="approve-content-btn" onClick={toggleContentApproval}>
          Approve Content
        </button>
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
          {/* You can add more fields here */}
        </div>
      )}

      {/* Conditionally Render Content Approval Section */}
      {isContentApprovalVisible && <ContentApproval />}
    </header>
  );
};

export default Header;