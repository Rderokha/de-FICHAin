import Header from '@/components/Header';
import Typewriter from '@/components/Typewriter';
import { REM } from 'next/font/google';

const rem = REM({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
});

export default function Home() {
  return (
    <main>
      <Header/>
      <div className='pt-35 mx-auto w-fit text-center'>
        <span className={`${rem.className} font-black text-7xl text-white opacity-0 animate-[fadeIn_1.5s_ease-in_forwards]`}>APUESTA, PROPONE, DECIDE</span><br/>
        <Typewriter className={`${rem.className} font-semibold text-4xl text-[#05D7B2] w-fit mx-auto opacity-0 animate-[fadeIn_2s_ease-in_forwards]`} text="LA CASA DE APUESTAS DEL FUTURO, EN TU REGIÓN." speed={60}/>
      </div>
    </main>
  );
}
