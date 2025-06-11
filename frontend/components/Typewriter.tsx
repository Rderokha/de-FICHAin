'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  speed?: number;
};

export default function Typewriter({ text, speed = 50 }: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <span className="whitespace-pre text-5xl font-mono text-gray-800">
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
}
