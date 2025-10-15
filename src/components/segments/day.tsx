import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { Segment } from './common';

const DayComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <Segment ref={ref} value={['daysTens', 'daysUnits']} {...props} />
));
export { DayComponent as Day };
