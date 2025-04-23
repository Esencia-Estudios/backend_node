import { DataTypes, Model } from "sequelize";

const ApplicationFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

class ApplicationModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "ApplicationModel",
      tableName: "core_applications",
      timestamps: true,
    };
  }
}

export { ApplicationModel, ApplicationFields };
