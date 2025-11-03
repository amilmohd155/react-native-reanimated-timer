import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import type { StopwatchMethods, StopwatchProps } from './types';
import { useTime } from '../../context';
import { useStopwatch } from 'react-timer-hook';

export const StopwatchManager = forwardRef<
  StopwatchMethods,
  Pick<StopwatchProps, 'intervalMs' | 'offsetTimestamp' | 'autoStart'>
>(({ intervalMs: interval, autoStart, offsetTimestamp }, ref) => {
  const setDigits = useTime((state) => state.setDigits);

  const { start, pause, reset, days, hours, milliseconds, minutes, seconds } =
    useStopwatch({
      autoStart,
      interval,
      offsetTimestamp,
    });

  const _reset = useCallback(
    (newAutoStart?: boolean, newOffset?: Date) => {
      reset(newOffset, newAutoStart);
    },
    [reset]
  );

  useImperativeHandle(ref, () => ({
    start,
    pause,
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
});
