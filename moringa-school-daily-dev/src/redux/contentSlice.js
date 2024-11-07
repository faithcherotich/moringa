// for managing content
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  content: [],
  loading: false,
  error: null,
  categories: ['DevOps', 'Fullstack', 'Frontend'], // Categories for content
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setContent: (state, action) => {
      state.content = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addComment: (state, action) => {
      const content = state.content.find(c => c.id === action.payload.id);
      content.comments.push(action.payload.comment);
    },
    likeContent: (state, action) => {
      const content = state.content.find(c => c.id === action.payload.id);
      content.likes += 1;
    },
    dislikeContent: (state, action) => {
      const content = state.content.find(c => c.id === action.payload.id);
      content.likes -= 1;
    },
    approveContent: (state, action) => {
      const content = state.content.find(c => c.id === action.payload.id);
      content.status = 'approved';
    },
    flagContent: (state, action) => {
      const content = state.content.find(c => c.id === action.payload.id);
      content.flagged = true;
    },
    // Action to edit content
    editContent: (state, action) => {
      const index = state.content.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.content[index] = action.payload.updatedContent;
      }
    },
  },
});

export const {
  setLoading,
  setContent,
  setError,
  addComment,
  likeContent,
  dislikeContent,
  approveContent,
  flagContent,
  editContent,
} = contentSlice.actions;

export const fetchContent = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get('http://localhost:5000/content');
    dispatch(setContent(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const editContentAsync = (id, updatedContent) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.put(`http://localhost:5000/content/${id}`, updatedContent);
    dispatch(editContent({ id, updatedContent }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default contentSlice.reducer;
