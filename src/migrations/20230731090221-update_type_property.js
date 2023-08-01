'use strict';

const { logger } = require('../utils/logger');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try{
    await queryInterface.changeColumn("properties",
      "type", {
       type: Sequelize.JSON,
      values: ['Residential-property','Commertial-property','Industrial-property','Agricultural-property','Vacant-land','Mixed-use-property','Special-pupose-property','Real-estate-investment'],
      defaultValue: 'Residential-property',
      allowNull: false,
    })
    const query = `ALTER TABLE properties DROP COLUMN propertyType;`;
   await queryInterface.sequelize.query(query)
  }catch(err){
    logger.error("Error in migration",err)
  }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
