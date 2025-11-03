import { forwardRef, memo } from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { styles } from '../../styles';
import { AMPM, Hour, Millisecond, Minute, Second } from '../segments';
import type { ClockMethods, ClockProps } from './types';
import { View } from '../primitive';
import { AnimationProvider, StyleProvider, TimeProvider } from '../../context';
import { ClockConstants } from '../../constants';
import { ClockManager } from './Manager';

const { DEFAULT_INTERVAL_MS, DEFAULT_SKIP_EXITING, DEFAULT_SKIP_ENTERING } =
  ClockConstants;

const ClockComponent = memo(
  forwardRef<ClockMethods, ClockProps>(
    (
      {
        format = '24',
        intervalMs = DEFAULT_INTERVAL_MS,

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
        twMerge = false,

        children,
      },
      _
    ) => {
      return (
        <LayoutAnimationConfig
          skipExiting={skipExiting}
          skipEntering={skipEntering}
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
              animationDuration={animationDuration}
              animationDistance={animationDistance}
              animationDirection={animationDirection}
              entering={entering}
              exiting={exiting}
            >
              <TimeProvider>
                <ClockManager intervalMs={intervalMs} format={format} />
                <View style={[styles.container, style]} className={className}>
                  {children}
                </View>
              </TimeProvider>
            </AnimationProvider>
          </StyleProvider>
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
