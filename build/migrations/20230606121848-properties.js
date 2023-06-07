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
            queryInterface.createTable('properties', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                type: {
                    type: Sequelize.ENUM,
                    allowNull: false,
                    values: ['Residential-property', 'Commertial-property', 'Industrial-property', 'Agricultural-property', 'Vacant-land', 'Mixed-use-property', 'Special-pupose-property', 'Real-estate-investment'],
                    defaultValue: 'Residential-property',
                },
                description: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                images: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                location: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                area: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                price: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                bedrooms: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                bathrooms: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                amenities: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                owner_identity: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                status: {
                    type: Sequelize.ENUM,
                    allowNull: false,
                    values: ['available', 'booked', 'rented'],
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
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('properties');
        });
    }
};
