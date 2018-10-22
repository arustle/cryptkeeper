// const { remote } = window.require('electron');

// const db = window.require('../../database/models');
import { takeLatest } from 'redux-saga/effects';
import { ACTIONS as UI_ACTIONS } from '../redux/actions/Ui.actions';

const db = window.require(`${process.cwd()}/database/models`);
// const TradeSetup = require('../../app/models/TradeSetup');
// const Portfolios = require('../../database/models/portfolios')(db.sequelize, db.sequelize.DataTypes);
// var main = remote.require('./main');


function _createPortfolioAsset (actionType, portfolioAsset) {
  return db.PortfolioAssets
    .create({
      symbolId: portfolioAsset.symbolId,
      exchangeId: portfolioAsset.exchangeId,
      assetId: portfolioAsset.assetId,
      marketId: portfolioAsset.marketId,
      portfolioId: portfolioAsset.portfolioId,
      notes: portfolioAsset.notes,
      user: portfolioAsset.user,
      date: portfolioAsset.date,
    })
    .then((x) => {
      // console.log('createPortfolioAsset', x);
      return {
        type: `${actionType}_SUCCESS`,
        payload: x
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}


export function fetchAllPortfolioAssets (actionType) {
  return db.PortfolioAssets
    .findAll({ include: ['Portfolio'] })
    .then((x, y, z) => {
      // console.log('ggggg', x, y, z)
      return {
        type: `${actionType}_SUCCESS`,
        payload: x.map((record, i) => record.dataValues)
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}

export function fetchPortfolioAssets (actionType, portfolioId) {
  return db.PortfolioAssets
    .findAll(
      { where: { portfolioId }, include: ['Portfolio'] }
    )
    .then((x, y, z) => {
      // console.log('ggggg', x, y, z)
      return {
        type: `${actionType}_SUCCESS`,
        payload: x.map((record, i) => record.dataValues)
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}

export function fetchPortfolioAsset (actionType, id) {
  return db.PortfolioAssets
    .findById(id)
    .then((x) => {
      // console.log('fetchPortfolioAsset', x);
      return {
        type: `${actionType}_SUCCESS`,
        payload: x,
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}
export function updatePortfolioAsset (actionType, portfolioAsset) {
  return db.PortfolioAssets
    .update(
      {
        symbolId: portfolioAsset.symbolId,
        exchangeId: portfolioAsset.exchangeId,
        assetId: portfolioAsset.assetId,
        marketId: portfolioAsset.marketId,
        portfolioId: portfolioAsset.portfolioId,
        notes: portfolioAsset.notes,
        user: portfolioAsset.user,
        date: portfolioAsset.date,
      },
      { where: { id: portfolioAsset.id } }
    )
    .then((x) => {
      // console.log('updatePortfolioAsset', x);
      return {
        type: `${actionType}_SUCCESS`,
        payload: x
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}
export function createPortfolioAsset (actionType, portfolioAsset) {
  const date = new Date();
  if (!portfolioAsset.portfolioId) {
    return {
      type: `${actionType}_FAILURE`,
      payload: 'Portfolio asset must have an assigned portfolio!',
    };
  }

  return db.PortfolioAssets
    .findAll({
      where: {
        symbolId: portfolioAsset.symbolId,
        portfolioId: portfolioAsset.portfolioId,
      },
    })
    .then((x) => {
      if (x.length > 0) {
        return {
          type: `${actionType}_FAILURE`,
          payload: `${portfolioAsset.symbolId} is already in this portfolio.`,
        };
      }

      return _createPortfolioAsset(actionType, portfolioAsset);

    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}
export function deletePortfolioAsset (actionType, id) {
  return db.PortfolioAssets
    .destroy(
      { where: { id } }
    )
    .then((x) => {
      // console.log('deletePortfolioAsset', x);
      return {
        type: `${actionType}_SUCCESS`,
        payload: x
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}
