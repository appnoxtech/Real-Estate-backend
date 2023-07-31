'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('propertyTypes',[
      {
        id:uuidv4(),
        name:'Apartment',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Independent House/Villa',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Independent/Builder Floor',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Plot/Land',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'1 RK/Studio Apartment',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Serviced Apartment',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Farmhouse',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'others',
        type:'Residential-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Office',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Retails',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Plot/Land',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Storage',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Industry',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
      {
        id:uuidv4(),
        name:'Hospitality',
        type:'Commertial-property',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      },
     
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
