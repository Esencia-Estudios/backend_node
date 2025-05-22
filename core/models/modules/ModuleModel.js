import { DataTypes, Model } from "sequelize";

class ModuleModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "ModuleModel",
      tableName: "core_modules",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const ModuleFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  application_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_applications",
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_dynamic_routes",
      key: "id",
    },
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
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
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

export { ModuleModel, ModuleFields };
