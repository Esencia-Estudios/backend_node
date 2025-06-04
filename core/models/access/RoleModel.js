import { DataTypes, Model } from "sequelize";

class RoleModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_roles",
      modelName: "RoleModel",
      timestamps: false,
    };
  }
}

const RoleFields = {
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
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

export { RoleModel, RoleFields };
