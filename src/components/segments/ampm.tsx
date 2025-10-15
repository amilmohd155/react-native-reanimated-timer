import { forwardRef } from 'react';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { SpecialSegment } from './common';

const AMPMComponent = forwardRef<View, SegmentProps>((props, ref) => (
  <SpecialSegment ref={ref} type="ampm" {...props} />
));

export { AMPMComponent as AMPM };
