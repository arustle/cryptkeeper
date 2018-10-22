import ACTION_PREFIX from './_actionPrefixes';
import * as COIN_API from '../../api/coinApi.api';
import { put } from 'redux-saga/effects';

const PREFIX = ACTION_PREFIX.SESSION;

export const ACTIONS = {
  SHOW_MODAL: `${PREFIX}SHOW_MODAL`,
  HIDE_MODAL: `${PREFIX}HIDE_MODAL`,

  INCREMENT_LOADER: `${ACTION_PREFIX.CORE}INCREMENT_LOADER`,
  DECREMENT_LOADER: `${ACTION_PREFIX.CORE}DECREMENT_LOADER`,
};

export function* useLoader (actionType, callback) {
  yield put({ type: ACTIONS.INCREMENT_LOADER, payload: actionType });
  yield callback();
  yield put({ type: ACTIONS.DECREMENT_LOADER, payload: actionType });
}


export function hideModal () {
  return {
    type: ACTIONS.HIDE_MODAL,
    payload: null,
  };
}
export function showModal (modalOptions) {
  return {
    type: ACTIONS.SHOW_MODAL,
    payload: modalOptions,
  };
}



