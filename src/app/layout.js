import { Chakra_Petch, Poppins } from 'next/font/google';
import { MintProvider } from '@/context/MintContext'; // Alterado
import { ToastProvider } from '@/hooks/useToast'; // Alterado
import './globals.css';

// Carregamento otimizado de fontes com Next.js
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
});

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-chakra-petch',
});

export const metadata = {
  title: 'Solana Casino - A Revolução dos Jogos On-Chain',
  description: 'Transparência, velocidade e propriedade real dos seus ativos no primeiro casino de luxo da rede Solana.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${chakraPetch.variable} font-sans`}>
      <body>
        <ToastProvider> 
          <MintProvider>
            {children}
          </MintProvider>
        </ToastProvider>
      </body>
    </html>
  );
}