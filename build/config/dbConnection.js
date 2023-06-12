"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Umzug = require("umzug");
const sequelize_1 = __importDefault(require("sequelize"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
const logger_1 = require("../utils/logger");
const migrate = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path_1.default.join(__dirname, '../migrations'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [db_1.default.getQueryInterface(), sequelize_1.default],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: db_1.default,
    },
});
const seed = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path_1.default.join(__dirname, '../seeders'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [db_1.default.getQueryInterface(), sequelize_1.default],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: db_1.default,
    },
});
const databaseConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.authenticate()
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.logger.info('Database successfully connected.');
            yield migrate.up()
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info('All migrations performed successfully.');
                yield seed.up()
                    .then(() => __awaiter(void 0, void 0, void 0, function* () {
                    logger_1.logger.info('Data seed successfull. ');
                    return Promise.resolve();
                })).catch((err) => {
                    logger_1.logger.error('Seeders failed.', err);
                    return Promise.reject();
                });
                return Promise.resolve();
            })).catch((err) => {
                logger_1.logger.error('Migrations failed.', err);
                return Promise.reject();
            });
            return Promise.resolve();
        })).catch((err) => {
            logger_1.logger.error('Unable to connect to the database.', err);
            return Promise.reject();
        });
        return Promise.resolve();
    }
    catch (err) {
        logger_1.logger.error('Failed to connect with Database', err);
        return Promise.reject();
    }
});
exports.default = databaseConnection;
