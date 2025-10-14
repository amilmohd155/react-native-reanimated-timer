import type { TextProps } from 'react-native';
import type { DigitType } from '../../constants';

type DigitProps = Omit<TextProps, 'children'> & {
  /**
   * The type of digit to display (e.g., "daysTens" | "daysUnits")
   * @see DigitType
   */
  digitType: DigitType;
};
