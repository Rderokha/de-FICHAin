import Image from "next/image";
import Header from '@/components/Header';
import Typewriter from '@/components/Typewriter';

export default function Home() {
  return (
    <main>
      <Header/>
      <div className="pt-20">
        <Typewriter text="Apuesta, propone, decide: la casa de apuestas del futuro, en tu región." speed={60}/>
      </div>
    </main>
  );
}
