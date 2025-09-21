const WhyUs = () => (
    <section id="why-us" className="my-24 max-w-5xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-12 font-heading text-white">PORQUÊ O SOL CASINO?</h3>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg text-center group transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4"><svg className="w-12 h-12 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg></div>
                <h4 className="font-heading font-bold text-xl mb-2 text-white">Justiça Comprovável</h4>
                <p className="text-gray-400 text-sm">Cada aposta, cada resultado, é registado de forma transparente na blockchain. Jogo limpo, garantido por código.</p>
            </div>
            <div className="glass-card p-6 rounded-lg text-center group transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4"><svg className="w-12 h-12 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg></div>
                <h4 className="font-heading font-bold text-xl mb-2 text-white">Pagamentos Instantâneos</h4>
                <p className="text-gray-400 text-sm">Os seus ganhos são transferidos diretamente para a sua carteira na velocidade da luz. Sem esperas, sem burocracia.</p>
            </div>
            <div className="glass-card p-6 rounded-lg text-center group transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-4"><svg className="w-12 h-12 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.965-2.962M18 18.72A9.094 9.094 0 0118 15.05M12.75 5.106a9.094 9.094 0 011.279 5.185M18 18.72a9.094 9.094 0 01-7.22-3.666M12.75 5.106a9.094 9.094 0 00-7.22 3.666" /></svg></div>
                <h4 className="font-heading font-bold text-xl mb-2 text-white">Propriedade da Comunidade</h4>
                <p className="text-gray-400 text-sm">Com o token $SC, você não é apenas um jogador, é um dono. Participe na governança e nos lucros da plataforma.</p>
            </div>
        </div>
    </section>
);

export default WhyUs;