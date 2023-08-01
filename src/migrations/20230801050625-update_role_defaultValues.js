'use strict';

const { logger } = require('../utils/logger');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn("users",
        "role", {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['admin', 'owner', 'tenant', 'agent', 'buyer'],
        defaultValue: 'tenant',
      })
    } catch (err) {
      logger.error("Error in migration in user_role_migration", err)
    }

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
