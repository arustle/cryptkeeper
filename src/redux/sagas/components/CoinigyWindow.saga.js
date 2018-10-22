import { put, takeLatest } from 'redux-saga/effects';
import * as COIN_API from '../../../api/coinApi.api';
import { ACTIONS } from '../../actions/components/CoinigyWindow.actions';


// function* updateCoinigyUrl (action) {
//   const { payload } = action;
//   console.log('saga', action)
//   yield put({
//     type: ACTIONS.UPDATE_COINIGY_URL_SUCCESS,
//     payload,
//   });
// }

export default function* coinigyWindowSaga () {
  // yield takeLatest(ACTIONS.UPDATE_COINIGY_URL, updateCoinigyUrl);
}
