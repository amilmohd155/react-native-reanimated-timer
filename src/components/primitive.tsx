import { forwardRef, type ComponentRef } from 'react';
import type { TextProps, ViewProps } from 'react-native';
import { View as RNView, Text as RNText } from 'react-native';
import Animated from 'react-native-reanimated';

export type View = ComponentRef<typeof RNView>;

export const View = forwardRef<View, ViewProps>((props, ref) => {
  const Comp = props.className ? Animated.View : RNView;
  return <Comp ref={ref} {...props} />;
});

export type Text = ComponentRef<typeof RNText>;

export const Text = forwardRef<Text, TextProps>((props, ref) => {
  const Comp = props.className ? Animated.Text : RNText;
  return <Comp ref={ref} {...props} />;
});
