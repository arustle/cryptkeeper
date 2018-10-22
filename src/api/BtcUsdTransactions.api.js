// const { remote } = window.require('electron');

// const db = window.require('../../database/models');
import { takeLatest } from 'redux-saga/effects';
import { ACTIONS as UI_ACTIONS } from '../redux/actions/Ui.actions';

import * as candlesticks from '../helpers/candlesticks';
const db = window.require(`${process.cwd()}/database/models`);
// const TradeSetup = require('../../app/models/TradeSetup');
// const Portfolios = require('../../database/models/portfolios')(db.sequelize, db.sequelize.DataTypes);
// var main = remote.require('./main');


export function fetchAllBtcUsdTransactions (actionType) {
  return db.BtcUsdHistories
    .findAll({ order: [['date', 'DESC']] })
    .then((x, y, z) => {
      // console.log('ggggg', x, y, z)
      return {
        type: `${actionType}_SUCCESS`,
        payload: x.map((record, i) => candlesticks.createCandleFromDb(record.dataValues))
      };
    })
    .catch(x => ({
      type: `${actionType}_FAILURE`,
      payload: x,
    }));
}

export function createBtcUsdTransaction (actionType, transaction) {
  return db.BtcUsdHistories
    .create({
      date: transaction.date,
      open: transaction.open,
      high: transaction.high,
      low: transaction.low,
      close: transaction.close,
      volume: transaction.volume,
      trades: transaction.trades,
    })
    .then((x) => {
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

