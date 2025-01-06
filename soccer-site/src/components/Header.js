import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; 

function Header() {
  return (
    <mainheader className="mainheader">
      <div className="logo-container">
        <h1 className="logo">Soccer Stats</h1>
      </div>
      <nav className="nav-links">
      <Link to="/" className="nav-link">Home</Link>

        <Link to="/leagues" className="nav-link">Leagues</Link>
        <Link to="/standings" className="nav-link">Standings</Link>
        <Link to="/stats" className="nav-link">Stats</Link>
      </nav>
    </mainheader>
  );
}

export default Header;
