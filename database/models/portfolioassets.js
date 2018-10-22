'use strict';
module.exports = (sequelize, DataTypes) => {
  var PortfolioAssets = sequelize.define('PortfolioAssets', {
    symbolId: DataTypes.STRING,
    exchangeId: DataTypes.STRING,
    assetId: DataTypes.STRING,
    marketId: DataTypes.STRING,
    portfolioId: DataTypes.INTEGER,
    notes: DataTypes.STRING,
    user: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  PortfolioAssets.associate = function(models) {
    // associations can be defined here
    PortfolioAssets.belongsTo(models.Portfolios);
  };
  return PortfolioAssets;
};
