'use client';

import React from 'react';

const ViewBetsButton = () => {
  const scrollToBets = () => {
    const betsSection = document.getElementById('bets-list');
    if (betsSection) {
      betsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToBets}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Ver apuestas
    </button>
  );
};

export default ViewBetsButton;