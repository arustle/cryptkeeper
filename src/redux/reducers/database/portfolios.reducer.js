// import { fromJS, Map, List } from 'immutable';
import moment from 'moment';

import { ACTIONS } from '../../actions/database/Portfolios.actions';

const initialState = {
  isFetchingAllPortfolios: false,
  allPortfolios: [],
  isFetchingPortfolio1: false,
  portfolio1: null,
  isFetchingPortfolio2: false,
  portfolio2: null,
  isDeletingPortfolio: false,
  isUpdatingPortfolio: false,
  isCreatingPortfolio: false,

};


export default (state = initialState, action) => {
  const { type, payload } = action;

  // console.log('dbPortfoliosReducer', type, payload);

  switch (type) {
    case ACTIONS.FETCH_PORTFOLIO_1:
      return Object.assign({}, state, {
        isFetchingPortfolio1: true,
      });
    case ACTIONS.FETCH_PORTFOLIO_1_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPortfolio1: false,
        portfolio1: payload,
      });
    case ACTIONS.FETCH_PORTFOLIO_1_FAILURE:
      return Object.assign({}, state, {
        isFetchingPortfolio1: false,
      });

    case ACTIONS.FETCH_PORTFOLIO_2:
      return Object.assign({}, state, {
        isFetchingPortfolio2: true,
      });
    case ACTIONS.FETCH_PORTFOLIO_2_SUCCESS:
      return Object.assign({}, state, {
        isFetchingPortfolio2: false,
        portfolio2: payload,
      });
    case ACTIONS.FETCH_PORTFOLIO_2_FAILURE:
      return Object.assign({}, state, {
        isFetchingPortfolio2: false,
      });

    case ACTIONS.DELETE_PORTFOLIO:
      return Object.assign({}, state, {
        isDeletingPortfolio: true,
      });
    case ACTIONS.DELETE_PORTFOLIO_FAILURE:
    case ACTIONS.DELETE_PORTFOLIO_SUCCESS:
      return Object.assign({}, state, {
        isDeletingPortfolio: false,
      });

    case ACTIONS.UPDATE_PORTFOLIO:
      return Object.assign({}, state, {
        isUpdatingPortfolio: true,
      });
    case ACTIONS.UPDATE_PORTFOLIO_FAILURE:
    case ACTIONS.UPDATE_PORTFOLIO_SUCCESS:
      return Object.assign({}, state, {
        isUpdatingPortfolio: false,
      });
    case ACTIONS.CREATE_PORTFOLIO:
      return Object.assign({}, state, {
        isCreatingPortfolio: true,
      });
    case ACTIONS.CREATE_PORTFOLIO_FAILURE:
    case ACTIONS.CREATE_PORTFOLIO_SUCCESS:
      return Object.assign({}, state, {
        isCreatingPortfolio: false,
      });

    case ACTIONS.FETCH_ALL_PORTFOLIOS:
      return Object.assign({}, state, {
        isFetchingAllPortfolios: true,
      });
    case ACTIONS.FETCH_ALL_PORTFOLIOS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAllPortfolios: false,
        allPortfolios: payload,
      });
    case ACTIONS.FETCH_ALL_PORTFOLIOS_FAILURE:
      return Object.assign({}, state, {
        isFetchingAllPortfolios: false,
        allPortfolios: [],
      });

    default:
      return state;
  }
};

