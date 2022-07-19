/**
 * @description
 * Standard price formatting
 * 12435123.43123 -> $12,435,123.43
 */
export const standardPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/**
 * @description
 * Compact price formatting
 * 12435123.43123 -> $12.4m
 */
export const compactPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});

/**
 * @description
 * Price formatters
 * Standard: 12435123.43123 -> $12,435,123.43
 * 12435123.43123 -> $12.4m
 */
export const priceFormatter = {
  standard: standardPrice.format,
  compact: compactPrice.format,
};
