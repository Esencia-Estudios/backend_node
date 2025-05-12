import { DataTypes, Model } from "sequelize";

class AccessLogModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: "core_access_logs",
      modelName: "AccessLogModel",
      timestamps: false,
      defaultScope: {
        raw: true,
      },
    };
  }
}

const AccessLogFields = {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "core_users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIP: true,
    },
  },
  accessedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

export { AccessLogFields, AccessLogModel };
