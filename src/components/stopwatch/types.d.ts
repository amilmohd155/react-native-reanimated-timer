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
  autoStart?: boolean;
  offsetTimestamp?: Date;
  intervalMs?: number;
}

interface StopwatchMethods {
  start: () => void;
  pause: () => void;
  reset: (autoStart?: boolean, offset?: Date) => void;
  getSnapshot: () => Time;
}

export { StopwatchMethods, StopwatchProps };
