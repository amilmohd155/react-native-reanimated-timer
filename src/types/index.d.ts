import { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import { AnimatedProps } from 'react-native-reanimated';

/**
 * Represents the AM/PM indicator.
 */
type AMPM = 'AM' | 'PM' | '';

/**
 * Represents the time format, either 12-hour or 24-hour.
 */
type TimeFormat = '12' | '24';

/**
 * Represents a breakdown of time into days, hours, minutes, seconds, and milliseconds.
 */
type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

/**
 * Represents the individual digit units for days, hours, minutes, and seconds.
 */
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

/**
 * Represents a formatted time with milliseconds, seconds, minutes, hours, and AM/PM indicator.
 */
type FormattedTime = {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  ampm: AMPM;
};

/**
 * Specifies the direction of animation, either 'up' or 'down'.
 */
type AnimationDirection = 'up' | 'down';

/**
 * Props to control animation behavior for time display.
 */
interface AnimationProps {
  /** Delay before the animation starts (in milliseconds).
   * @type {number}
   * @default 0
   */
  animationDelay?: number;
  /** Duration of the animation (in milliseconds).
   * @type {number}
   * @default 80
   */
  animationDuration?: number;
  /** Distance the animation moves.
   * @type {number}
   * @default 1200
   */
  animationDistance?: number;
  /** Direction of the animation ('up' or 'down').
   * @type {AnimationDirection}
   * @default 'down'
   */
  animationDirection?: AnimationDirection;
  /** Custom entering animation from react-native-reanimated.
   * @type {AnimatedProps<TextProps>['entering']}
   * @see {@link https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/custom-animations}
   */
  entering?: AnimatedProps<TextProps>['entering'];
  /** Custom exiting animation from react-native-reanimated.
   * @see {@link https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/custom-animations}
   */
  exiting?: AnimatedProps<TextProps>['exiting'];
  /**
   * If true, disables the entering animation when digits appear for the first time.
   * Useful for preventing initial animation on mount.
   * @default true
   */
  skipEntering?: boolean;
  /** If true, disables the exiting animation when digits disappear.
   * Useful for preventing exit animation on unmount.
   * @default false
   */
  skipExiting?: boolean;
}

/**
 * Common styling props for customizing the appearance of the time display.
 */
interface CommonStylingProps {
  /** Style for the overall container.
   * @default undefined
   * @type {StyleProp<ViewStyle>}
   */
  style?: StyleProp<ViewStyle>;
  /** Style for grouped digit's container. eg: [tens, units of seconds]
   * @default undefined
   * @type {StyleProp<ViewStyle>}
   */
  digitContainerStyle?: StyleProp<ViewStyle>;
  /** Style for the digits, eg: Tens of seconds, milliseconds, AM/PM
   * @default undefined
   * @type {StyleProp<TextStyle>}
   */
  digitStyle?: StyleProp<TextStyle>;

  /** Class name for the overall container.
   * @default undefined
   * @type {string}
   */
  className?: string;
  /** Class name for grouped digit's container. eg: [tens, units of seconds]
   * @default undefined
   * @type {string}
   */
  digitContainerClassName?: string;
  /** Class name for the digits, eg: Tens of seconds, milliseconds, AM/PM
   * @default undefined
   * @type {string}
   */
  digitClassName?: string;
}

export type {
  AMPM,
  AnimationDirection,
  AnimationProps,
  CommonStylingProps,
  FormattedTime,
  Time,
  TimeFormat,
  TimeUnits,
};
