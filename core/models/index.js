import { UserFields, UserModel } from "./UserModel.js";
import { ApplicationFields, ApplicationModel } from "./ApplicationModel.js";
import { DynamicRouteFields, DynamicRouteModel } from "./DynamicRouteModel.js";
import { MenuItemFields, MenuItemModel } from "./MenuItemModel.js";
import { AccessLogFields, AccessLogModel } from "./AccessLogModel.js";
import { RoleFields, RoleModel } from "./RolesModel.js";
import { PermissionFields, PermissionModel } from "./PermissionsModel.js";
import { UserRoleFields, UserRoleModel } from "./UserRole.js";
import { sequelize } from "../config/db.js";
import { UserInfoFields, UserInfoModel } from "./UserInfoModel.js";
import { UserWorkInfoFields, UserWorkInfoModel } from "./UserIWorkModel.js";

const setupModels = () => {
    UserModel.init(UserFields, UserModel.config(sequelize));
    UserWorkInfoModel.init(UserWorkInfoFields, UserWorkInfoModel.config(sequelize));
    UserInfoModel.init(UserInfoFields, UserInfoModel.config(sequelize));
    UserRoleModel.init(UserRoleFields, UserRoleModel.config(sequelize));
    ApplicationModel.init(ApplicationFields, ApplicationModel.config(sequelize));
    DynamicRouteModel.init(DynamicRouteFields, DynamicRouteModel.config(sequelize));
    MenuItemModel.init(MenuItemFields, MenuItemModel.config(sequelize));
    AccessLogModel.init(AccessLogFields, AccessLogModel.config(sequelize));
    PermissionModel.init(PermissionFields, PermissionModel.config(sequelize));
    RoleModel.init(RoleFields, RoleModel.config(sequelize));
}

setupModels()

// Definir relaciones
UserModel.hasOne(UserInfoModel, { foreignKey: "user_id", as: "userInfo", onDelete: "CASCADE" });
UserInfoModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
UserModel.hasOne(UserWorkInfoModel, { foreignKey: "user_id", as: "UserWorkInfo", onDelete: "CASCADE" });
UserWorkInfoModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

MenuItemModel.belongsTo(ApplicationModel, { foreignKey: "applicationId", as: "application" });
MenuItemModel.belongsTo(DynamicRouteModel, { foreignKey: "routeId", as: "route" });
MenuItemModel.belongsTo(MenuItemModel, { foreignKey: "parentId", as: "parent" });
MenuItemModel.hasMany(MenuItemModel, { foreignKey: "parentId", as: "children" });

AccessLogModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.belongsToMany(RoleModel, { through: "core_user_roles", foreignKey: "userId", otherKey: "roleId" });
UserModel.hasMany(AccessLogModel, { foreignKey: "userId", as: "accessLogs" });

RoleModel.belongsToMany(PermissionModel, { through: "role_permissions", foreignKey: "roleId" });
PermissionModel.belongsToMany(RoleModel, { through: "role_permissions", foreignKey: "permissionId" })

export {
    RoleModel,
    UserModel,
    UserInfoModel,
    MenuItemModel,
    UserRoleModel,
    AccessLogModel,
    PermissionModel,
    ApplicationModel,
    UserWorkInfoModel,
    DynamicRouteModel,
};
export default sequelize.models