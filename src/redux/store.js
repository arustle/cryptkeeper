import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import Immutable from 'immutable';


import createSagaMiddleware from 'redux-saga';

// const initialState = Immutable.Map();


import sagas from './sagas';
import reducers from './reducers';


const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  // initialState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);


export default store;
