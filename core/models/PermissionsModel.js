import { DataTypes, Model } from "sequelize";

class PermissionModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "permissions",
            modelName: "Permission",
            timestamps: false,
        };
    }
}

const PermissionFields = {
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
    codename: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
};

export { PermissionModel, PermissionFields };
