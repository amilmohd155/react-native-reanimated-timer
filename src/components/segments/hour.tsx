import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { Segment } from './common';

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
const HourComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <Segment {...props} ref={ref} value={['hoursTens', 'hoursUnits']} />
));

export { HourComponent as Hour };
