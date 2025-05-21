import { forwardRef, memo, useImperativeHandle } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StopwatchMethods, StopwatchProps } from './types';
import { Digit, DigitConfigContext } from '../digit';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { styles } from './style';
import { useStopwatch } from '../../hooks/useStopwatch';
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

type Stopwatch = StopwatchMethods;

const StopWatchComponent = forwardRef<Stopwatch, StopwatchProps>(
  (
    {
      autoStart = DEFAULT_AUTO_START,
      offsetTimestamp,
      intervalMs: interval = DEFAULT_INTERVAL_MS,

      animationDelay,
      animationDistance,
      animationDirection,
      animationDuration,
      entering,
      exiting,
      skipEntering = DEFAULT_SKIP_ENTERING,
      skipExiting = DEFAULT_SKIP_EXITING,

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
      // millisecondsStyle,
    },
    ref
  ) => {
    const { start, pause, reset, getSnapshot, getSnapshotAsDigits } =
      useStopwatch({
        autoStart,
        interval,
        offsetTimestamp,
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

    useImperativeHandle(ref, () => ({
      start,
      pause,
      reset,
      getSnapshot,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { width, ...digitStyleWithoutWidth } =
      StyleSheet.flatten(digitStyle) || {};

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
              <View style={[styles.section, digitContainerStyle]}>
                <Digit digitkey={`${daysTens}-daysTens`}>{daysTens}</Digit>
                <Digit digitkey={`${daysUnits}-daysUnits`}>{daysUnits}</Digit>
              </View>
            )}
            {showDays &&
              (showHours || showMinutes || showSeconds || showMilliseconds) &&
              renderSeparator()}
            {showHours && (
              <View style={[styles.section, digitContainerStyle]}>
                <Digit digitkey={`${hoursTens}-hoursTens`}>{hoursTens}</Digit>
                <Digit digitkey={`${hoursUnits}-hoursUnits`}>
                  {hoursUnits}
                </Digit>
              </View>
            )}
            {showHours &&
              (showMinutes || showSeconds || showMilliseconds) &&
              renderSeparator()}
            {showMinutes && (
              <View style={[styles.section, digitContainerStyle]}>
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
              <View style={[styles.section, digitContainerStyle]}>
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
                  // millisecondsStyle,
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
);

/**
 * Stopwatch component that displays elapsed time in a digital format.
 * It can be started, paused, and reset.
 */
const Stopwatch = memo(StopWatchComponent);
Stopwatch.displayName = 'Stopwatch';

export default Stopwatch;
