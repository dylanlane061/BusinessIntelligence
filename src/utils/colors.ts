const ColorSessionCache: {[key: string]: string} = {};

/**
 * @description
 * Generate random color. Including id memoization purposes. We want a companies
 * color to remain consistent...but its not worth iterating over the list to add
 * it...just for my asethic choices :)
 */
export const getRandomHexColor = (id: string) => {
  if (ColorSessionCache[id]) {
    return ColorSessionCache[id];
  }

  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  ColorSessionCache[id] = color;
  return color;
};

export const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return [r, g, b];
};

/**
 * @description
 * For a given hex color, generate its contrast color for text
 * appearing on top of it
 */
export const getContrastColor = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
};

export const shadeColor = (hex: string, percent: number) => {
  const [r, g, b] = hexToRgb(hex);
  const weight = (100 + percent) / 100;

  const weightedR = Math.min(Math.round(r * weight), 255);
  const weightedG = Math.min(Math.round(g * weight), 255);
  const weightedB = Math.min(Math.round(b * weight), 255);

  const rString = weightedR.toString(16);
  const gString = weightedG.toString(16);
  const bString = weightedB.toString(16);

  const newR = rString.length === 1 ? `0${rString}` : rString;
  const newG = gString.length === 1 ? `0${gString}` : gString;
  const newB = bString.length === 1 ? `0${bString}` : bString;

  return `#${newR}${newG}${newB}`;
};
