'use strict';

const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('messages',
       {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        chatRoomId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        message: {
          type: Sequelize.STRING
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
       logger.info("error at 20230607093648-messages.js",error)
     }
   },
 
   async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('messages');
   }
};
