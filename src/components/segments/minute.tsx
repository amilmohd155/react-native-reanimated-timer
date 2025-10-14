import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import { Digit } from '../digit';
import type { SegmentProps } from './type';

const MinuteComponent = forwardRef<View, SegmentProps>(
  ({ style, className, digitClassName, digitStyle, ...props }, ref) => {
    const { digitContainerClassName, digitContainerStyle } = useRootConfig();

    const containerStyle = useMemo(
      () => [styles.segment, digitContainerStyle, style],
      [digitContainerStyle, style]
    );

    return (
      <View
        style={containerStyle}
        className={className || digitContainerClassName}
        ref={ref}
        {...props}
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
