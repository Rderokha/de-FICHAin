"use client";
import Header from '@/components/Header';
import Typewriter from '@/components/Typewriter';
import ProposeBetButton from '@/components/ProposeBetButton'
import ViewBetsButton from '@/components/ViewBetsButton';
import { useEffect, useState } from "react";
import { fetchBets } from "@/utils/api";


import { REM } from 'next/font/google';
const rem = REM({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

type Bet = {
  id: number;
  title: string;
  description: string | null;
  options: string[];
  status: string;
  createdAt: string;
};

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBets = async () => {
    try {
      const data = await fetchBets();
      setBets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBets();
  }, []);
  return (
    <main>
      <Header/>
      <div className='pt-35 mx-auto w-fit text-center'>
        <span className={`${rem.className} font-black text-7xl text-white opacity-0 animate-[fadeIn_1.5s_ease-in_forwards]`}>APUESTA, PROPONE, DECIDE</span><br/>
        <Typewriter className={`${rem.className} font-semibold text-4xl text-[#05D7B2] w-fit mx-auto opacity-0 animate-[fadeIn_2s_ease-in_forwards]`} text="LA CASA DE APUESTAS DEL FUTURO, EN TU REGIÓN." speed={60}/>
      </div>
      <section className='flex space-x-4 mx-auto w-fit text-center pt-8'>
        <ProposeBetButton/>
        <ViewBetsButton/>
      </section>
      <div className="max-w-7xl mx-auto">
        <section id="bets-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {loading ? (
            <p className="text-center col-span-full">Cargando apuestas...</p>
          ) : bets.length === 0 ? (
            <p className="text-center col-span-full">No hay apuestas disponibles.</p>
          ) : (
            bets.map((bet) => (
              <div
                key={bet.id}
                className="bg-white shadow-md rounded-xl p-4 hover:shadow-[0_0_20px_5px_rgba(255,255,0,0.3)] transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">{bet.title}</h2>
                  <p className="text-sm font-medium text-yellow-700 mb-1 capitalize">
                    Categoría: {bet.category}
                  </p>
                  {bet.description && (
                    <p className="text-gray-700 mb-4 text-sm leading-tight">{bet.description}</p>
                  )}
                  <ul className="text-sm text-gray-600 mb-4 list-disc list-inside">
                    {bet.options.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                </div>
                {bet.status === 'open' && (
                  <button className="mt-auto bg-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors duration-200 cursor-pointer">
                    Apostar
                  </button>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
