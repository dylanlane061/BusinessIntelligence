import React from 'react';
import {ProcessedColorValue} from 'react-native';
import {BellaLineChart, ChartSelectEvent} from 'react-native-bella-charts';

import {RevenueChartEntry, RevenueChartEntryData} from '../types';
import {COMMON_CHART_PROPS} from '../constants';
import {CHART_COLORS} from '../theme';

type RevenueLineGraphProps = {
  data: RevenueChartEntry[];
  onEntrySelect: (data: RevenueChartEntryData | undefined) => void;
  color?: ProcessedColorValue | null;
};

const DATA_CONFIG = {
  drawValues: false,
  lineWidth: 3,
  drawCircles: false,
  drawHorizontalHighlightIndicator: false,
  highlightLineWidth: 2,
  highlightColor: CHART_COLORS.highlight,
};

export const RevenueLineGraph = (props: RevenueLineGraphProps) => {
  const {data, color = CHART_COLORS.primary, onEntrySelect} = props;

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
              ...DATA_CONFIG,
              color,
            },
          },
        ],
      }}
      viewPortOffsets={{
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
      onSelect={onSelect}
    />
  );
};
