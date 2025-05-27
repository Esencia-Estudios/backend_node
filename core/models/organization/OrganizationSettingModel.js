import { DataTypes, Model } from "sequelize";

class OrganizationsSettingModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "OrganizationsSettingModel",
      tableName: "core_organizations_settings",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const OrganizationSettingFields = {
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
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
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
  },
};

export { OrganizationsSettingModel, OrganizationSettingFields };
