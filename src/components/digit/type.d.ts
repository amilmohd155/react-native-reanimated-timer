import type { AnimatedProps } from 'react-native-reanimated';
import type { AnimationDirection } from '../../types/timer';
import type { StyleProp, TextProps, TextStyle } from 'react-native';

export interface DigitConfig {
  animationDelay?: number;
  animationDuration?: number;
  animationDistance?: number;
  animationDirection?: AnimationDirection;
  entering?: AnimatedProps<TextProps>['entering'];
  exiting?: AnimatedProps<TextProps>['exiting'];
  style?: StyleProp<TextStyle>;
}
