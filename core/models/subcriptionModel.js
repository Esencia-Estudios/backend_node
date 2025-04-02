import { DataTypes, Model } from 'sequelize';

class SubscriptionModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Subscription',
      tableName: 'core_subscriptions',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };
  }
}

const SubscriptionFields = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'core_organizations',
      key: 'id',
    },
  },
  plan_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_price: {
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
};

export { SubscriptionModel, SubscriptionFields };
