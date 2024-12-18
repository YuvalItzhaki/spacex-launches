import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getLaunches } from "../services/spacexApi";
import { Launch } from "../types/spacex";
import { format } from "date-fns";
import "../styles/App.css";

const LaunchList: React.FC = () => {
  const { page } = useParams<{ page?: string }>(); // Use inline type for params
  const navigate = useNavigate(); // Use navigate for programmatic routing
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "1", 10)); // Default to page 1
  const [launchesPerPage] = useState<number>(9); // Limit launches per page
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

  useEffect(() => {
    // Update the current page based on the URL parameter
    setCurrentPage(parseInt(page || "1", 10));
  }, [page]);

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

  const totalPages = Math.ceil(launches.length / launchesPerPage); // Total pages calculation

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      navigate(`/launches/${pageNumber}`); // Update the URL with the new page number
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="launch-list-container">
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search by mission name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div>
          <label htmlFor="sort">Sort By: </label>
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
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LaunchList;
