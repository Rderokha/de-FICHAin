'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';


export default function Header() {
  // Simulando sesión iniciada (puedes reemplazarlo con lógica real)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={0} height={0} className="w-[200px] h-[50px]" priority/>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-6">
        <Link href="/marketplace" className="hover:text-blue-500">Marketplace</Link>
        <Link href="/dashboard" className="hover:text-blue-500">Mi Cuenta</Link>
        <Link href="/faq" className="hover:text-blue-500">FAQ</Link>
      </nav>
        {/* Botones Login / Signup */}
      <div className="flex items-center gap-3">
        {!isLoggedIn ? (
          <>
            <Link href="/login" className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
              Mi cuenta
            </Link>
            {/* Botón de conexión Web3 */}
            <appkit-button />
          </>
        )}
      </div>
    </header>
  );
}