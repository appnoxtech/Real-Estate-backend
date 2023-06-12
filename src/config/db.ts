import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

class Database {
  db: string;
  user: string;
  password: string;
  host: string;
  port: number;
  maxPool: number;
  minPool: number;
  database: Sequelize;

  constructor() {
    this.db = process.env.DB_NAME || 'my_db';
    this.user = process.env.DB_USER || 'admin';
    this.password = process.env.DB_PASS || 'appnox.ai';
    this.host = process.env.DB_HOST || 'database-1.c0sppty9yvmg.ap-south-1.rds.amazonaws.com';
    this.port = Number(process.env.DB_PORT) || 3306;
    this.maxPool = Number(process.env.MAX_POOL) || 100;
    this.minPool = Number(process.env.MIN_POOL) || 1;

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
