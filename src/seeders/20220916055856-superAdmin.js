'use strict';

const { UserService } = require('../modules/users/services/userService');
const { logger } = require('../utils/logger');
const User = require('../modules/users/model/userModel')
const bcrypt = require('bcryptjs');
const user = new UserService()


module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      let req = {};
      let body = {
        email: 'abc@gmail.com',
        name: 'Admin',
        role: 'admin',
        password: 'appnox.ai',
        phoneNumber: '9452340523',
        isPhoneVerified:true,
        seeder: true,
      };
      req['body'] = body;
      let superAdmin = await user.registerUser(req);
    } catch (err) {
      logger.error('Error in Super Admin', err);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
