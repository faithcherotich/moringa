import React, { useState, useEffect } from 'react';
import './ContentReview.css'; 

const ContentReview = () => {
  const [content, setContent] = useState([]);
  const [newComment, setNewComment] = useState(''); // For storing comment input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch content from the backend API (e.g., JSON Server)
  useEffect(() => {
    fetch('http://localhost:5000/content') // Replace with your actual endpoint
      .then((response) => response.json())
      .then((data) => {
        setContent(data); // Set the fetched content
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
        setLoading(false);
        setError(error.message);
      });
  }, []);

  // Handle Like Action
  const handleLike = (id) => {
    const updatedContent = content.map((item) =>
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    );
    setContent(updatedContent);

    // Update likes in the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: updatedContent.find((c) => c.id === id).likes }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error liking content:', error));
  };

  // Handle Dislike Action
  const handleDislike = (id) => {
    const updatedContent = content.map((item) =>
      item.id === id ? { ...item, dislikes: item.dislikes + 1 } : item
    );
    setContent(updatedContent);

    // Update dislikes in the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dislikes: updatedContent.find((c) => c.id === id).dislikes }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error disliking content:', error));
  };

  // Handle comment submission
  const handleCommentSubmit = (id) => {
    if (!newComment.trim()) return;

    // Update content with the new comment
    const updatedContent = content.map((item) => {
      if (item.id === id) {
        return { ...item, comments: [...item.comments, newComment] };
      }
      return item;
    });

    setContent(updatedContent); // Update the state with new comments

    // Clear comment input
    setNewComment('');

    // Send the new comment to the backend
    fetch(`http://localhost:5000/content/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comments: [...content.find((c) => c.id === id).comments, newComment],
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error adding comment:', error));
  };

  // Render content items
  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading content...</p>;
    }

    if (error) {
      return <p className="error">Error: {error}</p>;
    }

    if (content.length === 0) {
      return <p>No content available for review.</p>;
    }

    return (
      <ul>
        {content.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Status: {item.status}</p>

            {/* Like/Dislike Buttons */}
            <button onClick={() => handleLike(item.id)}>Like ({item.likes})</button>
            <button onClick={() => handleDislike(item.id)}>Dislike ({item.dislikes})</button>

            {/* Comment Section */}
            <div>
              <h4>Comments</h4>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button onClick={() => handleCommentSubmit(item.id)}>Submit</button>

              {/* Display Comments */}
              {item.comments && item.comments.length > 0 ? (
                <ul>
                  {item.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="content-review">
      <h2>Content Review</h2>
      {renderContent()}
    </div>
  );
};

export default ContentReview;