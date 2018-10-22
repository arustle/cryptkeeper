

const fs = require('fs');
const moment = require('moment');

const results = []
  // .concat(JSON.parse(fs.readFileSync(`${process.cwd()}/seeders/btcUsdCoinbaseHistorical2015.json`, { encoding: 'utf8' })))
  // .concat(JSON.parse(fs.readFileSync(`${process.cwd()}/seeders/btcUsdCoinbaseHistorical2016.json`, { encoding: 'utf8' })))
  // .concat(JSON.parse(fs.readFileSync(`${process.cwd()}/seeders/btcUsdCoinbaseHistorical2017.json`, { encoding: 'utf8' })))
  .concat(JSON.parse(fs.readFileSync(`${process.cwd()}/seeders/btcUsdCoinbaseHistorical2018.json`, { encoding: 'utf8' })));


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BtcUsdHistories', results.map(x => ({
      date: moment(x.time_period_start).toDate(),
      open: x.price_open,
      high: x.price_high,
      low: x.price_low,
      close: x.price_close,
      volume: x.volume_traded,
      trades: x.trades_count,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('BtcUsdHistories', null, {});
  },
};
