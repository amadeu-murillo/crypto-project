'use client';
import { useEffect, useState } from 'react';
import { TOKEN_PRICE_USD, TOTAL_SUPPLY } from '@/lib/constants';
import { useMint } from '@/context/MintContext';
import styles from './MintSection.module.css'; // Alterado para usar CSS Modules

const MintSection = ({ solPrice, onMint, userWallet, isMinting }) => {
    const { mintData } = useMint();
    const [tokenAmount, setTokenAmount] = useState(1000);
    const [totalCostSOL, setTotalCostSOL] = useState('0.00');
    const [totalCostUSD, setTotalCostUSD] = useState('0.00');

    const progressPercentage = ((mintData.tokensMinted / TOTAL_SUPPLY) * 100).toFixed(2);

    useEffect(() => {
        if (!solPrice || isNaN(tokenAmount)) return;
        const totalUSD = tokenAmount * TOKEN_PRICE_USD;
        const totalSOL = totalUSD / solPrice;
        setTotalCostSOL(totalSOL.toFixed(6));
        setTotalCostUSD(totalUSD.toFixed(2));
    }, [tokenAmount, solPrice]);

    const handleAmountChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setTokenAmount(isNaN(value) || value < 1 ? 1 : value);
    };

    const setPresetAmount = (amount) => {
        setTokenAmount(amount);
    }
    
    // Função para calcular o máximo de tokens que o usuário pode mintar (simulado)
    const setMaxAmount = () => {
        // Lógica de exemplo: define um valor máximo aleatório
        const maxAmount = Math.floor(Math.random() * (25000 - 10000 + 1)) + 10000;
        setTokenAmount(maxAmount);
    }

    const getButtonText = () => {
        if (!userWallet) return 'Conecte a sua carteira';
        if (isMinting) return 'Processando...';
        return 'PAGAR E CUNHAR AGORA';
    };

    return (
        <section id="mint" className="my-24">
            <div className={`glass-card ${styles.mintCard}`}>
                <h3 className={styles.title}>MINTING OFICIAL</h3>
                <p className={styles.subtitle}>Taxa de cunhagem antecipada: ${TOKEN_PRICE_USD} por token.</p>
                
                <div className={styles.progressContainer}>
                    <div className={styles.progressLabels}>
                        <span>{mintData.tokensMinted.toLocaleString('pt-BR')} / {TOTAL_SUPPLY.toLocaleString('pt-BR')}</span>
                        <span>{progressPercentage}% Concluído</span>
                    </div>
                    <div className={styles.progressBarBg}>
                        <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <fieldset disabled={isMinting} className={styles.controlsFieldset}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="tokenAmount" className="block text-sm font-medium text-gray-300 mb-2">Quantidade de Tokens ($SC)</label>
                            <div className={styles.amountInputWrapper}>
                                <input type="number" id="tokenAmount" value={tokenAmount} onChange={handleAmountChange} className={styles.tokenInput} min="1" />
                            </div>
                            <div className={styles.presetButtons}>
                                <button onClick={() => setPresetAmount(1000)}>1k</button>
                                <button onClick={() => setPresetAmount(5000)}>5k</button>
                                <button onClick={() => setPresetAmount(10000)}>10k</button>
                                <button onClick={setMaxAmount}>MAX</button>
                            </div>
                        </div>
                        
                        <div className={styles.costDetails}>
                            <div className={styles.costDetailsRow}>
                                <span className="text-gray-400">Custo em USD:</span>
                                <span className="font-semibold text-white">${totalCostUSD}</span>
                            </div>
                            <hr className={styles.costDivider} />
                            <div className={styles.costDetailsRow}>
                                <span className="text-gray-400 text-lg">Custo Total (SOL):</span>
                                <span className={`font-bold text-2xl text-primary-glow glow-text ${styles.totalCost}`}>{totalCostSOL}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => onMint(tokenAmount, totalCostSOL)}
                            disabled={!userWallet || !solPrice || isMinting}
                            className={`w-full fancy-btn py-4 px-6 rounded-lg text-xl ${styles.mintButton}`}
                        >
                            {isMinting && <div className="spinner"></div>}
                            <span>{getButtonText()}</span>
                        </button>
                    </div>
                </fieldset>

                <p className={styles.walletStatus}>
                    {userWallet ? `Conectado: ${userWallet}` : 'Nenhuma carteira conectada'}
                </p>
            </div>
        </section>
    );
};

export default MintSection;