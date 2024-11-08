import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to access route parameters

const ProfileDisplay = () => {
  const [profile, setProfile] = useState(null);
  const { id } = useParams();  // Get the profile ID from the URL

  // Get the profile from localStorage or Redux (for simplicity, let's assume localStorage here)
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    
    if (storedProfile) {
      setProfile(storedProfile);  // If a profile exists in localStorage, set it to the state
    }
  }, []);  // This only runs once when the component mounts

  // If no profile exists, show a message (you can customize this behavior)
  if (!profile) {
    return <p>No profile found. Please create a profile.</p>;
  }

  return (
    <div className="profile-display">
      <h1>Profile Details</h1>
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p><strong>Expertise:</strong> {profile.expertise}</p>
        <p><strong>Category:</strong> {profile.category}</p>
        {profile.profilePicture && (
          <img
            src={profile.profilePicture} 
            alt="Profile"
            className="profile-picture"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;