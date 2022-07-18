const ColorSessionCache: {[key: string]: string} = {};

// Generate random color. Including id memoization purposes. We want a companies
// color to remain consistent...but its not worth iterating over the list to add
// it...just for my asethic choices :)
export const getRandomHexColor = (id: string) => {
  if (ColorSessionCache[id]) return ColorSessionCache[id];

  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  ColorSessionCache[id] = color;
  return color;
};

// For a given hex color, generate its contrast color for text
// appearingon top of it
export const getContrastColor = (hex: string) => {
  const value = hex.replace('#', '');
  var r = parseInt(value.substring(0, 2), 16);
  var g = parseInt(value.substring(2, 4), 16);
  var b = parseInt(value.substring(4, 6), 16);

  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
};
