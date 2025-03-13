import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

class Database {
  constructor() {
    if (!Database.instance) {
      this._sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD, 
        {
          host: process.env.DB_HOST,
          dialect: 'mysql',
          logging: false,
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
          },
          dialectOptions: {
            connectTimeout: 60000
          }
        }
      );

      Database.instance = this;
    }

    return Database.instance;
  }

  getSequelizeInstance() {
    return this._sequelize;
  }

  async authenticate() {
    try {
      await this._sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
}

const instance = new Database();
const sequelize = instance.getSequelizeInstance();
Object.freeze(instance);

export { instance, sequelize };
