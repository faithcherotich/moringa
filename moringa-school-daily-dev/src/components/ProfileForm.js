import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import './ProfileForm.css';

const ProfileForm = ({ setProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    expertise: '',
    category: '',
    profilePicture: null,
  });

  const navigate = useNavigate();  // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result, // Store base64 string
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = { ...formData, id: Date.now() };
    localStorage.setItem('profile', JSON.stringify(newProfile)); // Save to localStorage
    setProfile(newProfile); // Update profile in parent
    navigate('/foryou');  // Redirect to the "For You" page after form submission
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h1>Create Profile</h1>

      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        required
      />

      <label htmlFor="expertise">Expertise:</label>
      <select
        id="expertise"
        name="expertise"
        value={formData.expertise}
        onChange={handleChange}
        required
      >
        <option value="">Select Expertise</option>
        <option value="DevOps">DevOps</option>
        <option value="Fullstack">Fullstack</option>
        <option value="Frontend">Frontend</option>
      </select>

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="DevOps">DevOps</option>
        <option value="Fullstack">Fullstack</option>
        <option value="Frontend">Frontend</option>
      </select>

      <label htmlFor="profilePicture">Profile Picture:</label>
      <input
        type="file"
        id="profilePicture"
        name="profilePicture"
        onChange={handleFileChange}
        accept="image/*"
      />

      {/* Create Profile Button */}
      <button type="submit" className="create-profile-btn">
        Create Profile
      </button>

      {formData.profilePicture && (
        <div>
          <h3>Profile Preview:</h3>
          <img
            src={formData.profilePicture} // Show the base64 string as image preview
            alt="Profile Preview"
            className="profile-picture"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>
      )}
    </form>
  );
};

export default ProfileForm;