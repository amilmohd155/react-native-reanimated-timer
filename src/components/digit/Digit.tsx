import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useRootConfig } from '../../context';
import { enteringAnimation, exitingAnimation } from '../../utils/animation';
import type { DigitProps } from './type';

/**
 * A component that renders a single digit of a clock or timer.
 *
 * It accepts a `digitkey` prop, which is used to create a unique key for the
 * component. This is necessary because the component is used in a loop and
 * React needs a unique key for each component in a loop.
 *
 * It also accepts a `children` prop, which is the digit to be rendered.
 *
 * The component uses the `useDigitConfig` hook to get the animation configuration
 * for the digit. It uses this configuration to create a layout animation that is
 * used to animate the digit when it appears or disappears.
 *
 * If the `entering` or `exiting` props are provided, they will be used instead
 * of the animations created by the hook. This allows the user to customize the
 * animation.
 *
 * The component also accepts a `style` prop, which is used to style the digit.
 *
 * The component renders an `Animated.Text` component with the digit as its
 * children. The `style` prop is spread onto the component, and the `key` prop is
 * set to the `digitkey` prop.
 *
 * @param {PropsWithChildren<{ digitkey: string }>} props - The props for the component.
 * @param {string} props.digitkey - The unique key for the digit.
 * @param {React.ReactNode} props.children - The digit to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const Digit = ({ digitType, style, className, ...props }: DigitProps) => {
  const {
    daysTens,
    daysUnits,
    hoursTens,
    hoursUnits,
    minutesTens,
    minutesUnits,
    secondsTens,
    secondsUnits,
    milliseconds,

    digitStyle,
    digitClassName,

    exiting,
    entering,
    animationDelay,
    animationDuration,
    animationDistance,
    animationDirection,
  } = useRootConfig();

  let digit: number = 0;
  let digitkey = '';

  switch (digitType) {
    case 'daysTens':
      digit = daysTens;
      digitkey = `${daysTens}-daysTens`;
      break;
    case 'daysUnits':
      digit = daysUnits;
      digitkey = `${daysUnits}-daysUnits`;
      break;
    case 'hoursTens':
      digit = hoursTens;
      digitkey = `${hoursTens}-hoursTens`;
      break;
    case 'hoursUnits':
      digit = hoursUnits;
      digitkey = `${hoursUnits}-hoursUnits`;
      break;
    case 'minutesTens':
      digit = minutesTens;
      digitkey = `${minutesTens}-minutesTens`;
      break;
    case 'minutesUnits':
      digit = minutesUnits;
      digitkey = `${minutesUnits}-minutesUnits`;
      break;
    case 'secondsTens':
      digit = secondsTens;
      digitkey = `${secondsTens}-secondsTens`;
      break;
    case 'secondsUnits':
      digit = secondsUnits;
      digitkey = `${secondsUnits}-secondsUnits`;
      break;
    case 'milliseconds':
      digit = milliseconds;
      digitkey = `${milliseconds}-milliseconds`;
      break;
  }

  return (
    <Animated.Text
      {...props}
      entering={
        entering
          ? entering
          : enteringAnimation(
              animationDelay,
              animationDuration,
              animationDistance,
              animationDirection
            )
      }
      exiting={
        exiting
          ? exiting
          : exitingAnimation(
              animationDelay,
              animationDuration,
              animationDistance,
              animationDirection
            )
      }
      style={[styles.digit, digitStyle, style]}
      className={`${className} ${digitClassName}`}
      key={digitkey}
    >
      {digit}
    </Animated.Text>
  );
};

export default Digit;

const styles = StyleSheet.create({
  digit: { textAlign: 'center' },
});
