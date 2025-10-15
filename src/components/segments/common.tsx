import { forwardRef, useMemo } from 'react';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import { Digit } from '../digit';
import type { SegmentProps } from './type';
import { Text, View } from '../primitive';
import { combineClassNames } from '../../utils/style';
import type { DigitType } from '../../constants';

/**
 * Segment component that displays two digits side by side.
 * It uses the Digit component to render each digit.
 * Used for displaying time units like hours, minutes, seconds, days.
 * @private
 */
export const Segment = forwardRef<
  View,
  SegmentProps & {
    /**
     * Array of two DigitType representing tens and units respectively
     */
    value: [DigitType, DigitType];
  }
>(({ style, className, digitClassName, digitStyle, value, ...props }, ref) => {
  const { digitContainerClassName, digitContainerStyle, twMerge } =
    useRootConfig();

  const containerStyle = useMemo(
    () => [styles.segment, digitContainerStyle, style],
    [digitContainerStyle, style]
  );

  const mergedClassNames = useMemo(
    () =>
      combineClassNames({
        merge: twMerge,
        fallbackClassName: digitContainerClassName,
        className,
      }),
    [className, digitContainerClassName, twMerge]
  );

  return (
    <View
      {...props}
      ref={ref}
      style={containerStyle}
      className={mergedClassNames}
    >
      {value.map((val, index) => (
        <Digit
          key={index}
          digitType={val}
          style={digitStyle}
          className={digitClassName}
        />
      ))}
    </View>
  );
});

/**
 * Segment component for displaying special time units like AM/PM or milliseconds.
 * Unlike regular segments, this component displays a single value instead of two digits.
 * It uses the `Text` component to render the value.
 * @private
 */
export const SpecialSegment = forwardRef<
  View,
  SegmentProps & {
    type: 'ampm' | 'milliseconds';
  }
>(({ style, className, digitClassName, digitStyle, type, ...props }, ref) => {
  const {
    digitStyle: _digitStyle,
    digitClassName: _digitClassName,
    digitContainerClassName,
    digitContainerStyle,
    twMerge,
    ...config
  } = useRootConfig();

  const digit = config[type];

  const containerStyle = useMemo(
    () => [digitContainerStyle, style],
    [digitContainerStyle, style]
  );

  const digitCombinedStyle = useMemo(
    () => [styles.otherDigits, _digitStyle, styles.widthAuto, digitStyle],
    [_digitStyle, digitStyle]
  );

  const mergedClassName = useMemo(
    () =>
      combineClassNames({
        merge: twMerge,
        fallbackClassName: digitContainerClassName,
        className,
      }),
    [className, digitContainerClassName, twMerge]
  );

  const mergedDigitClassName = useMemo(
    () =>
      combineClassNames({
        merge: twMerge,
        fallbackClassName: _digitClassName,
        className: digitClassName,
      }),
    [digitClassName, _digitClassName, twMerge]
  );

  if (typeof digit !== 'number' && digit.length === 0) return null;

  return (
    <View
      {...props}
      ref={ref}
      style={containerStyle}
      className={mergedClassName}
    >
      <Text style={digitCombinedStyle} className={mergedDigitClassName}>
        {type === 'milliseconds' ? String(digit).padStart(3, '0') : digit}
      </Text>
    </View>
  );
});
