
import { logger } from "../utils/logger";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('amenties',
       {
         id: {
           type: Sequelize.UUID,
           defaultValue: Sequelize.UUIDV4,
           primaryKey: true,
           allowNull: false,
         },
         name: {
           type: Sequelize.STRING,
           allowNull: false,
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
         logger.error("Error in creating amenties table:: ",err)
      }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('amenties');
   }catch(err){
    logger.error("Error in drop amenties table:: ")
   }
   }
};

  