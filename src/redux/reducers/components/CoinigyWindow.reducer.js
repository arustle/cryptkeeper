import { fromJS, Map, List } from 'immutable';
import { ACTIONS } from '../../actions/components/CoinigyWindow.actions';
const { ipcRenderer } = window.require('electron');

const initialState = {
  coinigyData: null,
};

//
//
// ipcRenderer.on('message', function (e, payload) {
//   console.log('action1', payload)
//   updateCoinigyUrl({
//     type: ACTIONS.UPDATE_COINIGY_URL,
//     payload,
//   });
// });




export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.UPDATE_COINIGY_DATA:
      return Object.assign({}, state, {
        coinigyData: payload,
      });


    default:
      return state;
  }
}
