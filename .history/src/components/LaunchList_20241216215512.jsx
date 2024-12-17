import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLaunches } from '../utils/api';
import '..style/LaunchList.css';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    getLaunches().then(data => {
      const pastLaunches = data.filter(launch => new Date(launch.date_utc) < new Date());
      setLaunches(pastLaunches);
    }).catch(console.error);
  }, []);

  return (
    <div className="launch-list">
      <h1>SpaceX Launches</h1>
      <ul>
        {launches.map(launch => (
          <li key={launch.id} className="launch-item">
            <h2>{launch.name}</h2>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <p>Rocket: {launch.rocket}</p>
            <p>Status: {launch.success ? 'Success' : 'Failure'}</p>
            <Link to={`/launch/${launch.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchList;
