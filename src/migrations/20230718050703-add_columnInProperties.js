'use strict';

const { logger } = require("../utils/logger");

module.exports = {
  up: (queryInterface, Sequelize) => {
    try {
      return Promise.all([
        queryInterface.addColumn('properties', 'lookingTo', {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['Buy', 'Rent/Lease']
        }),
        queryInterface.addColumn('properties', 'readyToMove', {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['Yes', 'No']

        })
      ]);
    } catch (err) {
      logger.error("Error in add column in properties module::", err)
    }
  },

  down: (queryInterface, Sequelize) => {
    try {
      return Promise.all([
        queryInterface.removeColumn('properties', 'lookingTo'),
        queryInterface.removeColumn('properties', 'readyToMove')
      ]);
    } catch (err) {
      logger.error("Error in remove column or undo properties migration::", err)
    }
  }
};
