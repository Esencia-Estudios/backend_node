import { DataTypes, Model } from "sequelize";

const MenuItemFields = {
  applicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "core_applications",
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
      model: "core_dynamic_routes",
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
      model: "core_menu_items",
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
      tableName: "core_menu_items",
      modelName: "MenuItemModel",
      timestamps: false,
    };
  }
}

export { MenuItemFields, MenuItemModel };
