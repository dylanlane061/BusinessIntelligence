import React, {PropsWithChildren, useEffect} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type PulseProps = PropsWithChildren<{
  active: boolean;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}>;

/**
 * @description
 * Pulses colored circle around children.
 */
export const Pulse = (props: PulseProps) => {
  const {active, size, color, style, children} = props;

  const animation = useSharedValue(0);

  useEffect(() => {
    if (active) {
      animation.value = withRepeat(
        withTiming(1, {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1,
        false,
      );
    } else {
      animation.value = 0;
    }
  }, [active]);

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity: opacity,
      transform: [{scale: animation.value}],
    };
  });

  return (
    <View style={[styles.container, style]}>
      {children}
      <Animated.View
        style={[
          styles.pulse,
          {
            width: size,
            borderRadius: size,
            height: size,
            backgroundColor: color,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    position: 'absolute',
  },
});
