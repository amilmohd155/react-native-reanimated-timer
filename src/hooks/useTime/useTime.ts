import { useCallback, useState } from 'react';
import { getFormattedTime, getMsFromCurrentTime } from '../../utils/time';
import { useInterval } from '../useInteval';
import type { UseTimeProps, UseTimeReturn } from './types';

export function useTime({
  format = '24',
  interval = 1000,
}: UseTimeProps): UseTimeReturn {
  const [ms, setMs] = useState(getMsFromCurrentTime());

  useInterval(() => {
    setMs(getMsFromCurrentTime());
  }, interval);

  const getSnapshot = useCallback(() => {
    const { hours, minutes, seconds, milliseconds, ampm } = getFormattedTime(
      ms,
      format
    );
    return {
      hours,
      minutes,
      seconds,
      milliseconds,
      ampm,
    };
  }, [ms, format]);

  const getSnapshotAsDigits = useCallback((): ReturnType<
    UseTimeReturn['getSnapshotAsDigits']
  > => {
    const { hours, minutes, seconds, milliseconds, ampm } = getFormattedTime(
      ms,
      format
    );
    return {
      hoursTens: Math.floor(hours / 10),
      hoursUnits: hours % 10,
      minutesTens: Math.floor(minutes / 10),
      minutesUnits: minutes % 10,
      secondsTens: Math.floor(seconds / 10),
      secondsUnits: seconds % 10,
      milliseconds,
      ampm,
    };
  }, [ms, format]);

  return { getSnapshot, getSnapshotAsDigits };
}
