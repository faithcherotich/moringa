import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'; // for routing and dynamic ID handling
import { editContent, fetchContent } from '../redux/contentSlice'; // import necessary actions
import './EditContentForm.css';
function EditContentForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); // Get the content ID from the URL

  // Get the content from Redux state by ID
  const { content, loading, error } = useSelector((state) => state.content);
  const contentToEdit = content.find((post) => post.id === id);

  // State for managing form inputs
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('DevOps');
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    if (contentToEdit) {
      // If content exists, populate the form fields with the current content
      setTitle(contentToEdit.title);
      setBody(contentToEdit.body);
      setCategory(contentToEdit.category);
      setStatus(contentToEdit.status);
    } else {
      // Optionally: Redirect to the home page or show an error message if content is not found
      history.push('/');
    }
  }, [contentToEdit, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated content
    const updatedContent = {
      title,
      body,
      category,
      status,
      likes: contentToEdit.likes, // Maintain the existing likes count
      flagged: contentToEdit.flagged, // Retain the flagged status
      comments: contentToEdit.comments, // Keep existing comments
    };

    try {
      // Dispatch the editContent action
      await dispatch(editContent(id, updatedContent));

      // Optionally, navigate back to the content listing page after saving
      history.push('/'); // Redirect to the homepage or content list
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  if (loading) {
    return <p>Loading content...</p>;
  }

  if (error) {
    return <p>Error loading content: {error}</p>;
  }

  return (
    <div>
      <h3>Edit Content</h3>

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditContentForm;