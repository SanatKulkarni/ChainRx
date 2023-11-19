// HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>ChainRx: Web3 Based Pharma Supply Chain Management</h1>
        <p>Explore and enjoy the experience!</p>
      </header>
      <section className="main-content">
        <div className="animation-container">
          <div className="box"></div>
        </div>
        <p>This is some engaging content on your homepage.</p>
      </section>
      <footer>
        <p>Contact us for more information</p>
      </footer>
    </div>
  );
};

export default HomePage;
