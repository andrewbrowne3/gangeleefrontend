// src/components/HeroSection.js
import React from 'react';

const HeroSection = ({ companyName }) => {
  return (
    <section className="hero-section">
    
      <h2 className="hero-title">Welcome to {companyName}</h2>
      <p className="hero-text">
      Where you can find only the good...
      <br/>
      We bring you only the good ingredients, that are effective, and chosen with purpose. Our
      <br/>
      hair care products are formulated to deliver real results, combining the best of nature and
      <br/>     </p>
    </section>
  );
};

export default HeroSection;
