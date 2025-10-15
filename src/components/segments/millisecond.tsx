import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { SpecialSegment } from './common';

const MSComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <SpecialSegment ref={ref} type="milliseconds" {...props} />
));

export { MSComponent as Millisecond };
