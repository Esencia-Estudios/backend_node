import { DataTypes, Model } from 'sequelize';

const ApplicationFields = {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
};

class ApplicationModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Application',
            tableName: 'applications',
            timestamps: true,
        };
    }
}

export { ApplicationModel, ApplicationFields };
