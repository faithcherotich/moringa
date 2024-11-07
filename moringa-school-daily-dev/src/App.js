import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';  // Import the Header (Navbar)
import ProfileForm from './components/ProfileForm';  // Import ProfileForm component
import ProfileDisplay from './components/ProfileDisplay';  // Import ProfileDisplay component
import DevOps from './components/DevOps';  // Placeholder for 'DevOps' content
import FrontEnd from './components/FrontEnd';  // Placeholder for 'Front-End' content
import Fullstack from './components/Fullstack';  // Placeholder for 'Fullstack' content

function App() {
  const [profile, setProfile] = useState(null);

  // Load the profile from localStorage on initial render
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));  // Parse the saved profile and set it
    }
  }, []);

  return (
    <Router>
      {/* Include the Header at the top (Navbar) */}
      <Header />

      {/* Define Routes for different categories */}
      <Routes>
        {/* Conditional rendering for "For You" */}
        <Route
          path="/foryou"
          element={profile ? <ProfileDisplay /> : <ProfileForm setProfile={setProfile} />}
        />
        <Route path="/devops" element={<DevOps />} />  {/* DevOps content */}
        <Route path="/frontend" element={<FrontEnd />} />  {/* Front-End content */}
        <Route path="/fullstack" element={<Fullstack />} />  {/* Fullstack content */}
      </Routes>
    </Router>
  );
}

export default App;