import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Core from './Core';
import * as actions from '../../redux/actions/components/Core.actions';
import { List, Map } from 'immutable';
import components from '../../redux/reducers/components.reducer';

function mapStateToProps (state) {
  // console.log('qqqq', state.get('components'));


  // const compData = state.get('components').get('Core');
  // const apiData = state.get('apis');


  const coreState = state.components.Core;
  const apiState = state.apis;
  const uiState = state.ui;
  const databaseState = state.database;

  return Object.assign({}, coreState, {
    symbolId: apiState.symbolId,
    activeAsset: apiState.activeAsset,
    activeExchange: apiState.activeExchange,
    activeMarket: apiState.activeMarket,

    allPortfolios: databaseState.Portfolios.allPortfolios,
    isFetchingAllPortfolios: databaseState.Portfolios.isFetchingAllPortfolios,
    isFetchingPortfolio1: databaseState.Portfolios.isFetchingPortfolio1,
    portfolio1: databaseState.Portfolios.portfolio1,
    isFetchingPortfolio2: databaseState.Portfolios.isFetchingPortfolio2,
    portfolio2: databaseState.Portfolios.portfolio2,
    isDeletingPortfolio: databaseState.Portfolios.isDeletingPortfolio,
    isUpdatingPortfolio: databaseState.Portfolios.isUpdatingPortfolio,
    isCreatingPortfolio: databaseState.Portfolios.isCreatingPortfolio,



    isFetchingAllPortfolioAssets: databaseState.PortfolioAssets.isFetchingAllPortfolioAssets,
    allPortfolioAssets: databaseState.PortfolioAssets.allPortfolioAssets,
    portfolioAssetsHashMap: databaseState.PortfolioAssets.portfolioAssetsHashMap,
    portfolioAssetsBeingFetched: databaseState.PortfolioAssets.portfolioAssetsBeingFetched,
    portfolioAssetsBeingUpdated: databaseState.PortfolioAssets.portfolioAssetsBeingUpdated,
    portfolioAssetsBeingDeleted: databaseState.PortfolioAssets.portfolioAssetsBeingDeleted,
    isCreatingPortfolioAsset: databaseState.PortfolioAssets.isCreatingPortfolioAsset,



    coinApiLimits: apiState.coinApiLimits,


    normalizedChartData: apiState.normalizedChartData,
    btcUsdChartData: apiState.btcUsdChartData,
    chartData: apiState.chartData,
    isFetchingChartData: apiState.isFetchingChartData,


    isModalVisible: uiState.isModalVisible,
    modalOptions: uiState.modalOptions,
    appIsLoading: (uiState.loaders.length !== 0),
  });
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Core);
