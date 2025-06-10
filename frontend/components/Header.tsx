'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';


export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <span className="text-xl font-bold">ReownApp</span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-6">
        <Link href="/marketplace" className="hover:text-blue-500">Marketplace</Link>
        <Link href="/dashboard" className="hover:text-blue-500">Mi Cuenta</Link>
        <Link href="/faq" className="hover:text-blue-500">FAQ</Link>
      </nav>

      {/* Botón de conexión Web3 */}
      <div>
        <appkit-button />
      </div>
    </header>
  );
}