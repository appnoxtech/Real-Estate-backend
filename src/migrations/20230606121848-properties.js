'use strict';

const { Sequelize } = require('sequelize');
const { logger } = require('../utils/logger');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      queryInterface.createTable('properties',
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false
          },
          userId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          propertyType: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue:[]
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          images: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue:[]
          },
          location: {
            type: Sequelize.JSON,
            allowNull: false,
            defaultValue:[]
          },
          area: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          bhk: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          amenities: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          ownerPhoneNumber: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['available', 'booked', 'rented'],
            defaultValue: 'available',
          },
          lookingTo: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['Buy', 'Rent/Lease','PG']
          },
          furnishedStatus: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['unfurnished', 'semi-furnished', 'fully-furnished'],
            defaultValue: 'unfurnished',
          },
          floor:{
            type:Sequelize.STRING,
            allowNull:true
          },
          ageOfProperty:{
            type:Sequelize.STRING,
            allowNull:true
          },
          readyToMove: {
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['Yes', 'No']
          },
          parking:{
             type:Sequelize.ENUM,
             allowNull:true,
             values:['Yes','No']
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
      logger.error("Error in creating properties table:: ", err)
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('properties');
    } catch (err) {
      logger.error("Error in drop properties table:: ", err)
    }
  }
};

