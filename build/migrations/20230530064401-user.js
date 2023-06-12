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
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            queryInterface.createTable('users', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                token: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                profilePhoto: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                phoneNumber: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                isPhoneVerified: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true
                },
                role: {
                    type: Sequelize.ENUM,
                    allowNull: false,
                    values: ['admin', 'landlord', 'tenant'],
                    defaultValue: 'tenant',
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
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('users');
        });
    }
};
