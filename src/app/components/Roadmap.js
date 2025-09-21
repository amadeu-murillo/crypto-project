const Roadmap = () => (
    <section id="roadmap" className="section">
        <h3 className="roadmap-title">ROADMAP ESTRATÉGICO</h3>
        <div className="roadmap-container">
            <div className="timeline-line"></div>
            
            <div className="timeline-item">
                <div className="timeline-item-header">
                    <h4 className="timeline-item-title timeline-item-title-active">Q4 2025 - GÊNESE</h4>
                    <span className="timeline-status-badge badge-progress">EM PROGRESSO</span>
                </div>
                <p className="timeline-item-text">Lançamento do token $SC, evento de cunhagem pública, auditoria de segurança dos contratos inteligentes e formação da comunidade de pioneiros.</p>
            </div>

            <div className="timeline-item">
                <div className="timeline-item-header">
                    <h4 className="timeline-item-title timeline-item-title-planned">Q1 2026 - LANÇAMENTO BETA</h4>
                    <span className="timeline-status-badge badge-planned">PLANEADO</span>
                </div>
                <p className="timeline-item-text">Inauguração da plataforma de casino com jogos clássicos (Blackjack & Roleta). Lançamento do programa de staking v1 para recompensas de $SC.</p>
            </div>
            
            <div className="timeline-item">
                <div className="timeline-item-header">
                    <h4 className="timeline-item-title timeline-item-title-planned">Q2 2026 - EXPANSÃO</h4>
                    <span className="timeline-status-badge badge-planned">PLANEADO</span>
                </div>
                <p className="timeline-item-text">Introdução de jogos de Poker e Slots on-chain. Implementação do sistema de afiliados e do tesouro comunitário para divisão de receitas.</p>
            </div>

            <div className="timeline-item">
                <div className="timeline-item-header">
                    <h4 className="timeline-item-title timeline-item-title-planned">Q3 2026 - GOVERNANÇA DAO</h4>
                    <span className="timeline-status-badge badge-planned">PLANEADO</span>
                </div>
                <p className="timeline-item-text">Transição para um modelo de governança descentralizada (DAO), onde detentores de $SC votam no futuro da plataforma e na alocação de fundos.</p>
            </div>
        </div>
    </section>
);

export default Roadmap;
