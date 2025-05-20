import type { DigitConfig } from './type';
import { createContext, useContext } from 'react';

export const DigitConfigContext = createContext<DigitConfig>({});

export const useDigitConfig = () => {
  const context = useContext(DigitConfigContext);
  if (!context) {
    throw new Error('useDigitConfig must be used within a DigitConfigProvider');
  }
  return context;
};
