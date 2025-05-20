import type { PropsWithChildren } from 'react';
import Animated from 'react-native-reanimated';
import { useDigitConfig } from './context';
import { enteringAnimation, exitingAnimation } from '../../utils/animation';
import { StyleSheet } from 'react-native';

const Digit = ({
  children,
  digitkey,
}: PropsWithChildren<{ digitkey: string }>) => {
  const {
    animationDelay,
    animationDuration,
    animationDistance,
    animationDirection,
    entering,
    exiting,
    style,
  } = useDigitConfig();

  return (
    <Animated.Text
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
      style={[styles.digit, style]}
      key={digitkey}
    >
      {children}
    </Animated.Text>
  );
};

export default Digit;

const styles = StyleSheet.create({
  digit: { textAlign: 'center' },
});
