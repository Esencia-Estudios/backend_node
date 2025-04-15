import { DataTypes, Model } from 'sequelize';

const UserWorkInfoFields = {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'core_users',
      key: 'id',
    },
  },
  company_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  job_title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  work_email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  work_phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  hire_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
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
  }
};

class UserWorkInfoModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'UserWorkInfo',
      tableName: 'core_user_work_info',
      timestamps: true,
      updatedAt: 'updated_at',
      createdAt: 'created_at',
    };
  }
}

export { UserWorkInfoModel, UserWorkInfoFields };
