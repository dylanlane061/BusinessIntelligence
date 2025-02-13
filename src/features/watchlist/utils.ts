import {Company, WatchlistChartEntry, RevenueRecord} from '~types';
import {standardPrice} from '~utils';

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
      total: standardPrice.format(total),
    },
  };
};

export const createWatchlistChartData = (
  revenue: Company[],
): WatchlistChartEntry[] => revenue.map(createWatchlistChartEntry);
