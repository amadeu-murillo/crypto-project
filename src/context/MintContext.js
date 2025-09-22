'use client';

import { createContext, useContext, useState, useCallback } from 'react';

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

  return (
    <MintContext.Provider value={{ mintData, incrementMintData }}>
      {children}
    </MintContext.Provider>
  );
};