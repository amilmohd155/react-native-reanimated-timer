import { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import type { SegmentProps } from './type';

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
        style={containerStyle}
        className={className || digitContainerClassName}
        ref={ref}
        {...props}
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
