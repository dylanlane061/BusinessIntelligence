// Date Formats
export const INPUT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const OUTPUT_DATE_FORMAT = 'MMM YYYY';

// Filters
export const REVENUE_FILTER_CHIPS = [
  {id: 1, value: 4, label: '4M'},
  {id: 2, value: 5, label: '5M'},
  {id: 3, value: 6, label: '6M'},
];

export const DEFAULT_FILTER_CHIP = {id: 3, value: 6, label: '6M'};

// Chart props & configs
export const COMMON_CHART_PROPS = {
  animation: {
    durationX: 500,
    durationY: 500,
  },
  xAxis: {
    enabled: false,
  },
  yAxis: {
    left: {
      drawLabels: false,
      drawAxisLine: false,
      drawGridLines: false,
    },
    right: {
      enabled: false,
    },
  },
  chartDescription: {text: ''},
  legend: {enabled: false},
};
