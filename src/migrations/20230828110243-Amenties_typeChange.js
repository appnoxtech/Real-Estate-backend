'use strict';
import { logger } from "../utils/logger";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
    await queryInterface.changeColumn('properties', 'amenities', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue:[]
    });
  }catch(err){
    logger.error("Error in update dataType in amenties",err)
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('properties', 'amenities', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    // If needed, you can define a down migration to revert the change.
    // This might involve changing the data type back to STRING.
    // Keep in mind that JSON data will be lost during this process.
  }
};

