const Roadmap = () => (
    <section id="roadmap" className="my-24">
        <h3 className="text-4xl font-bold text-center mb-16 font-heading text-white">ROADMAP ESTRATÉGICO</h3>
        <div className="relative max-w-3xl mx-auto p-4">
            <div className="border-l-2 timeline-line absolute h-full top-0 left-4"></div>
            <div className="mb-12 pl-12 relative timeline-item">
                <div className="flex items-center mb-1">
                    <h4 className="text-xl font-bold text-amber-400 font-heading">Q4 2025 - GÊNESE</h4>
                    <span className="ml-3 text-xs font-bold bg-purple-500/50 text-purple-300 py-0.5 px-2 rounded-full">EM PROGRESSO</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">Lançamento do token $SC, evento de cunhagem pública, auditoria de segurança dos contratos inteligentes e formação da comunidade de pioneiros.</p>
            </div>
            <div className="mb-12 pl-12 relative timeline-item">
                <div className="flex items-center mb-1">
                    <h4 className="text-xl font-bold text-gray-400 font-heading">Q1 2026 - LANÇAMENTO BETA</h4>
                    <span className="ml-3 text-xs font-bold bg-gray-500/50 text-gray-300 py-0.5 px-2 rounded-full">PLANEADO</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">Inauguração da plataforma de casino com jogos clássicos (Blackjack & Roleta). Lançamento do programa de staking v1 para recompensas de $SC.</p>
            </div>
            <div className="mb-12 pl-12 relative timeline-item">
                <div className="flex items-center mb-1">
                    <h4 className="text-xl font-bold text-gray-400 font-heading">Q2 2026 - EXPANSÃO</h4>
                    <span className="ml-3 text-xs font-bold bg-gray-500/50 text-gray-300 py-0.5 px-2 rounded-full">PLANEADO</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">Introdução de jogos de Poker e Slots on-chain. Implementação do sistema de afiliados e do tesouro comunitário para divisão de receitas.</p>
            </div>
            <div className="mb-12 pl-12 relative timeline-item">
                <div className="flex items-center mb-1">
                    <h4 className="text-xl font-bold text-gray-400 font-heading">Q3 2026 - GOVERNANÇA DAO</h4>
                    <span className="ml-3 text-xs font-bold bg-gray-500/50 text-gray-300 py-0.5 px-2 rounded-full">PLANEADO</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">Transição para um modelo de governança descentralizada (DAO), onde detentores de $SC votam no futuro da plataforma e na alocação de fundos.</p>
            </div>
        </div>
    </section>
);

export default Roadmap;