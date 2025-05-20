import type {
  AnimationProps,
  CommonStylingProps,
  VisibilityProps,
  TimeFormat,
} from '../../types';

type ClockMethods = {};

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
