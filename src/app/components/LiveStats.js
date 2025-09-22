'use client';
import { useEffect, useRef, useState } from 'react';
import { useMint } from '@/context/MintContext';
import styles from './LiveStats.module.css'; // Alterado para usar CSS Modules

const LiveStats = () => {
  const { mintData } = useMint();
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
          animateStat(setTokensMinted, 0, mintData.tokensMinted, 2000);
          animateStat(setParticipants, 0, mintData.participants, 2000);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [mintData]);

  return (
    <section ref={ref} id="live-stats" className="my-24">
      <div className={styles.statsGrid}>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statHeader}>
            <div className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              LIVE
            </div>
            <h4 className={`font-heading text-2xl ${styles.statLabel} ${styles.secondary}`}>Tokens Cunhados</h4>
          </div>
          <div className={styles.statValue}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-14l-3 3m5 0l-3-3m3 3l3 3m-5-3l3-3m-3 3v3m0 0h-3m3 0h3m-3 0v3m0-3V9m0 3h-3m3 0h3m0 0v3m0-3V9" />
            </svg>
            <span>{tokensMinted.toLocaleString('pt-BR')}</span>
          </div>
        </div>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statHeader}>
             <div className={styles.liveIndicator}>
              <span className={styles.liveDot}></span>
              LIVE
            </div>
            <h4 className={`font-heading text-2xl ${styles.statLabel} ${styles.primary}`}>Participantes</h4>
          </div>
          <div className={styles.statValue}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{participants.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;