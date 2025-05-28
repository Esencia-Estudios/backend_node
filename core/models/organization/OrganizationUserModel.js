import { DataTypes, Model } from "sequelize";

class OrganizationUserModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "OrganizationUserModel",
      tableName: "core_organizations_users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const OrganizationUserFields = {
  id: {
    type: DataTypes.INTEGER,
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
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_organizations",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_roles",
      key: "id",
    },
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
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

export { OrganizationUserModel, OrganizationUserFields };
