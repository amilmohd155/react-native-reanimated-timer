import { forwardRef, useMemo } from 'react';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import type { SegmentProps } from './type';
import { View, Text } from '../primitive';

const AMPMComponent = forwardRef<View, SegmentProps>(
  ({ style, className, digitClassName, digitStyle, ...props }, ref) => {
    const {
      ampm,
      digitStyle: _digitStyle,
      digitClassName: _digitClassName,
      digitContainerClassName,
      digitContainerStyle,
    } = useRootConfig();

    const containerStyle = useMemo(
      () => [digitContainerStyle, style],
      [digitContainerStyle, style]
    );

    const digitCombinedStyle = useMemo(
      () => [styles.otherDigits, _digitStyle, styles.widthAuto, digitStyle],
      [_digitStyle, digitStyle]
    );

    if (ampm.length === 0) return null;

    return (
      <View
        {...props}
        ref={ref}
        style={containerStyle}
        className={className || digitContainerClassName}
      >
        <Text
          style={digitCombinedStyle}
          className={digitClassName || _digitClassName}
        >
          {ampm}
        </Text>
      </View>
    );
  }
);

export { AMPMComponent as AMPM };
