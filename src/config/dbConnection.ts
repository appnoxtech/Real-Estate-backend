import Umzug = require("umzug");
import sequelize from 'sequelize';
import path from 'path';
import databaseInstance from "./db";
import { logger } from "../utils/logger";

const migrate = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, '../migrations'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [databaseInstance.getQueryInterface(), sequelize],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: databaseInstance,
    },
})

const seed = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, '../seeders'),
        pattern: /\.js$/,
        // inject sequelize's QueryInterface in the migrations
        params: [databaseInstance.getQueryInterface(), sequelize],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: databaseInstance,
    },
})

const databaseConnection = async () => {
    try {
        const result: any = await databaseInstance.authenticate()
            .then(async () => {
                logger.info('Database successfully connected.')

                await migrate.up()
                    .then(async () => {
                        logger.info('All migrations performed successfully.')
                await seed.up()
                    .then(async () => {
                        logger.info('Data seed successfull. ')
                                return Promise.resolve()
                            }).catch((err: any) => {
                        logger.error('Seeders failed.', err);
                                return Promise.reject()
                            })
                        return Promise.resolve()
                    }).catch((err: any) => {
                        logger.error('Migrations failed.',err);
                        return Promise.reject()
                    })
                return Promise.resolve()

            }).catch((err) => {
                logger.error('Unable to connect to the database.', err);
                return Promise.reject()
            })
        return Promise.resolve()
    }
    catch (err) {
        logger.error('Failed to connect with Database', err)
        return Promise.reject()
    }
}

export default databaseConnection;