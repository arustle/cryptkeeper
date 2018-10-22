import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PortfolioAssetTable from './PortfolioAssetTable';
import * as actions from '../../../redux/actions/components/PortfolioAssetTable.actions';
// import { List, Map } from 'immutable';

function mapStateToProps (state) {
  // console.log('qqqq', state.get('components'));
  const apiState = state.apis;

  const coreState = state.components.Core;
  const databaseState = state.database;

  return {
    periods: apiState.periods,
    isFetchingAllAssets: apiState.isFetchingAllAssets,
    allAssets: apiState.allAssets,



    allPortfolios: databaseState.Portfolios.allPortfolios,
    isFetchingAllPortfolios: databaseState.Portfolios.isFetchingAllPortfolios,

    isIncludingPortfolioAssets: apiState.isIncludingPortfolioAssets,




    isFetchingAllPortfolioAssets: databaseState.PortfolioAssets.isFetchingAllPortfolioAssets,
    allPortfolioAssets: databaseState.PortfolioAssets.allPortfolioAssets,
    portfolioAssetsHashMap: databaseState.PortfolioAssets.portfolioAssetsHashMap,
    portfolioAssetsBeingFetched: databaseState.PortfolioAssets.portfolioAssetsBeingFetched,
    portfolioAssetsBeingUpdated: databaseState.PortfolioAssets.portfolioAssetsBeingUpdated,
    portfolioAssetsBeingDeleted: databaseState.PortfolioAssets.portfolioAssetsBeingDeleted,
    isCreatingPortfolioAsset: databaseState.PortfolioAssets.isCreatingPortfolioAsset,





  };
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioAssetTable);
