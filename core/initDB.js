import { instance as db } from "./config/db.js";
import mysql from "mysql2";
import dotenv from "dotenv";
import models from "./models/index.js";

console.log("models", models);
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

const createDatabaseIfNotExists = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
      (err) => {
        if (err) {
          reject("Error creating database:", err);
        } else {
          resolve("Database created or already exists.");
        }
      }
    );
  });
};

const syncDatabase = async () => {
  try {
    await db.authenticate();

    await db.getSequelizeInstance().sync({ alter: true });

    console.log("Database tables have been created or updated.");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error;
  }
};

const initialize = async () => {
  try {
    await createDatabaseIfNotExists();
    connection.end();

    await syncDatabase();
    console.log("Database initialization complete.");
    process.exit(0);
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
};

initialize();
