import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechWriterProfile } from '../redux/techWriterSlice';

function TechWriterProfile() {
  const dispatch = useDispatch();
  const techWriter = useSelector((state) => state.techWriter.techWriter);
  const loading = useSelector((state) => state.techWriter.loading);

  useEffect(() => {
    dispatch(fetchTechWriterProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{techWriter.name}</h2>
      <p>Email: {techWriter.email}</p>
      <p>Profile: {techWriter.profile}</p>
    </div>
  );
}

export default TechWriterProfile;