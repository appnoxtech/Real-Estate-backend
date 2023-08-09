'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('properties', 'lookingTo', {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['Sell', 'Rent/Lease', 'PG'], // Change 'Buy' to 'Sell'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('properties', 'lookingTo', {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['Buy', 'Rent/Lease', 'PG'], // Change 'Sell' back to 'Buy'
    });
  },
};
