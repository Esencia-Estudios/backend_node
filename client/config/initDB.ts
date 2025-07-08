import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static instance: Database;
  private _sequelize: Sequelize;

  private constructor() {
    this._sequelize = new Sequelize(
      process.env.DB_NAME as string,
      process.env.DB_USERNAME as string,
      process.env.DB_PASSWORD as string,
      {
        host: process.env.DB_HOST as string,
        dialect: 'mysql',
        logging: false,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          connectTimeout: 60000,
        },
      }
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getSequelizeInstance(): Sequelize {
    return this._sequelize;
  }

  public async authenticate(): Promise<void> {
    try {
      await this._sequelize.authenticate();
      console.log('✅ Database connection established.');
    } catch (error) {
      console.error('❌ Error connecting to the database:', error);
      throw error;
    }
  }
}

const instance = Database.getInstance();
const sequelize = instance.getSequelizeInstance();

export { instance, sequelize };
