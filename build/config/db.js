"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("../utils");
const constants_1 = require("../utils/constants");
dotenv_1.default.config();
class Database {
    constructor() {
        this.db = process.env.DB_NAME;
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASS;
        this.host = process.env.DB_HOST;
        this.port = Number(process.env.DB_PORT) || 3306;
        this.maxPool = Number(process.env.MAX_POOL) || 100;
        this.minPool = Number(process.env.MIN_POOL) || 1;
        if (!this.db || !this.user || !this.password || !this.host) {
            throw new utils_1.Exception(constants_1.ERROR_TYPE.NOT_FOUND, "Missing DB configuration. Please check your environment variables.");
        }
        this.database = new sequelize_1.Sequelize({
            database: this.db,
            username: this.user,
            password: this.password,
            host: this.host,
            port: this.port,
            ssl: true,
            dialect: 'mysql',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            logging: false,
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 100000,
                idle: 50000,
            },
        });
    }
}
const databaseInstance = new Database().database;
exports.default = databaseInstance;
