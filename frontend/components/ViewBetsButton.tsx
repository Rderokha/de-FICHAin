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
    const yOffset = -80; // altura de h-20 en px (5rem = 80px)
    const y = betsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

  return (
    <button
      onClick={scrollToBets}
      className={`${rem.className} text-left inline-flex pl-5 pr-10 cursor-pointer py-4 px-10 rounded-full leading-none font-black text-2xl text-[#FFFFFF] bg-[#000000] transition-shadow duration-300 hover:shadow-[0_0_20px_10px_rgba(255,174,74,0.5)]`}
    >
      <img src="/shine.svg" alt="Estrella" className="w-12 h-12"/>VER<br/>APUESTAS
    </button>
  );
};

export default ViewBetsButton;