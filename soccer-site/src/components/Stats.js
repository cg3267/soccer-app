import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Stats() {
  const { league } = useParams();
  const [topScorers, setTopScorers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `https://api.football-data.org/v4/competitions/${league}/scorers`,
          {
            headers: { "X-Auth-Token": "4eb3849dda5643409b8fd3036323e316" },
          }
        );
        setTopScorers(response.data.scorers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [league]);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <h2>Top Scorers</h2>
      <ul>
        {topScorers.map((scorer) => (
          <li key={scorer.player.id}>
            {scorer.player.name} - {scorer.numberOfGoals} goals
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
