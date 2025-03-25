import { DataTypes, Model } from "sequelize";

class TimeTrackerModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "core_time_trackers",
            modelName: "TimeTracker",
            timestamps: true,
            updatedAt: "updated_at",
            createdAt: "created_at",
        };
    }
}

const TimeTrackerFields = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "core_users",
            key: "id",
        },
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
};

export { TimeTrackerModel, TimeTrackerFields };
