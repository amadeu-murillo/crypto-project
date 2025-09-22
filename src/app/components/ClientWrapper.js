'use client';
import { useState, useEffect } from 'react';
import { DEV_WALLET_ADDRESS, RPC_ENDPOINT } from '@/lib/constants';
import { useMint } from '@/context/MintContext';
import { useToast } from '@/hooks/useToast';
import * as solanaWeb3 from '@solana/web3.js';

// Importação dos componentes da UI
import Navbar from './Navbar';
import Hero from './Hero';
import LiveStats from './LiveStats';
import MintSection from './MintSection';
import GamesPreview from './GamesPreview'; // Importar o novo componente
import WhyUs from './WhyUs';
import Roadmap from './Roadmap';
import Footer from './Footer';
import ParticleCanvas from './ParticleCanvas';
import Modal from './Modal'; // Importar o Modal

const ClientWrapper = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', status: '' });
  const { incrementMintData } = useMint();
  const { showToast } = useToast();

  useEffect(() => {
    const getSolPrice = async () => {
      try {
        const response = await fetch('/api/sol-price');
        if (!response.ok) throw new Error('Falha ao buscar preço do SOL');
        const data = await response.json();
        setSolPrice(data.solPrice);
      } catch (error) {
        console.error('Erro ao buscar preço do SOL:', error);
        setSolPrice(null);
        showToast('Erro ao buscar cotação do SOL.', { type: 'error' });
      }
    };
    getSolPrice();
  }, [showToast]);

  const connectWallet = async () => {
    if ('solana' in window && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect({ onlyIfTrusted: false });
        setUserWallet(resp.publicKey.toString());
        showToast('Carteira conectada!', { type: 'success' });
      } catch (err) {
        console.error('Falha ao conectar carteira:', err);
        showToast('Conexão da carteira rejeitada.', { type: 'error' });
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const disconnectWallet = () => {
    window.solana.disconnect();
    setUserWallet(null);
    showToast('Carteira desconectada.', { type: 'info' });
  };

  const handleMint = async (tokenAmount, totalCostSOL) => {
    if (!userWallet || !solPrice) {
      showToast('Por favor, conecte sua carteira primeiro.', { type: 'error' });
      return;
    }

    setIsMinting(true);
    setModalState({ isOpen: true, title: 'Processando Pagamento', message: 'Por favor, aprove a transação de pagamento na sua carteira.', status: 'loading' });

    try {
      const connection = new solanaWeb3.Connection(RPC_ENDPOINT, 'confirmed');
      const devPublicKey = new solanaWeb3.PublicKey(DEV_WALLET_ADDRESS);
      const userPublicKey = new solanaWeb3.PublicKey(userWallet);

      // 1. Criar e enviar a transação de pagamento em SOL para o dev
      const { blockhash } = await connection.getLatestBlockhash('finalized');
      const paymentTransaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: devPublicKey,
          lamports: Math.round(parseFloat(totalCostSOL) * solanaWeb3.LAMPORTS_PER_SOL),
        })
      );
      paymentTransaction.recentBlockhash = blockhash;
      paymentTransaction.feePayer = userPublicKey;

      const signedPaymentTx = await window.solana.signTransaction(paymentTransaction);
      const paymentSignature = await connection.sendRawTransaction(signedPaymentTx.serialize());
      await connection.confirmTransaction({ signature: paymentSignature, blockhash, lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight }, 'confirmed');
      
      setModalState({ isOpen: true, title: 'Enviando Tokens', message: 'Pagamento confirmado. Agora estamos a enviar os seus tokens $SC.', status: 'loading' });

      // 2. Chamar a nossa API para que o backend envie os tokens $SC
      const apiResponse = await fetch('/api/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userWallet, tokenAmount, paymentSignature }),
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Falha na API de mint');
      }

      await connection.confirmTransaction({ signature: data.tokenSignature, blockhash, lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight }, 'confirmed');
      
      setModalState({ 
        isOpen: true, 
        title: 'Sucesso!', 
        message: `${tokenAmount.toLocaleString('pt-BR')} $SC foram enviados para a sua carteira.`, 
        status: 'success',
        txSignature: data.tokenSignature,
      });

      incrementMintData(tokenAmount);

    } catch (error) {
      console.error('Erro na transação:', error);
      const userRejected = error.code === 4001 || (error.message && error.message.includes("User rejected the request"));
      const message = userRejected
        ? 'A transação foi rejeitada por si.'
        : 'A transação falhou. Verifique o seu saldo e tente novamente.';
      
      setModalState({ isOpen: true, title: 'Erro na Transação', message, status: 'error' });
    } finally {
      setIsMinting(false);
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', message: '', status: '' });
  }

  return (
    <>
      <ParticleCanvas />
      <Modal modalState={modalState} closeModal={closeModal} />

      <div className='relative z-10'>
        <Navbar
          onConnectWallet={connectWallet}
          onDisconnectWallet={disconnectWallet}
          userWallet={userWallet}
        />
        <main className="container mx-auto px-4 md:px-8">
          <Hero />
          <LiveStats />
          <MintSection
            solPrice={solPrice}
            onMint={handleMint}
            userWallet={userWallet}
            isMinting={isMinting}
          />
          <GamesPreview /> {/* Adicionar o novo componente aqui */}
          <WhyUs />
          <Roadmap />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ClientWrapper;

