
import React from 'react';
import PropTypes from 'prop-types';

import { scaleTime } from 'd3-scale';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { CandlestickSeries, BarSeries, MACDSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateY,
  MouseCoordinateX,
} from 'react-stockcharts/lib/coordinates';

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip, MACDTooltip } from 'react-stockcharts/lib/tooltip';
import { macd } from 'react-stockcharts/lib/indicator';

import { fitWidth } from 'react-stockcharts/lib/helper';
import { InteractiveText, DrawingObjectSelector } from 'react-stockcharts/lib/interactive';
import { getMorePropsForChart } from 'react-stockcharts/lib/interactive/utils';
import { head, last, toObject } from 'react-stockcharts/lib/utils';


const candlesAppearance = {
  wickStroke: '#000000',
  fill: function fill (d) {
    return d.close > d.open ? 'rgba(196, 205, 211, 0.8)' : 'rgba(22, 22, 22, 0.8)';
  },
  stroke: '#000000',
  candleStrokeWidth: 1,
  widthRatio: 0.8,
  opacity: 1,
};

class AreaChart extends React.Component {
  render () {
    const {
      title,
      data,
      type, width, ratio,
      vsUsdTitle,
    } = this.props;
    // data.map(x => console.log(x.date.format('YYYY-MM-DD HH:MM:ss')))
    if (data.length == 0) return (<div>No data</div>);

    const minDate = data[0].date;
    const maxDate = data[data.length - 1].date;


    return (
      <div>
        <ChartCanvas
          ratio={ratio}
          width={width}
          height={800}
          margin={{
           left: 50, right: 50, top: 10, bottom: 30,
          }}
          seriesName="MSFT"
          data={data}
          type={type}
          displayXAccessor={d => d.date}
          xAccessor={d => d.date}
          xScale={scaleTime()}
          xExtents={[minDate, maxDate]}
        >
          <Chart id={1} yExtents={d => d.quote.close} height={400}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="right" orient="right" />
            <text x="-40" y="10" style={{ fontWeight: 500, fontSize: '1.75rem' }}>{title}</text>
            <CandlestickSeries yAccessor={d => (d.quote)} />

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format('.3f')}
            />
          </Chart>
          <Chart
            id={2}
            yExtents={d => d.usdNorm.close}
            height={400}
            origin={(w, h) => [0, h - 300]}
          >
            <YAxis axisAt="right" orient="right" />
            <text x="-40" y="0" style={{ fontWeight: 500, fontSize: '1.75rem' }}>{vsUsdTitle}</text>
            <CandlestickSeries yAccessor={d => (d.usdNorm)} />

            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format('.4s')}
            />
          </Chart>

          <Chart
            id={3}
            height={100}
            yExtents={[d => d.quote.volume]}
            origin={(w, h) => [0, h - 460]}
          >
            <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format('.2s')} />

            <MouseCoordinateY
              at="left"
              orient="left"
              displayFormat={format('.4s')}
            />

            <BarSeries yAccessor={d => d.quote.volume} fill={d => (d.quote.close > d.quote.open ? '#6BA583' : '#FF0000')} />
          </Chart>

        </ChartCanvas>
      </div>
    );
  }
}


AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['svg', 'hybrid']),
  title: PropTypes.string.isRequired,
  vsUsdTitle: PropTypes.string.isRequired,
};

AreaChart.defaultProps = {
  type: 'svg',
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;
