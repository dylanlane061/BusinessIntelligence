import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {colorLight, colorDark} from './color';

// --- Themes for react-navigation --- //
export const NavLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colorLight.primary,
    background: colorLight.background,
    border: colorLight.line,
    notification: colorLight.negative,
  },
};

export const NavDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colorDark.primary,
    background: colorDark.background,
    border: colorDark.line,
    notification: colorDark.negative,
  },
};
