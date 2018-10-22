// import { fromJS, Map, List } from 'immutable';
import moment from 'moment';

import * as candlesticks from '../../helpers/candlesticks';
import { ACTIONS } from '../actions/Api.actions';

const initialState = {
  coinApiLimits: {
    limit: '?',
    remaining: '?',
    resetDate: '?',
  },
  periods: [
    { label: '1HRS', value: '1HRS' },
    { label: '4HRS', value: '4HRS' },
    { label: '1DAY', value: '1DAY' },
    { label: '7DAY', value: '7DAY' },
    { label: '1MTH', value: '1MTH' },
    { label: '3MTH', value: '3MTH' },
    { label: '1YRS', value: '1YRS' },
  ],
  activeAsset: null,
  activeExchange: null,
  activeMarket: null,

  chartData: [],
  isFetchingChartData: false,

  normalizedChartData: [],

  btcUsdChartData: [],
  isFetchingBtcUsdChartData: false,

  ohlcvPeriods: [],
  isFetchingAllOhclvPeriods: false,


  isFetchingAllAssets: false,
  allAssets: [],
  isFetchingAllSymbols: false,
  allSymbols: [],

};



function _addPortfolioAssets (symbolData, portfolioAssets) {
  return symbolData.map((result) => {
    const newPortfolios = [];
    portfolioAssets.forEach((asset) => {
      if (asset.symbolId === result.symbol_id) {
        newPortfolios.push({
          id: asset.portfolioId,
          name: asset.Portfolio.portfolioName,
        });
      }
    });
    result.portfolios = newPortfolios;
    return result;
  });
}


export default (state = initialState, action) => {
  const { type, payload } = action;
  let candleData;

  // console.log('apiReducer', type, payload);

  switch (type) {

    case ACTIONS.FETCH_ALL_OHCLV_PERIODS:
      return Object.assign({}, state, {
        isFetchingAllOhclvPeriods: true,
      });
    case ACTIONS.FETCH_ALL_OHCLV_PERIODS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAllOhclvPeriods: false,
        ohlcvPeriods: payload,
      });
    case ACTIONS.FETCH_ALL_OHCLV_PERIODS_FAILURE:
      return Object.assign({}, state, {
        isFetchingAllOhclvPeriods: false,
        ohlcvPeriods: [],
      });




    case ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA:
      return Object.assign({}, state, {
        isFetchingBtcUsdChartData: true,
        btcUsdChartData: [],
        normalizedChartData: [],
      });
    case ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetchingBtcUsdChartData: false,
        btcUsdChartData: payload,
        normalizedChartData: candlesticks.normalizeMarketData(payload, state.chartData),
      });


    case ACTIONS.FETCH_LATEST_CHART_DATA:
    case ACTIONS.FETCH_HISTORICAL_CHART_DATA:
      return Object.assign({}, state, {
        isFetchingChartData: true,
        activeAsset: payload.assetId,
        activeExchange: payload.exchangeId,
        activeMarket: payload.marketId,
      });
    case ACTIONS.FETCH_LATEST_CHART_DATA_SUCCESS:
    case ACTIONS.FETCH_HISTORICAL_CHART_DATA_SUCCESS:
      // candleData = payload.map(x => (_createCandle(x))).sort((a, b) => {
      //   if (a.date < b.date) return -1;
      //   if (a.date > b.date) return 1;
      //   return 0;
      // });


      // console.log(state.btcUsdChartData, payload)

      return Object.assign({}, state, {
        chartData: payload,
        isFetchingChartData: false,
        normalizedChartData: candlesticks.normalizeMarketData(state.btcUsdChartData, payload),
      });
    case ACTIONS.FETCH_LATEST_CHART_DATA_FAILURE:
    case ACTIONS.FETCH_HISTORICAL_CHART_DATA_FAILURE:
      return Object.assign({}, state, {
        chartData: [],
        isFetchingChartData: false,
        normalizedChartData: [],
      });


    case ACTIONS.FETCH_ALL_ASSETS:
      return Object.assign({}, state, {
        isFetchingAllAssets: true,
      });
    case ACTIONS.FETCH_ALL_ASSETS_FAILURE:
      return Object.assign({}, state, {
        isFetchingAllAssets: false,
      });
    case ACTIONS.FETCH_ALL_ASSETS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAllAssets: false,
        allAssets: payload,
      });

    case ACTIONS.FETCH_ALL_SYMBOLS:
      return Object.assign({}, state, {
        isFetchingAllSymbols: true,
      });
    case ACTIONS.FETCH_ALL_SYMBOLS_FAILURE:
      return Object.assign({}, state, {
        isFetchingAllSymbols: false,
      });
    case ACTIONS.FETCH_ALL_SYMBOLS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAllSymbols: false,
        allSymbols: payload,
      });


    case ACTIONS.INCLUDE_PORTFOLIO_ASSETS:
      return Object.assign({}, state, {
        isIncludingPortfolioAssets: true,
        allSymbols: _addPortfolioAssets(state.allSymbols, payload.portfolioAssets),
      });
    case ACTIONS.UPDATE_COINAPI_LIMIT_INFO:
      return Object.assign({}, state, {
        coinApiLimits: {
          limit: payload['x-ratelimit-limit'],
          remaining: parseInt(payload['x-ratelimit-remaining'], 10) - parseInt(payload['x-ratelimit-request-cost'], 10),
          resetDate: payload['x-ratelimit-reset'],
        },
      });

    default:
      return state;
  }
};

