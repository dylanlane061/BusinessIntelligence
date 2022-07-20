import {requireNativeComponent, UIManager} from 'react-native';
import {LINKING_ERROR} from '../constants';
import {ChartProps, BarData} from '../types';

export type BellaBarChartProps = ChartProps<BarData>;

const ComponentName = 'BellaBarChart';

export const BellaBarChart =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BellaBarChartProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
