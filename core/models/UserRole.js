import { DataTypes, Model } from 'sequelize';

class UserRoleModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'user_roles',
            modelName: 'UserRole',
            timestamps: false,
        };
    }
}

const UserRoleFields = {
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'user_id',
        },
        allowNull: false,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id',
        },
        allowNull: false,
        primaryKey: true,
    },
};

export { UserRoleModel, UserRoleFields };
