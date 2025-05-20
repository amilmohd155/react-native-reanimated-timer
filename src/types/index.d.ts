import type { JSX } from 'react';
import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

type TimeFormat = '12' | '24';

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  // totalSeconds: number;
  // totalMilliseconds: number;
};

type TimeUnits = {
  secondsTens: number;
  secondsUnits: number;
  minutesTens: number;
  minutesUnits: number;
  hoursTens: number;
  hoursUnits: number;
  daysTens: number;
  daysUnits: number;
};

type FormattedTime = {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  ampm: 'AM' | 'PM' | '';
};

type AnimationDirection = 'up' | 'down';

interface VisibilityProps {
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  showMilliseconds?: boolean;
}

interface AnimationProps {
  animationDelay?: number;
  animationDuration?: number;
  animationDistance?: number;
  animationDirection?: AnimationDirection;
  entering?: AnimatedProps<TextProps>['entering'];
  exiting?: AnimatedProps<TextProps>['exiting'];
  skipEntering?: boolean;
  skipExiting?: boolean;
}

interface CommonStylingProps {
  separator?: string | (() => JSX.Element) | null;
  style?: StyleProp<ViewStyle>;
  digitContainerStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<TextStyle>;
  digitStyle?: StyleProp<TextStyle>;
  millisecondsStyle?: StyleProp<TextStyle>;
}

export type {
  Time,
  TimeUnits,
  TimeFormat,
  FormattedTime,
  AnimationDirection,
  VisibilityProps,
  AnimationProps,
  CommonStylingProps,
};
