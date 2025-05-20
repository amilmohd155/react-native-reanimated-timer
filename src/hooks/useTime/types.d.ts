import type { TimeFormat, TimeUnits, FormattedTime } from '../../types';

interface UseTimeProps {
  format?: TimeFormat;
  interval?: number;
}

interface UseTimeReturn {
  getSnapshot: () => FormattedTime;
  getSnapshotAsDigits: () => Omit<TimeUnits, 'daysTens' | 'daysUnits'> & {
    milliseconds: number;
    ampm: 'AM' | 'PM' | '';
  };
}

export { UseTimeProps, UseTimeReturn };
