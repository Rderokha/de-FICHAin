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
  category: string;
  options: string[];
  status: string;
  createdAt: string;
};

export default function Home() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [fade, setFade] = useState(false);
  const [displayBets, setDisplayBets] = useState<Bet[]>([]);

  const filteredBets = selectedCategory === "todas"
    ? bets
    : bets.filter((bet) => bet.category === selectedCategory);

  const loadBets = async () => {
    try {
      const data = await fetchBets();
      setBets(data);
      setDisplayBets(data); // mostrar inicialmente todas las apuestas
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBets();
  }, []);

  useEffect(() => {
    setFade(true); // fade out
    const timeout = setTimeout(() => {
      setDisplayBets(filteredBets);
      setFade(false); // fade in
    }, 300); // tiempo igual que la duración CSS

    return () => clearTimeout(timeout);
  }, [selectedCategory, bets]);

  return (
    <main>
      <Header/>
      <div className='pt-35 mx-auto w-fit text-center'>
        <span className={`${rem.className} font-black text-7xl text-white opacity-0 animate-[fadeIn_1.5s_ease-in_forwards]`}>APUESTA, PROPONE, DECIDE</span><br/>
        <Typewriter className={`${rem.className} font-semibold text-4xl text-[#05D7B2] w-fit mx-auto opacity-0 animate-[fadeIn_2s_ease-in_forwards]`} text="LA CASA DE APUESTAS DEL FUTURO, EN TU REGIÓN." speed={60}/>
      </div>
      <section className='flex space-x-6 mx-auto w-fit text-center pt-16'>
        <ProposeBetButton/>
        <ViewBetsButton/>
      </section>
      <section className='w-fit pt-16 mx-auto'>
        <div className="flex flex-wrap gap-2 mb-6 bg-[#087D68] w-fit rounded-full cursor-pointer px-1 py-1">
          {["todas", "social", "economía", "política"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${rem.className} px-4 py-2 rounded-full transition-all text-3x1 font-semibold cursor-pointer ${
                selectedCategory === category
                  ? "bg-white text-[#087D68]"
                  : "text-white"
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </section>
      <div className="max-w-7xl mx-auto">
        <section id="bets-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 pb-10 transition-opacity duration-300" style={{ opacity: fade ? 0 : 1 }}>
          {loading ? (
            <p className="text-center col-span-full">Cargando apuestas...</p>
          ) : bets.length === 0 ? (
            <p className="text-center col-span-full">No hay apuestas disponibles.</p>
          ) : (
            displayBets.map((bet) => (
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
                {bet.status === 'OPEN' && (
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
