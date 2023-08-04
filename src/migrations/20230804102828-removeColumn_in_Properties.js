'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    await queryInterface.renameColumn('properties', 'floor', 'totalFloor');

    const query = `ALTER TABLE properties DROP COLUMN readyToMove`;
    await queryInterface.sequelize.query(query)

    await queryInterface.changeColumn("properties",
        "status", {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['readyToMove', 'underConstruction'],
        defaultValue: 'readyToMove',
      })
    }
      catch(err){
        logger.error("Error in removeColumn in properties")
      }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
