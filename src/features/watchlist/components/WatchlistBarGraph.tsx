import React from 'react';
import {StyleProp, Text, ViewStyle} from 'react-native';
import {BellaBarChart, ChartSelectEvent} from 'react-native-bella-charts';
import {COMMON_CHART_PROPS} from '../../../constants';
import {CHART_COLORS} from '../../../theme';
import {useWatchlist} from '../context';
import {WatchlistChartEntryData} from '../../../types';

type WatchlistGraphProps = {
  style: StyleProp<ViewStyle>;
  onEntrySelect: (data: WatchlistChartEntryData | undefined) => void;
};

const DATA_CONFIG = {
  formatAsPrice: true,
  valueTextSize: 14,
  valueTextColor: CHART_COLORS.text,
};

export const WatchlistBarGraph = (props: WatchlistGraphProps) => {
  const {onEntrySelect, style} = props;

  const watchlist = useWatchlist();

  const onSelect = (e: ChartSelectEvent<WatchlistChartEntryData>) => {
    const eventData = e.nativeEvent.data;
    onEntrySelect(eventData?.data);
  };

  return (
    <>
      <Text
        style={{
          marginTop: 24,
          marginLeft: 16,
          fontSize: 16,
          fontWeight: '300',
        }}>
        Total Revenue (6 months)
      </Text>
      <BellaBarChart
        {...COMMON_CHART_PROPS}
        style={style}
        data={{
          dataSets: [
            {
              values: watchlist.chartData,
              config: DATA_CONFIG,
            },
          ],
        }}
        onSelect={onSelect}
      />
    </>
  );
};
