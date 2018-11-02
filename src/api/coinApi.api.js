import axios from 'axios';
import { onCatch } from './_settings';
import moment from 'moment/moment';
var fs = require('fs');

import * as candlesticks from '../helpers/candlesticks';
const db = window.require(`${process.cwd()}/database/models`);

// https://github.com/thebotguys/golang-bittrex-api/wiki/Bittrex-API-Reference-(Unofficial)
// https://bittrex.com/home/api

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'X-CoinAPI-Key': process.env.COIN_API_KEY,
    Accept: 'application/json',
    // 'Accept-Encoding': 'deflate, gzip',
  },
});

export const INTERVALS = {
  ONE_MINUTE: 'oneMin',
  FIVE_MINUTES: 'fiveMin',
  THIRTY_MINUTES: 'thirtyMin',
  ONE_HOUR: 'hour',
  ONE_DAY: 'day',
};
export const MARKETS = [

];


const ROOT_URL = 'https://rest.coinapi.io';

export function fetchAllExchanges (actionTypeResponse) {
  const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/allExchanges.json`, { encoding: 'utf8' }));


  return {
    type: `${actionTypeResponse}_SUCCESS`,
    payload: {
      data: results,
      response: null,
    },
  };

  const url = `${ROOT_URL}/v1/exchanges`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}

export function fetchAllAssets (actionTypeResponse) {
  const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/allAssets.json`, { encoding: 'utf8' }));



  return {
    type: `${actionTypeResponse}_SUCCESS`,
    payload: {
      data: results,
      response: null,
    },
  };

  const url = `${ROOT_URL}/v1/assets`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}
export function fetchAllSymbols (actionTypeResponse) {
  // const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/allSymbols-abridged.json`, { encoding: 'utf8' }));
  const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/allSymbolsBittrex.json`, { encoding: 'utf8' }));

  // fs.writeFile(`${process.cwd()}/src/api/coinApiData/allSymbolsBittrex.json`, JSON.stringify(results.filter((x) => {
  //   return (x.exchange_id ===  "BITTREX");
  // })), 'utf8');

  const uniqueResults = [];
  results.forEach((result, i) => {
    if (uniqueResults.filter(a => (
      a.symbol_id === result.symbol_id)).length === 0 && result.symbol_type === 'SPOT'
    ) uniqueResults.push(result);
  });

  return {
    type: `${actionTypeResponse}_SUCCESS`,
    payload: {
      data: uniqueResults,
      response: null,
    },
  };

  const url = `${ROOT_URL}/v1/symbols?filter_symbol_id=SPOT`;
  return axiosInstance.get(url)
    .then((response) => {

      const uniqueResults = [];
      response.data.forEach((result, i) => {
        if (uniqueResults.filter(a => (
            a.symbol_id === result.symbol_id)).length === 0
        ) uniqueResults.push(result);
      });

      return {
        type: `${actionTypeResponse}_SUCCESS`,
        payload: {
          data: uniqueResults,
          response,
        },
      };
    })
    .catch(onCatch);
}
export function fetchExchangeRate (actionTypeResponse, assetIdBase, assetIdQuote, time) {
  // return fs.readFileSync(`${__dirname}/coinApiData/allSymbols.json`, { encoding: 'utf8' });
  const url = `${ROOT_URL}/v1/exchangerate/{assetIdBase}/{assetIdQuote}?time={time}`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}
export function fetchAllExchangeRates (actionTypeResponse, assetIdBase) {
  // return fs.readFileSync(`${__dirname}/coinApiData/allSymbols.json`, { encoding: 'utf8' });
  const url = `${ROOT_URL}/v1/exchangerate/{assetIdBase}`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}
export function fetchAllOhclvPeriods (actionTypeResponse) {
  const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/ohlcvPeriods.json`, { encoding: 'utf8' }));

  return {
    type: `${actionTypeResponse}_SUCCESS`,
    payload: {
      data: results,
      response: null,
    },
  };


  // return fs.readFileSync(`${__dirname}/coinApiData/allSymbols.json`, { encoding: 'utf8' });
  const url = `${ROOT_URL}/v1/ohlcv/periods`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}
export function fetchOhclvLatestSymbolData (actionTypeResponse, payload) {
  // const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/sampleLatestChartData.json`, { encoding: 'utf8' }))
  //   .map(x => candlesticks.createCandleFromCoinApi(x));
  //
  //
  //
  //
  // return {
  //   type: `${actionTypeResponse}_SUCCESS`,
  //   payload: results.sort((a, b) => {
  //     if (a.date < b.date) return -1;
  //     if (a.date > b.date) return 1;
  //     return 0;
  //   }),
  // };



  const url = `${ROOT_URL}/v1/ohlcv/${payload.symbolId}/latest?period_id=${payload.periodId}&limit=${payload.limit}`;
  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data.map(x => candlesticks.createCandleFromCoinApi(x))
          .sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          }),
        response,
      },
    }))
    .catch(onCatch);
}
export function fetchOhclvHistoricalSymbolData (actionTypeResponse, payload) {
  // return fs.readFileSync(`${__dirname}/coinApiData/allSymbols.json`, { encoding: 'utf8' });
  const url = `${ROOT_URL}/v1/ohlcv/${payload.symbolId}/history?period_id=${payload.periodId}` +
    `&time_start=${payload.timeStart}` +
    `${(payload.timeEnd) ? `&time_end=${payload.timeEnd}` : ''}` +
    `${(payload.limit) ? `&limit=${payload.limit}` : ''}`;

  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);
}


export function fetchBtcUsdData (actionTypeResponse, mFromDate, mToDate) {
  // const results = JSON.parse(fs.readFileSync(`${process.cwd()}/src/api/coinApiData/btcUsdCoinbaseHistorical.json`, { encoding: 'utf8' }));
  //
  // // https://rest.coinapi.io/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=1HRS&limit=1000
  // //https://rest.coinapi.io/v1/ohlcv/COINBASE_SPOT_BTC_USD/history?period_id=1HRS&time_start=2016-01-01T00:00:00&time_end=2017-01-01T00:00:00&limit=10000
  //
  //
  // return {
  //   type: `${actionTypeResponse}_SUCCESS`,
  //   payload: results,
  // };




  const url = `${ROOT_URL}/v1/ohlcv/COINBASE_SPOT_BTC_USD/history?period_id=1HRS` +
    `&time_start=${mFromDate.format('YYYY-MM-DDTHH:mm:ss')}&time_end=${mToDate.format('YYYY-MM-DDTHH:mm:ss')}&limit=100`;

  return axiosInstance.get(url)
    .then(response => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: {
        data: response.data,
        response,
      },
    }))
    .catch(onCatch);

}






