import ACTION_PREFIX from '../_actionPrefixes';
import * as API from '../Api.actions';
import * as DASHBOARD from './Core.actions';
import { put } from 'redux-saga/effects';

const PREFIX = ACTION_PREFIX.COINIGY_WINDOW;

// const { ipcRenderer } = window.require('electron');

export const ACTIONS = {
  UPDATE_COINIGY_DATA: `${PREFIX}UPDATE_COINIGY_DATA`,
};


export function updateCoinigyUrl (payload) {
  return ({
    type: ACTIONS.UPDATE_COINIGY_DATA,
    payload,
  });
}
//
// ipcRenderer.on('message', function (e, payload) {
//   console.log('action1', payload)
//   updateCoinigyUrl({
//     type: ACTIONS.UPDATE_COINIGY_DATA,
//     payload,
//   });
// });


