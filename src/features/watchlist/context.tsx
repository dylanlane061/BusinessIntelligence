import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Company, WatchlistChartEntry} from '~types';
import {createWatchlistChartData} from './utils';

export type WatchlistStore = {
  companies: Company[];
  chartData: WatchlistChartEntry[];
  add: (company: Company) => void;
  remove: (id: number) => void;
};

const WatchlistContext = createContext<WatchlistStore>({
  companies: [],
  chartData: [],
  add: () => null,
  remove: () => null,
});

export const WatchlistProvider = (
  props: PropsWithChildren<Record<string, never>>,
) => {
  const {children} = props;
  const [companies, setCompanies] = useState<Company[]>([]);

  const add = (company: Company) => setCompanies(prev => [...prev, company]);

  const remove = (id: number) =>
    setCompanies(prev => {
      const matchIndex = prev.findIndex(record => record.id === id);
      const next = [...prev];
      next.splice(matchIndex, 1);
      return next;
    });

  const chartData = useMemo(
    () => createWatchlistChartData(companies),
    [companies],
  );

  const value = {companies, chartData, add, remove};

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
