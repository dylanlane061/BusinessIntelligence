import React from 'react';
import {
  processColor,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {BellaBarChart, ChartSelectEvent} from 'react-native-bella-charts';

import {useWatchlist} from '../context';
import {COMMON_CHART_PROPS} from '~constants';
import {WatchlistChartEntryData} from '~types';
import {AppTheme, useColorTheme, useStylesForAppTheme} from '~theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    title: {
      marginTop: theme.spacing.large,
      marginBottom: theme.spacing.medium,
      marginLeft: theme.spacing.medium,
      fontSize: 16,
      fontWeight: '300',
    },
  });

type WatchlistGraphProps = {
  style: StyleProp<ViewStyle>;
  onEntrySelect: (data: WatchlistChartEntryData | undefined) => void;
};

const DATA_CONFIG = {
  formatAsPrice: true,
  valueTextSize: 14,
};

export const WatchlistBarGraph = (props: WatchlistGraphProps) => {
  const {onEntrySelect, style} = props;

  const watchlist = useWatchlist();
  const colors = useColorTheme();
  const styles = useStylesForAppTheme(createStyles);

  const onSelect = (e: ChartSelectEvent<WatchlistChartEntryData>) => {
    const eventData = e.nativeEvent.data;
    onEntrySelect(eventData?.data);
  };

  return (
    <>
      <Text style={styles.title}>Total Revenue (6 months)</Text>
      <BellaBarChart
        {...COMMON_CHART_PROPS}
        style={style}
        data={{
          dataSets: [
            {
              values: watchlist.chartData,
              config: {
                ...DATA_CONFIG,
                valueTextColor: processColor(colors.text),
              },
            },
          ],
          config: {
            barWidth: watchlist.chartData.length < 4 ? 0.5 : undefined,
          },
        }}
        onSelect={onSelect}
      />
    </>
  );
};
