import { DataTypes, Model } from "sequelize";

const UserInfoFields = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: "core_users",
      key: "id",
    },
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  document_type: {
    type: DataTypes.ENUM("DNI", "PASSPORT", "OTHER"),
    allowNull: false,
  },
  document_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  profile_picture: {
    type: DataTypes.STRING(255),
    allowNull: true,
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
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
};

class UserInfoModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: "UserInfoModel",
      tableName: "core_user_info",
      timestamps: true,
      updatedAt: "updated_at",
      createdAt: "created_at",
    };
  }
}

export { UserInfoModel, UserInfoFields };
