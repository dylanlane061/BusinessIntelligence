import {
  ProcessedColorValue,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

// Basic Types
export type Animation = {
  durationX?: number;
  durationY?: number;
};

export type ChartDescription = {
  text: string;
};

export type ChartEntry<D> = {
  x: number;
  y: number;
  marker?: string;
  data?: D;
};

export type ChartLegend = {
  enabled?: boolean;
};

export type ChartSelectEvent<D> = NativeSyntheticEvent<{
  data: ChartEntry<D> | undefined;
}>;

export type DataSet<C> = {
  label?: string;
  values: {
    x: number;
    y: number;
    marker?: string;
  }[];
  config?: {
    color?: ProcessedColorValue | null;
    colors?: (ProcessedColorValue | null)[];
    drawValues?: boolean;
    highlightEnabled?: boolean;
    valueTextSize?: number;
    valueTextColor?: ProcessedColorValue | null;
    highlightColor?: ProcessedColorValue | null;
    formatAsPrice?: boolean;
  } & C;
};

export type ViewPortOffsets = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
};

export type XAxis = {
  enabled?: boolean;
};

export type YAxis = {
  left?: {
    drawLabels?: boolean;
    drawAxisLine?: boolean;
    drawGridLines?: boolean;
  };
  right?: {
    enabled?: boolean;
  };
};

// Graph Data Set Types
export type LineDataSet = DataSet<{
  highlightLineWidth?: number;
  lineWidth?: number;
  drawCircles?: boolean;
  drawHorizontalHighlightIndicator?: boolean;
}>;

export type LineData = {
  dataSets: LineDataSet[];
  config?: Record<string, never>;
};

export type BarData = {
  dataSets: DataSet[];
  config?: {
    barWidth?: number;
  };
};

// Overall Props
export type ChartProps<D> = {
  animation?: Animation;
  chartBackgroundColor?: ProcessedColorValue | null;
  chartDescription: ChartDescription;
  data: D;
  legend?: ChartLegend;
  onSelect?: (event: ChartSelectEvent) => void;
  style?: StyleProp<ViewStyle>;
  viewPortOffsets?: ViewPortOffsets;
  xAxis?: XAxis;
  yAxis?: YAxis;
};
