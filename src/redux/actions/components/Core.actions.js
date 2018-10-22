import ACTION_PREFIX from '../_actionPrefixes';
import * as API from '../Api.actions';
import * as PORTFOLIOS_API from '../database/Portfolios.actions';
import * as PORTFOLIO_ASSETS_API from '../database/PortfolioAssets.actions';
import * as UI_ACTIONS from '../Ui.actions';

const PREFIX = ACTION_PREFIX.CORE;

export const ACTIONS = {
  CHANGE_ACTIVE_ASSET: `${PREFIX}CHANGE_ACTIVE_ASSET`,
  CHANGE_ACTIVE_EXCHANGE: `${PREFIX}CHANGE_ACTIVE_EXCHANGE`,
  CHANGE_ACTIVE_MARKET: `${PREFIX}CHANGE_ACTIVE_MARKET`,
  CHANGE_COINIGY_SYMBOL: `${PREFIX}CHANGE_COINIGY_SYMBOL`,

};



export function fetchLatestBtcUsdData (latestDate) {
  return API.fetchLatestBtcUsdData(latestDate);
}
export function hideModal () {
  return UI_ACTIONS.hideModal();
}
export function fetchAllPortfolioAssets () {
  return PORTFOLIO_ASSETS_API.fetchAllPortfolioAssets();
}
export function fetchPortfolioAssets (portfolioId) {
  return PORTFOLIO_ASSETS_API.fetchPortfolioAssets(portfolioId);
}
export function fetchPortfolioAsset (portfolioAssetId) {
  return PORTFOLIO_ASSETS_API.fetchPortfolioAsset(portfolioAssetId);
}
export function updatePortfolioAsset (portfolioAsset) {
  return PORTFOLIO_ASSETS_API.updatePortfolioAsset(portfolioAsset);
}
export function createPortfolioAsset (portfolioAsset) {
  return PORTFOLIO_ASSETS_API.createPortfolioAsset(portfolioAsset);
}
export function deletePortfolioAsset (portfolioAssetId) {
  return PORTFOLIO_ASSETS_API.deletePortfolioAsset(portfolioAssetId);
}



export function createPortfolio (payload) {
  return PORTFOLIOS_API.createPortfolio(payload);
}
export function updatePortfolio (payload) {
  return PORTFOLIOS_API.updatePortfolio(payload);
}
export function deletePortfolio (id) {
  return PORTFOLIOS_API.deletePortfolio(id);
}
export function fetchPortfolio1 (id) {
  return PORTFOLIOS_API.fetchPortfolio1(id);
}
export function fetchPortfolio2 (id) {
  return PORTFOLIOS_API.fetchPortfolio2(id);
}
export function fetchAllPortfolios () {
  return PORTFOLIOS_API.fetchAllPortfolios();
}
export function fetchAllOhclvPeriods () {
  return API.fetchAllOhclvPeriods();
}
export function changeActiveAsset (asset) {
  return {
    type: ACTIONS.CHANGE_ACTIVE_ASSET,
    payload: asset,
  };
}
export function changeActiveExchange (exchange) {
  return {
    type: ACTIONS.CHANGE_ACTIVE_EXCHANGE,
    payload: exchange,
  };
}
export function changeActiveMarket (market) {
  return {
    type: ACTIONS.CHANGE_ACTIVE_MARKET,
    payload: market,
  };
}
export function changeCoinigySymbol (symbol) {
  return {
    type: ACTIONS.CHANGE_COINIGY_SYMBOL,
    payload: symbol,
  };
}


