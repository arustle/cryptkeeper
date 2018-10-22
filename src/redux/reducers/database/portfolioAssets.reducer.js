// import { fromJS, Map, List } from 'immutable';
import moment from 'moment';

import { ACTIONS } from '../../actions/database/PortfolioAssets.actions';

const initialState = {
  isFetchingAllPortfolioAssets: false,
  allPortfolioAssets: [],
  portfolioAssetsHashMap: {},
  portfolioAssetsBeingFetched: [],
  portfolioAssetsBeingUpdated: [],
  portfolioAssetsBeingDeleted: [],
  isCreatingPortfolioAsset: false,
};


export default (state = initialState, action) => {
  const { type, payload } = action;

  // console.log('dbPortfolioAssetsReducer', type, payload);

  switch (type) {
    case ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS:
      return Object.assign({}, state, {
        isFetchingAllPortfolioAssets: true,
      });
    case ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingAllPortfolioAssets: false,
        allPortfolioAssets: payload,
        portfolioAssetsHashMap: new Map([...new Set(payload.map(x => (x.portfolioId)))]
          .map(portfolioId => (
            [portfolioId, payload.filter(x => x.portfolioId === portfolioId)]
          ))),
      });
    case ACTIONS.FETCH_ALL_PORTFOLIO_ASSETS_FAILURE:
      return Object.assign({}, state, {
        isFetchingAllPortfolioAssets: false,
      });

    case ACTIONS.FETCH_PORTFOLIO_ASSETS:
      return Object.assign({}, state, {
        portfolioAssetsBeingFetched: state.portfolioAssetsBeingFetched.concat([payload]),
      });
    case ACTIONS.FETCH_PORTFOLIO_ASSETS_SUCCESS:
      return Object.assign({}, state, {
        allPortfolioAssets: state.allPortfolioAssets
          .filter(x => (x.portfolioId !== payload.portfolioId))
          .concat(payload),
        portfolioAssetsHashMap: (new Map(state.portfolioAssetsHashMap)).set(payload.portfolioId, payload.assets),
        portfolioAssetsBeingFetched: state.portfolioAssetsBeingFetched.filter(x => x !== payload.portfolioId),
      });
    case ACTIONS.FETCH_PORTFOLIO_ASSETS_FAILURE:
      return Object.assign({}, state, {
        portfolioAssetsBeingFetched: state.portfolioAssetsBeingFetched.filter(x => x !== payload.portfolioId),
      });

    case ACTIONS.UPDATE_PORTFOLIO_ASSET:
      return Object.assign({}, state, {
        portfolioAssetsBeingUpdated: state.portfolioAssetsBeingUpdated.concat([payload]),
      });
    case ACTIONS.UPDATE_PORTFOLIO_ASSET_FAILURE:
    case ACTIONS.UPDATE_PORTFOLIO_ASSET_SUCCESS:
      return Object.assign({}, state, {
        portfolioAssetsBeingUpdated: state.portfolioAssetsBeingUpdated.filter(x => x !== payload.portfolioId),
      });

    case ACTIONS.CREATE_PORTFOLIO_ASSET:
      return Object.assign({}, state, {
        isCreatingPortfolioAsset: true,
      });
    case ACTIONS.CREATE_PORTFOLIO_ASSET_FAILURE:
    case ACTIONS.CREATE_PORTFOLIO_ASSET_SUCCESS:
      return Object.assign({}, state, {
        isCreatingPortfolioAsset: false,
      });



    case ACTIONS.DELETE_PORTFOLIO_ASSET:
      return Object.assign({}, state, {
        portfolioAssetsBeingDeleted: state.portfolioAssetsBeingDeleted.concat([payload]),
      });
    case ACTIONS.DELETE_PORTFOLIO_ASSET_FAILURE:
    case ACTIONS.DELETE_PORTFOLIO_ASSET_SUCCESS:
      return Object.assign({}, state, {
        portfolioAssetsBeingDeleted: state.portfolioAssetsBeingDeleted.filter(x => x !== payload.portfolioId),
      });

    default:
      return state;
  }
};

