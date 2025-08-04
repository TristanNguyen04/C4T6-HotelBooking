import React, { useEffect, useRef, useState } from 'react';
import planeImg from '../assets/paperplane.png';

const path = [
  { x: 20, y: 500 },
  { x: 40, y: 500 },
  { x: 50, y: 500 },
  { x: 60, y: 500 },
  { x: 70, y: 500 },
  { x: 100, y: 500 },
  { x: 50, y: 500 },
];

const PaperPlane: React.FC = () => {
  const planeRef = useRef<HTMLImageElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = window.scrollY / maxScroll;
      const maxProgress = path.length - 1;

      setProgress(scrollRatio * maxProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getInterpolatedPosition = () => {
    const i = Math.floor(progress);
    const t = progress - i;

    const current = path[i];
    const next = path[i + 1] || current;

    const x = current.x + (next.x - current.x) * t;
    const y = current.y + (next.y - current.y) * t;

    return { x, y };
  };

  const { x, y } = getInterpolatedPosition();

  return (
    <img
      ref={planeRef}
      src={planeImg}
      alt="paper plane"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate(${x}vw, ${y}px)`,
        transition: 'transform 0.1s linear',
        width: '40px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default PaperPlane;