import { forwardRef, memo } from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { RootContext } from '../../context';
import { useTime } from '../../hooks/useTime';
import { styles } from '../../styles';
import { AMPM, Hour, Millisecond, Minute, Second } from '../segments';
import {
  DEFAULT_INTERVAL_MS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} from './constants';
import type { ClockMethods, ClockProps } from './types';
import { View } from '../primitive';

type Clock = ClockMethods;

const ClockComponent = memo(
  forwardRef<Clock, ClockProps>(
    (
      {
        format = '24',
        intervalMs: interval = DEFAULT_INTERVAL_MS,

        animationDelay,
        animationDuration,
        animationDistance,
        animationDirection,
        entering,
        exiting,
        skipExiting = DEFAULT_SKIP_EXITING,
        skipEntering = DEFAULT_SKIP_ENTERING,

        style,

        digitContainerStyle,
        digitStyle,
        className,
        digitContainerClassName,
        digitClassName,
        mergeClassNames = false,

        children,
      },
      _
    ) => {
      const { getSnapshotAsDigits } = useTime({ format, interval });

      const timeUnits = getSnapshotAsDigits();

      return (
        <LayoutAnimationConfig
          skipExiting={skipExiting}
          skipEntering={skipEntering}
        >
          <RootContext.Provider
            value={{
              animationDelay,
              animationDuration,
              animationDistance,
              animationDirection,
              entering,
              exiting,

              digitStyle,
              digitContainerStyle,
              digitClassName,
              digitContainerClassName,

              daysTens: 0,
              daysUnits: 0,
              ...timeUnits,

              mergeClassNames,
            }}
          >
            <View style={[styles.container, style]} className={className}>
              {children}
            </View>
          </RootContext.Provider>
        </LayoutAnimationConfig>
      );
    }
  )
);

/**
 * Clock component to display the current time.
 * It can be configured to show hours, minutes, seconds, and milliseconds.
 * The time format can be set to either 12-hour or 24-hour format.
 * The component supports custom animations and styles.
 */
const Clock = Object.assign(ClockComponent, {
  /**
   * Sub-component to display hours.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
   */
  Hour,
  /**
   * Sub-component to display minutes.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
   */
  Minute,
  /**
   * Sub-component to display seconds.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
   */
  Second,
  /**
   * Sub-component to display milliseconds.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * To style text in this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
   *
   * Note: Width of Millisecond segment is set to "auto" to accommodate text length irrespective of digitStyle width.
   * if you want to customize the width, use `digitStyle` prop on this component.
   */
  Millisecond,
  /**
   * Sub-component to display AM/PM indicator.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: Width of AM/PM segment is set to "auto" to accommodate text length irrespective of digitStyle width.
   * if you want to customize the width, use `digitStyle` prop on this component.
   */
  AMPM,
});
Clock.displayName = 'Clock';

export default Clock;
