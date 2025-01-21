// src/components/Header.js
import React from 'react';

const Header = ({ companyName }) => {
  return (
    <header className="header">
      <div className="header-logo">
     
        
        <h1 className="header-title">{companyName}</h1>
      </div>   <img
          src="/G_Angelee_Logo_no_background.png"
          alt={`${companyName} Logo`}
          className="logo-image"
        />
      <nav className="header-nav">
        <a href="#coming-soon" className="nav-link">Coming Soon</a>
      </nav>
    </header>
  );
};

export default Header;
