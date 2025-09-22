'use client';
import { useMint } from '@/context/MintContext';
import styles from './LiveStats.module.css';

const LiveStats = () => {
  const { mintData } = useMint();

  return (
    <section id="live-stats" className={`my-24 ${styles.statsContainer}`}>
      <div className={styles.statItem}>
        <h4 className={`font-heading text-2xl ${styles.statLabel} ${styles.secondary}`}>Tokens Cunhados</h4>
        <div className={styles.statValue}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-14l-3 3m5 0l-3-3m3 3l3 3m-5-3l3-3m-3 3v3m0 0h-3m3 0h3m-3 0v3m0-3V9m0 3h-3m3 0h3m0 0v3m0-3V9" />
          </svg>
          <span>{mintData.tokensMinted.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div className={styles.statItem}>
        <h4 className={`font-heading text-2xl ${styles.statLabel} ${styles.primary}`}>Participantes</h4>
        <div className={styles.statValue}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{mintData.participants.toLocaleString('pt-BR')}</span>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;