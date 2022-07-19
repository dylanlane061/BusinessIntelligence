import React, {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {processColor, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {calculateTrend, createRevenueChartData, getListRange} from '../utils';
import {AppTheme, useColorTheme, useStylesForAppTheme} from '../theme';
import {REVENUE_FILTER_CHIPS, DEFAULT_FILTER_CHIP} from '../constants';
import {NavParamMap, RevenueChartEntryData} from '../types';
import {WatchButton} from '../features/watchlist/components';
import {
  Avatar,
  Trend,
  Chip,
  FilterChips,
  RevenueLineGraph,
} from '../components';

export const Profile = () => {
  const route = useRoute<RouteProp<NavParamMap, 'Profile'>>();
  const {name, revenue} = route.params;

  const styles = useStylesForAppTheme(createStyles);
  const colors = useColorTheme();

  const [highlighted, setHighlighted] = useState<RevenueChartEntryData>();
  const [filter, setFilter] = useState<Chip>(DEFAULT_FILTER_CHIP);

  // For automatic session caching we'll calculate chart data with useQuery
  // staleTime as Infinity since we know this data is staic
  const {data = []} = useQuery(
    ['revenue', name, {type: 'chart'}],
    () => createRevenueChartData(revenue),
    {
      staleTime: Infinity,
      placeholderData: [],
    },
  );

  // The range visible is determined by the selected filter chip
  const visibleData = useMemo(
    () => data.slice(0, filter.value as number),
    [filter, data.length],
  );

  const [firstEntry, lastEntry] = useMemo(
    () => getListRange(visibleData),
    [visibleData],
  );

  // Overall trend for the selected range
  const rangeTrend = useMemo(() => {
    if (visibleData.length === 0) return null;

    // First & last values are guaranteed at this point
    const firstValue = firstEntry!.data!.value;
    const lastValue = lastEntry!.data!.value;

    return calculateTrend(firstValue, lastValue);
  }, [visibleData.length]);

  // Prioritize highlight, fallback to most recent entry
  const currentValue = highlighted?.valueLabel || lastEntry?.data?.valueLabel;

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.companyInfo}>
        <Avatar name={name} size={50} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.value}>{currentValue}</Text>
        <Trend
          firstValue={firstEntry?.data?.value}
          lastValue={highlighted?.value || lastEntry?.data?.value}
          timeFrame={highlighted ? undefined : `Past ${filter.value} months`}
        />
      </View>

      <RevenueLineGraph
        data={visibleData}
        onEntrySelect={setHighlighted}
        color={processColor(
          rangeTrend?.increasing ? colors.positive : colors.negative,
        )}
      />

      <FilterChips
        chips={REVENUE_FILTER_CHIPS}
        selected={filter}
        onSelect={setFilter}
        style={styles.filters}
      />

      <WatchButton company={route.params} style={styles.watchButton} />
    </SafeAreaView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    companyInfo: {
      marginVertical: theme.spacing.medium,
      marginHorizontal: theme.spacing.large,
    },
    title: {
      fontSize: 24,
      color: theme.colors.text,
      marginTop: theme.spacing.medium,
    },
    value: {
      fontSize: 32,
      color: theme.colors.text,
      marginVertical: theme.spacing.small,
      fontWeight: '300',
    },
    filters: {marginTop: theme.spacing.medium},
    watchButton: {
      marginTop: 'auto',
      marginHorizontal: theme.spacing.medium,
    },
  });
