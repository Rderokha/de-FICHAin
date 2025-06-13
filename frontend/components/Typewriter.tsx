'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
};

export default function Typewriter({ text, speed = 50, className = '', showCursor = true}: Props) {
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
    <span className={`${className}`}>
      {displayedText}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
}