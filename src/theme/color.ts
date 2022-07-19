// Base Colors Palette
const palette = {
  black: 'black',
  white: '#ffffff',
  dim: 'rgba(255, 255, 255, 0.5)',
  offWhite: '#e6e6e6',
  lightGrey: '#939AA4',
  lighterGrey: '#CDD4DA',
  angry: '#e63946',
  deepPurple: '#5D2555',
  blue: '#457B9D',
  blueDarker: '#233e4f',
  green: '#3BC14A',
  greenDarker: '#1e6125',
  orange: '#FBA928',
  orangeDarker: '#EB9918',
};

// Common regardles of dark/light mode
const colorCommon = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',
  negative: palette.angry,
  positive: palette.green,
  primary: palette.green,
  primaryDarker: palette.orangeDarker,
};

// Colors while in light mode
export const colorLight = {
  ...colorCommon,
  background: palette.white,
  text: palette.black,
  line: palette.lightGrey,
  highlight: palette.lighterGrey,
};

// Colors while in dark mode
export const colorDark = {
  ...colorCommon,
  background: palette.black,
  text: palette.white,
  line: palette.offWhite,
  highlight: palette.dim,
};

export type ColorTheme = typeof colorLight & typeof colorDark;
