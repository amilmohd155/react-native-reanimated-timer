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
  DEFAULT_ANIMATION_DIRECTION,
  DEFAULT_ANIMATION_DISTANCE,
  DEFAULT_ANIMATION_DURATION,
} from '../constants';

/**
 * Creates an animation that makes the element appear as if it is coming from the
 * given direction.
 *
 * The animation is a simple slide-in animation. The element is initially
 * positioned at the target position plus or minus the distance (depending on
 * the direction), and then it slides in to the target position.
 *
 * @param delay - The delay before the animation starts, in milliseconds.
 * @param duration - The duration of the animation, in milliseconds.
 * @param distance - The distance from the target position that the element
 * should start from.
 * @param direction - The direction from which the element should appear.
 * The default is 'down'.
 *
 * @returns A layout animation that can be used in the `entering` prop of a
 * `reanimated` component.
 */
const enteringAnimation =
  (
    delay: number = DEFAULT_ANIMATION_DELAY,
    duration: number = DEFAULT_ANIMATION_DURATION,
    distance: number = DEFAULT_ANIMATION_DISTANCE,
    direction: AnimationDirection = DEFAULT_ANIMATION_DIRECTION
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

/**
 * Creates a layout animation that can be used in the `exiting` prop of a
 * `reanimated` component. The animation slides the element out of view
 * by animating the `originY` style property.
 *
 * @param delay - The delay before the animation starts, in milliseconds.
 * @param duration - The duration of the animation, in milliseconds.
 * @param distance - The distance from the target position that the element
 * should end up at.
 * @param direction - The direction from which the element should disappear.
 * The default is 'down'.
 *
 * @returns A layout animation that can be used in the `exiting` prop of a
 * `reanimated` component.
 */
const exitingAnimation =
  (
    delay: number = DEFAULT_ANIMATION_DELAY,
    duration: number = DEFAULT_ANIMATION_DURATION,
    distance: number = DEFAULT_ANIMATION_DISTANCE,
    direction: AnimationDirection = DEFAULT_ANIMATION_DIRECTION
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
