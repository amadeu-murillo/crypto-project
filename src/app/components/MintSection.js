import { useEffect, useState } from 'react';

const MintSection = ({ solPrice, onMint, userWallet }) => {
    const [tokenAmount, setTokenAmount] = useState(1000);
    const [totalCost, setTotalCost] = useState('0.00');

    useEffect(() => {
        if (!solPrice) return;
        const totalUSD = tokenAmount * 0.07; // TOKEN_PRICE_USD
        const totalSOL = totalUSD / solPrice;
        setTotalCost(totalSOL.toFixed(6));
    }, [tokenAmount, solPrice]);

    const handleAmountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTokenAmount(isNaN(value) || value < 1 ? 1 : value);
    };

    const increment = () => setTokenAmount(prev => prev + 100);
    const decrement = () => setTokenAmount(prev => Math.max(1, prev - 100));
  
    return (
        <section id="mint" className="my-24">
            <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto border-amber-400/30">
                <h3 className="text-3xl font-bold text-center mb-2 font-heading text-amber-400 glow-text">MINTING OFICIAL</h3>
                <p className="text-center text-gray-400 mb-6">Taxa de cunhagem antecipada: $0.07 por token.</p>
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Fornecimento Restante</span>
                        <span>Meta: 5,000,000 $SC</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-2.5">
                        <div className="progress-bar-fill h-2.5 rounded-full" style={{ width: '29%' }}></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-300 mb-2">Quantidade de Tokens ($SC)</label>
                        <div className="flex items-center">
                            <button onClick={decrement} className="input-number-btn text-amber-400 font-bold text-2xl px-4 h-14 rounded-l-lg">-</button>
                            <input type="number" id="tokenAmount" value={tokenAmount} onChange={handleAmountChange} className="w-full text-center bg-gray-900/70 border-y border-gray-600 h-14 text-white text-2xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all" min="1" />
                            <button onClick={increment} className="input-number-btn text-amber-400 font-bold text-2xl px-4 h-14 rounded-r-lg">+</button>
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
                            <span className="font-bold text-2xl text-amber-400 glow-text">{totalCost}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onMint(tokenAmount, totalCost)}
                        disabled={!userWallet || !solPrice}
                        className="w-full fancy-btn text-gray-900 font-bold py-4 px-6 rounded-lg text-xl disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {!userWallet ? 'Conecte a sua carteira' : 'PAGAR E CUNHAR AGORA'}
                    </button>
                </div>
                <p className="text-center mt-4 text-xs text-gray-500">
                    {userWallet ? `Conectado: ${userWallet}` : 'Nenhuma carteira conectada'}
                </p>
            </div>
        </section>
    );
};

export default MintSection;