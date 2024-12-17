import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const LaunchDetail = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    api.get(`/launches/${id}`).then(response => {
      setLaunch(response.data);
    }).catch(console.error);
  }, [id]);

  if (!launch) return <p>Loading...</p>;

  return (
    <div>
      <h1>{launch.name}</h1>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Details: {launch.details}</p>
      <p>Success: {launch.success ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default LaunchDetail;
