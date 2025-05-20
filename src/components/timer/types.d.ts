import {
  Time,
  type CommonStylingProps,
  type VisibilityProps,
  type AnimationProps,
} from '../../types';

export interface TimerMethods {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (duration: number, autoStart?: boolean) => void;
  reset: () => void;
  getSnapshot: () => Time;
}

export interface TimerProps
  extends VisibilityProps,
    AnimationProps,
    CommonStylingProps {
  durationMs: number;
  intervalMs?: number;
  autoStart?: boolean;
  onExpire?: () => void;
}
