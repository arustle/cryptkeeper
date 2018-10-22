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
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.COINIGY_API_KEY,
    'X-API-SECRET': process.env.COINIGY_API_SECRET,
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


const ROOT_URL = 'https://api.coinigy.com/api/';

export function fetchAllExchanges (actionTypeResponse) {
  const url = `${ROOT_URL}/v1/exchanges`;

  // {
  //   "exch_id": "15",
  //   "exch_name": "Bittrex",
  //   "exch_code": "BTRX",
  //   "exch_fee": "0.0025",
  //   "exch_trade_enabled": "1",
  //   "exch_balance_enabled": "1",
  //   "exch_url": "https://bittrex.com/"
  // },


  return axiosInstance.post(url)
    .then(({ data }) => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: data.map((d) => ({
        id: d.exch_id,
        name: d.exch_name,
        code: d.exch_code,
      })),
    }))
    .catch(onCatch);
}

export function fetchAllMarkets (actionTypeResponse, exchangeCode) {
  const url = `${ROOT_URL}/v1/markets`;

  // {
  //   "exch_id": "62",
  //   "exch_name": "Global Digital Asset Exchange",
  //   "exch_code": "GDAX",
  //   "mkt_id": "125",
  //   "mkt_name": "BTC/USD",
  //   "exchmkt_id": "7435"
  // },


  return axiosInstance.post(url, {
      exchange_code: exchangeCode,
    })
    .then(({ data }) => {
      return {
        type: `${actionTypeResponse}_SUCCESS`,
        payload: data.map((x) => ({
          symbolCode: `${x.exch_code}_${x.mkt_name.split('//').join('_')}`,
          exchangeName: x.exch_name,
          exchangeCode: x.exch_code,
          marketName: x.mkt_name,
        })),
      };
    })
    .catch(onCatch);
}

export function fetchOhclvLatestSymbolData (actionTypeResponse, exchangeCode, baseCode, quoteCode, period) {

  // exchanges/BITF/markets/BTC/USD/ohlc/1d
  const url = `${ROOT_URL}/v2/private/exchanges/${exchangeCode}/markets/${baseCode}/${quoteCode}/ohlc/${period}`;
  return axiosInstance.get(url)
    .then(({ data }) => ({
      type: `${actionTypeResponse}_SUCCESS`,
      payload: data
        .map(x => candlesticks.createCandleFromCoinApi(x))
        .sort((a, b) => {
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        }),
    }))
    .catch(onCatch);
}





