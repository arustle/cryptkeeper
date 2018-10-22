'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PortfolioAssets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      symbolId: {
        type: Sequelize.STRING
      },
      exchangeId: {
        type: Sequelize.STRING
      },
      assetId: {
        type: Sequelize.STRING
      },
      marketId: {
        type: Sequelize.STRING
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        references: { model: 'Portfolios', key: 'id' }
      },
      notes: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PortfolioAssets');
  }
};
