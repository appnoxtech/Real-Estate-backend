import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Exception } from '../utils';
import { ERROR_TYPE } from '../utils/constants';


dotenv.config();

class Database {
  db: string | undefined;
  user: string | undefined;
  password: string | undefined;
  host: string | undefined;
  port: number;
  maxPool: number;
  minPool: number;
  database: Sequelize;

  constructor() {
    this.db = process.env.DB_NAME ;
    this.user = process.env.DB_USER ;
    this.password = process.env.DB_PASS ;
    this.host = process.env.DB_HOST ;
    this.port = Number(process.env.DB_PORT) || 3306;
    this.maxPool = Number(process.env.MAX_POOL) || 100;
    this.minPool = Number(process.env.MIN_POOL) || 1;

    if(!this.db || !this.user || !this.password || !this.host){
      throw new Exception(ERROR_TYPE.NOT_FOUND,"Missing DB configuration. Please check your environment variables.")
    }
    this.database = new Sequelize({
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

export default databaseInstance;
