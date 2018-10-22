// const { remote } = window.require('electron');

// const db = window.require('../../database/models');
import { takeLatest } from 'redux-saga/effects';
import { ACTIONS as UI_ACTIONS } from '../redux/actions/Ui.actions';

const db = window.require(`${process.cwd()}/database/models`);
// const TradeSetup = require('../../app/models/TradeSetup');
// const Portfolios = require('../../database/models/portfolios')(db.sequelize, db.sequelize.DataTypes);
// var main = remote.require('./main');


export function fetchPortfolios () {
  return Portfolios.findAndCountAll();
}
export function fetchAllPortfolios (actionType) {
  // const db = remote.getGlobal('db');
  // console.log('Portfolios', db);
  // const withRendererCb = main.withRendererCallback(x => x + 1)
  // const withLocalCb = main.withLocalCallback()
  // console.log('iiii', withRendererCb, withLocalCb)

  // db.Portfolios.findAll().then(x => (console.log('pppp', x)));

  // console.log('Portfolios', db.sequelize.query("SELECT * FROM `Portfolios`", { type: db.sequelize.QueryTypes.SELECT})
  //   .then(users => {
  //     // We don't need spread here, since only the results will be returned for select queries
  //     console.log('asdasdads', users)
  //   }))


  return db.Portfolios
    .findAll()
    .then((x, y, z) =>
      // console.log('ggggg', x, y, z)
      ({
        type: actionType,
        payload: x.map((record, i) => record.dataValues),
      }))
    .catch(x => ({
      type: 'FAIL',
      payload: x,
    }));
}


export function fetchPortfolio (actionType, id) {
  return db.Portfolios
    .findById({ where: { id } })
    .then(x =>
      // console.log('fetchPortfolio', x);
      ({
        type: actionType,
        payload: x,
      }))
    .catch(x => ({
      type: 'FAIL',
      payload: x,
    }));
}
export function updatePortfolio (actionType, portfolio) {
  console.log('qwqwqw', portfolio)
  return db.Portfolios
    .update({
      portfolioName: portfolio.portfolioName,
      description: portfolio.description,
    }, {
      where: {
        id: portfolio.id,
      },
    })
    .then(x =>
      // console.log('updatePortfolio', x);
      ({
        type: actionType,
        payload: x,
      }))
    .catch(x => ({
      type: 'FAIL',
      payload: x,
    }));
}
export function createPortfolio (actionType, portfolio) {
  const date = new Date();
  return db.Portfolios
    .create({
      portfolioName: portfolio.portfolioName,
    })
    .then(x =>
      // console.log('createPortfolio', x);
      ({
        type: actionType,
        payload: x,
      }))
    .catch(x => ({
      type: 'FAIL',
      payload: x,
    }));
}
export function deletePortfolio (actionType, id) {
  return db.Portfolios
    .destroy({ where: { id } })
    .then(x =>
      // console.log('deletePortfolio', x);
      ({
        type: actionType,
        payload: x,
      }))
    .catch(x => ({
      type: 'FAIL',
      payload: x,
    }));
}
