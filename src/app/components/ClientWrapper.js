'use client';
import { useState, useEffect } from 'react';
import { DEV_WALLET_ADDRESS, RPC_ENDPOINT, TOKEN_MINT_ADDRESS } from '@/lib/constants';
import { useMint } from '@/context/MintContext';
import { useToast } from '@/hooks/useToast';
import * as solanaWeb3 from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';

// Importação dos componentes da UI
import Navbar from './Navbar';
import Hero from './Hero';
import LiveStats from './LiveStats';
import MintSection from './MintSection';
import WhyUs from './WhyUs';
import Roadmap from './Roadmap';
import Footer from './Footer';
import ParticleCanvas from './ParticleCanvas';

const ClientWrapper = () => {
  const [solPrice, setSolPrice] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const { mintData, incrementMintData } = useMint();
  const { showToast } = useToast();

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
        showToast('Erro ao buscar cotação do SOL.', { type: 'error' });
      }
    };
    getSolPrice();
  }, [showToast]);

  const connectWallet = async () => {
    if ('solana' in window && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        setUserWallet(resp.publicKey.toString());
        showToast('Carteira conectada com sucesso!', { type: 'success' });
      } catch (err) {
        console.error('Falha ao conectar carteira:', err);
        showToast('Erro ao conectar a carteira.', { type: 'error' });
      }
    } else {
      window.open('https://phantom.app/', '_blank');
    }
  };

  const disconnectWallet = () => {
    setUserWallet(null);
    showToast('Carteira desconectada.', { type: 'info' });
  };

  const handleMint = async (tokenAmount, totalCostSOL) => {
    if (!userWallet || !solPrice) {
      showToast('Por favor, conecte sua carteira primeiro.', { type: 'error' });
      return;
    }

    setIsMinting(true);
    showToast('Processando sua transação...', { type: 'info' });

    try {
      const connection = new solanaWeb3.Connection(RPC_ENDPOINT);
      const devPublicKey = new solanaWeb3.PublicKey(DEV_WALLET_ADDRESS);
      const userPublicKey = new solanaWeb3.PublicKey(userWallet);
      const mintPublicKey = new solanaWeb3.PublicKey(TOKEN_MINT_ADDRESS);

      // 1. Transação de pagamento para a carteira do dev
      const paymentTransaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: devPublicKey,
          lamports: Math.round(parseFloat(totalCostSOL) * solanaWeb3.LAMPORTS_PER_SOL),
        })
      );

      // 2. Lógica para transferência de tokens
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        devPublicKey, // Payer para a criação da conta
        mintPublicKey,
        devPublicKey
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        userPublicKey, // Payer para a criação da conta
        mintPublicKey,
        userPublicKey
      );

      const tokenTransaction = new solanaWeb3.Transaction().add(
        transfer(
          connection,
          fromTokenAccount.address,
          toTokenAccount.address,
          devPublicKey,
          tokenAmount * (10 ** 9) // Ajustar decimais do token
        )
      );

      // Assinar e enviar transações
      const { blockhash } = await connection.getLatestBlockhash('finalized');
      paymentTransaction.recentBlockhash = blockhash;
      paymentTransaction.feePayer = userPublicKey;
      tokenTransaction.recentBlockhash = blockhash;
      tokenTransaction.feePayer = userPublicKey;


      const { signature } = await window.solana.signAndSendTransaction(paymentTransaction);
      await connection.confirmTransaction(signature, 'confirmed');

      // Enviar a transação do token (pode ser necessário que o dev assine)
      // Esta parte pode precisar de um backend para assinar a transação do token
      // Para este exemplo, estamos assumindo que a carteira conectada (usuário) paga as taxas
      const tokenSignature = await window.solana.signAndSendTransaction(tokenTransaction);
      await connection.confirmTransaction(tokenSignature, 'confirmed');


      showToast('Mint realizado com sucesso!', {
        type: 'success',
        message: `Transação: ${signature.substring(0, 10)}...`
      });

      incrementMintData(tokenAmount);

    } catch (error) {
      console.error('Erro na transação:', error);
      const userRejected = error.code === 4001;
      const message = userRejected
        ? 'A transação foi rejeitada por você.'
        : 'A transação falhou. Verifique seu saldo.';
      showToast(message, { type: 'error' });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      <ParticleCanvas />

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
          <WhyUs />
          <Roadmap />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ClientWrapper;