import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import DevOps from './components/DevOps';
import FrontEnd from './components/FrontEnd';
import Fullstack from './components/Fullstack';
import ContentApproval from './components/ContentApproval';

function App() {
  const [profile, setProfile] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [content, setContent] = useState([]);

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile)); // Set profile if available in localStorage
    }

    // Fetch content if not available in localStorage
    const savedContent = localStorage.getItem('content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      fetchContent();
    }
  }, []);

  // Fetch content (mock API for now)
  const fetchContent = () => {
    const initialContent = [
      { id: '1', title: 'Introduction to DevOps', description: 'A detailed intro to DevOps tools.', category: 'DevOps', status: 'pending', author: 'John Doe' },
      { id: '2', title: 'Building Fullstack Apps', description: 'Learn full-stack apps with React & Node.js.', category: 'Fullstack', status: 'pending', author: 'Jane Smith' },
    ];
    setContent(initialContent);
    localStorage.setItem('content', JSON.stringify(initialContent));
  };

  // Toggle profile form visibility
  const toggleProfileForm = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility state
  };

  // Save profile to localStorage and state
  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('profile', JSON.stringify(newProfile)); // Save profile to localStorage
  };

  return (
    <Router>
      <Header toggleProfileForm={toggleProfileForm} /> {/* Pass toggle function to Header */}
      <Routes>
        {/* Route for 'For You' page */}
        <Route
          path="/foryou"
          element={
            profile ? (
              <ProfileDisplay profile={profile} /> // Display profile if available
            ) : (
              <ProfileForm setProfile={saveProfile} /> // Show form if no profile
            )
          }
        />
        <Route path="/create-profile" element={<ProfileForm setProfile={saveProfile} />} />
        <Route path="/approve-content" element={<ContentApproval content={content} />} />
        <Route path="/devops" element={<DevOps />} />
        <Route path="/frontend" element={<FrontEnd />} />
        <Route path="/fullstack" element={<Fullstack />} />
      </Routes>
    </Router>
  );
}

export default App;