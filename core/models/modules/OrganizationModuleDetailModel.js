import { DataTypes, Model } from "sequelize";

class OrganizationModuleDetailModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "OrganizationModuleDetailModel",
      tableName: "core_organizations_module_details",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const OrganizationModuleDetailFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organization_module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_organization_module",
      key: "id",
    },
  },
  sub_module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_sub_modules",
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
  }
};

export { OrganizationModuleDetailModel, OrganizationModuleDetailFields };
