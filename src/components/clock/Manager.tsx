import { useEffect } from 'react';
import { useTime } from '../../context';
import type { ClockProps } from './types';
import { useTime as useClock } from 'react-timer-hook';
export const ClockManager = ({
  format,
  intervalMs: interval,
}: Pick<ClockProps, 'format' | 'intervalMs'>) => {
  const setDigits = useTime((state) => state.setDigits);

  const { hours, milliseconds, minutes, seconds, ampm } = useClock({
    format: format === '12' ? '12-hour' : undefined,
    interval,
  });

  useEffect(() => {
    // Update the time store with the new digits
    setDigits({
      hours,
      minutes,
      seconds,
      milliseconds,
      ampm,
    });
  }, [hours, milliseconds, minutes, seconds, ampm, setDigits]);

  return null;
};
