// for tech writer profile
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  techWriter: null,
  loading: false,
  error: null,
};

const techWriterSlice = createSlice({
  name: 'techWriter',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setTechWriter: (state, action) => {
      state.techWriter = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setTechWriter, setError } = techWriterSlice.actions;

export const fetchTechWriterProfile = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get('http://localhost:5000/techwriters/1');
    dispatch(setTechWriter(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default techWriterSlice.reducer;