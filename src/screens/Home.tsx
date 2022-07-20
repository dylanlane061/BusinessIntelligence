import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Company} from '~types';
import {useAppTheme} from '~theme';
import {getCompanies} from '~services/api';
import {Watchlist} from '~features/watchlist';
import {CompanyItem, ErrorBlock} from '~components';

const companyKeyExtractor = (item: Company, _: number) => String(item.id);

const renderItem = ({item}: {item: Company}) => <CompanyItem company={item} />;

export const Home = () => {
  const {bottom} = useSafeAreaInsets();
  const {spacing} = useAppTheme();

  // Benefit from session caching and simple status booleans with useQuery here
  const companies = useQuery<Company[], Error>('companies', getCompanies, {
    retry: false,
  });

  const refetch = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    companies.refetch({throwOnError: false});
  };

  return (
    <>
      <FlatList
        refreshing={companies.isRefetching}
        onRefresh={refetch}
        data={companies.data}
        renderItem={renderItem}
        keyExtractor={companyKeyExtractor}
        ListHeaderComponent={Watchlist}
        stickyHeaderIndices={[0]}
        windowSize={11}
        ListEmptyComponent={
          <>
            {companies.isLoading && <ActivityIndicator size={'large'} />}

            {companies.isError && (
              <ErrorBlock message={companies.error.message} onRetry={refetch} />
            )}
          </>
        }
        contentContainerStyle={{
          paddingTop: spacing.medium,
          paddingBottom: bottom,
        }}
      />
    </>
  );
};
