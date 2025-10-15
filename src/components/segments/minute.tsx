import { forwardRef, useMemo } from 'react';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import { Digit } from '../digit';
import type { SegmentProps } from './type';
import { View } from '../primitive';

const MinuteComponent = forwardRef<View, SegmentProps>(
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
          digitType="minutesTens"
          style={digitStyle}
          className={digitClassName}
        />
        <Digit
          digitType="minutesUnits"
          style={digitStyle}
          className={digitClassName}
        />
      </View>
    );
  }
);

export { MinuteComponent as Minute };
