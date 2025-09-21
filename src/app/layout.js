import { Chakra_Petch, Poppins } from 'next/font/google';
// Atualizado para importar o CSS do local correto
import './globals.css';

// Carregamento otimizado de fontes com Next.js
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins', // Cria uma variável CSS
});

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-chakra-petch', // Cria uma variável CSS
});

export const metadata = {
  title: 'Solana Casino - A Revolução dos Jogos On-Chain',
  description: 'Transparência, velocidade e propriedade real dos seus ativos no primeiro casino de luxo da rede Solana.',
};

export default function RootLayout({ children }) {
  return (
    // Aplica as variáveis das fontes na tag <html>
    <html lang="pt-BR" className={`${poppins.variable} ${chakraPetch.variable} font-sans`}>
      <body>
        {children}
      </body>
    </html>
  );
}
