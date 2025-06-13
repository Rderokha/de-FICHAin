'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <>
    <header className="fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={0} height={0} className="w-[200px] h-[50px]" priority/>
      </Link>
      {/* Botón wallet*/}
      <div className="flex items-center gap-3 pr-4">
        <appkit-button />
      </div>
    </header>
    </>
  );
}