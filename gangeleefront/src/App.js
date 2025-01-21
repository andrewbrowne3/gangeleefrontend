// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Screens/LandingPage';
import MainScreen from './Screens/MainScreen';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/formulations" element={<MainScreen />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
