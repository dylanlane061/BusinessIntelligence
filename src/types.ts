import {ChartEntry} from 'react-native-bella-charts';

// Raw Data
export type Location = {
  address: string;
  city: string;
  country: string;
};

export type RevenueRecord = {
  seq: number;
  date: string;
  value: number;
};

export type Company = {
  id: number;
  name: string;
  location: Location;
  revenue: RevenueRecord[];
};

// Chart Data
export type RevenueChartEntryData = RevenueRecord & {
  dateLabel: string;
  valueLabel: string;
};

export type RevenueChartEntry = ChartEntry<RevenueChartEntryData>;

export type WatchlistChartEntryData = {
  id: number;
  name: string;
  total: string;
};

export type WatchlistChartEntry = ChartEntry<WatchlistChartEntryData>;

// Navigation
export type NavParamMap = {Home: undefined; Profile: Company};
