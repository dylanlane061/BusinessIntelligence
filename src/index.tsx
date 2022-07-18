import * as React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {WatchlistProvider} from './features/watchlist/context';
import {RootNavigator} from './navigators/root';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WatchlistProvider>
        <RootNavigator />
      </WatchlistProvider>
    </QueryClientProvider>
  );
};
