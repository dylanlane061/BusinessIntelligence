# react-native-bella-charts

Beautiful (bella) native charts for react native

## Installation

```sh
npm install react-native-bella-charts
```

## Simple Usage

Provide a data set list with x/y values. Don't forget to give a style as a height is required for the graph to be visible.

```js
import {BellaBarChart, BellaLineChart} from 'react-native-bella-charts';

const dataSets = [
  {x: 1, y: 10},
  {x: 2, y: 40},
  {x: 3, y: 20},
];

<BellBarChart data={{dataSets}} style={{height: 150}} />;

<BellaLineChart data={{dataSets}} style={{height: 150}} />;
```

## Advanced Usage

There are many more props available to customize your graph. Checkout the [typings](https://github.com/dylanlane061/BusinessIntelligence/blob/master/react-native-bella-charts/src/types.ts) to learn more.

Heres an example to show some of what you can customize:

```js
const dataSets = [
  {x: 1, y: 10, data: { extraInfo: true }},
  {x: 2, y: 40, data: { extraInfo: false }},
  {x: 3, y: 20, data: { extraInfo: null }},
];

const onSelect = (event: ChartSelectEvent<D>) => {
    const selection = e.nativeEvent.data;
    // {x: 3, y: 20, data: { extraInfo: null }}
}

<BellaLineChart
    style={...}
    data={{
        dataSets: [{
            values: data,
            config: {
                lineWidth: 3,
                drawValues: false,
                drawCircles: false,
                highlightLineWidth: 2,
                drawHorizontalHighlightIndicator: false,
                highlightColor: 'green',
                color: 'blue',
            },
        }],
    }}
      viewPortOffsets={{left: 0, top: 0}}
      onSelect={onSelect}
      animation={{
        durationX: 500,
        durationY: 500,
    }}
    xAxis={{enabled: false}}
    yAxis={{
        left: {
            drawLabels: false,
            drawAxisLine: false,
            drawGridLines: false,
        },
        right: {enabled: false},
    }}
    chartDescription={text: 'My Cool Chart'}
    legend={enabled: false}
/>
```
