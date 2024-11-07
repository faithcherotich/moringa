import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons'; // User icon

const ProfileIcon = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      icon={faUser}
      className="user-icon"
      onClick={onClick} // Trigger the onClick passed from the parent
      style={{ cursor: 'pointer' }}
    />
  );
};

export default ProfileIcon;