import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLaunches } from "../services/spacexApi";
import { Launch } from "../types/spacex";
import { format } from "date-fns";

const LaunchList: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by mission name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredLaunches.map((launch) => (
          <li key={launch.id}>
            <Link to={`/launch/${launch.id}`}>
              <h2>{launch.name}</h2>
              <p>{format(new Date(launch.date_utc), "PPP")}</p>
              <p>Rocket: {launch.rocket}</p>
              <p>Status: {launch.success ? "Success" : "Failure"}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LaunchList;
