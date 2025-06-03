import { DataTypes, Model } from "sequelize";

class PermissionModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_permissions",
      modelName: "PermissionModel",
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
  module: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "core_modules",
      key: "id",
    },
  },
  subModule: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "core_sub_modules",
      key: "id",
    },
  },
  type: {
    type: DataTypes.ENUM("checkbox", "radio"),
    allowNull: false,
    defaultValue: "checkbox",
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

export { PermissionModel, PermissionFields };
