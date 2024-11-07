import React from 'react';

// Retrieve the profile from localStorage directly, no need to check for "Profile not found"
const ProfileDisplay = () => {
  const profile = JSON.parse(localStorage.getItem('profile')); // Retrieve the profile from localStorage

  // If no profile is found, we can show a message asking to create a profile
  if (!profile) {
    return <p>No profile found. Please create a profile first.</p>;
  }

  return (
    <div className="profile-display">
      <h1>Profile Details</h1>
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
        <p><strong>Expertise:</strong> {profile.expertise}</p>
        <p><strong>Category:</strong> {profile.category}</p> {/* Display the selected category */}
        {profile.profilePicture && (
          <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;