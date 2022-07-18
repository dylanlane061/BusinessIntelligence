import React, {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NavParamMap, RevenueChartEntryData} from '../types';
import {REVENUE_FILTER_CHIPS, DEFAULT_FILTER_CHIP} from '../constants';
import {CHART_COLORS} from '../theme';
import {
  calculateTrend,
  createRevenueChartData,
  getListRange,
} from '../utils/transforms';
import {Avatar} from '../components/Avatar';
import {Chip, FilterChips} from '../components/FilterChips';
import {WatchButton} from '../features/watchlist/components/WatchButton';
import {RevenueLineGraph} from '../components/RevenueLineGraph';
import {Trend} from '../components/Trend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  companyInfo: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 32,
    marginTop: 4,
    marginBottom: 8,
  },
  filters: {marginTop: 16},
  watchButton: {
    marginHorizontal: 16,
    marginTop: 'auto',
  },
});

export const Profile = () => {
  const route = useRoute<RouteProp<NavParamMap, 'Profile'>>();
  const {name, revenue} = route.params;

  const [highlighted, setHighlighted] = useState<RevenueChartEntryData>();
  const [selectedChip, setSelectedChip] = useState<Chip>(DEFAULT_FILTER_CHIP);

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
    () => data.slice(0, selectedChip.value as number),
    [selectedChip, data.length],
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
        <Text style={styles.title}>{currentValue}</Text>
        <Trend
          firstValue={firstEntry?.data?.value}
          lastValue={highlighted?.value || lastEntry?.data?.value}
          timeFrame={
            highlighted ? undefined : `Past ${selectedChip.value} months`
          }
        />
      </View>

      <RevenueLineGraph
        data={visibleData}
        onEntrySelect={setHighlighted}
        color={
          rangeTrend?.increasing ? CHART_COLORS.positive : CHART_COLORS.negative
        }
      />

      <FilterChips
        chips={REVENUE_FILTER_CHIPS}
        selected={selectedChip}
        onSelect={setSelectedChip}
        style={styles.filters}
      />

      <WatchButton company={route.params} style={styles.watchButton} />
    </SafeAreaView>
  );
};
