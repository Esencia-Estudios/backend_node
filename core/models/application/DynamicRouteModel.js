import { DataTypes, Model } from "sequelize";

const DynamicRouteFields = {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  path: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  component: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
};

class DynamicRouteModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_dynamic_routes",
      modelName: "DynamicRouteModel",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
        {
          unique: true,
          fields: ['path'],
        },
      ]
    };
  }
}

export { DynamicRouteFields, DynamicRouteModel };
