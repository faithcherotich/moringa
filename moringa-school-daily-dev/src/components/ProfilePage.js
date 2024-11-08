import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfile } from '../redux/profileSlice'; // Import setProfile action
import ProfileForm from './ProfileForm';
import ProfileDisplay from './ProfileDisplay';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  // If there's no profile, show the profile form for creation
  const renderContent = () => {
    if (profile) {
      // If profile exists in Redux state, display it
      return <ProfileDisplay profile={profile} />;
    } else {
      // If no profile exists, show the form to create a new profile
      return (
        <ProfileForm
          setProfile={(newProfile) => {
            dispatch(setProfile(newProfile)); // Update profile in Redux store
            localStorage.setItem('profile', JSON.stringify(newProfile)); // Optionally store in localStorage
          }}
        />
      );
    }
  };

  return (
    <div className="profile-page">
      {renderContent()} {/* Render either profile display or profile form */}
    </div>
  );
};

export default ProfilePage;