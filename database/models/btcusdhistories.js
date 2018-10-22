'use strict';
module.exports = (sequelize, DataTypes) => {
  var BtcUsdHistories = sequelize.define('BtcUsdHistories', {
    date: DataTypes.DATE,
    open: DataTypes.DECIMAL,
    high: DataTypes.DECIMAL,
    low: DataTypes.DECIMAL,
    close: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL,
    trades: DataTypes.INTEGER
  }, {});
  BtcUsdHistories.associate = function(models) {
    // associations can be defined here
  };
  return BtcUsdHistories;
};