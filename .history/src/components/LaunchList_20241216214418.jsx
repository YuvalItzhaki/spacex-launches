import React, { useEffect, useState } from 'react';
import { getLaunches } from '../utils/api';
import { Link } from 'react-router-dom';


const LaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    getLaunches().then(data => {
      // Filter only past launches
      const pastLaunches = data.filter(launch => new Date(launch.date_utc) < new Date());
      setLaunches(pastLaunches);
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {launches.map(launch => (
          <li key={launch.id}>
            <h2>{launch.name}</h2>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <p>Rocket: {launch.rocket}</p>
            <p>Status: {launch.success ? 'Success' : 'Failure'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchList;
