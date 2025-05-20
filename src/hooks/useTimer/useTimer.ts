import { useCallback, useMemo, useState } from 'react';
import {
  getMsFromExpiryDate,
  getTimeFromMs,
  getTimeUnitsFromMs,
} from '../../utils/time';
import { useInterval } from '../useInteval';
import type { UseTimerReturn, UseTimerProps } from './types';

export function useTimer({
  duration: durationMs,
  interval: customInterval,
  autoStart,
  onExpire,
}: UseTimerProps): UseTimerReturn {
  const duration = useMemo(
    () => new Date(Date.now() + durationMs),
    [durationMs]
  );

  const [expiry, setExpiry] = useState(duration);
  const [ms, setMs] = useState(getMsFromExpiryDate(duration));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [interval, setInterval] = useState<number | null>(customInterval);

  const handleExpire = useCallback(() => {
    if (onExpire && onExpire instanceof Function) {
      onExpire();
    }
    setIsRunning(false);
    setInterval(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback(
    (newDuration: number, newAutoStart = true) => {
      const time = new Date();
      time.setMilliseconds(time.getMilliseconds() + newDuration);

      setInterval(customInterval);
      setDidStart(newAutoStart);
      setIsRunning(newAutoStart);
      setExpiry(time);
      setMs(getMsFromExpiryDate(time));
    },
    [customInterval]
  );

  const resume = useCallback(() => {
    restart(ms);
  }, [ms, restart]);

  const start = useCallback(() => {
    if (!didStart) {
      setMs(getMsFromExpiryDate(expiry));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [didStart, expiry, resume]);

  useInterval(
    () => {
      const _ms = getMsFromExpiryDate(expiry);
      setMs(_ms);
      if (ms <= 0) {
        handleExpire();
      } else if (interval && _ms < interval) {
        setInterval(_ms);
      }
    },
    isRunning ? interval : null
  );

  const getSnapshot = useCallback(() => {
    return getTimeFromMs(ms, true);
  }, [ms]);

  const getSnapshotAsDigits = useCallback((): ReturnType<
    UseTimerReturn['getSnapshotAsDigits']
  > => {
    return getTimeUnitsFromMs(ms, true);
  }, [ms]);

  return {
    getSnapshotAsDigits,
    getSnapshot,
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
}
