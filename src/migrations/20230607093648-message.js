'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('messages',
       {
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
       console.log("error at 20230607093648-messages.js",error)
     }
   },
 
   async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('messages');
   }
};
