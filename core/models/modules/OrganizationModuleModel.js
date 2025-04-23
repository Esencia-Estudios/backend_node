import { DataTypes, Model } from "sequelize";

class OrganizationModuleModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "OrganizationModuleModel",
      tableName: "core_organization_module",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const OrganizationModuleFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_organizations",
      key: "id",
    },
  },
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_modules",
      key: "id",
    },
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
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

export { OrganizationModuleModel, OrganizationModuleFields };
