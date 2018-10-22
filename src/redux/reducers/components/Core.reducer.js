import { fromJS, Map, List } from 'immutable';
import { ACTIONS } from '../../actions/components/Core.actions';

const initialState = {

};

export default (state = initialState, action) => {
  const { type, payload } = action;
  let temp;
  let tempB;

  switch (type) {


    // case ACTIONS.CHANGE_ACTIVE_ASSET:
    //   return Object.assign({}, state, {
    //     activeAsset: payload,
    //   });
    // case ACTIONS.CHANGE_ACTIVE_EXCHANGE:
    //   return Object.assign({}, state, {
    //     activeExchange: payload,
    //   });
    // case ACTIONS.CHANGE_ACTIVE_MARKET:
    //   return Object.assign({}, state, {
    //     activeMarket: payload,
    //   });
    case ACTIONS.CHANGE_COINIGY_SYMBOL:
      return Object.assign({}, state, {
        activeCoinigySymbol: payload,
      });


    default:
      return state;
  }
}
