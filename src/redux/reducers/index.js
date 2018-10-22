// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';

import apis from './apis.reducer';
import components from './components.reducer';
import session from './session.reducer';
import ui from './ui.reducer';
import database from './database.reducer';

export default combineReducers({
  apis,
  components,
  ui,
  session,
  database,
});
