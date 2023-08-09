'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
    await queryInterface.addColumn('properties','type',{
      type:Sequelize.ENUM,
      allowNull:true,
      values: ['Commercial-property','Residential-property'],
    })
  }catch(err){
     logger.error("Error in add type field in properties::",err)
  }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('properties','type',{
      type:Sequelize.ENUM,
      allowNull:true,
      values: ['Commercial-property','Residential-property'],
    })
  }
};
