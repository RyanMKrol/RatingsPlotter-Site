import React from 'react';

import logo from './../assets/logo.svg';

import './Home.css';

function Home() {
  return (
    <div className="page-body">
      <div className="Home">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Home Page - Under Development!
        </p>
      </div>
    </div>
  );
}

export default Home;
