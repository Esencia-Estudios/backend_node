import { DataTypes, Model } from "sequelize";

class UserPermissionModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "UserPermissionModel",
      tableName: "user_permissions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const UserPermissionFields = {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: "core_users",
      key: "id",
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_permissions",
      key: "id",
    }
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

export { UserPermissionModel, UserPermissionFields };
