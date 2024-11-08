import React, { useEffect, useState } from 'react';

const DevOps = () => {
  const [devOpsData, setDevOpsData] = useState(null);

  useEffect(() => {
    // Fetch data from db.json
    fetch('http://localhost:5000/devOps')  // Assuming you're running json-server at localhost:5000
      .then(response => response.json())
      .then(data => setDevOpsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Display a loading message while data is being fetched
  if (!devOpsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{devOpsData.title}</h1>
      <img 
        src={devOpsData.imageUrl}  // Dynamically use the image URL from the db.json
        alt="DevOps illustration"
        style={{ width: '100%', maxWidth: '600px', height: 'auto' }} 
      />
      <p>{devOpsData.description}</p>
    </div>
  );
};

export default DevOps;