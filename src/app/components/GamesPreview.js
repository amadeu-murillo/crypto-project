import styles from './GamesPreview.module.css';

const GameIcon = ({ type }) => {
    // Ícones SVG simples para cada jogo
    switch (type) {
      case 'blackjack':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.gameIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 18V3m0 18h6m-6 0H6m6-18h6M6 3h6m6 18c2.4 0 4-1.6 4-3.5S20.4 14 18 14H6c-2.4 0-4 1.6-4 3.5S3.6 21 6 21m12 0h-6" />
          </svg>
        );
      case 'roulette':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.gameIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.02 12.02 0 00-5.84-2.56m0 0V3.34m0 5.84a12.02 12.02 0 01-5.84-2.56m5.84 2.56V11.5m0 0a6 6 0 01-5.84-7.38m5.84 7.38a12.015 12.015 0 005.84-2.56" />
          </svg>
        );
      case 'slots':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.gameIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6m-6 0h6m6-6l-3.375 3.375M3 18.001L6.375 14.626" />
          </svg>
        );
      default:
        return null;
    }
  };


const GamesPreview = () => (
  <section id="games-preview" className="section">
    <h3 className="roadmap-title">JOGOS EM DESTAQUE</h3>
    <div className={styles.gamesGrid}>
      {/* Jogo 1: Blackjack */}
      <div className={`${styles.gameCard} glass-card`}>
        <div className={styles.imageContainer}>
          <img 
            src="https://placehold.co/600x400/000000/000000?text=+" 
            alt="Mesa de Blackjack" 
            className={styles.gameImage}
          />
          <div className={styles.imageOverlay}></div>
          <GameIcon type="blackjack" />
          <span className={styles.comingSoonBadge}>EM BREVE</span>
        </div>
        <div className={styles.cardContent}>
          <h4 className={styles.gameTitle}>Solana Blackjack</h4>
          <p className={styles.gameDescription}>O clássico jogo de cartas, agora com a velocidade e transparência da Solana.</p>
          <div className={styles.payoutInfo}>
            <span className={styles.payoutLabel}>Jackpot Progressivo</span>
            <span className={styles.payoutValue}>1.500.000 $SC</span>
          </div>
        </div>
      </div>

      {/* Jogo 2: Roleta */}
      <div className={`${styles.gameCard} glass-card`}>
        <div className={styles.imageContainer}>
          <img 
            src="https://placehold.co/600x400/000000/000000?text=+" 
            alt="Roda de Roleta" 
            className={styles.gameImage}
          />
          <div className={styles.imageOverlay}></div>
          <GameIcon type="roulette" />
          <span className={styles.comingSoonBadge}>EM BREVE</span>
        </div>
        <div className={styles.cardContent}>
          <h4 className={styles.gameTitle}>Quantum Roulette</h4>
          <p className={styles.gameDescription}>A sorte gira a seu favor nesta roleta com multiplicadores quânticos.</p>
          <div className={styles.payoutInfo}>
            <span className={styles.payoutLabel}>Multiplicador Máx.</span>
            <span className={`${styles.payoutValue} ${styles.payoutSecondary}`}>500x</span>
          </div>
        </div>
      </div>

      {/* Jogo 3: Slots */}
      <div className={`${styles.gameCard} glass-card`}>
        <div className={styles.imageContainer}>
          <img 
            src="https://placehold.co/600x400/000000/000000?text=+" 
            alt="Máquina de Slots" 
            className={styles.gameImage}
          />
          <div className={styles.imageOverlay}></div>
          <GameIcon type="slots" />
          <span className={styles.comingSoonBadge}>EM BREVE</span>
        </div>
        <div className={styles.cardContent}>
          <h4 className={styles.gameTitle}>Crypto Slots</h4>
          <p className={styles.gameDescription}>Gire para ganhar com as nossas slots temáticas e jackpots massivos.</p>
          <div className={styles.payoutInfo}>
            <span className={styles.payoutLabel}>Prêmio Máximo</span>
            <span className={styles.payoutValue}>5.000.000 $SC</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GamesPreview;

