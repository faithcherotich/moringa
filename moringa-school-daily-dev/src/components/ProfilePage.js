import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile, fetchProfile } from '../redux/profileSlice';  // Import actions
import ProfileForm from './ProfileForm';
import ProfileDisplay from './ProfileDisplay';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  // Effect to check if a profile exists, and if not, dispatch the fetch or create action
  useEffect(() => {
    if (!profile) {
      // Simulate fetching the profile if it exists
      // Example: dispatch(fetchProfile()); // Uncomment this if you have a fetchProfile action
    }
  }, [dispatch, profile]);

  return (
    <div className="profile-page">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {profile ? (
        // If profile exists, display it
        <ProfileDisplay profile={profile} />
      ) : (
        // If no profile, show the ProfileForm
        <ProfileForm dispatch={dispatch} />
      )}
    </div>
  );
};

export default ProfilePage;