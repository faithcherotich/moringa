import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';  // Import the Header
import ProfileForm from './components/ProfileForm';  // Import ProfileForm component
import ProfileDisplay from './components/ProfileDisplay';  // Import ProfileDisplay component
import DevOps from './components/DevOps';  // Placeholder for 'DevOps' content
import FrontEnd from './components/FrontEnd';  // Placeholder for 'Front-End' content
import Fullstack from './components/Fullstack';  // Placeholder for 'Fullstack' content
import ContentApproval from './components/ContentApproval';  // Import ContentApproval component

function App() {
  const [profile, setProfile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle the profile form visibility

  // Load saved profile from localStorage when the component mounts
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));  // Parse and set saved profile
    }
  }, []);

  // Function to toggle profile form visibility
  const toggleProfileForm = () => {
    setIsFormVisible(!isFormVisible); // Toggle the visibility state of the profile form
  };

  // Save profile to localStorage whenever it is updated
  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('profile', JSON.stringify(newProfile)); // Save profile to localStorage
  };

  return (
    <Router>
      <Header toggleProfileForm={toggleProfileForm} /> {/* Pass toggle function to Header */}

      <Routes>
        <Route
          path="/foryou"
          element={
            profile ? (
              <ProfileDisplay profile={profile} /> // Display profile if available
            ) : (
              isFormVisible && <ProfileForm setProfile={saveProfile} /> // Show form if not available and form is visible
            )
          }
        />
        <Route path="/devops" element={<DevOps />} />
        <Route path="/frontend" element={<FrontEnd />} />
        <Route path="/fullstack" element={<Fullstack />} />
        <Route path="/create-profile" element={<ProfileForm setProfile={saveProfile} />} />

        {/* Add Content Approval Route */}
        <Route path="/approve-content" element={<ContentApproval />} />  {/* Route for content approval page */}
      </Routes>
    </Router>
  );
}

export default App;