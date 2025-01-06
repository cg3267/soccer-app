import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './LeagueList.css'; 

function LeagueList() {
  const urlRoot = process.env.REACT_APP_API_URL;

  const [leagues, setLeagues] = useState([]);
  
  const preferredOrder = [
    '2001', // UEFA Champions League
    '2021', // Premier League
    '2019', // Primeira Liga
    '2002', // Bundesliga
    '2015', // Serie A
    '2011', // Ligue 1
  ];

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(`${urlRoot}/competitions`);
       // console.log(response.data); 
         // console.log(response.data); 
        const sortedLeagues = response.data.competitions.sort((a, b) => {
          const aIndex = preferredOrder.indexOf(a.id.toString());
          const bIndex = preferredOrder.indexOf(b.id.toString());

          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          } else if (aIndex !== -1) {
            return -1;
          } else if (bIndex !== -1) {
            return 1;
          } else {
            return a.name.localeCompare(b.name); 
          }
        });

        setLeagues(sortedLeagues);
      } catch (error) {
        console.error("Error fetching leagues", error);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="league-list-container">
      <h2 className="title">Select a League</h2>
      <p className="description">Choose a league to view the standings and stats.</p>
      <ul className="league-list">
        {leagues.map((league) => (
            
          <li key={league.id} className="league-item">
            <Link to={`/standings/${league.id}`} className="league-link">
              <div className="league-card">
                <img 
                  src={league.emblem || '/default-logo.png'}
                   alt={`${league.name} logo`} 
                  className="league-logo" 
                />
                <span className="league-name">{league.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeagueList;
