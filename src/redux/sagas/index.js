import { fork } from 'redux-saga/effects';

import componentSagas from './components';
import apiV1Saga from './ApiV1.saga';
import portfoliosSaga from './database/Portfolios.saga';
import portfolioAssetsSaga from './database/PortfolioAssets.saga';


function startSagas (...sagas) {
  return function* rootSaga () {
    yield sagas.map(saga => fork(saga));
  };
}


export default startSagas(
  ...componentSagas,
  apiV1Saga,
  portfoliosSaga,
  portfolioAssetsSaga,
);
