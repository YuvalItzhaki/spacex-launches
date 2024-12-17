import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLaunches } from "../services/spacexApi";
import { Launch } from "../types/spacex";
import { format } from "date-fns";
import '../styles/App.css';

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [launchesPerPage] = useState<number>(4); // Limit launches per page
  const [sortCriteria, setSortCriteria] = useState<string>("date");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const data = await getLaunches();
        setLaunches(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load launches.");
        setLoading(false);
      }
    };
    fetchLaunches();
  }, []);

  const sortedLaunches = [...launches].sort((a, b) => {
    if (sortCriteria === "date") {
      return new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime();
    } else if (sortCriteria === "success") {
      return a.success === b.success ? 0 : a.success ? -1 : 1;
    } else {
      return a.rocket.localeCompare(b.rocket);
    }
  });

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = sortedLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const filteredLaunches = currentLaunches.filter((launch) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by mission name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        <div className="sort-container">
          <label htmlFor="sort">Sort By:</label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="sort-dropdown"
          >
            <option value="date">Date</option>
            <option value="success">Success/Failure</option>
            <option value="rocket">Rocket Name</option>
          </select>
        </div>
      </div>


      <div className="launch-grid">
        {filteredLaunches.map((launch) => (
          <div className="launch-cell" key={launch.id}>
            <Link to={`/launch/${launch.id}`}>
              <h2>{launch.name}</h2>
              <p>{format(new Date(launch.date_utc), "PPP")}</p>
              <p>Rocket: {launch.rocket}</p>
              <p>Status: {launch.success ? "Success" : "Failure"}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastLaunch >= launches.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LaunchList;
