'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MintContext = createContext();

export const useMint = () => useContext(MintContext);

const INITIAL_MINT_DATA = {
  tokensMinted: 1483291,
  participants: 852,
};

export const MintProvider = ({ children }) => {
  const [mintData, setMintData] = useState(INITIAL_MINT_DATA);

  const incrementMintData = useCallback((amount) => {
    setMintData(prev => ({
      ...prev,
      tokensMinted: prev.tokensMinted + amount,
      participants: prev.participants + 1
    }));
  }, []);
  
  // Simula o mint de outros usuários para dar dinamismo à página
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 500) + 1;
      incrementMintData(randomAmount);
    }, 5000); // A cada 5 segundos

    return () => clearInterval(interval);
  }, [incrementMintData]);

  return (
    <MintContext.Provider value={{ mintData, incrementMintData }}>
      {children}
    </MintContext.Provider>
  );
};