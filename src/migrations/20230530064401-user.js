'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('users',
       {
         id: {
           type: Sequelize.UUID,
           defaultValue: Sequelize.UUIDV4,
           primaryKey: true,
           allowNull: false,
         },
         token: {
          type:Sequelize.STRING,
          allowNull:true
        },
         name: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         profilePhoto: {
           type: Sequelize.STRING,
           allowNull: true,
         }, 
         phoneNumber: {
           type: Sequelize.STRING,
           allowNull: false,
         },
         email:{
          type: Sequelize.STRING,
          allowNull: true,
         },
         isPhoneVerified:{
          type:Sequelize.BOOLEAN,
          allowNull:true
         },
         role: {
          type:Sequelize.ENUM,
          allowNull: false,
          values: ['admin','owner','tenant','broker','buyer'],
          defaultValue: 'tenant',
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
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        }
       }
         )
      }catch(err){
         logger.error("Error in creating users table:: ",err)
      }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('users');
   }catch(err){
    logger.error("Error in drop users table:: ")
   }
   }
};
