// src/screens/LandingPage.js
import React from 'react';
import Header from '../Components/Header';
import HeroSection from '../Components/HeroSection';
import Features from '../Components/Features';
import ComingSoon from '../Components/ComingSoon';
import Footer from '../Components/Footer';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header companyName="Gangelee" />
      <HeroSection companyName="Gangelee" />
      <ComingSoon />
      <Footer companyName="Gangelee" />
    </div>
  );
};

export default LandingPage;
