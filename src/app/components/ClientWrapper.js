'use client';
import { useState, useEffect } from 'react';
import * as solanaWeb3 from '@solana/web3.js';
import { DEV_WALLET_ADDRESS, RPC_ENDPOINT } from '@/lib/constants';

// Import all section components
import Navbar from './Navbar';
import Hero from './Hero';
import LiveStats from './LiveStats';
import MintSection from './MintSection';
import WhyUs from './WhyUs';
import Roadmap from './Roadmap';
import Footer from './Footer';
import Modal from './Modal';
import ParticleCanvas from './ParticleCanvas';

const ClientWrapper = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', status: '', txSignature: null });

  // Fetch SOL price from our API route
  useEffect(() => {
    const getSolPrice = async () => {
      try {
        const response = await fetch('/api/sol-price');
        if (!response.ok) throw new Error('Failed to fetch price');
        const data = await response.json();
        setSolPrice(data.solPrice);
      } catch (error) {
        console.error('Error fetching SOL price:', error);
        setSolPrice(null);
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
        console.error('Failed to connect wallet:', err);
        showModal('Erro', 'Falha ao conectar a carteira.', 'error');
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const handleMint = async (tokenAmount, totalCostSOL) => {
    if (!userWallet || !solPrice) {
      showModal('Erro', 'Por favor, conecte a carteira e aguarde o preço do SOL.', 'error');
      return;
    }
    
    showModal('A processar o Pagamento', 'Aprove a transação na sua carteira Phantom.', 'loading');

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
      
      showModal('Pagamento Confirmado!', 'A sua transação foi bem-sucedida.', 'success', signature);
    } catch (error) {
      console.error('Transaction error:', error);
      showModal('Erro na Transação', 'A transação falhou. Por favor, tente novamente.', 'error');
    }
  };

  return (
    <>
      <ParticleCanvas />
      <Modal modalState={modalState} closeModal={closeModal} />
      <Navbar onConnectWallet={connectWallet} userWallet={userWallet} />
      <main className="container mx-auto p-4 md:p-8">
        <Hero />
        <LiveStats />
        <MintSection solPrice={solPrice} onMint={handleMint} userWallet={userWallet} />
        <WhyUs />
        <Roadmap />
      </main>
      <Footer />
    </>
  );
};

export default ClientWrapper;