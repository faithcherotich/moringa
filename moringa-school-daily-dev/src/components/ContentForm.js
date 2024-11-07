import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postContent } from '../redux/contentSlice'; // Ensure this is the correct path
import './ContentForm.css'; 

function ContentForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.content); // Get loading and error states from Redux

  // State to manage content form data
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('DevOps');  // Default category
  const [status, setStatus] = useState('draft');
  const [successMessage, setSuccessMessage] = useState(''); // To show success message after posting

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContent = {
      title,
      body,
      category,
      status,
      likes: 0,
      flagged: false,
      comments: [],
    };

    try {
      // Dispatch the action to post content
      await dispatch(postContent(newContent));
      
      // After content is posted successfully, show a success message
      setSuccessMessage('Content posted successfully!');
      
      // Reset the form
      setTitle('');
      setBody('');
      setCategory('DevOps');
      setStatus('draft');
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  return (
    <div className="content-form">
      <h3>Create New Content</h3>
      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>}

      {/* Display loading spinner if content is being posted */}
      {loading ? (
        <p>Posting content...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="DevOps">DevOps</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Frontend">Frontend</option>
            </select>
          </div>

          <button type="submit">Create Content</button>
        </form>
      )}
    </div>
  );
}

export default ContentForm;