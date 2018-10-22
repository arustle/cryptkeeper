// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';

import Core from './components/Core.reducer';
import CoinigyWindow from './components/CoinigyWindow.reducer';

export default combineReducers({
  Core,
  CoinigyWindow,
});
