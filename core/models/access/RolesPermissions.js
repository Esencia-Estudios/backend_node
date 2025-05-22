import { DataTypes, Model } from "sequelize";

// Definición de la clase del modelo
class RolePermissionsModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "RolePermissionsModel",
      tableName: "core_role_permissions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const RolePermissionFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_roles",
      key: "id",
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_permissions",
      key: "id",
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
};

export { RolePermissionsModel, RolePermissionFields };
