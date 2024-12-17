// src/pages/LaunchList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLaunches } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getLaunches()
      .then((data) => {
        setLaunches(data);
        setFilteredLaunches(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch launches.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = launches.filter((launch) =>
      launch.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLaunches(results);
  }, [search, launches]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="launch-list">
      <input
        type="text"
        placeholder="Search by mission name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <ul>
        {filteredLaunches.map((launch) => (
          <li key={launch.id}>
            <h2>{launch.name}</h2>
            <p>Launch Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <Link to={`/launch/${launch.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchList;
