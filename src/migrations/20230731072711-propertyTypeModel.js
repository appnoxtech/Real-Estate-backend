
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try{
      queryInterface.createTable('propertyTypes',
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
         type:{
          type:Sequelize.STRING,
          allowNull:true,
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
         logger.error("Error in creating propertyType table:: ",err)
      }
   },
 
   async down (queryInterface, Sequelize) {
    try{
      await queryInterface.dropTable('propertyTypes');
   }catch(err){
    logger.error("Error in drop PropertyType table:: ")
   }
   }
};

  