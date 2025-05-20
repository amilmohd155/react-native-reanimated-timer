import type { Time, TimeUnits } from '../../types';

interface UseStopwatchProps {
  autoStart: boolean;
  interval: number;
  offsetTimestamp?: Date;
}

interface UseStopwatchReturn {
  start: () => void;
  pause: () => void;
  reset: (autoStart?: boolean, offset?: Date) => void;
  getSnapshot: () => Time;
  getSnapshotAsDigits: () => TimeUnits & {
    milliseconds: number;
  };
}

export type { UseStopwatchProps, UseStopwatchReturn };
