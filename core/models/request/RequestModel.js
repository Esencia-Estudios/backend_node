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
  fullName: {
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
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  requirementDetails: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estimatedBudget: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  projectSchedule: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  filePath: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  stateRequirement: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  }
};

export { RequirementModel, RequirementFields };
