'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('chatroom',
       {
        userId: {
          type: Sequelize.STRING,
          allowNull: true,
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
       console.log("error at 20230607101015-chatroom.js",error)
     }
   },
 
   async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('chatroom');
   }
};
