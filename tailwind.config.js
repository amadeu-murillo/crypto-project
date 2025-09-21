const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Adiciona as fontes customizadas para que o Tailwind possa usá-las
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
        heading: ['var(--font-chakra-petch)', ...fontFamily.sans],
      },
      // Adiciona as cores do projeto para fácil acesso com classes como bg-primary-glow
      colors: {
        'bg-dark': '#0A0A14',
        'primary-glow': '#FFD700',
        'secondary-glow': '#9333EA',
        'border-color': 'rgba(255, 215, 0, 0.2)',
      },
      // Adiciona a animação de pulso para os glows
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px var(--primary-glow)' },
          '50%': { boxShadow: '0 0 24px var(--primary-glow)' },
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
};

