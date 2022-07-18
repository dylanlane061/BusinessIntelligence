import dayjs from 'dayjs';
import {Company, WatchlistChartEntry, RevenueRecord} from '../../types';
import {priceFormatter} from '../../utils/formatters';
import {INPUT_DATE_FORMAT, OUTPUT_DATE_FORMAT} from '../../constants';

const sumRecordValue = (total: number, record: RevenueRecord) =>
  total + record.value;

export const createWatchlistChartEntry = (
  record: Company,
  index: number,
): WatchlistChartEntry => {
  const total = record.revenue.reduce(sumRecordValue, 0);

  return {
    x: index,
    y: total,
    data: {
      id: record.id,
      name: record.name,
      total: priceFormatter.standard(total),
    },
  };
};

export const createWatchlistChartData = (
  revenue: Company[],
): WatchlistChartEntry[] => revenue.map(createWatchlistChartEntry);
