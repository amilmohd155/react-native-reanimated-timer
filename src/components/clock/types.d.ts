import type {
  AnimationProps,
  CommonStylingProps,
  VisibilityProps,
  TimeFormat,
} from '../../types';

/**
 * The methods available on the Clock component.
 * Empty for now, but can be extended in the future.
 */
type ClockMethods = {};

/**
 * The props for the Clock component.
 * ClockProps
 * @extends {CommonStylingProps}
 * @extends {AnimationProps}
 * @extends {Omit<VisibilityProps, 'showDays'>}
 * @prop {TimeFormat} [format='24'] - The time format to be used. Can be either '12' or '24'.
 * @prop {number} [intervalMs=1000] - The interval in milliseconds to update the clock.
 */
interface ClockProps
  extends CommonStylingProps,
    AnimationProps,
    Omit<VisibilityProps, 'showDays'> {
  /** The time format to be used. Can be either '12' or '24'.
   * @default '24'
   * @type {"12" | "24"}
   * */
  format?: TimeFormat;

  /** The interval in milliseconds to update the clock.
   * @default 1000
   * */
  intervalMs?: number;
}

export type { ClockProps, ClockMethods };
