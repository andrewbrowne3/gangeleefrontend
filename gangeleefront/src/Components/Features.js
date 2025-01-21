// src/components/Features.js
import React from 'react';

const Features = () => {
  return (
    <section id="features" style={{ padding: '2rem 1rem', backgroundColor: '#faadd4', color: '#fff', textAlign: 'center' }}>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Our Features</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ margin: '1rem 0' }}>🌱 Eco-friendly Ingredients</li>
        <li style={{ margin: '1rem 0' }}>🧴 Tailored Hair Care Solutions</li>
        <li style={{ margin: '1rem 0' }}>✨ Scientifically Proven Formulations</li>
      </ul>
    </section>
  );
};

export default Features;
