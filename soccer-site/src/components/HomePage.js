import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Make sure to import the CSS file for styling

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Soccer Stats</h1>
        <p className="home-subtitle">A website to view soccer league standings, stats, and more!</p>
      </header>

      <section className="home-content">
        <h2 className="section-title">Explore Leagues</h2>
        <p className="section-description">
          Select a league to view the standings and other statistics.
        </p>
        <Link to="/leagues" className="cta-button">
          <span>See Available Leagues</span>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
