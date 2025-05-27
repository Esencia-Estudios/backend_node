import { DataTypes, Model } from "sequelize";

class SubscriptionModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "SubscriptionModel",
      tableName: "core_subscriptions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const SubscriptionFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_payments",
      key: "id",
    },
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_organizations",
      key: "id",
    },
  },
  plan_id: {
    type: DataTypes.UUID,
    references: {
      model: "core_plans",
      key: "id",
    },
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
    onUpdate: DataTypes.NOW,
  },
};

export { SubscriptionModel, SubscriptionFields };
