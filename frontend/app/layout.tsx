import type { Metadata } from 'next'
import './globals.css'
import ParticlesBackground from "@/components/ParticlesBackground";

import { headers } from 'next/headers' // added
import ContextProvider from '@/context'

import { REM } from 'next/font/google';

const rem = REM({
  subsets: ['latin'],
  weight: ['400', '700'], // puedes incluir más pesos si los necesitas
});

export const metadata: Metadata = {
  title: 'Inicio | de·FICHAin',
  description: 'Powered by Reown'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="en">
      <body>
        <ParticlesBackground/>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  )
}