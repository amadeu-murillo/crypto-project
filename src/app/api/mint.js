import { NextResponse } from 'next/server';
import * as solanaWeb3 from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { DEV_WALLET_ADDRESS, RPC_ENDPOINT, TOKEN_MINT_ADDRESS } from '@/lib/constants';
import base58 from 'bs58';

// Função para converter a chave privada do environment variable para um Uint8Array
function getDevWallet() {
  try {
    const privateKey = process.env.DEV_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('Chave privada do desenvolvedor não encontrada nas variáveis de ambiente.');
    }
    return solanaWeb3.Keypair.fromSecretKey(base58.decode(privateKey));
  } catch (error) {
    console.error('Erro ao carregar a carteira do desenvolvedor:', error);
    return null;
  }
}

export async function POST(request) {
  const devWallet = getDevWallet();
  if (!devWallet) {
    return NextResponse.json({ error: 'A carteira do servidor não está configurada corretamente.' }, { status: 500 });
  }

  try {
    const { userWallet, tokenAmount, paymentSignature } = await request.json();

    if (!userWallet || !tokenAmount || !paymentSignature) {
      return NextResponse.json({ error: 'Dados da transação ausentes.' }, { status: 400 });
    }

    const connection = new solanaWeb3.Connection(RPC_ENDPOINT, 'confirmed');

    // 1. Verificar a transação de pagamento do usuário para a carteira de desenvolvimento
    const transactionDetails = await connection.getTransaction(paymentSignature, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed',
    });

    if (!transactionDetails) {
        return NextResponse.json({ error: 'Não foi possível confirmar a transação de pagamento.' }, { status: 400 });
    }

    // Validações adicionais da transação podem ser adicionadas aqui (valor, destinatário, etc.)

    const userPublicKey = new solanaWeb3.PublicKey(userWallet);
    const mintPublicKey = new solanaWeb3.PublicKey(TOKEN_MINT_ADDRESS);

    // 2. Preparar e enviar os tokens $SC para o usuário
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      devWallet,
      mintPublicKey,
      devWallet.publicKey
    );

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      devWallet, // Payer para a criação da conta
      mintPublicKey,
      userPublicKey
    );

    const tokenSignature = await transfer(
      connection,
      devWallet, // Payer da transação
      fromTokenAccount.address,
      toTokenAccount.address,
      devWallet.publicKey,
      BigInt(tokenAmount * (10 ** 9)) // Solana SPL-token usa BigInt para os amounts
    );

    return NextResponse.json({ tokenSignature });

  } catch (error) {
    console.error('Erro no processo de mint:', error);
    return NextResponse.json({ error: 'Ocorreu um erro interno ao processar o mint.' }, { status: 500 });
  }
}
