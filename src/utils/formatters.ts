// Standard price formatting: 12435123.43123 -> $12,435,123.43
export const standardFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Compact price formatting: 12435123.43123 -> $12.4m
export const abbreviatedFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
});

export const priceFormatter = {
  standard: standardFormat.format,
  abbreviated: abbreviatedFormat.format,
};
