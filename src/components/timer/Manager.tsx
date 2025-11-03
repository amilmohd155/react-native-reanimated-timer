import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import type { TimerMethods, BaseTimerProps } from './types';
import { useTimer } from 'react-timer-hook';
import { useTime } from '../../context';

export const TimerManager = forwardRef<TimerMethods, BaseTimerProps>(
  ({ durationMs, intervalMs, autoStart, onExpire }, ref) => {
    const expiryTimestamp = useMemo(() => {
      const time = new Date();
      time.setMilliseconds(time.getMilliseconds() + durationMs);
      return time;
    }, [durationMs]);

    const setDigits = useTime((state) => state.setDigits);
    const {
      start,
      pause,
      resume,
      restart,
      days,
      hours,
      milliseconds,
      minutes,
      seconds,
    } = useTimer({
      expiryTimestamp,
      interval: intervalMs,
      autoStart,
      onExpire,
    });

    const _restart = useCallback(
      (newDurationMs: number, newAutoStart?: boolean) => {
        const duration = new Date();
        duration.setMilliseconds(duration.getMilliseconds() + newDurationMs);
        return restart(duration, newAutoStart);
      },
      [restart]
    );

    const _reset = useCallback(() => {
      const time = new Date();
      time.setMilliseconds(time.getMilliseconds() + durationMs);
      restart(time, autoStart);
    }, [autoStart, durationMs, restart]);

    useImperativeHandle(ref, () => ({
      start,
      pause,
      resume,
      restart: _restart,
      reset: _reset,
    }));

    useEffect(() => {
      // Update the time store with the new digits
      setDigits({
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
      });
    }, [days, hours, milliseconds, minutes, seconds, setDigits]);

    return null;
  }
);
