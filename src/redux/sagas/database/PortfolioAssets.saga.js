import { put, takeLatest, takeEvery } from 'redux-saga/effects';

import * as PORTFOLIO_ASSETS_API from '../../../api/PortfolioAssets.api';
import { ACTIONS } from '../../actions/database/PortfolioAssets.actions';
import { ACTIONS as API_ACTIONS } from '../../actions/Api.actions';
import { ACTIONS as UI_ACTIONS, useLoader } from '../../actions/Ui.actions';


function* fetchAllPortfolioAssets () {
  yield useLoader(ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS, function* a () {
    const data = yield PORTFOLIO_ASSETS_API.fetchAllPortfolioAssets(ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS);
    yield put(data);
    if (data.type === ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    } else {
      yield put({
        type: API_ACTIONS.INCLUDE_PORTFOLIO_ASSETS,
        payload: {
          portfolioAssets: data.payload,
        },
      });
    }
  });
}

function* fetchPortfolioAssets (action) {
  yield useLoader(ACTIONS.FETCH_PORTFOLIO_ASSETS, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIO_ASSETS_API.fetchPortfolioAssets(ACTIONS.FETCH_PORTFOLIO_ASSETS, payload.portfolioId);
    yield put({
      type: data.type,
      payload: {
        portfolioId: payload.portfolioId,
        assets: data.payload,
      },
    });
    if (data.type === ACTIONS.FETCH_PORTFOLIO_ASSETS_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    } else {
      yield put({
        type: API_ACTIONS.INCLUDE_PORTFOLIO_ASSETS,
        payload: {
          portfolioAssets: data.payload,
        },
      });
    }
  });
}

function* fetchPortfolioAsset (action) {
  yield useLoader(ACTIONS.FETCH_PORTFOLIO_ASSET, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIO_ASSETS_API.fetchPortfolioAsset(ACTIONS.FETCH_PORTFOLIO_ASSET, payload.portfolioAssetId);
    yield put(data);
    if (data.type === ACTIONS.FETCH_PORTFOLIO_ASSET_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    }
  });
}

function* updatePortfolioAsset (action) {
  yield useLoader(ACTIONS.UPDATE_PORTFOLIO_ASSET, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIO_ASSETS_API.updatePortfolioAsset(ACTIONS.UPDATE_PORTFOLIO_ASSET, payload.portfolioAsset);
    yield put(data);
    if (data.type === ACTIONS.UPDATE_PORTFOLIO_ASSET_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    }
  });
}
function* createPortfolioAsset (action) {
  yield useLoader(ACTIONS.CREATE_PORTFOLIO_ASSET, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIO_ASSETS_API.createPortfolioAsset(ACTIONS.CREATE_PORTFOLIO_ASSET, payload.portfolioAsset);
    yield put(data);
    if (data.type === ACTIONS.CREATE_PORTFOLIO_ASSET_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    } else {
      yield fetchAllPortfolioAssets();
    }
  });
}
function* deletePortfolioAsset (action) {
  yield useLoader(ACTIONS.DELETE_PORTFOLIO_ASSET, function* a () {
    const { payload } = action;
    const data = yield PORTFOLIO_ASSETS_API.deletePortfolioAsset(ACTIONS.DELETE_PORTFOLIO_ASSET, payload.portfolioAsset.id);
    yield put(data);
    if (data.type === ACTIONS.DELETE_PORTFOLIO_ASSET_FAILURE) {
      yield put({
        type: UI_ACTIONS.SHOW_MODAL,
        payload: {
          title: 'ERROR',
          content: data.payload,
        },
      });
    } else {
      yield fetchPortfolioAssets({
        type: ACTIONS.FETCH_PORTFOLIO_ASSETS,
        payload: {
          portfolioId: payload.portfolioAsset.portfolioId,
        },
      });
    }
  });
}

export default function* databaseSaga () {
  yield takeLatest(ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS, fetchAllPortfolioAssets);
  yield takeLatest(ACTIONS.FETCH_PORTFOLIO_ASSETS, fetchPortfolioAssets);
  yield takeLatest(ACTIONS.FETCH_PORTFOLIO_ASSET, fetchPortfolioAsset);
  yield takeLatest(ACTIONS.UPDATE_PORTFOLIO_ASSET, updatePortfolioAsset);
  yield takeLatest(ACTIONS.CREATE_PORTFOLIO_ASSET, createPortfolioAsset);
  yield takeLatest(ACTIONS.DELETE_PORTFOLIO_ASSET, deletePortfolioAsset);
}
