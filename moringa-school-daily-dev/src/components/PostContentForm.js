import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postContent } from '../redux/contentSlice';

function PostContentForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handlePostContent = () => {
    const newContent = {
      title,
      body,
      categoryId,
      status: 'pending',
      likes: 0,
      comments: [],
      flagged: false,
    };
    dispatch(postContent(newContent));
    setTitle('');
    setBody('');
    setCategoryId('');
  };

  return (
    <div>
      <h2>Post New Content</h2>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Content body" 
        value={body} 
        onChange={(e) => setBody(e.target.value)} 
      />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        <option value="1">DevOps</option>
        <option value="2">Fullstack</option>
        <option value="3">Front-End</option>
      </select>
      <button onClick={handlePostContent}>Post</button>
    </div>
  );
}

export default PostContentForm;