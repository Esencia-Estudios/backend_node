import { DataTypes, Model } from "sequelize";
import { ApplicationModel } from "./ApplicationModel.js";
import { DynamicRouteModel } from "./DynamicRouteModel.js";

const MenuItemFields = {
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ApplicationModel,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    routeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: DynamicRouteModel,
            key: "id",
        },
        onDelete: "SET NULL",
    },
    icon: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "menu_items",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    requiredPermission: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    isParent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
};

class MenuItemModel extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: "menu_items",
            modelName: "MenuItem",
            timestamps: false,
        };
    }
}

export { MenuItemFields, MenuItemModel };
