import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {APP_COLORS} from '../theme';
import {calculateTrend} from '../utils/transforms';
import {priceFormatter} from '../utils/formatters';

const styles = StyleSheet.create({
  trendRow: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  textPositive: {
    color: APP_COLORS.positive,
  },
  textNegative: {
    color: APP_COLORS.negative,
  },
  timeframe: {
    fontSize: 14,
    fontWeight: '400',
  },
});

type TrendProps = {
  firstValue?: number;
  lastValue?: number;
  timeFrame?: string;
};

export const Trend = (props: TrendProps) => {
  const {firstValue, lastValue, timeFrame} = props;

  const trend = useMemo(() => {
    if (!firstValue || !lastValue) return null;
    return calculateTrend(firstValue, lastValue);
  }, [firstValue, lastValue]);

  return trend ? (
    <View style={styles.trendRow}>
      <Text>{trend.decreasing ? '-' : '+'}</Text>
      <Text style={styles.text}>
        <Text
          style={trend.decreasing ? styles.textNegative : styles.textPositive}>
          {priceFormatter.abbreviated(Math.abs(trend.value))} (
          {trend.percentage}%)
        </Text>{' '}
        {!!timeFrame && <Text style={styles.timeframe}>{timeFrame}</Text>}
      </Text>
    </View>
  ) : null;
};
