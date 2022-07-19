import dayjs from 'dayjs';
import {RevenueChartEntry, RevenueRecord} from '~types';
import {INPUT_DATE_FORMAT, OUTPUT_DATE_FORMAT} from '~constants';
import {standardPrice} from './formatters';

// Revenue Transform
/**
 * @description
 * Sorting function for ordering revenue records
 * by date using dayjs
 */
export const sortByRecordDate = (
  recordA: RevenueRecord,
  recordB: RevenueRecord,
) => {
  const dateA = dayjs(recordA.date, INPUT_DATE_FORMAT);
  const dateB = dayjs(recordB.date, INPUT_DATE_FORMAT);
  return dateA.isBefore(dateB) ? -1 : 1;
};

/**
 * @description
 * Creates chart entry from given revenue record. This
 * is the format required for the line graph
 */
export const createRevenueChartEntry = (
  record: RevenueRecord,
  index: number,
): RevenueChartEntry => {
  const date = dayjs(record.date, INPUT_DATE_FORMAT);

  return {
    x: index + 1,
    y: record.value,
    marker: date.format(OUTPUT_DATE_FORMAT),
    data: {
      ...record,
      dateLabel: date.format(OUTPUT_DATE_FORMAT),
      valueLabel: standardPrice.format(record.value),
    },
  };
};

/**
 * @description
 * Sorts & transforms raw revenue records in data ready to be
 * used with the RevenueLineGraph
 */
export const createRevenueChartData = (
  revenue: RevenueRecord[],
): RevenueChartEntry[] =>
  revenue.sort(sortByRecordDate).map(createRevenueChartEntry);

// Generic Utils
/**
 * @description
 * Calculates trend information for a given first and last value
 */
export const calculateTrend = (firstValue = 0, lastValue = 0) => {
  const diff = lastValue - firstValue;

  return {
    value: diff,
    increasing: diff > 0,
    decreasing: diff < 0,
    percentage: !diff
      ? 0
      : ((100 * diff) / ((firstValue + lastValue) / 2)).toFixed(2),
  };
};

/**
 * @description
 * For a given list, returns the first and last items
 */
export const getListRange = <T>(list: T[]) => {
  if (!list.length) {
    return [undefined, undefined];
  }

  return [list[0], list[list.length - 1]];
};
