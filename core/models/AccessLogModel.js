import { DataTypes, Model } from "sequelize";
import { UserModel } from "./UserModel.js";

class AccessLogModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "core_access_logs",
            modelName: "AccessLog",
            timestamps: false,
            defaultScope: {
                raw: true
            }
        };
    }
}

const AccessLogFields = {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
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
