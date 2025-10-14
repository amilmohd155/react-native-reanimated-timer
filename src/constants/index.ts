const DEFAULT_ANIMATION_DELAY = 0;
const DEFAULT_ANIMATION_DISTANCE = 80;
const DEFAULT_ANIMATION_DURATION = 1200;
const DEFAULT_ANIMATION_DIRECTION = 'down';

export {
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_DISTANCE,
  DEFAULT_ANIMATION_DURATION,
};

export const digitType = [
  'daysTens',
  'daysUnits',
  'hoursTens',
  'hoursUnits',
  'minutesTens',
  'minutesUnits',
  'secondsTens',
  'secondsUnits',
  'milliseconds',
] as const;

export type DigitType = (typeof digitType)[number];
