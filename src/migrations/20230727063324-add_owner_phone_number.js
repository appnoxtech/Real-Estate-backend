'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.renameColumn('properties', 'owner_identity', 'Owner_name'),
        await queryInterface.addColumn('properties', 'ownerPhoneNumber', {
          type: Sequelize.STRING,
          allowNull: false,
        });
    } catch (err) {
      logger.error("Error in add_owner_phone migration", err)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.renameColumn('properties', 'Owner_name', 'owner_identity'),
        await queryInterface.removeColumn('properties', 'ownerPhoneNumber', {
          type: Sequelize.STRING,
          allowNull: false,
        });
    } catch (err) {
      logger.error("Error in reversing migration", err)
    }
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
