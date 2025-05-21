import {
  Time,
  type CommonStylingProps,
  type VisibilityProps,
  type AnimationProps,
} from '../../types';

/**
 * The methods available on the Timer component.
 * @interface TimerMethods
 */
export interface TimerMethods {
  /**
   * Starts the timer if it is not already running or paused.
   * @returns {void}
   */
  start: () => void;
  /**
   * Pauses the timer if it is running.
   * @returns {void}
   */
  pause: () => void;
  /**
   * Resumes the timer if it is paused.
   * @returns {void}
   */
  resume: () => void;
  /**
   * Restarts the timer with a new duration and optional autoStart value.
   * @param {number} duration - The new duration in milliseconds.
   * @param {boolean} [autoStart] - Whether to start the timer automatically. Defaults to true.
   * @returns {void}
   */
  restart: (duration: number, autoStart?: boolean) => void;
  /**
   * Resets the timer to the initial duration and intial autoStart value.
   * @returns {() => void}
   */
  reset: () => void;
  /** Gets the current time snapshot from the stopwatch
   * @returns {Time}
   */
  getSnapshot: () => Time;
}

/**
 * The props for the Timer component.
 * @extends {CommonStylingProps}
 * @extends {AnimationProps}
 * @extends {VisibilityProps}
 * @prop {number} durationMs - The duration in milliseconds for the timer. @required
 * @prop {number} [intervalMs=1000] - The interval in milliseconds to update the timer.
 * @prop {boolean} [autoStart=true] - Whether to start the timer automatically.
 * @prop {() => void} [onExpire] - Callback function to be called when the timer expires.
 */
export interface TimerProps
  extends VisibilityProps,
    AnimationProps,
    CommonStylingProps {
  /** The duration in milliseconds for the timer.
   * @type {number}
   * @required
   */
  durationMs: number;
  /** The interval in milliseconds to update the timer.
   * @default 1000
   * @type {number}
   */
  intervalMs?: number;
  /** Whether to start the timer automatically.
   * @default true
   * @type {boolean}
   */
  autoStart?: boolean;
  /** Callback function to be called when the timer expires.
   * @type {() => void}
   * @optional
   */
  onExpire?: () => void;
}
