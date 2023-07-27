'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.renameTable('push_notification_token', 'push_notification_tokens'),
      await queryInterface.changeColumn("push_notification_tokens",
        "notificationToken", {
        type: DataTypes.STRING,
        allowNull: true,
      })
    }catch(err){
logger.error("Error in migration",err)
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
