import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import moment from 'moment';

import * as COIN_API from '../../api/coinApi.api';
import * as BTC_USD_API from '../../api/BtcUsdTransactions.api';
import { ACTIONS } from '../actions/Api.actions';
import { ACTIONS as BTC_USD_ACTIONS } from '../actions/database/BtcUsdTransactions.actions';
import { ACTIONS as UI_ACTIONS, useLoader } from '../actions/Ui.actions';


function* fetchAllAssets (action) {
  yield useLoader(ACTIONS.FETCH_ALL_ASSETS, function* a () {
    const { payload } = action;
    const data = yield COIN_API.fetchAllAssets(ACTIONS.FETCH_ALL_ASSETS);
    yield put({
      type: data.type,
      payload: data.payload.data,
    });
    if (data.payload.response) {
      yield put({
        type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
        payload: data.payload.response.headers,
      });
    }
  });
}

function* fetchAllSymbols (action) {
  yield useLoader(ACTIONS.FETCH_ALL_SYMBOLS, function* a () {
    const { payload } = action;
    const data = yield COIN_API.fetchAllSymbols(ACTIONS.FETCH_ALL_SYMBOLS);
    // console.log('payload', data)

    yield put({
      type: data.type,
      payload: data.payload.data,
    });
    if (data.payload.response) {
      yield put({
        type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
        payload: data.payload.response.headers,
      });
    }
  });
}


function* fetchHistoricalChartData (action) {
  yield useLoader(ACTIONS.FETCH_HISTORICAL_CHART_DATA, function* a () {
    const { payload } = action;
    const data = yield COIN_API.fetchOhclvHistoricalSymbolData(ACTIONS.FETCH_HISTORICAL_CHART_DATA, payload);

    yield put({
      type: data.type,
      payload: data.payload.data,
    });
    if (data.payload.response) {
      yield put({
        type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
        payload: data.payload.response.headers,
      });
    }
  });
}
function* fetchLatestChartData (action) {
  yield useLoader(ACTIONS.FETCH_LATEST_CHART_DATA, function* a () {
    const { payload } = action;
    const data = yield COIN_API.fetchOhclvLatestSymbolData(ACTIONS.FETCH_LATEST_CHART_DATA, payload);


    yield put({
      type: data.type,
      payload: data.payload.data,
    });


    if (data.payload.response) {
      yield put({
        type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
        payload: data.payload.response.headers,
      });
    }
  });
}
function* fetchAllOhclvPeriods (action) {
  yield useLoader(ACTIONS.FETCH_ALL_OHCLV_PERIODS, function* a () {
    const { payload } = action;
    const data = yield COIN_API.fetchAllOhclvPeriods(ACTIONS.FETCH_ALL_OHCLV_PERIODS);

    yield put({
      type: data.type,
      payload: data.payload.data,
    });
    if (data.payload.response) {
      yield put({
        type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
        payload: data.payload.response.headers,
      });
    }
  });
}
function* fetchLatestBtcUsdData (action) {
  yield useLoader(ACTIONS.FETCH_SAVED_BTC_USD_DATA, function* a () {
    const { payload } = action;
    const dbData = yield BTC_USD_API.fetchAllBtcUsdTransactions(BTC_USD_ACTIONS.FETCH_SAVED_BTC_USD_DATA);

    // console.log('dbData', dbData)

    if (!dbData.payload || dbData.payload.length === 0) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'Database error',
          content: 'No BTC-USD data in database!',
        },
      });
    } else {
    // const fromDate = moment(dbData.payload.sort((a, b) => {
    //   if (a.date < b.date) return 1;
    //   if (a.date > b.date) return -1;
    //   return 0;
    // })[0].date);
      const fromDate1 = moment(dbData.payload[0].date);
      const fromDate = fromDate1.add(-fromDate1.utcOffset(), 'm');

      const toDate = moment().add(-moment().utcOffset() - 60, 'm'); // minus 60min because we don't want the current hour
      console.log(fromDate.isBefore(toDate, 'hours'), { from: fromDate.format('YYYY-MM-DD HH:mm Z'), to: toDate.format('YYYY-MM-DD HH:mm Z') });
      if (fromDate.isBefore(toDate, 'hours')) {
      // console.log({ from: fromDate.format('YYYY-MM-DD HH:mm'), to: toDate.format('YYYY-MM-DD HH:mm') });
        const coinData = yield COIN_API.fetchBtcUsdData(ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA, fromDate, toDate);

        if (coinData.payload.data && coinData.payload.data.length > 0) {
          for (let i = 0; i < coinData.payload.length; i++) {
            const tran = coinData.data.payload[i];
            yield BTC_USD_API.createBtcUsdTransaction(ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA, {
              date: tran.time_period_start,
              open: tran.price_open,
              high: tran.price_high,
              low: tran.price_low,
              close: tran.price_close,
              volume: tran.volume_traded,
              trades: tran.trades_count,
            });
          }
        }

        if (coinData.response) {
          yield put({
            type: ACTIONS.UPDATE_COINAPI_LIMIT_INFO,
            payload: coinData.response.headers,
          });
        }
      }


      const finalData = yield BTC_USD_API.fetchAllBtcUsdTransactions(ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA);

      yield put(finalData);
    }
  });
}

export default function* apiV1Saga () {
  yield takeLatest(ACTIONS.FETCH_ALL_OHCLV_PERIODS, fetchAllOhclvPeriods);
  yield takeLatest(ACTIONS.FETCH_HISTORICAL_CHART_DATA, fetchHistoricalChartData);
  yield takeLatest(ACTIONS.FETCH_LATEST_CHART_DATA, fetchLatestChartData);
  yield takeLatest(ACTIONS.FETCH_ALL_ASSETS, fetchAllAssets);
  yield takeLatest(ACTIONS.FETCH_ALL_SYMBOLS, fetchAllSymbols);
  yield takeLatest(ACTIONS.FETCH_COINAPI_BTC_USD_CHART_DATA, fetchLatestBtcUsdData);
}
