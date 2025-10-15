import { forwardRef, useMemo } from 'react';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import { Digit } from '../digit';
import type { SegmentProps } from './type';
import { View } from '../primitive';

/**
 * Segment to display hours.
 * Usage:
 * ```tsx
 * <Timer>
 *   <Timer.Hour />
 * </Timer>
 * ```
 * Note: To style individual segments, use the `style` and `className` props on this component.
 *
 * However, it's recommended to use the `digitContainerStyle` and `digitContainerClassName` props on the root Timer component
 * to ensure consistent styling across all segments.
 *
 * Note: To style digits inside this segment, use the `digitStyle` and `digitClassName` props on the root Timer component.
 */
const HourComponent = forwardRef<View, SegmentProps>(
  ({ style, className, digitClassName, digitStyle, ...props }, ref) => {
    const { digitContainerClassName, digitContainerStyle } = useRootConfig();

    const containerStyle = useMemo(
      () => [styles.segment, digitContainerStyle, style],
      [digitContainerStyle, style]
    );

    return (
      <View
        {...props}
        ref={ref}
        style={containerStyle}
        className={className || digitContainerClassName}
      >
        <Digit
          digitType="hoursTens"
          style={digitStyle}
          className={digitClassName}
        />
        <Digit
          digitType="hoursUnits"
          style={digitStyle}
          className={digitClassName}
        />
      </View>
    );
  }
);

export { HourComponent as Hour };
