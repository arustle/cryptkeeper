// import { combineReducers } from 'redux-immutable';
import { combineReducers } from 'redux';

import PortfolioAssets from './database/portfolioAssets.reducer';
import Portfolios from './database/portfolios.reducer';

export default combineReducers({
  PortfolioAssets,
  Portfolios,
});
