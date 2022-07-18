import dayjs from 'dayjs';
import {RevenueChartEntry, RevenueRecord} from '../types';
import {priceFormatter} from './formatters';
import {INPUT_DATE_FORMAT, OUTPUT_DATE_FORMAT} from '../constants';

// Revenue Transform
export const sortByRecordDate = (
  recordA: RevenueRecord,
  recordB: RevenueRecord,
) => {
  const dateA = dayjs(recordA.date, INPUT_DATE_FORMAT);
  const dateB = dayjs(recordB.date, INPUT_DATE_FORMAT);
  return dateA.isBefore(dateB) ? -1 : 1;
};

export const createRevenueChartEntry = (
  record: RevenueRecord,
  index: number,
): RevenueChartEntry => {
  console.log('calculating createRevenueChartEntry');
  const date = dayjs(record.date, INPUT_DATE_FORMAT);
  return {
    x: index + 1,
    y: record.value,
    marker: date.format(OUTPUT_DATE_FORMAT),
    data: {
      ...record,
      dateLabel: date.format(OUTPUT_DATE_FORMAT),
      valueLabel: priceFormatter.standard(record.value),
    },
  };
};

export const createRevenueChartData = async (revenue: RevenueRecord[]) =>
  revenue
    .sort(sortByRecordDate)
    .map(createRevenueChartEntry) as RevenueChartEntry[];

// Generic Utils
export const calculateTrend = (firstValue: number, lastValue: number) => {
  const diff = lastValue - firstValue;

  return {
    value: diff,
    increasing: diff > 0,
    decreasing: diff < 0,
    percentage: ((100 * diff) / ((firstValue + lastValue) / 2)).toFixed(2),
  };
};

export const getListRange = <T>(list: T[]) => {
  if (!list.length) return [undefined, undefined];

  return [list[0], list[list.length - 1]];
};
