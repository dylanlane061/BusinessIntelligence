import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {calculateTrend, compactPrice} from '~utils';
import {AppTheme, useStylesForAppTheme} from '~theme';

type TrendProps = {
  firstValue?: number;
  lastValue?: number;
  timeFrame?: string;
};

/**
 * @description
 * Shows trend information from a given first & last value.
 */
export const Trend = (props: TrendProps) => {
  const {firstValue, lastValue, timeFrame} = props;

  const styles = useStylesForAppTheme(createStyles);

  const trend = useMemo(() => {
    if (!firstValue || !lastValue) {
      return null;
    }
    return calculateTrend(firstValue, lastValue);
  }, [firstValue, lastValue]);

  return trend ? (
    <View style={styles.row}>
      <Text style={styles.icon}>{trend.decreasing ? '-' : '+'}</Text>
      <Text style={styles.text}>
        <Text style={[trend.decreasing ? styles.negative : styles.positive]}>
          {compactPrice.format(Math.abs(trend.value))} ({trend.percentage}%)
        </Text>{' '}
        {!!timeFrame && <Text style={styles.timeframe}>{timeFrame}</Text>}
      </Text>
    </View>
  ) : null;
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    icon: {
      color: theme.colors.text,
    },
    text: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
    timeframe: {
      fontSize: 14,
      fontWeight: '400',
      color: theme.colors.text,
    },
    positive: {
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
  });
