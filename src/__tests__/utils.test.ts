import type { Time } from '../types';
import {
  getTimeFromMs,
  getFormattedTime,
  getMsFromCurrentTime,
  getMsFromPrevTime,
  getMsFromExpiryDate,
} from '../utils/time';

const daysInMs = 24 * 60 * 60 * 1000;
const hoursInMs = 60 * 60 * 1000;
const minutesInMs = 60 * 1000;
const secondsInMs = 1000;

describe('getTimeFromMs', () => {
  it('should correctly compute time parts timerMode = false (floor)', () => {
    const ms = daysInMs + hoursInMs + minutesInMs + secondsInMs + 7; // 1 day, 1 hour, 1 minute, 1 second, and 7 milliseconds
    const result = getTimeFromMs(ms, false);

    expect(result).toEqual<Time>({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      milliseconds: 7,
    });
  });

  it('should correctly compute time parts with timerMode = true (ceil)', () => {
    const ms = daysInMs + hoursInMs + minutesInMs + 1 * secondsInMs + 7; // 1 day, 1 hour, 1 minute, 2 seconds, and 7 milliseconds
    const result = getTimeFromMs(ms, true);

    expect(result).toEqual({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 2, // 90061007 / 1000 = 90061.007 => ceil = 90062 → 1s more than floor
      milliseconds: 7,
    });
  });

  it('should return zeros for 0 ms', () => {
    const result = getTimeFromMs(0, false);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });

  it('should return correct time under 1 second', () => {
    const result = getTimeFromMs(789, false);

    expect(result).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 789,
    });
  });

  it('should correctly handle exactly 1 day', () => {
    const ms = daysInMs; // 1 day in ms = 86400000
    const result = getTimeFromMs(ms, false);

    expect(result).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  });
});

describe('getFormattedTime', () => {
  it('returns correct 24-hour format time', () => {
    const ms = 15 * hoursInMs + 30 * minutesInMs + 45 * secondsInMs + 123; // 15:30:45.123
    const result = getFormattedTime(ms, '24');

    expect(result).toEqual({
      hours: 15,
      minutes: 30,
      seconds: 45,
      milliseconds: 123,
      ampm: '',
    });
  });

  it('returns correct 12-hour format time in AM', () => {
    const ms = 4 * hoursInMs + 20 * minutesInMs + 15 * secondsInMs + 999; // 04:20:15.999
    const result = getFormattedTime(ms, '12');

    expect(result).toEqual({
      hours: 4, // 4 % 12 = 4
      minutes: 20,
      seconds: 15,
      milliseconds: 999,
      ampm: 'AM',
    });
  });

  it('returns correct 12-hour format time in PM', () => {
    const ms = 22 * hoursInMs + 5 * minutesInMs + 10 * secondsInMs + 250; // 22:05:10.250
    const result = getFormattedTime(ms, '12');

    expect(result).toEqual({
      hours: 10, // 22 % 12 = 10
      minutes: 5,
      seconds: 10,
      milliseconds: 250,
      ampm: 'PM',
    });
  });

  it('defaults to 24-hour format if not specified', () => {
    const ms = 8 * hoursInMs; // 08:00:00.000
    const result = getFormattedTime(ms);

    expect(result).toEqual({
      hours: 8,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      ampm: '',
    });
  });

  it('handles midnight correctly in 12-hour format', () => {
    const ms = 0; // 00:00:00.000
    const result = getFormattedTime(ms, '12');

    expect(result).toEqual({
      hours: 0, // 0 % 12 = 0
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      ampm: 'AM',
    });
  });

  it('handles noon correctly in 12-hour format', () => {
    const ms = 12 * hoursInMs; // 12:00:00.000
    const result = getFormattedTime(ms, '12');

    expect(result).toEqual({
      hours: 0, // 12 % 12 = 0
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      ampm: 'PM',
    });
  });
});

describe('getMsFromCurrentTime', () => {
  beforeAll(() => {
    // Freeze time: Jan 1, 2025, 12:00:00 UTC
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01T12:00:00.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns current timestamp in ms adjusted for timezone offset', () => {
    const now = new Date();
    const expected = now.getTime() - now.getTimezoneOffset() * 60 * 1000;

    const result = getMsFromCurrentTime();

    expect(result).toBe(expected);
  });
});

describe('getMsFromPrevTime', () => {
  beforeAll(() => {
    // Freeze system time
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01T12:00:00.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns the clamped time difference between now and prevTime', () => {
    const now = new Date().getTime();
    const prevTime = now - 5000; // 5 seconds ago

    const result = getMsFromPrevTime(prevTime);

    expect(result).toBe(5000);
  });

  it('clamps negative differences to zero', () => {
    const now = new Date().getTime();
    const futureTime = now + 1000;

    const result = getMsFromPrevTime(futureTime);

    expect(result).toBe(0);
  });
});

describe('getMsFromExpiryDate', () => {
  beforeAll(() => {
    // Freeze time: Jan 1, 2025, 12:00:00 UTC
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01T12:00:00.000Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns positive ms when expiryDate is in the future', () => {
    const futureDate = new Date('2025-01-01T12:00:05.000Z'); // +5s
    const result = getMsFromExpiryDate(futureDate);

    expect(result).toBe(5000);
  });

  it('returns 0 when expiryDate is in the past', () => {
    const pastDate = new Date('2025-01-01T11:59:59.000Z'); // -1s
    const result = getMsFromExpiryDate(pastDate);

    expect(result).toBe(0);
  });

  it('returns 0 when expiryDate is exactly now', () => {
    const now = new Date('2025-01-01T12:00:00.000Z'); // same as frozen time
    const result = getMsFromExpiryDate(now);

    expect(result).toBe(0);
  });
});
