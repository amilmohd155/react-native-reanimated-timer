import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { Segment } from './common';

const SecondComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <Segment ref={ref} value={['secondsTens', 'secondsUnits']} {...props} />
));

export { SecondComponent as Second };
