import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/initDB";
import { UserModel } from "./UserModel";

// Función para inicializar modelos
const setupModels = (sequelize: Sequelize): void => {
    UserModel.init(
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
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        { sequelize, modelName: "User", tableName: "users", timestamps: true }
    );
};

// Inicializar modelos
setupModels(sequelize);

// Exportar modelos
export { UserModel };

// Exportar modelos registrados en Sequelize
export default sequelize.models;
