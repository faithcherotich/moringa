import React from 'react';
import ProfileForm from './ProfileForm';  // Import ProfileForm component
import './ProfileModal.css';
const ProfileModal = ({ isOpen, closeModal, setProfile }) => {
  if (!isOpen) return null; // If the modal is not open, don't render anything

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={closeModal} className="close-btn">
          &times;
        </button>
        <ProfileForm setProfile={setProfile} closeModal={closeModal} />
      </div>
    </div>
  );
};

export default ProfileModal;