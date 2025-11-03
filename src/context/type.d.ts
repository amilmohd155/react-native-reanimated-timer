import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { AnimationDirection } from '..';

export type AnimationConfig = {
  animationDelay?: number;
  animationDuration?: number;
  animationDistance?: number;
  animationDirection?: AnimationDirection;
  entering?: AnimatedProps<TextProps>['entering'];
  exiting?: AnimatedProps<TextProps>['exiting'];
};

export type StyleConfig = {
  digitContainerStyle?: StyleProp<ViewStyle>;
  digitContainerClassName?: string;
  digitStyle?: StyleProp<TextStyle>;
  digitClassName?: string;
  twMerge: boolean;
};
