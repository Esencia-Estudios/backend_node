import { DataTypes, Model } from "sequelize";

class PlanModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_plans",
      modelName: "PlanModel",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          fields: ['slug'],
        }
      ]
    };
  }
}

const PlanFields = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  billing_cycle: {
    type: DataTypes.ENUM("monthly", "yearly"),
    defaultValue: "monthly",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export { PlanModel, PlanFields };
