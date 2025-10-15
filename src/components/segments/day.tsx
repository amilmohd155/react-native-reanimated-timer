import { forwardRef, useMemo } from 'react';
import { useRootConfig } from '../../context';
import { styles } from '../../styles';
import { Digit } from '../digit';
import type { SegmentProps } from './type';
import { View } from '../primitive';
import { twMerge } from 'tailwind-merge';
import { combineClassNames } from '../../utils/style';

const DayComponent = forwardRef<View, SegmentProps>(
  ({ style, className, digitClassName, digitStyle, ...props }, ref) => {
    const { digitContainerClassName, digitContainerStyle, mergeClassNames } =
      useRootConfig();

    const containerStyle = useMemo(
      () => [styles.segment, digitContainerStyle, style],
      [digitContainerStyle, style]
    );

    const mergedClassNames = useMemo(
      () =>
        combineClassNames({
          merge: mergeClassNames,
          fallbackClassName: digitContainerClassName,
          className,
          twMerge,
        }),
      [className, digitContainerClassName, mergeClassNames]
    );

    return (
      <View
        {...props}
        ref={ref}
        style={containerStyle}
        // className={className || digitContainerClassName}
        className={mergedClassNames}
      >
        <Digit
          digitType="daysTens"
          style={digitStyle}
          className={digitClassName}
        />
        <Digit
          digitType="daysUnits"
          style={digitStyle}
          className={digitClassName}
        />
      </View>
    );
  }
);

export { DayComponent as Day };
