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
  subscription_stripe_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  plan_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  payment_detail: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "updated_at",
  },
};

export { PaymentModel, PaymentFields };
