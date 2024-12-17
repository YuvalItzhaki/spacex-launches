import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLaunches, getRocket } from "../services/spacexApi";
import { Launch, Rocket } from "../types/spacex";

const LaunchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      try {
        const launches = await getLaunches();
        const selectedLaunch = launches.find((l) => l.id === id);
        if (selectedLaunch) {
          setLaunch(selectedLaunch);
          const rocketData = await getRocket(selectedLaunch.rocket);
          setRocket(rocketData);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load launch details.");
        setLoading(false);
      }
    };
    fetchLaunchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !launch) return <p>{error || "Launch not found."}</p>;

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Launch List</button>
      <h1>{launch.name}</h1>
      <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
      <p>Rocket: {rocket?.name} ({rocket?.type})</p>
      <p>Details: {launch.details || "N/A"}</p>
      {launch.links.patch.small && (
        <img src={launch.links.patch.small} alt={`${launch.name} patch`} />
      )}
      {launch.links.webcast && (
        <p>
          Watch the launch:{" "}
          <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </p>
      )}
    </div>
  );
};

export default LaunchDetail;
