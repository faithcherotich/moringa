import React from 'react';
import { useDispatch } from 'react-redux';
import { likeContent, dislikeContent, approveContent, flagContent, addComment } from '../redux/contentSlice';

function Content({ content }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeContent({ id: content.id }));
  };

  const handleDislike = () => {
    dispatch(dislikeContent({ id: content.id }));
  };

  const handleApprove = () => {
    dispatch(approveContent({ id: content.id }));
  };

  const handleFlag = () => {
    dispatch(flagContent({ id: content.id }));
  };

  const handleAddComment = (comment) => {
    dispatch(addComment({ id: content.id, comment }));
  };

  return (
    <div>
      <h3>{content.title}</h3>
      <p>{content.body}</p>
      <p>{content.status}</p>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleDislike}>Dislike</button>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleFlag}>Flag</button>

      <div>
        <h4>Comments</h4>
        {content.comments.map((comment) => (
          <p key={comment.id}>{comment.content}</p>
        ))}
        <input 
          type="text" 
          placeholder="Add a comment" 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddComment(e.target.value);
              e.target.value = '';
            }
          }} 
        />
      </div>
    </div>
  );
}

export default Content;