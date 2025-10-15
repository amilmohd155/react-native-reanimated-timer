import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { Segment } from './common';

const MinuteComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <Segment ref={ref} value={['minutesTens', 'minutesUnits']} {...props} />
));

export { MinuteComponent as Minute };
