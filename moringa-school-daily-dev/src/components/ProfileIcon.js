import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import user icon from Font Awesome
import './ProfileIcon.css';

const ProfileIcon = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const profile = useSelector((state) => state.profile.profile); // Get the profile from the Redux store

  const handleClick = () => {
    setIsProfileVisible(!isProfileVisible); // Toggle visibility of the profile details
  };

  return (
    <div className="profile-icon-container">
      <div className="profile-icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
      </div>

      {isProfileVisible && profile && (
        <div className="profile-details">
          <img
            src={profile.profilePicture || '/default-avatar.png'} // Display profile picture or a default avatar if no picture
            alt="Profile"
            className="profile-picture"
          />
          <h3>{profile.name}</h3>
          <p>{profile.bio}</p>
          <p><strong>Expertise:</strong> {profile.expertise}</p>
          <p><strong>Category:</strong> {profile.category}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;