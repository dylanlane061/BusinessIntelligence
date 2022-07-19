import React, {ReactElement, cloneElement} from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextProps,
  ViewStyle,
} from 'react-native';
import {getContrastColor, shadeColor} from '~utils';

type ButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  children: ReactElement<TextProps>;
};

export const Button = (props: ButtonProps) => {
  const {children, onPress, style = {}} = props;

  const bgColor =
    (StyleSheet.flatten(style).backgroundColor as string) || '#ffffff';

  return (
    <Pressable
      style={({pressed}) => [
        styles.base,
        style,
        {backgroundColor: bgColor},
        pressed && {backgroundColor: shadeColor(bgColor, -15)},
      ]}
      onPress={onPress}>
      {React.Children.only(
        cloneElement(children, {
          style: [
            styles.text,
            children.props.style,
            {color: getContrastColor(bgColor)},
          ],
        }),
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
