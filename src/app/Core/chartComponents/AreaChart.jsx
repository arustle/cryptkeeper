
import React from 'react';
import PropTypes from 'prop-types';

import { scaleTime } from 'd3-scale';

import { ChartCanvas, Chart } from 'react-stockcharts';
import { AreaSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { fitWidth } from 'react-stockcharts/lib/helper';

class AreaChart extends React.Component {
  render () {
    const {
      title,
      data, type, width, ratio,
    } = this.props;
    // console.log('areaChart', data)
    if (data.length == 0) return (<div>No data</div>)
    return (
      <div>
        <h3>{title}</h3>
      <ChartCanvas
        ratio={ratio}
        width={width}
        height={400}
        margin={{
         left: 50, right: 50, top: 10, bottom: 30,
        }}
        seriesName="MSFT"
        data={data}
        type={type}
        xAccessor={d => d.date}
        xScale={scaleTime()}
        xExtents={[new Date(2011, 0, 1), new Date(2018, 0, 2)]}
      >
        <Chart id={0} yExtents={d => d.close}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" />
          <AreaSeries yAccessor={d => d.close} />
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
  type: PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

AreaChart.defaultProps = {
  type: 'svg',
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;