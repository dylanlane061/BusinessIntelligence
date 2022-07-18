import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {processColor} from 'react-native';

export const APP_COLORS = {
  alert: '#e63946',
  primary: '#457B9D',
  highlight: '#3BC14A',
  text: '#2D2D2A',
  textTint: '#c0c0bf',
  positive: '#3BC14A',
  negative: '#e63946',
  //
  honeydew: '#f1faee',
  powder: '#A8DADC',
  celedon: '#457B9D',
  prussian: '#1D3557',
};

export const CHART_COLORS = {
  negative: processColor(APP_COLORS.negative),
  positive: processColor(APP_COLORS.positive),
  highlight: processColor(APP_COLORS.textTint),
  text: processColor(APP_COLORS.text),
  primary: processColor(APP_COLORS.primary),
  //
  honeydew: processColor('#f1faee'),
  powder: processColor('#A8DADC'),
  celedon: processColor('#457B9D'),
  prussian: processColor('#1D3557'),
};

export const NavLightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: APP_COLORS.prussian,
    notification: APP_COLORS.alert,
  },
};

export const NavDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: 'white',
  },
};
