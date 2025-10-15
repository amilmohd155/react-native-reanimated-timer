import { forwardRef, memo, useImperativeHandle } from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { RootContext } from '../../context';
import { useStopwatch } from '../../hooks/useStopwatch';
import { styles } from '../../styles';
import { Day, Hour, Millisecond, Minute, Second } from '../segments';
import {
  DEFAULT_AUTO_START,
  DEFAULT_INTERVAL_MS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} from './constants';
import type { StopwatchMethods, StopwatchProps } from './types';
import { View } from '../primitive';

type Stopwatch = StopwatchMethods;

const StopWatchComponent = memo(
  forwardRef<Stopwatch, StopwatchProps>(
    (
      {
        // Stopwatch
        autoStart = DEFAULT_AUTO_START,
        offsetTimestamp,
        intervalMs: interval = DEFAULT_INTERVAL_MS,

        // Animation
        animationDelay,
        animationDistance,
        animationDirection,
        animationDuration,
        entering,
        exiting,
        skipEntering = DEFAULT_SKIP_ENTERING,
        skipExiting = DEFAULT_SKIP_EXITING,

        // Styles
        style,
        className,
        digitContainerStyle,
        digitContainerClassName,
        digitStyle,
        digitClassName,
        twMerge = false,

        children,
      },
      ref
    ) => {
      const { start, pause, reset, getSnapshot, getSnapshotAsDigits } =
        useStopwatch({
          autoStart,
          interval,
          offsetTimestamp,
        });

      const timeUnits = getSnapshotAsDigits();

      useImperativeHandle(ref, () => ({
        start,
        pause,
        reset,
        getSnapshot,
      }));

      return (
        <LayoutAnimationConfig
          skipEntering={skipEntering}
          skipExiting={skipExiting}
        >
          <RootContext.Provider
            value={{
              animationDelay,
              animationDuration,
              animationDistance,
              animationDirection,
              entering,
              exiting,

              ...timeUnits,

              digitStyle,
              digitClassName,
              digitContainerStyle,
              digitContainerClassName,
              twMerge,

              ampm: '',
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
 * Stopwatch component that displays elapsed time in a digital format.
 * It can be started, paused, and reset.
 */
const Stopwatch = Object.assign(StopWatchComponent, {
  /**
   * Sub-component to display days.
   *
   * To style individual segments, use the `style` and `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
   */
  Day,
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
});

export default Stopwatch;
