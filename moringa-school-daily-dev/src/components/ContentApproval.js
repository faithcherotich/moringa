import React, { useState, useEffect } from 'react';
import PostContentForm from './PostContentForm'; // Import the PostContentForm component

const ContentApproval = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control visibility of the form

  // Fetch content data from the mock backend
  useEffect(() => {
    fetch('http://localhost:5000/content')
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content || []); // Ensure content is an array
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

            {/* Action Buttons */}
            <button onClick={() => handleApprove(item.id)}>Approve</button>
            <button onClick={() => handleReject(item.id)}>Reject</button>
            <button className="flag-btn" onClick={() => handleFlag(item.id)}>
              Flag as Violating Rules
            </button>
          </li>
        ))}
      </ul>
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

      {/* Render the list of content */}
      {renderContent()}
    </div>
  );
};

export default ContentApproval;