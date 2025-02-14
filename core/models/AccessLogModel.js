import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserModel } from "./UserModel.js";

class AccessLogModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "access_logs",
            modelName: "AccessLog",
            timestamps: false,
        };
    }
}

const AccessLogFields = {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: "user_id",
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
