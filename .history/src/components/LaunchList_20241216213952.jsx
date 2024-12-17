import React, { useEffect, useState } from 'react';
import { getLaunches } from '../utils/api';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    getLaunches().then(setLaunches).catch(console.error);
  }, []);

  return (
    <div>
      <h1>SpaceX Launches</h1>
      {launches.map(launch => (
        <div key={launch.id}>
          <h2>{launch.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default LaunchList;
