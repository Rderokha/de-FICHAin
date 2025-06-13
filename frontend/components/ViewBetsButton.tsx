'use client';

import React from 'react';
import { REM } from 'next/font/google';
const rem = REM({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

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
      className={`${rem.className} cursor-pointer py-4 px-10 rounded-full leading-none font-black text-2xl text-[#FFFFFF] bg-[#000000] transition-shadow duration-300 hover:shadow-[0_0_20px_10px_rgba(255,174,74,0.5)]`}
    >
      VER<br/>APUESTAS
    </button>
  );
};

export default ViewBetsButton;