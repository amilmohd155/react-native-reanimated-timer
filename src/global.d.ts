import 'react-native';

/**
 * Extend React Native's ViewProps and TextProps to include a className property
 * for styling purposes.
 */
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
}
