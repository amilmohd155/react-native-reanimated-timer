import type { Time, FormattedTime, TimeUnits } from '../types';

function clampToZero(milliSecondsDistance: number): number {
  return Math.max(0, milliSecondsDistance);
}

function getTimeFromMs(ms: number, timerMode: boolean): Time {
  const totalSeconds = timerMode ? Math.ceil(ms / 1000) : Math.floor(ms / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));

  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor(ms % 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    // totalSeconds,
    // totalMilliseconds: ms,
  };
}

function getTimeUnitsFromMs(
  ms: number,
  timerMode: boolean
): TimeUnits & {
  milliseconds: number;
} {
  const time = getTimeFromMs(ms, timerMode);

  const secondsTens = Math.floor((time.seconds / 10) % 6);
  const secondsUnits = time.seconds % 10;
  const minutesTens = Math.floor((time.minutes / 10) % 6);
  const minutesUnits = time.minutes % 10;
  const hoursTens = Math.floor((time.hours / 10) % 3);
  const hoursUnits = time.hours % 10;
  const daysTens = Math.floor((time.days / 10) % 6);
  const daysUnits = time.days % 10;

  return {
    secondsTens,
    secondsUnits,
    minutesTens,
    minutesUnits,
    hoursTens,
    hoursUnits,
    daysTens,
    daysUnits,
    milliseconds: time.milliseconds,
  };
}

function getMsFromExpiryDate(expiryDate: Date): number {
  const now = Date.now();

  const timeDifferenceInMs = expiryDate.getTime() - now;

  return clampToZero(timeDifferenceInMs);
}

function getMsFromPrevTime(prevTime: number): number {
  const now = new Date().getTime();

  const timeDifferenceInMs = now - prevTime;

  return clampToZero(timeDifferenceInMs);
}

function getMsFromCurrentTime(): number {
  const now = new Date();
  const currentTime = now.getTime();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  return currentTime - offset;
}

function getFormattedTime(
  ms: number,
  format: '12' | '24' = '24'
): FormattedTime {
  const { milliseconds, seconds, minutes, hours } = getTimeFromMs(ms, false);

  if (format === '12') {
    return {
      milliseconds,
      seconds,
      minutes,
      hours: hours % 12,
      ampm: hours < 12 ? 'AM' : 'PM',
    };
  }

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    ampm: '',
  };
}

export {
  getTimeFromMs,
  getTimeUnitsFromMs,
  getMsFromExpiryDate,
  getMsFromPrevTime,
  getMsFromCurrentTime,
  getFormattedTime,
};
