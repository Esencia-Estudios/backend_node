import { DataTypes, Model } from "sequelize";

class RoleModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "roles",
            modelName: "Role",
            timestamps: false,
        };
    }
}

const RoleFields = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
};

export { RoleModel, RoleFields };
