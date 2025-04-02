import { DataTypes, Model } from 'sequelize';

class OrganizationModuleModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'OrganizationModule',
      tableName: 'core_organization_module',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
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
      model: 'core_organizations',
      key: 'id',
    },
  },
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'core_modules',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
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

export { OrganizationModuleModel, OrganizationModuleFields };
