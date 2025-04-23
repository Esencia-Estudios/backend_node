import { DataTypes, Model } from "sequelize";

class RequirementModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_requirements",
      modelName: "Requirement",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const RequirementFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  requirement_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estimated_budget: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  project_schedule: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

export { RequirementModel, RequirementFields };
