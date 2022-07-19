import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {getContrastColor, getRandomHexColor} from '~utils';

type AvatarProps = {
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * @descripion
 * Renders a circle with randomly generated background color
 * and the given names first letter.
 */
export const Avatar = (props: AvatarProps) => {
  const {name, size = 30} = props;

  const text = name.substring(0, 1).toUpperCase();
  const bgColor = getRandomHexColor(name);
  const textColor = getContrastColor(bgColor);

  return (
    <View
      style={[
        styles.container,
        {
          height: size,
          width: size,
          borderRadius: size,
          backgroundColor: bgColor,
        },
      ]}>
      <Text style={[styles.text, {color: textColor, fontSize: size / 2}]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
