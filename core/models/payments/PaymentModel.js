import { DataTypes, Model } from "sequelize";

class PaymentModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "PaymentModel",
      tableName: "core_payments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    };
  }
}

const PaymentFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "core_subscriptions",
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  isActive: {
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

export { PaymentModel, PaymentFields };
