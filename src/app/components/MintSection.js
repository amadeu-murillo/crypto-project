'use client';
import { useEffect, useState } from 'react';
import { TOKEN_PRICE_USD } from '@/lib/constants';
import './MintSection.module.css'
const MintSection = ({ solPrice, onMint, userWallet, isMinting, mintData, totalSupply }) => {
    const [tokenAmount, setTokenAmount] = useState(1000);
    const [totalCost, setTotalCost] = useState('0.00');

    const progressPercentage = ((mintData.tokensMinted / totalSupply) * 100).toFixed(2);

    useEffect(() => {
        if (!solPrice || isNaN(tokenAmount)) return;
        const totalUSD = tokenAmount * TOKEN_PRICE_USD;
        const totalSOL = totalUSD / solPrice;
        setTotalCost(totalSOL.toFixed(6));
    }, [tokenAmount, solPrice]);

    const handleAmountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTokenAmount(isNaN(value) || value < 1 ? 1 : value);
    };

    const increment = () => setTokenAmount(prev => prev + 100);
    const decrement = () => setTokenAmount(prev => Math.max(1, prev - 100));
  
    const getButtonText = () => {
        if (!userWallet) return 'Conecte a sua carteira';
        if (isMinting) return 'Processando...';
        return 'PAGAR E CUNHAR AGORA';
    };

    return (
        <section id="mint" className="my-24">
            <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border-primary-glow/30">
                <h3 className="text-3xl font-bold text-center mb-2 font-heading text-primary-glow glow-text">MINTING OFICIAL</h3>
                <p className="text-center text-gray-400 mb-6">Taxa de cunhagem antecipada: ${TOKEN_PRICE_USD} por token.</p>
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{mintData.tokensMinted.toLocaleString('pt-BR')} / {totalSupply.toLocaleString('pt-BR')}</span>
                        <span>{progressPercentage}% Concluído</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2.5">
                        <div className="progress-bar-fill h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-300 mb-2">Quantidade de Tokens ($SC)</label>
                        <div className="flex items-center">
                            <button onClick={decrement} className="input-number-btn text-primary-glow font-bold text-2xl px-4 h-14 rounded-l-lg" disabled={isMinting}>-</button>
                            <input type="number" id="tokenAmount" value={tokenAmount} onChange={handleAmountChange} className="w-full text-center bg-gray-900/70 border-y border-gray-600 h-14 text-white text-2xl focus:ring-2 focus:ring-primary-glow focus:outline-none transition-all" min="1" disabled={isMinting} />
                            <button onClick={increment} className="input-number-btn text-primary-glow font-bold text-2xl px-4 h-14 rounded-r-lg" disabled={isMinting}>+</button>
                        </div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Preço do SOL:</span>
                            <span className="font-semibold text-white">{solPrice ? `$${solPrice.toFixed(2)}` : 'A carregar...'}</span>
                        </div>
                        <hr className="border-gray-700 my-3" />
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-lg">Custo Total (SOL):</span>
                            <span className="font-bold text-2xl text-primary-glow glow-text">{totalCost}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onMint(tokenAmount, totalCost)}
                        disabled={!userWallet || !solPrice || isMinting}
                        className="w-full fancy-btn py-4 px-6 rounded-lg text-xl"
                    >
                        {getButtonText()}
                    </button>
                </div>
                <p className="text-center mt-4 text-xs text-gray-500 truncate">
                    {userWallet ? `Conectado: ${userWallet}` : 'Nenhuma carteira conectada'}
                </p>
            </div>
        </section>
    );
};

export default MintSection;
