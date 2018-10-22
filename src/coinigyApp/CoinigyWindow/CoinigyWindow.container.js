import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CoinigyWindow from './CoinigyWindow';
import * as actions from '../../redux/actions/components/CoinigyWindow.actions';
// import { List, Map } from 'immutable';






function mapStateToProps (state) {
  // console.log('qqqq', state.get('components'));
  const apiState = state.apis;
  const coinigyState = state.components.CoinigyWindow;

  const coreState = state.components.Core;

  return {
    // activeAsset: coreState.activeAsset,
    // activeExchange: coreState.activeExchange,
    // activeMarket: coreState.activeMarket,
    // // isUpdatingCoinigyUrl: coinigyState.isUpdatingCoinigyUrl,
    // coinigyData: coinigyState.coinigyData,
  };
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinigyWindow);
