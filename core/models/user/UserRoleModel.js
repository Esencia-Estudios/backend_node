import { DataTypes, Model } from "sequelize";

class UserRoleModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "user_roles",
      modelName: "UserRoleModel",
      timestamps: false,
    };
  }
}

const UserRoleFields = {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: "core_users",
      key: "id",
    },
    allowNull: false,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_roles",
      key: "id",
    },
    allowNull: false,
    primaryKey: true,
  },
};

export { UserRoleModel, UserRoleFields };
