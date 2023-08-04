'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    await queryInterface.addColumn('properties', 'ownerName', {
      type: Sequelize.STRING, // Adjust the data type as needed
      allowNull: true,
    });
    await queryInterface.addColumn('properties','propertyOnFloor',{
      type:Sequelize.STRING,
      allowNull:false
    })
    await queryInterface.changeColumn('properties', 'ownerPhoneNumber',{
      type: Sequelize.STRING,
      allowNull: true,
    });
  }catch(err){
    logger.error("Error in changes in properties database",err)
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
