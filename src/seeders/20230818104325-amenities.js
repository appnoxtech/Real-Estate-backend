'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('amenties', [
      { id: 1, name: 'Swimming Pool', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date()},
      { id: 2, name: 'Gym', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 3, name: 'Parking', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 4, name: 'Security', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 5, name: 'Playground', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 6, name: 'Elevator', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 7, name: 'Clubhouse', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 8, name: 'CCTV Surveillance', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 9, name: 'Power Backup', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 10, name: 'Rainwater Harvesting', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 11, name: 'Indoor Games', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 12, name: 'Fire Safety', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 13, name: 'Community Hall', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 14, name: 'Intercom', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 15, name: 'Lift', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 16, name: 'Garden', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 17, name: 'Wi-Fi Connectivity', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 18, name: 'Visitor Parking', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 19, name: 'Solar Power', createdAt: new Date(), updatedAt: new Date() ,deletedAt:new Date() },
      { id: 20, name: 'Library', createdAt: new Date(), updatedAt: new Date()  ,deletedAt:new Date()},
      { id: 21, name: 'Yoga Studio', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      { id: 22, name: 'Tennis Court', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      { id: 23, name: 'Movie Theater', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      { id: 24, name: 'BBQ Area', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      { id: 25, name: 'Laundry Facility', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() },
      // Add more amenties here
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all rows from the table
    await queryInterface.bulkDelete('amenties', new Date(), {});
  }
};
