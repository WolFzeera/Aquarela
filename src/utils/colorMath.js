export const hexToRgb = (hex) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
};

export const rgbToHex = (r, g, b) => {
  const toHex = (c) => Math.round(c).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const rgbToCmy = (r, g, b) => {
  return {
    c: 1 - r / 255,
    m: 1 - g / 255,
    y: 1 - b / 255
  };
};

export const cmyToRgb = (c, m, y) => {
  return {
    r: (1 - c) * 255,
    g: (1 - m) * 255,
    b: (1 - y) * 255
  };
};

/**
 * Mixes two hex colors using subtractive CMY blending.
 * @param {string} hex1 - Base color (e.g., catalog color)
 * @param {string} hex2 - Target color (e.g., primary mixing color)
 * @param {number} ratio - Percentage (0 to 1) of hex1. 
 */
export const blendSubtractive = (hex1, hex2, ratio = 0.5) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const cmy1 = rgbToCmy(rgb1.r, rgb1.g, rgb1.b);
  const cmy2 = rgbToCmy(rgb2.r, rgb2.g, rgb2.b);

  // Blend CMY channels
  const c = cmy1.c * ratio + cmy2.c * (1 - ratio);
  const m = cmy1.m * ratio + cmy2.m * (1 - ratio);
  const y = cmy1.y * ratio + cmy2.y * (1 - ratio);

  // Optional: add a slight darkening factor to simulate physical pigment mixing density
  const darknessFactor = 1.05; 
  const cDark = Math.min(1, c * darknessFactor);
  const mDark = Math.min(1, m * darknessFactor);
  const yDark = Math.min(1, y * darknessFactor);

  const mixedRgb = cmyToRgb(cDark, mDark, yDark);
  return rgbToHex(mixedRgb.r, mixedRgb.g, mixedRgb.b);
};
