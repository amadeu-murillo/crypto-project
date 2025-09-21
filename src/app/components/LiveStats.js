'use client';
import { useEffect, useRef, useState } from 'react';

const LiveStats = () => {
  const [tokensMinted, setTokensMinted] = useState(1000000);
  const [participants, setParticipants] = useState(500);
  const ref = useRef(null);

  useEffect(() => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStat(setTokensMinted, 1000000, 1483291, 2000);
          animateStat(setParticipants, 500, 852, 2000);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="live-stats" className="my-24">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-lg flex items-center justify-center space-x-4">
          <span className="font-heading text-2xl text-purple-400 glow-text-secondary">Tokens Cunhados</span>
          <span className="font-bold text-3xl text-white">{tokensMinted.toLocaleString('pt-BR')}</span>
        </div>
        <div className="glass-card p-4 rounded-lg flex items-center justify-center space-x-4">
          <span className="font-heading text-2xl text-amber-400 glow-text">Participantes</span>
          <span className="font-bold text-3xl text-white">{participants.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;