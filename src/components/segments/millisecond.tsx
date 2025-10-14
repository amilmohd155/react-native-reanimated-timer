import { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import type { SegmentProps } from './type';

const MSComponent = forwardRef<View, SegmentProps>(
  ({ style, className, digitClassName, digitStyle, ...props }, ref) => {
    const {
      digitStyle: _digitStyle,
      milliseconds,
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
          {String(milliseconds).padStart(3, '0')}
        </Text>
      </View>
    );
  }
);

export { MSComponent as Millisecond };
