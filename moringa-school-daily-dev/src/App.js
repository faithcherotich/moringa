import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';  // Import the Header
import ProfileForm from './components/ProfileForm';  // Import ProfileForm component
import ProfileDisplay from './components/ProfileDisplay';  // Import ProfileDisplay component
import DevOps from './components/DevOps';  // Placeholder for 'DevOps' content
import FrontEnd from './components/FrontEnd';  // Placeholder for 'Front-End' content
import Fullstack from './components/Fullstack';  // Placeholder for 'Fullstack' content

function App() {
  const [profile, setProfile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle the profile form visibility

  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));  // Parse and set saved profile
    }
  }, []);

  // Function to toggle profile form visibility
  const toggleProfileForm = () => {
    setIsFormVisible(!isFormVisible); // Toggle the visibility state
  };

  return (
    <Router>
      <Header toggleProfileForm={toggleProfileForm} /> {/* Pass toggle function to Header */}

      <Routes>
        <Route
          path="/foryou"
          element={profile ? (
            <ProfileDisplay profile={profile} /> // Display profile if available
          ) : (
            isFormVisible && <ProfileForm setProfile={setProfile} /> // Show form if not available and form is visible
          )}
        />
        <Route path="/devops" element={<DevOps />} />
        <Route path="/frontend" element={<FrontEnd />} />
        <Route path="/fullstack" element={<Fullstack />} />
      </Routes>
    </Router>
  );
}

export default App;