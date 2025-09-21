'use client';
import { useState, useEffect } from 'react';
import * as solanaWeb3 from '@solana/web3.js';
import { DEV_WALLET_ADDRESS, RPC_ENDPOINT, TOTAL_SUPPLY } from '@/lib/constants';

// Importação dos componentes da UI
import Navbar from './Navbar';
import Hero from './Hero';
import LiveStats from './LiveStats';
import MintSection from './MintSection';
import WhyUs from './WhyUs';
import Roadmap from './Roadmap';
import Footer from './Footer';
import Modal from './Modal';
import ParticleCanvas from './ParticleCanvas';

// Mock data para simular um estado real
const MOCKED_MINT_DATA = {
  tokensMinted: 1483291,
  participants: 852,
};

const ClientWrapper = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintData, setMintData] = useState(MOCKED_MINT_DATA);
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    title: '', 
    message: '', 
    status: '', // 'loading', 'success', 'error'
    txSignature: null 
  });

  // Busca o preço do SOL da nossa API route interna
  useEffect(() => {
    const getSolPrice = async () => {
      try {
        const response = await fetch('/api/sol-price');
        if (!response.ok) throw new Error('Falha ao buscar preço do SOL');
        const data = await response.json();
        setSolPrice(data.solPrice);
      } catch (error) {
        console.error('Erro ao buscar preço do SOL:', error);
        setSolPrice(null); // Define como null em caso de erro
      }
    };
    getSolPrice();
  }, []);

  const showModal = (title, message, status, txSignature = null) => {
    setModalState({ isOpen: true, title, message, status, txSignature });
  };

  const closeModal = () => setModalState({ ...modalState, isOpen: false });

  const connectWallet = async () => {
    if ('solana' in window && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setUserWallet(resp.publicKey.toString());
      } catch (err) {
        console.error('Falha ao conectar carteira:', err);
        showModal('Erro de Conexão', 'Não foi possível conectar à carteira Phantom. Por favor, tente novamente.', 'error');
      }
    } else {
      // Abre a página da Phantom se a carteira não estiver instalada
      window.open('https://phantom.app/', '_blank');
    }
  };

  const handleMint = async (tokenAmount, totalCostSOL) => {
    if (!userWallet || !solPrice) {
      showModal('Ação Necessária', 'Por favor, conecte a sua carteira e aguarde o preço do SOL carregar.', 'error');
      return;
    }
    
    setIsMinting(true);
    showModal('Processando Pagamento', 'Por favor, aprove a transação na sua carteira Phantom.', 'loading');

    try {
      const connection = new solanaWeb3.Connection(RPC_ENDPOINT);
      const devPublicKey = new solanaWeb3.PublicKey(DEV_WALLET_ADDRESS);
      const userPublicKey = new solanaWeb3.PublicKey(userWallet);
      
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: devPublicKey,
          lamports: Math.round(parseFloat(totalCostSOL) * solanaWeb3.LAMPORTS_PER_SOL),
        })
      );
      
      const { blockhash } = await connection.getLatestBlockhash('finalized');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      const { signature } = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature, 'confirmed');
      
      showModal('Pagamento Confirmado!', 'A sua transação foi bem-sucedida. Os seus tokens serão enviados em breve.', 'success', signature);
      
      // Simula a atualização dos dados após o mint
      setMintData(prev => ({
          ...prev,
          tokensMinted: prev.tokensMinted + tokenAmount
      }));

    } catch (error) {
      console.error('Erro na transação:', error);
      const userRejected = error.code === 4001;
      const message = userRejected 
        ? 'A transação foi rejeitada por você.'
        : 'A transação falhou. Por favor, verifique seu saldo e tente novamente.';
      showModal('Erro na Transação', message, 'error');
    } finally {
      setIsMinting(false); // Libera o botão
    }
  };

  return (
    <>
      <ParticleCanvas />
      <Modal modalState={modalState} closeModal={closeModal} />
      
      <div className='relative z-10'>
        <Navbar onConnectWallet={connectWallet} userWallet={userWallet} />
        <main className="container mx-auto px-4 md:px-8">
          <Hero />
          <LiveStats mintData={mintData} />
          <MintSection 
            solPrice={solPrice} 
            onMint={handleMint} 
            userWallet={userWallet}
            isMinting={isMinting}
            mintData={mintData}
            totalSupply={TOTAL_SUPPLY}
          />
          <WhyUs />
          <Roadmap />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ClientWrapper;
