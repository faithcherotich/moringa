import React, { useState } from 'react';

const PostContentForm = ({ onContentPosted }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // Default status to 'pending'

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContent = {
      title,
      description,
      status,
      flagged: false,
    };

    // Send POST request to the json-server
    fetch('http://localhost:5000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New content posted:', data);
        onContentPosted(data); // Callback to update the parent component (ContentApproval)
      })
      .catch((error) => {
        console.error('Error posting content:', error);
      });

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
    setStatus('pending');
  };

  return (
    <div className="post-content-form">
      <h2>Post New Content</h2>
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
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button type="submit">Post Content</button>
      </form>
    </div>
  );
};

export default PostContentForm;