import { DataTypes } from "sequelize";

const RolePermissionFields = {
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Permission",
      key: "id",
    },
    onDelete: "CASCADE",
  },
};

export { RolePermissionFields };
