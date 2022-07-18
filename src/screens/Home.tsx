import React, {useCallback} from 'react';
import {FlatList, Text, ActivityIndicator, Pressable} from 'react-native';
import {useQuery} from 'react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Company} from '../types';
import {getCompanies} from '../services/api';
import {Watchlist} from '../features/watchlist/components/Watchlist';
import {CompanyItem} from '../components/CompanyItem';

const companyKeyExtractor = (item: Company, _: number) => String(item.id);

const renderItem = ({item}: {item: Company}) => <CompanyItem company={item} />;

export const Home = () => {
  const {bottom} = useSafeAreaInsets();
  const companies = useQuery<Company[], Error>('companies', getCompanies);

  return (
    <>
      {companies.isLoading && <ActivityIndicator size={'large'} />}

      {companies.isError && (
        <>
          <Text>{companies.error.message}</Text>
          <Pressable onPress={useCallback(() => companies.refetch(), [])}>
            <Text>Retry</Text>
          </Pressable>
        </>
      )}

      {companies.isSuccess && (
        <FlatList
          data={companies.data}
          renderItem={renderItem}
          keyExtractor={companyKeyExtractor}
          ListHeaderComponent={Watchlist}
          contentContainerStyle={{paddingBottom: bottom}}
        />
      )}
    </>
  );
};