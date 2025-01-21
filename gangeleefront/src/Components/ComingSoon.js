// src/components/ComingSoon.js
import React from 'react';

import EyePoppingButton from './Button';

const ComingSoon = () => {
  return (
    <section id="coming-soon" style={{ textAlign: 'center', padding: '2rem 1rem', backgroundColor: '#fee8f3' }}>
      <h3 style={{ fontSize: '2rem' }}>Coming Soon</h3>
      <p style={{ maxWidth: '500px', margin: '1rem auto', fontSize: '1.2rem' }}>
      Something Good is Coming Soon! Sign up for the waitlist today and be the first to know when it's available.
      </p>
      <EyePoppingButton />
    </section>
  );
};

export default ComingSoon;
