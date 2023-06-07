"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../../config/db"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
// Database connection instance
const databaseInstance = db_1.default;
// Sequelize Model
const User = databaseInstance.define('users', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_2.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profilePhoto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isPhoneVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'landlord', 'tenant'],
        defaultValue: 'tenant',
    },
    // createdAt, lastUpdatedAt and deletedAt managed by Sequelize
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    // Auto-create timestamps
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    // Enable soft deletes
    //   paranoid: true,
});
exports.default = User;
