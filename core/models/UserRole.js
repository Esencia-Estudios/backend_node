import { DataTypes, Model } from 'sequelize';

class UserRoleModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'core_user_roles',
            modelName: 'UserRole',
            timestamps: false,
        };
    }
}

const UserRoleFields = {
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false,
        primaryKey: true,
    },
    roleId: {
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
