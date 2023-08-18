"use strict";

const { logger } = require("../utils/logger");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.renameColumn("properties", "location", "state");
      await queryInterface.changeColumn("properties", "state", {
        type: Sequelize.STRING,
        allowNull: false,
      });
      await queryInterface.addColumn("properties", "city", {
        type: Sequelize.STRING,
        allowNull: true,
      });
      await queryInterface.addColumn("properties", "street", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (error) {
      logger.error("Error in property add and remove field");
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.renameColumn("properties", "state", "location");
      await queryInterface.changeColumn("properties", "location", {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue:[]
      });
      await queryInterface.removeColumn("properties", "city");
      await queryInterface.removeColumn("properties", "street");
    } catch (error) {
      logger.error("Error in property revert field changes");
    }
  },
};
