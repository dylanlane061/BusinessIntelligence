import {useEffect, useState} from 'react';
import {Appearance, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {spacing, SpacingTheme} from './spacing';
import {colorDark, colorLight, ColorTheme} from './color';

/**
 * @description
 * Returns current appearance preferences
 */
export const useAppearance = () => {
  const [preferences, setPreferences] =
    useState<Appearance.AppearancePreferences>({
      colorScheme: Appearance.getColorScheme(),
    });

  useEffect(() => {
    const sub = Appearance.addChangeListener(setPreferences);
    return () => sub.remove();
  }, []);

  return preferences;
};

/**
 * @description
 * Returns color scheme for current appearance preferences
 */
export const useColorScheme = () => {
  const appearance = useAppearance();
  return appearance.colorScheme;
};

/**
 * @description
 * Selects value based on the current color scheme
 */
export const useColorSchemeSelect = <T = any>(config: {dark: T; light: T}) => {
  const colorScheme = useColorScheme();
  const key = colorScheme || 'light';
  return config[key];
};

/**
 * @description
 * Returns the color theme for the current color scheme
 */
export const useColorTheme = () => {
  const theme = useColorSchemeSelect<ColorTheme>({
    dark: colorDark,
    light: colorLight,
  });
  return theme;
};

export type AppTheme = {
  colors: ColorTheme;
  spacing: SpacingTheme;
};

/**
 * @description
 * Returns current app theme, changes with dark/light mode
 */
export const useAppTheme = () => {
  const colors = useColorTheme();

  return {
    colors,
    spacing,
  } as AppTheme;
};

/**
 * @description
 * Creates styles for the current app theme
 */
export const useStylesForAppTheme = (
  createStyles: (theme: AppTheme) => {
    [key: string]: ViewStyle | TextStyle | ImageStyle;
  },
) => {
  const appTheme = useAppTheme();
  return createStyles(appTheme);
};
