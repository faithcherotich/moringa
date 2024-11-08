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

  const navigate = useNavigate();

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
      const blobUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        profilePicture: blobUrl,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfile = {
      ...formData,
      id: Date.now().toString(),
    };

    try {
      const response = await fetch('http://localhost:5000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfile),
      });

      if (response.ok) {
        const savedProfile = await response.json();
        setProfile(savedProfile);  // Update the parent state with the new profile
        navigate(`/profile/${savedProfile.id}`);  // Redirect to the newly created profile page
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
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
      <button type="submit" className="create-profile-btn">
        Create Profile
      </button>
      {formData.profilePicture && (
        <div>
          <h3>Profile Preview:</h3>
          <img
            src={formData.profilePicture}
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