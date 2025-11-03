import { createContext, useContext, type PropsWithChildren } from 'react';
import type { AnimationConfig, StyleConfig } from './type';

const AnimationContext = createContext<AnimationConfig | null>(null);

export const AnimationProvider = ({
  children,
  ...animationConfig
}: PropsWithChildren<AnimationConfig>) => {
  return (
    <AnimationContext.Provider value={animationConfig}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationConfig = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      'useAnimationConfig must be used within an AnimationProvider'
    );
  }
  return context;
};

const StyleContext = createContext<StyleConfig | null>(null);

export const StyleProvider = ({
  children,
  ...styleConfig
}: PropsWithChildren<StyleConfig>) => {
  return (
    <StyleContext.Provider value={styleConfig}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyleConfig = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyleConfig must be used within a StyleProvider');
  }
  return context;
};

export { TimeProvider, useTime } from './time';
