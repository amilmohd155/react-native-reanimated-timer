import { createContext, useContext } from 'react';
import type { RootConfig } from './type';

export const RootContext = createContext<RootConfig | null>(null);

export const useRootConfig = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootConfig must be used within a RootConfigProvider');
  }
  return context;
};
