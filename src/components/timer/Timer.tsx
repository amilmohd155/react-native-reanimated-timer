import { forwardRef, useImperativeHandle } from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { RootContext } from '../../context';
import { useTimer } from '../../hooks/useTimer';
import { styles } from '../../styles';
import { Day, Hour, Millisecond, Minute, Second } from '../segments';
import {
  DEFAULT_AUTO_START,
  DEFAULT_INTERVAL_MS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} from './constants';
import type { TimerMethods, TimerProps } from './types';
import { View } from '../primitive';

type Timer = TimerMethods;

const TimerComponent = forwardRef<Timer, TimerProps>(
  (
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

      style,
      className,

      digitContainerStyle,
      digitContainerClassName,
      digitStyle,
      digitClassName,
      mergeClassNames = false,

      children,
    },
    ref
  ) => {
    const { start, pause, resume, restart, getSnapshotAsDigits, getSnapshot } =
      useTimer({
        duration,
        interval,
        autoStart,
        onExpire,
      });

    const timeUnits = getSnapshotAsDigits();

    useImperativeHandle(ref, () => ({
      start,
      pause,
      resume,
      restart,
      reset: () => restart(duration, autoStart),
      getSnapshot,
    }));

    return (
      <LayoutAnimationConfig
        skipEntering={skipEntering}
        skipExiting={skipExiting}
      >
        <RootContext.Provider
          value={{
            // Animation Config
            animationDelay,
            animationDuration,
            animationDistance,
            animationDirection,
            entering,
            exiting,
            //Time units
            ...timeUnits,
            // Styles
            digitContainerStyle,
            digitContainerClassName,
            digitStyle,
            digitClassName,
            mergeClassNames,

            ampm: '',
          }}
        >
          {/* Timer Container */}
          <View style={[styles.container, style]} className={className}>
            {children}
          </View>
        </RootContext.Provider>
      </LayoutAnimationConfig>
    );
  }
);

/**
 * Timer component that counts down from a specified duration.
 * It provides methods to start, pause, resume, and reset the timer.
 *
 * @example
 * ```tsx
 * <Timer
 *   durationMs={durationMs} // Required duration in milliseconds
 * >
 *  // Child components representing time units
 *   <Timer.Day />
 *   <Timer.Hour />
 *   <Timer.Minute />
 *   <Timer.Second />
 *   <Timer.Millisecond />
 * </Timer>
 * ```
 * Prefer using the `digitContainerStyle`, `digitContainerClassName`, `digitStyle`, and `digitClassName` props on the Timer component
 * to style all segments and digits uniformly instead of styling individual segment components.
 */
const Timer = Object.assign(TimerComponent, {
  /**
   * Sub-component to display days.
   *
   * To style individual segments, use the `style` or `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` or `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` or `digitClassName` props on the root Timer component.
   */
  Day,
  /**
   * Sub-component to display hours.
   *
   * To style individual segments, use the `style` or `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` or `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` or `digitClassName` props on the root Timer component.
   */
  Hour,
  /**
   * Sub-component to display minutes.
   *
   * To style individual segments, use the `style` or `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` or `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` or `digitClassName` props on the root Timer component.
   */
  Minute,
  /**
   * Sub-component to display seconds.
   *
   * To style individual segments, use the `style` or `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` or `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * Note: To style digits inside this segment, use the `digitStyle` or `digitClassName` props on the root Timer component.
   */
  Second,
  /**
   * Sub-component to display milliseconds.
   *
   * To style individual segments, use the `style` or `className` props on this component.
   *
   * However, it's recommended to use the `digitContainerStyle` or `digitContainerClassName` props on the root Timer component
   * to ensure consistent styling across all segments.
   *
   * To style text in this segment, use the `digitStyle` or `digitClassName` props on the root Timer component.
   *
   * Note: Width of Millisecond segment is set to "auto" to accommodate text length irrespective of digitStyle width.
   * if you want to customize the width, use `digitStyle` prop on this component.
   */
  Millisecond,
});

export default Timer;
