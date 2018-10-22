import { put, takeLatest, takeEvery } from 'redux-saga/effects';

import * as PORTFOLIOS_API from '../../../api/Portfolios.api';
import { ACTIONS } from '../../actions/database/Portfolios.actions';
import { ACTIONS as PORTFOLIO_ASSETS_ACTIONS } from '../../actions/database/PortfolioAssets.actions';
import { ACTIONS as UI_ACTIONS, useLoader } from '../../actions/Ui.actions';


function* fetchAllPortfolios (action) {
  yield useLoader(ACTIONS.FETCH_ALL_PORTFOLIOS, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIOS_API.fetchAllPortfolios(ACTIONS.FETCH_ALL_PORTFOLIOS_SUCCESS);

    if (data.type !== ACTIONS.FETCH_ALL_PORTFOLIOS_SUCCESS) {
      yield put({
        type: ACTIONS.FETCH_ALL_PORTFOLIOS_FAILURE,
        payload: data.payload,
      });
    } else {
      yield put(data);
    }
  });
}
function* updatePortfolio (action) {
  yield useLoader(ACTIONS.UPDATE_PORTFOLIO, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIOS_API.updatePortfolio(ACTIONS.UPDATE_PORTFOLIO_SUCCESS, payload);

    if (data.type !== ACTIONS.UPDATE_PORTFOLIO_SUCCESS) {
      yield put({
        type: ACTIONS.UPDATE_PORTFOLIO_FAILURE,
        payload: data.payload,
      });
    } else {
      yield put(data);
      yield fetchAllPortfolios(action);
    }
  });
}
function* createPortfolio (action) {
  yield useLoader(ACTIONS.CREATE_PORTFOLIO, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIOS_API.createPortfolio(ACTIONS.CREATE_PORTFOLIO_SUCCESS, payload);

    if (data.type !== ACTIONS.CREATE_PORTFOLIO_SUCCESS) {
      yield put({
        type: ACTIONS.CREATE_PORTFOLIO_FAILURE,
        payload: data.payload,
      });
    } else {
      yield put(data);
      yield fetchAllPortfolios(action);
    }
  });
}
function* deletePortfolio (action) {
  yield useLoader(ACTIONS.DELETE_PORTFOLIO, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIOS_API.deletePortfolio(ACTIONS.DELETE_PORTFOLIO_SUCCESS, payload);

    if (data.type !== ACTIONS.DELETE_PORTFOLIO_SUCCESS) {
      yield put({
        type: ACTIONS.DELETE_PORTFOLIO_FAILURE,
        payload: data.payload,
      });
    } else {
      yield put(data);
      yield fetchAllPortfolios(action);
    }
  });
}


export default function* databaseSaga () {
  yield takeLatest(ACTIONS.FETCH_ALL_PORTFOLIOS, fetchAllPortfolios);
  yield takeLatest(ACTIONS.UPDATE_PORTFOLIO, updatePortfolio);
  yield takeLatest(ACTIONS.CREATE_PORTFOLIO, createPortfolio);
  yield takeLatest(ACTIONS.DELETE_PORTFOLIO, deletePortfolio);
}
