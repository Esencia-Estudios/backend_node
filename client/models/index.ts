import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/initDB";
import { ClientModel } from "./ClientModel";

// Función para inicializar modelos
const setupModels = (sequelize: Sequelize): void => {
  ClientModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nif: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "erp_clients",
      timestamps: true,
    } // <----- preguntar por que aquí en tablename no pone core_ (como en el modelo)
  );
};

// Inicializar modelos
setupModels(sequelize);

// Exportar modelos
export { ClientModel as ClientModel };

// Exportar modelos registrados en Sequelize
export default sequelize.models;
