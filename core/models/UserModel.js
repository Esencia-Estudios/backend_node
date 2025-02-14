import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

const UserFields = {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  user_code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_staff: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_superuser: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profile_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hide_email: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
  message_checked_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  notification_checked_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_primary_contact: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disable_login: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: "None",
  },
  enable_web_notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  enable_email_notification: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  requested_account_removal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};

class UserModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password && user.password !== user._previousDataValues.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      }
    };
  }

  async comparePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}


export { UserModel, UserFields };
