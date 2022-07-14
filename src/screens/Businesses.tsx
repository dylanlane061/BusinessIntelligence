import React, {useCallback} from 'react';
import {
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from 'react-query';

import {getCompanies} from '../service';
import {CompanyItem} from '../components/CompanyItem';
import {Company} from '../types';

const companyKeyExtractor = (item: Company, _: number) => String(item.id);

const renderCompanyItem = ({item}: {item: Company}) => (
  <CompanyItem {...item} />
);

export const Businesses = () => {
  const companies = useQuery<Company[], Error>('companies', getCompanies);

  return (
    <>
      {companies.isLoading && <ActivityIndicator size={'large'} />}

      {companies.isError && (
        <>
          <Text>{companies.error.message}</Text>
          <TouchableOpacity
            onPress={useCallback(() => companies.refetch(), [])}>
            <Text>Retry</Text>
          </TouchableOpacity>
        </>
      )}

      {companies.isSuccess && (
        <FlatList
          data={companies.data}
          keyExtractor={companyKeyExtractor}
          renderItem={renderCompanyItem}
        />
      )}
    </>
  );
};
