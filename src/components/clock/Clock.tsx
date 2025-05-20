import { forwardRef, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Digit, DigitConfigContext } from '../digit';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import {
  DEFAULT_SEPARATOR,
  DEFAULT_SHOW_HOURS,
  DEFAULT_SHOW_MILLISECONDS,
  DEFAULT_SHOW_MINUTES,
  DEFAULT_SHOW_SECONDS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} from './constants';
import { useTime } from '../../hooks/useTime';
import type { ClockMethods, ClockProps } from './types';
import { styles } from './style';

type Clock = ClockMethods;

const ClockComponent = forwardRef<Clock, ClockProps>(
  (
    {
      format = '24',

      animationDelay,
      animationDuration,
      animationDistance,
      animationDirection,
      entering,
      exiting,
      skipExiting = DEFAULT_SKIP_EXITING,
      skipEntering = DEFAULT_SKIP_ENTERING,

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
    },
    _
  ) => {
    const { getSnapshotAsDigits } = useTime({ format });

    const {
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
        skipExiting={skipExiting}
        skipEntering={skipEntering}
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
);

const Clock = memo(ClockComponent);
Clock.displayName = 'Clock';

export default Clock;
