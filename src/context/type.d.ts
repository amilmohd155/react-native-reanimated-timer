import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { AMPM, AnimationDirection, TimeUnits } from '../types';

// export interface RootConfig extends TimeUnits {
//   milliseconds: number;
//   ampm: TimeFormat;

//   animationDelay?: number;
//   animationDuration?: number;
//   animationDistance?: number;
//   animationDirection?: AnimationDirection;
//   entering?: AnimatedProps<TextProps>['entering'];
//   exiting?: AnimatedProps<TextProps>['exiting'];

//   digitContainerStyle?: StyleProp<ViewStyle>;
//   digitContainerClassName?: string;

//   digitStyle?: StyleProp<TextStyle>;
//   digitClassName?: string;
// }
export type RootConfig = TimeUnits & {
  ampm: AMPM;

  animationDelay?: number;
  animationDuration?: number;
  animationDistance?: number;
  animationDirection?: AnimationDirection;
  entering?: AnimatedProps<TextProps>['entering'];
  exiting?: AnimatedProps<TextProps>['exiting'];

  digitContainerStyle?: StyleProp<ViewStyle>;
  digitContainerClassName?: string;

  digitStyle?: StyleProp<TextStyle>;
  digitClassName?: string;

  mergeClassNames: boolean;

  milliseconds: number;
};
