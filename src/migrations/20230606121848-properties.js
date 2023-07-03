'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('properties',
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
       type:Sequelize.STRING,
       allowNull:false
     },
     type: {
      type:Sequelize.ENUM,
      allowNull: false,
      values: ['Residential-property','Commertial-property','Industrial-property','Agricultural-property','Vacant-land','Mixed-use-property','Special-pupose-property','Real-estate-investment'],
      defaultValue: 'Residential-property',
    },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      images: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },  
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
       type: Sequelize.STRING,
       allowNull: true,
      },
      bedrooms:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      bathrooms:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      amenities:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      owner_identity:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
       type:Sequelize.ENUM,
       allowNull: false,
       values: ['available','booked','rented'],
       defaultValue: 'available',
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
},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};

