import React, {PropsWithChildren, useEffect} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {APP_COLORS} from '../../../theme';
import {useWatchlist} from '../context';
import {Company} from '../../../types';

const styles = StyleSheet.create({});

type WatchIndicatorProps = {
  company: Company;
  style?: StyleProp<ViewStyle>;
};

type PulseProps = PropsWithChildren<{
  active: boolean;
  size: number;
  color: string;
  style?: StyleProp<ViewStyle>;
}>;

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
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      {children}
      <Animated.View
        style={[
          {
            width: size,
            borderRadius: size,
            height: size,
            position: 'absolute',
            backgroundColor: color,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export const WatchIndicator = (props: WatchIndicatorProps) => {
  const {company, style} = props;

  const watchlist = useWatchlist();
  const watching = !!watchlist.companies.find(
    record => record.id === company.id,
  );

  return watching ? (
    <Pulse
      active={watching}
      size={75}
      color={APP_COLORS.highlight}
      style={style}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>W</Text>
    </Pulse>
  ) : null;
};
