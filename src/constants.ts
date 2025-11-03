import type { AnimationDirection } from './types';

const DEFAULT_ANIMATION_DELAY = 0;
const DEFAULT_ANIMATION_DISTANCE = 80;
const DEFAULT_ANIMATION_DURATION = 1200;
const DEFAULT_ANIMATION_DIRECTION: AnimationDirection = 'down';

export const AnimationConstants = {
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_DISTANCE,
  DEFAULT_ANIMATION_DURATION,
} as const;

export const ClockConstants = {
  DEFAULT_INTERVAL_MS: 1000,
  DEFAULT_SKIP_EXITING: false,
  DEFAULT_SKIP_ENTERING: true,
} as const;

export const TimerConstants = {
  DEFAULT_INTERVAL_MS: 1000,
  DEFAULT_AUTO_START: true,
  DEFAULT_SKIP_EXITING: false,
  DEFAULT_SKIP_ENTERING: true,
} as const;

export const StopwatchConstants = {
  DEFAULT_INTERVAL_MS: 16,
  DEFAULT_AUTO_START: false,
  DEFAULT_SKIP_EXITING: false,
  DEFAULT_SKIP_ENTERING: true,
} as const;
