import 'react-native';

/**
 * Extend React Native's ViewProps and TextProps to include a className property
 * for styling purposes.
 */
interface StyledProps {
  className?: string;
}

declare module 'react-native' {
  interface ViewProps extends StyledProps {}
  interface TextProps extends StyledProps {}
}
