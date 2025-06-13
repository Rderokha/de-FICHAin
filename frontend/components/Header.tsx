'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    // Revisar scroll al montar
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
    <header className={`fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center p-4 ${
          scrolled ? 'bg-[#04373B] shadow-xl' : 'bg-transparent'
        }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={0} height={0} className="w-[200px] h-[50px]" priority/>
      </Link>
      {/* Botón wallet*/}
      <div className="flex items-center gap-3 pr-4">
        <appkit-button label='Conecta tu Wallet' loadingLabel='Conectando'/>
      </div>
    </header>
    </>
  );
}