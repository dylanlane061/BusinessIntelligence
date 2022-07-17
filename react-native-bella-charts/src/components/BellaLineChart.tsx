import {requireNativeComponent, UIManager, Platform} from 'react-native';
import {LINKING_ERROR} from '../constants';
import {ChartProps, LineData} from '../types';

export type BellaLineChartProps = ChartProps<LineData>;

const ComponentName = 'BellaLineChart';

export const BellaLineChart =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BellaLineChartProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
