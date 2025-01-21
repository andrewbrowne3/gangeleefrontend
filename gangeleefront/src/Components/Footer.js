// src/components/Footer.js
import React from 'react';

const Footer = ({ companyName }) => {
  return (
    <footer className="footer">
      <img
        src="/G_Angelee_Logo.png"
        alt={`${companyName} Logo`}
        className="footer-logo"
      />
      <p className="footer-text">&copy; 2025 {companyName}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
