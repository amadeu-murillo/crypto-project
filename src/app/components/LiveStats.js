'use client';
import { useEffect, useRef, useState } from 'react';

const LiveStats = ({ mintData }) => {
  const [tokensMinted, setTokensMinted] = useState(0);
  const [participants, setParticipants] = useState(0);
  const ref = useRef(null);

  const animateStat = (setter, start, end, duration) => {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setter(currentValue);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Anima os números até o valor atual dos dados do mint
          animateStat(setTokensMinted, 0, mintData.tokensMinted, 2000);
          animateStat(setParticipants, 0, mintData.participants, 2000);
          observer.disconnect(); // Anima apenas uma vez
        }
      },
      { threshold: 0.8 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [mintData]); // Re-executa se os dados do mint mudarem

  return (
    <section ref={ref} id="live-stats" className="my-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-lg flex items-center justify-center space-x-4">
          <span className="font-heading text-2xl text-secondary-glow glow-text-secondary">Tokens Cunhados</span>
          <span className="font-bold text-3xl text-white">{tokensMinted.toLocaleString('pt-BR')}</span>
        </div>
        <div className="glass-card p-4 rounded-lg flex items-center justify-center space-x-4">
          <span className="font-heading text-2xl text-primary-glow glow-text">Participantes</span>
          <span className="font-bold text-3xl text-white">{participants.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
