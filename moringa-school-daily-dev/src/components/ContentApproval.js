import React, { useState, useEffect } from 'react';
import PostContentForm from './PostContentForm'; // Import the PostContentForm component

const ContentApproval = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control visibility of the form
  const [editingContent, setEditingContent] = useState(null); // State to hold content being edited
  const [editForm, setEditForm] = useState({ title: '', description: '' }); // State for editing form inputs

  // Fetch content data from the mock backend
  useEffect(() => {
    fetch('http://localhost:5000/content')
      .then((response) => response.json())
      .then((data) => {
        setContent(data); // No need to access `data.content` since it's returned as an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  // Handle newly posted content
  const handleNewContentPosted = (newContent) => {
    setContent((prevContent) => [newContent, ...prevContent]); // Add the new content to the front of the array

    // Send a POST request to add new content to db.json
    fetch('http://localhost:5000/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContent),
    })
      .then((response) => response.json())
      .then((addedContent) => {
        console.log('New content posted:', addedContent);
      })
      .catch((error) => {
        console.error('Error posting new content:', error);
      });
  };

  // Handle showing/hiding the PostContentForm
  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  // Handle Approve Action
  const handleApprove = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );

    // Update content status in the mock backend (db.json)
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Approved' }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content approved:', updatedContent);
      })
      .catch((error) => {
        console.error('Error approving content:', error);
      });
  };

  // Handle Reject Action
  const handleReject = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, status: 'Rejected' } : item
      )
    );

    // Update content status in the mock backend (db.json)
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'Rejected' }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content rejected:', updatedContent);
      })
      .catch((error) => {
        console.error('Error rejecting content:', error);
      });
  };

  // Handle Flagging Content as Violating Rules
  const handleFlag = (id) => {
    setContent((prevContent) =>
      prevContent.map((item) =>
        item.id === id ? { ...item, flagged: true } : item
      )
    );

    // Update flagged content in the mock backend (db.json)
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flagged: true }),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content flagged:', updatedContent);
      })
      .catch((error) => {
        console.error('Error flagging content:', error);
      });
  };

  // Handle Edit Content Button Click
  const handleEdit = (contentItem) => {
    setEditingContent(contentItem);
    setEditForm({ title: contentItem.title, description: contentItem.description });
  };

  // Handle saving content edits
  const handleSaveEdit = (id) => {
    const updatedContent = { ...editingContent, ...editForm };

    // Update content in the state and backend
    setContent((prevContent) =>
      prevContent.map((item) => (item.id === id ? updatedContent : item))
    );

    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContent),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        console.log('Content updated:', updatedContent);
        setEditingContent(null); // Clear editing state
      })
      .catch((error) => {
        console.error('Error saving edited content:', error);
      });
  };

  // Render content list
  const renderContent = () => {
    if (loading) {
      return <p>Loading content...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (content.length === 0) {
      return <p>No content available for approval.</p>;
    }

    return (
      <ul>
        {content.map((item) => (
          <li key={item.id} className={item.flagged ? 'flagged' : ''}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>

            {/* Edit Button */}
            <button onClick={() => handleEdit(item)}>Edit</button>

            {/* Action Buttons */}
            <button onClick={() => handleApprove(item.id)} disabled={item.status === 'Approved'}>
              Approve
            </button>
            <button onClick={() => handleReject(item.id)} disabled={item.status === 'Rejected'}>
              Reject
            </button>
            <button className="flag-btn" onClick={() => handleFlag(item.id)} disabled={item.flagged}>
              Flag as Violating Rules
            </button>
          </li>
        ))}
      </ul>
    );
  };

  // Edit Form for content
  const renderEditForm = () => {
    if (!editingContent) return null;

    return (
      <div className="edit-form">
        <h3>Edit Content</h3>
        <input
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        />
        <textarea
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
        />
        <button onClick={() => handleSaveEdit(editingContent.id)}>Save</button>
        <button onClick={() => setEditingContent(null)}>Cancel</button>
      </div>
    );
  };

  return (
    <div className="content-approval">
      <h2>Content Approval</h2>

      {/* Button to toggle visibility of the PostContentForm */}
      <button onClick={toggleForm} className="post-content-btn">
        {showForm ? 'Cancel Posting' : 'Post New Content'}
      </button>

      {/* Conditionally render the PostContentForm based on showForm state */}
      {showForm && <PostContentForm onContentPosted={handleNewContentPosted} />}

      {/* Render the edit form if content is being edited */}
      {renderEditForm()}

      {/* Render the list of content */}
      {renderContent()}
    </div>
  );
};

export default ContentApproval;
