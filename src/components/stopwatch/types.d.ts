import type {
  AnimationProps,
  CommonStylingProps,
  Time,
  VisibilityProps,
} from '../../types';

interface StopwatchProps
  extends VisibilityProps,
    AnimationProps,
    CommonStylingProps {
  /**
   * Whether to start the stopwatch automatically.
   * @default false
   */
  autoStart?: boolean;
  /**
   * The offset timestamp to start the stopwatch from.
   * @default optional
   */
  offsetTimestamp?: Date;
  /**
   * The interval in milliseconds to update the stopwatch.
   * @default 1000
   */
  intervalMs?: number;
}

interface StopwatchMethods {
  /** Starts the stopwatch
   * @returns {void}
   */
  start: () => void;
  /** Pauses the stopwatch
   * @returns {void}
   */
  pause: () => void;
  /** Resets the stopwatch
   * @param {boolean} autoStart - Whether to start the stopwatch automatically after resetting. @default false
   * @param {Date} offset - The offset date to set the stopwatch to. @default optional
   * @returns {void}
   */
  reset: (autoStart?: boolean, offset?: Date) => void;
  /** Gets the current time snapshot from the stopwatch
   * @returns {Time}
   */
  getSnapshot: () => Time;
}

export { StopwatchMethods, StopwatchProps };
