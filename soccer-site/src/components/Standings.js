import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './Standings.css'; 

function Standings() {
  const urlRoot = process.env.REACT_APP_API_URL;

  const { league } = useParams();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        console.log(`Getting data for ${urlRoot}/competitions/${league}/standings`);
        const response = await axios.get(`${urlRoot}/competitions/${league}/standings`);
        setStandings(response.data.standings[0].table);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching standings", error);
        setLoading(false);
      }
    };

    fetchStandings();
  }, [league]);

  if (loading) {
    return <div className="loading">Loading standings...</div>;
  }

  return (
    <div className="standings-container">
      <h2>Standings</h2>
      <table className="standings-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.position}>
              <td>{team.position}</td>
              <td>
                <div className="team-info">
                   {team.team.crest ? (
                    <img 
                      src={team.team.crest} 
                      alt={`${team.team.name} logo`} 
                      className="team-logo"
                    />
                  ) : (
                    <div className="default-logo">🏅</div>
                  )}
                  <span>{team.team.name}</span>
                </div>
              </td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;
