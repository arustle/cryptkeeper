'use strict';
module.exports = (sequelize, DataTypes) => {
  var Portfolios = sequelize.define('Portfolios', {
    portfolioName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Portfolios.associate = function(models) {
    // associations can be defined here
  };
  return Portfolios;
};