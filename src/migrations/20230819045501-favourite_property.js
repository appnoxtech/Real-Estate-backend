
import { logger } from "../utils/logger";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('favouriteProperties',
       {
         id: {
           type: Sequelize.UUID,
           defaultValue: Sequelize.UUIDV4,
           primaryKey: true,
           allowNull: false,
         },
         propertyId: {
           type: Sequelize.UUID,
           allowNull: false,
         },
         status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['L','D']
        },
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
         logger.error("Error in creating favourite table:: ",err)
      }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('favouriteProperties');
   }catch(err){
    logger.error("Error in drop favouriteProperty table:: ")
   }
   }
};

  