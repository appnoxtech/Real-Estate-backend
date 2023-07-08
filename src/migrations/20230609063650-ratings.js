'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('ratings',
       {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        userId: {
          type:Sequelize.STRING,
          allowNull:false
        },
        propertyId: {
          type:Sequelize.STRING,
          allowNull:false
        },
        userName: {
          type:Sequelize.STRING,
          allowNull:false
        },
        propertyName: {
          type:Sequelize.STRING,
          allowNull:false
        },
        ratings: {
          type:Sequelize.STRING,
          allowNull:false
        },
        reviews: {
          type:Sequelize.STRING,
          allowNull:true
        },
        // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
       }
         )
     }catch(error)
     {
       logger.info("error at 20230609063650-ratings.js",error)
     }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('ratings');
   }catch(err){
    logger.error("Error in drop rating table:: ",err)
   }
   }
};
