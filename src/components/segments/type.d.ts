import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

/**
 * Props for a segment component.
 * e.g., Hour, Minute, Second, Day, Millisecond
 */
interface SegmentProps extends Omit<ViewProps, 'style' | 'className'> {
  /**
   * Style for the segment container.
   * @default {
        flexDirection: "row";
        alignItems: "center";
    }
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Class name for the segment container.
   * @default undefined
   */
  className?: string;
  /**
   * Style for the digit text inside the segment.
   */
  digitStyle?: StyleProp<TextStyle>;
  /**
   * Class name for the digit text inside the segment.
   */
  digitClassName?: string;
}
