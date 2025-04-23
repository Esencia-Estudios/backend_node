import { instance as db } from "./config/initDB"; // Se elimina la extensión ".js"
import mysql, { Connection } from "mysql2";
import dotenv from "dotenv";
import models from "./models"; // Se elimina la extensión ".js"

dotenv.config();

const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
});

/**
 * Crea la base de datos si no existe.
 */
const createDatabaseIfNotExists = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ??`,
      [process.env.DB_NAME],
      (err) => {
        if (err) {
          reject(`Error creating database: ${err.message}`);
        } else {
          resolve("Database created or already exists.");
        }
      }
    );
  });
};

/**
 * Sincroniza los modelos con la base de datos.
 */
const syncDatabase = async (): Promise<void> => {
  try {
    await db.authenticate(); // Verifica la conexión con la DB
    await db.getSequelizeInstance().sync({ alter: true }); // Sincroniza tablas con `alter: true`
    console.log("Database tables have been created or updated.");
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error;
  }
};

/**
 * Inicializa la base de datos.
 */
const initialize = async (): Promise<void> => {
  try {
    await createDatabaseIfNotExists();
    connection.end(); // Cierra la conexión después de crear la base de datos

    await syncDatabase();
    console.log("✅ Database initialization complete.");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1); // Termina el proceso con error
  }
};

initialize();
