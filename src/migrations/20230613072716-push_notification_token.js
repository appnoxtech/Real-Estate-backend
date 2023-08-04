'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('push_notification_tokens',
       {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        userId: {
          type:Sequelize.STRING,
          allowNull:false
        },
        notificationToken:{
          type: Sequelize.STRING,
          allowNull: true,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
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
       logger.info("error at 20230613072716-push_notification_token.js",error)
     }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('otps');
   }catch(err){
    logger.error("Error in drop push_notification_token table:: ",err)
   }
   }
};
