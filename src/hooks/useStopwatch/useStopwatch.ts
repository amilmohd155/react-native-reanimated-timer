import { useCallback, useState } from 'react';
import {
  getMsFromExpiryDate,
  getMsFromPrevTime,
  getTimeFromMs,
  getTimeUnitsFromMs,
} from '../../utils/time';
import type { UseStopwatchProps, UseStopwatchReturn } from './types';
import { useInterval } from '../useInteval';

export function useStopwatch({
  autoStart,
  interval: customInterval,
  offsetTimestamp,
}: UseStopwatchProps): UseStopwatchReturn {
  const offsetMs = offsetTimestamp ? getMsFromExpiryDate(offsetTimestamp) : 0;

  const [prevTime, setPrevTime] = useState<number>(
    Date.now() - new Date(offsetMs).getTime()
  );

  const [ms, setMs] = useState(getMsFromPrevTime(prevTime) || 0);
  const [isRunning, setIsRunning] = useState(autoStart);

  const msInitialOffset = 1000 - (ms % 1000);
  const [interval, setInterval] = useState(
    customInterval < msInitialOffset ? customInterval : msInitialOffset
  );

  useInterval(
    () => {
      if (interval !== customInterval) {
        setInterval(customInterval);
      }
      setMs(getMsFromPrevTime(prevTime));
    },
    isRunning ? interval : null
  );

  const start = useCallback(() => {
    setPrevTime(Date.now() - new Date(ms).getTime());
    setIsRunning(true);
  }, [ms]);

  const pause = useCallback(() => {
    if (!isRunning) {
      return;
    }
    setMs(getMsFromPrevTime(prevTime));
    setIsRunning(false);
  }, [isRunning, prevTime]);

  const reset = useCallback(
    (newAutoStart = false, offset?: Date) => {
      const newOffsetMs = offset ? getMsFromExpiryDate(offset) : 0;
      const newPrevTime = Date.now() - new Date(newOffsetMs).getTime();
      const newMs = getMsFromPrevTime(newPrevTime) || 0;
      const msOffset = 1000 - (newMs % 1000);
      setPrevTime(newPrevTime);
      setMs(newMs);
      setInterval(customInterval < msOffset ? customInterval : msOffset);
      setIsRunning(newAutoStart);
    },
    [customInterval]
  );

  const getSnapshot = useCallback(() => {
    return getTimeFromMs(ms, false);
  }, [ms]);

  const getSnapshotAsDigits = useCallback(() => {
    return getTimeUnitsFromMs(ms, false);
  }, [ms]);

  return {
    start,
    pause,
    reset,
    getSnapshot,
    getSnapshotAsDigits,
  };
}
