'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { UserService } = require('../modules/users/services/userService');
const { logger } = require('../utils/logger');
const User = require('../modules/users/model/userModel');
const bcrypt = require('bcryptjs');
const user = new UserService();
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let req = {};
                let body = {
                    email: 'abc@gmail.com',
                    name: 'Admin',
                    role: 'admin',
                    password: 'appnox.ai',
                    phoneNumber: '9452340523',
                    isPhoneVerified: true,
                    seeder: true,
                };
                req['body'] = body;
                let superAdmin = yield user.registerUser(req);
            }
            catch (err) {
                logger.error('Error in Super Admin', err);
            }
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
        });
    },
};
