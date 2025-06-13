"use client";
import Header from '@/components/Header';
import Typewriter from '@/components/Typewriter';
import ProposeBetButton from '@/components/ProposeBetButton'
import { REM } from 'next/font/google';
import { useEffect, useState } from "react";
import { fetchBets } from "@/utils/api";

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
      <section>
        <ProposeBetButton/>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Bets</h2>
        {loading && <p>Loading...</p>}
        {!loading && bets.length === 0 && <p>No bets found.</p>}
        <ul className="space-y-4">
          {bets.map((bet) => (
            <li key={bet.id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{bet.title}</h3>
              {bet.description && <p className="text-gray-600">{bet.description}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Options: {bet.options.join(" / ")}
              </p>
              <p className="text-sm text-gray-400">Status: {bet.status}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
