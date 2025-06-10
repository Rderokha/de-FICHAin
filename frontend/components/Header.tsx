'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { LoginForm, SignupForm } from '@/components/AuthForms';



export default function Header() {
  // Simulando sesión iniciada (puedes reemplazarlo con lógica real)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center p-4 bg-white">
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
            <button onClick={() => setShowLogin(true)} className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer">Login</button>
            <button onClick={() => setShowSignup(true)} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 cursor-pointer">Signup</button>
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
    {/* Login Modal */}
      {showLogin && (
        <Modal title="Login" onClose={() => setShowLogin(false)}>
          {/* Aquí va tu formulario de login */}
          <LoginForm/>
        </Modal>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <Modal title="Signup" onClose={() => setShowSignup(false)}>
          {/* Aquí va tu formulario de registro */}
          <SignupForm/>
        </Modal>
      )}
    </>
  );
}