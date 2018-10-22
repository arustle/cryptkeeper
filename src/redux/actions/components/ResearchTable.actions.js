import ACTION_PREFIX from '../_actionPrefixes';
import * as API from '../Api.actions';
import * as PORTFOLIOS_API from '../database/Portfolios.actions';
import * as PORTFOLIO_ASSETS_API from '../database/PortfolioAssets.actions';
import * as DASHBOARD from './Core.actions';
import * as UI_ACTIONS from '../Ui.actions';


export const ACTIONS = {
};



export function fetchAllPortfolioAssets () {
  return PORTFOLIO_ASSETS_API.fetchAllPortfolioAssets();
}
export function showModal (modalOptions) {
  return UI_ACTIONS.showModal(modalOptions);
}
export function createPortfolioAsset (portfolioAsset) {
  return PORTFOLIO_ASSETS_API.createPortfolioAsset(portfolioAsset);
}
// export function fetchPortfolio (payload) {
//   return PORTFOLIOS_API.fetchPortfolio(payload);
// }
// export function includePortfolioAssets (portfolioAssets) {
//   return API.includePortfolioAssets(portfolioAssets);
// }
// export function fetchAllAssets () {
//   return API.fetchAllAssets();
// }
export function fetchAllSymbols () {
  return API.fetchAllSymbols();
}

// export function fetchChartData (exchange, asset, market) {
//   return API.fetchChartData(exchange, asset, market);
// }
export function fetchLatestChartData (payload) {
  return API.fetchLatestChartData(payload);
}
export function fetchHistoricalChartData (payload) {
  return API.fetchHistoricalChartData(payload);
}
export function changeActiveAsset (asset) {
  return DASHBOARD.changeActiveAsset(asset);
}
export function changeActiveExchange (exchange) {
  return DASHBOARD.changeActiveExchange(exchange);
}
export function changeActiveMarket (market) {
  return DASHBOARD.changeActiveMarket(market);
}
export function changeCoinigySymbol (symbol) {
  return DASHBOARD.changeCoinigySymbol(symbol);
}

