import {
  withDelay,
  withTiming,
  type EntryAnimationsValues,
  type ExitAnimationsValues,
  type LayoutAnimation,
  type StyleProps,
} from 'react-native-reanimated';
import type { AnimationDirection } from '../types';
import {
  DEFAULT_ANIMATION_DELAY,
  DEFAULT_ANIMATION_DISTANCE,
  DEFAULT_ANIMATION_DURATION,
} from '../constants';

const enteringAnimation =
  (
    delay: number = DEFAULT_ANIMATION_DELAY,
    duration: number = DEFAULT_ANIMATION_DURATION,
    distance: number = DEFAULT_ANIMATION_DISTANCE,
    direction: AnimationDirection = 'down'
  ) =>
  (values: EntryAnimationsValues): LayoutAnimation => {
    'worklet';
    const animations: StyleProps = {
      originY: withDelay(
        delay,
        withTiming(values.targetOriginY, {
          duration,
        })
      ),
    };

    const enterDirection = direction === 'down' ? -1 : 1;

    const initialValues: StyleProps = {
      originY: values.targetOriginY + distance * enterDirection,
    };

    return {
      initialValues,
      animations,
    };
  };

const exitingAnimation =
  (
    delay: number = DEFAULT_ANIMATION_DELAY,
    duration: number = DEFAULT_ANIMATION_DURATION,
    distance: number = DEFAULT_ANIMATION_DISTANCE,
    direction: AnimationDirection = 'down'
  ) =>
  (values: ExitAnimationsValues): LayoutAnimation => {
    'worklet';

    const exitDirection = direction === 'down' ? 1 : -1;

    const animations: StyleProps = {
      originY: withDelay(
        delay,
        withTiming(values.currentOriginY + distance * exitDirection, {
          duration,
        })
      ),
    };

    const initialValues: StyleProps = {
      originY: values.currentOriginY,
    };

    return {
      initialValues,
      animations,
    };
  };

export { enteringAnimation, exitingAnimation };
