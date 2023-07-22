'use strict';

const { logger } = require('../utils/logger');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('properties', 'propertyType', {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [
          'Apartment',
          'Independent House/Villa',
          'Independent/Builder Floor',
          'Plot/Land',
          '1 RK/Studio Apartment',
          'Serviced Apartment',
          'Farmhouse',
          'Other',
        ],
      });
    } catch (err) {
      logger.error('Error in add column in properties module::', err);
      throw err; // Re-throw the error to stop the migration in case of failure
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('properties', 'propertyType');
    } catch (err) {
      logger.error('Error in remove column or undo properties migration::', err);
      throw err; // Re-throw the error to stop the migration in case of failure
    }
  },
};
