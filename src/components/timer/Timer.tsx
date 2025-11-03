import { forwardRef, useImperativeHandle, useRef } from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { styles } from '../../styles';
import { Day, Hour, Millisecond, Minute, Second } from '../segments';
import type { TimerMethods, TimerProps } from './types';
import { View } from '../primitive';
import { AnimationProvider, StyleProvider, TimeProvider } from '../../context';
import { TimerConstants } from '../../constants';
import { TimerManager } from './Manager';

type Timer = TimerMethods;

const {
  DEFAULT_AUTO_START,
  DEFAULT_INTERVAL_MS,
  DEFAULT_SKIP_ENTERING,
  DEFAULT_SKIP_EXITING,
} = TimerConstants;

const TimerComponent = forwardRef<Timer, TimerProps>(
  (
    {
      durationMs,
      intervalMs = DEFAULT_INTERVAL_MS,
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
      twMerge = false,

      children,
    },
    ref
  ) => {
    const syncRef = useRef<Timer>(null);

    useImperativeHandle(ref, () => ({
      start: () => syncRef.current?.start(),
      pause: () => syncRef.current?.pause(),
      resume: () => syncRef.current?.resume(),
      restart: (newDurationMs: number, newAutoStart?: boolean) =>
        syncRef.current?.restart(newDurationMs, newAutoStart),
      reset: () => syncRef.current?.reset(),
    }));

    return (
      <LayoutAnimationConfig
        skipEntering={skipEntering}
        skipExiting={skipExiting}
      >
        <StyleProvider
          twMerge={twMerge}
          digitContainerStyle={digitContainerStyle}
          digitContainerClassName={digitContainerClassName}
          digitStyle={digitStyle}
          digitClassName={digitClassName}
        >
          <AnimationProvider
            animationDelay={animationDelay}
            animationDirection={animationDirection}
            animationDuration={animationDuration}
            animationDistance={animationDistance}
            entering={entering}
            exiting={exiting}
          >
            <TimeProvider>
              <TimerManager
                durationMs={durationMs}
                intervalMs={intervalMs}
                autoStart={autoStart}
                onExpire={onExpire}
                ref={syncRef}
              />
              {/* Timer Container */}
              <View style={[styles.container, style]} className={className}>
                {children}
              </View>
            </TimeProvider>
          </AnimationProvider>
        </StyleProvider>
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
 * <TimerProps
 *   durationMs={durationMs} // Required duration in milliseconds
 * >
 *   <Timer.Day />
 *   <Timer.Hour />
 *   <Timer.Minute />
 *   <Timer.Second />
 *   <Timer.Millisecond />
 * </TimerProps>
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
