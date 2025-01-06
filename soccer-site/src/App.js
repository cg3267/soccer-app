import React from 'react';
import { Routes, Route } from "react-router-dom";  

import HomePage from './components/HomePage'; 
import LeagueList from './components/LeagueList';
import Standings from './components/Standings';
import Stats from './components/Stats';
import Header from './components/Header';
function App() {
  return (
    <div>
        <Header /> 
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/leagues" element={<LeagueList />} />
          <Route path="/standings/:league" element={<Standings />} />
          <Route path="/stats/:league" element={<Stats />} />
        </Routes>
    </div>
  );
}

export default App;
