import React from 'react';
import {ProcessedColorValue, processColor} from 'react-native';
import {BellaLineChart, ChartSelectEvent} from 'react-native-bella-charts';

import {RevenueChartEntry, RevenueChartEntryData} from '../types';
import {COMMON_CHART_PROPS} from '../constants';
import {useColorTheme} from '../theme';

type RevenueLineGraphProps = {
  data: RevenueChartEntry[];
  onEntrySelect: (data: RevenueChartEntryData | undefined) => void;
  color?: ProcessedColorValue | null;
};

/**
 * @description
 * Renders line graph for given revenue data.
 */
export const RevenueLineGraph = (props: RevenueLineGraphProps) => {
  const {data, color, onEntrySelect} = props;

  const colors = useColorTheme();

  const onSelect = (e: ChartSelectEvent<RevenueChartEntryData>) => {
    const chartEventData = e.nativeEvent.data;
    onEntrySelect(chartEventData?.data);
  };

  return (
    <BellaLineChart
      {...COMMON_CHART_PROPS}
      style={{height: 200}}
      data={{
        dataSets: [
          {
            values: data,
            config: {
              lineWidth: 3,
              drawValues: false,
              drawCircles: false,
              highlightLineWidth: 2,
              drawHorizontalHighlightIndicator: false,
              highlightColor: processColor(colors.line),
              color: color || processColor(colors.primary),
            },
          },
        ],
      }}
      viewPortOffsets={{
        left: 0,
        top: 0,
      }}
      onSelect={onSelect}
    />
  );
};
