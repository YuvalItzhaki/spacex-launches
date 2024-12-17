// src/pages/LaunchDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLaunchById } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const LaunchDetail = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLaunchById(id)
      .then((data) => {
        setLaunch(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch launch details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!launch) return <div>No data available.</div>;

  return (
    <div className="launch-detail">
      <h1>{launch.name || 'N/A'}</h1>
      <p>Launch Date: {new Date(launch.date_utc).toLocaleString() || 'N/A'}</p>
      <p>Rocket: {launch.rocket || 'N/A'}</p>
      <p>Details: {launch.details || 'N/A'}</p>
      <p>
        Links:{' '}
        {launch.links?.webcast ? (
          <a href={launch.links.webcast} target="_blank" rel="noreferrer">
            Watch Video
          </a>
        ) : (
          'N/A'
        )}
      </p>
      <Link to="/">Back to Launch List</Link>
    </div>
  );
};

export default LaunchDetail;
