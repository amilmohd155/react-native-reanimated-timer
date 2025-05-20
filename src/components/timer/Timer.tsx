import { StyleSheet, Text, View } from 'react-native';
import { useTimer } from '../../hooks/useTimer';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { Digit, DigitConfigContext } from '../digit';
import { forwardRef, useImperativeHandle, type ForwardedRef } from 'react';
import type { TimerMethods, TimerProps } from './types';
import {
  DEFAULT_AUTO_START,
  DEFAULT_INTERVAL_MS,
  DEFAULT_SEPARATOR,
  DEFAULT_SHOW_DAYS,
  DEFAULT_SHOW_HOURS,
  DEFAULT_SHOW_MILLISECONDS,
  DEFAULT_SHOW_MINUTES,
  DEFAULT_SHOW_SECONDS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} from './constants';
import { styles } from './style';

type Timer = TimerMethods;

function TimerComponent(
  {
    durationMs: duration,
    intervalMs: interval = DEFAULT_INTERVAL_MS,
    autoStart = DEFAULT_AUTO_START,
    onExpire,

    animationDelay,
    animationDuration,
    animationDistance,
    animationDirection,
    entering,
    exiting,
    skipExiting = DEFAULT_SKIP_EXITING,
    skipEntering = DEFAULT_SKIP_ENTERING,

    showDays = DEFAULT_SHOW_DAYS,
    showHours = DEFAULT_SHOW_HOURS,
    showMinutes = DEFAULT_SHOW_MINUTES,
    showSeconds = DEFAULT_SHOW_SECONDS,
    showMilliseconds = DEFAULT_SHOW_MILLISECONDS,

    separator = DEFAULT_SEPARATOR,
    separatorStyle,

    style,

    digitContainerStyle,
    digitStyle,
    millisecondsStyle,
  }: TimerProps,
  ref: ForwardedRef<Timer>
) {
  const { start, pause, resume, restart, getSnapshotAsDigits, getSnapshot } =
    useTimer({
      duration,
      interval,
      autoStart,
      onExpire,
    });

  const {
    daysTens,
    daysUnits,
    hoursTens,
    hoursUnits,
    minutesTens,
    minutesUnits,
    secondsTens,
    secondsUnits,
    milliseconds,
  } = getSnapshotAsDigits();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { width, ...digitStyleWithoutWidth } =
    StyleSheet.flatten(digitStyle) || {};

  useImperativeHandle(ref, () => ({
    start,
    pause,
    resume,
    restart,
    reset: () => restart(duration, autoStart),
    getSnapshot,
  }));

  const renderSeparator = () => {
    if (typeof separator === 'string') {
      return (
        <Text style={[styles.separator, separatorStyle]}>{separator}</Text>
      );
    } else if (typeof separator === 'function') {
      return separator?.();
    }
    return null;
  };

  return (
    <LayoutAnimationConfig
      skipEntering={skipEntering}
      skipExiting={skipExiting}
    >
      <DigitConfigContext.Provider
        value={{
          animationDelay,
          animationDuration,
          animationDistance,
          animationDirection,
          entering,
          exiting,
          style: digitStyle,
        }}
      >
        <View style={[styles.container, style]}>
          {showDays && (
            <View style={[styles.sectionContainer, digitContainerStyle]}>
              <Digit digitkey={`${daysTens}-daysTens`}>{daysTens}</Digit>
              <Digit digitkey={`${daysUnits}-daysUnits`}>{daysUnits}</Digit>
            </View>
          )}
          {showDays &&
            (showHours || showMinutes || showSeconds || showMilliseconds) &&
            renderSeparator()}
          {showHours && (
            <View style={[styles.sectionContainer, digitContainerStyle]}>
              <Digit digitkey={`${hoursTens}-hoursTens`}>{hoursTens}</Digit>
              <Digit digitkey={`${hoursUnits}-hoursUnits`}>{hoursUnits}</Digit>
            </View>
          )}
          {showHours &&
            (showMinutes || showSeconds || showMilliseconds) &&
            renderSeparator()}
          {showMinutes && (
            <View style={[styles.sectionContainer, digitContainerStyle]}>
              <Digit digitkey={`${minutesTens}-minutesTens`}>
                {minutesTens}
              </Digit>
              <Digit digitkey={`${minutesUnits}-minutesUnits`}>
                {minutesUnits}
              </Digit>
            </View>
          )}
          {showMinutes &&
            (showSeconds || showMilliseconds) &&
            renderSeparator()}
          {showSeconds && (
            <View style={[styles.sectionContainer, digitContainerStyle]}>
              <Digit digitkey={`${secondsTens}-secondsTens`}>
                {secondsTens}
              </Digit>

              <Digit digitkey={`${secondsUnits}-secondsUnits`}>
                {secondsUnits}
              </Digit>
            </View>
          )}
          {showSeconds && showMilliseconds && renderSeparator()}
          {showMilliseconds && (
            <Text
              style={[
                styles.milliseconds,
                digitStyleWithoutWidth,
                millisecondsStyle,
              ]}
            >
              {String(milliseconds).padStart(3, '0')}
            </Text>
          )}
        </View>
      </DigitConfigContext.Provider>
    </LayoutAnimationConfig>
  );
}

/**
 * Timer component that counts down from a specified duration.
 * It provides methods to start, pause, resume, and reset the timer.
 *
 * @prop {number} durationMs - The duration in milliseconds to count down from. @required
 */
const Timer = forwardRef<Timer, TimerProps>(TimerComponent);
Timer.displayName = 'Timer';

export default Timer;
