import type { Time, TimeUnits } from '../../types';

export interface UseTimerProps {
  duration: number;
  interval: number;
  autoStart: boolean;
  onExpire?: () => void;
}

export interface UseTimerReturn {
  start: () => void;
  pause: () => void;
  resume: () => void;
  restart: (duration: number, autoStart?: boolean) => void;
  isRunning: boolean;
  getSnapshot: () => Time;
  getSnapshotAsDigits: () => TimeUnits & {
    milliseconds: number;
  };
}
