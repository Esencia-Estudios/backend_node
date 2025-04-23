// models/PlanFeatureModel.js
import { DataTypes, Model } from "sequelize";

class PlanFeatureModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_plan_features",
      modelName: "PlanFeatureModel",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    };
  }
}

const PlanFeatureFields = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  plan_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "core_plans",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  feature: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

export { PlanFeatureModel, PlanFeatureFields };
