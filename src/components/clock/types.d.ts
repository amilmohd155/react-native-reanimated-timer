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
  format?: TimeFormat;
}

export type { ClockProps, ClockMethods };
