'use strict';

const { logger } = require("../utils/logger");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
    const updateQuery = `
      UPDATE propertyTypes
      SET type = 'Commercial-property'
      WHERE type = 'Commertial-property';
    `;
    
    await queryInterface.sequelize.query(updateQuery, {
      type: Sequelize.QueryTypes.RAW,
    });
  }catch(err){
    logger.error("Error in change type")
  }
  },

  down: async (queryInterface, Sequelize) => {
    const revertQuery = `
      UPDATE propertyTypes
      SET type = 'Commertial-property'
      WHERE type = 'Commercial-property';
    `;
    
    await queryInterface.sequelize.query(revertQuery, {
      type: Sequelize.QueryTypes.RAW,
    });
  }
};
