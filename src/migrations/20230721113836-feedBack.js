'use strict';
const { logger } = require('../utils/logger');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      queryInterface.createTable('Feedbacks',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          userId: {
            type:Sequelize.STRING,
            allowNull:false
          },
          selectFeedback: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['I want to report a problem', 'I have a suggestion', 'I want to compliment 99acres', 'Other']
          },
          writeYourFeedback: {
            type: Sequelize.TEXT,
            allowNull: false
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
    } catch (err) {
      logger.error("Error in creating Feedback table:: ", err)
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('Feedback');
    } catch (err) {
      logger.error("Error in drop Feedback table:: ")
    }
  }
};
