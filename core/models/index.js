import { UserFields, UserModel } from "./UserModel.js";
import { TimeTrackerFields, TimeTrackerModel } from "./timeTrackerModels.js";
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
import { CustomModuleFields, CustomModuleModel } from "./CustomModuleModel.js";
import { ModuleFields, ModuleModel } from "./ModuleModel.js";
import {
  OrganizationModuleFields,
  OrganizationModuleModel,
} from "./OrganizationModuleModel.js";
import { OrganizationModel, OrganizationFields } from "./OrganizationModel.js";
import { PaymentFields, PaymentModel } from "./paymentModel.js";
import { SubscriptionFields, SubscriptionModel } from "./subcriptionModel.js";
import { PlanFields, PlanModel } from "./PlanModel.js";
import { PlanFeatureFields, PlanFeatureModel } from "./PlanFeatureModel.js";

const setupModels = () => {
  UserModel.init(UserFields, UserModel.config(sequelize));
  UserWorkInfoModel.init(
    UserWorkInfoFields,
    UserWorkInfoModel.config(sequelize)
  );
  UserInfoModel.init(UserInfoFields, UserInfoModel.config(sequelize));
  UserRoleModel.init(UserRoleFields, UserRoleModel.config(sequelize));
  ApplicationModel.init(ApplicationFields, ApplicationModel.config(sequelize));
  DynamicRouteModel.init(
    DynamicRouteFields,
    DynamicRouteModel.config(sequelize)
  );
  MenuItemModel.init(MenuItemFields, MenuItemModel.config(sequelize));
  AccessLogModel.init(AccessLogFields, AccessLogModel.config(sequelize));
  PermissionModel.init(PermissionFields, PermissionModel.config(sequelize));
  RoleModel.init(RoleFields, RoleModel.config(sequelize));
  TimeTrackerModel.init(TimeTrackerFields, TimeTrackerModel.config(sequelize));
  CustomModuleModel.init(
    CustomModuleFields,
    CustomModuleModel.config(sequelize)
  );
  ModuleModel.init(ModuleFields, ModuleModel.config(sequelize));
  OrganizationModuleModel.init(
    OrganizationModuleFields,
    OrganizationModuleModel.config(sequelize)
  );
  OrganizationModel.init(
    OrganizationFields,
    OrganizationModel.config(sequelize)
  );
  PlanModel.init(PlanFields, PlanModel.config(sequelize));
  PlanFeatureModel.init(PlanFeatureFields, PlanFeatureModel.config(sequelize));
  PaymentModel.init(PaymentFields, PaymentModel.config(sequelize));
  SubscriptionModel.init(
    SubscriptionFields,
    SubscriptionModel.config(sequelize)
  );
};

setupModels();

// Definir relaciones
// Relaciones de usuario con información adicional
UserModel.hasOne(UserInfoModel, {
  foreignKey: "user_id",
  as: "userInfo",
  onDelete: "CASCADE",
});
UserInfoModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

UserModel.hasOne(UserWorkInfoModel, {
  foreignKey: "user_id",
  as: "userWorkInfo",
  onDelete: "CASCADE",
});
UserWorkInfoModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

// Relaciones de menú con aplicación y rutas dinámicas
MenuItemModel.belongsTo(ApplicationModel, {
  foreignKey: "applicationId",
  as: "application",
});
MenuItemModel.belongsTo(DynamicRouteModel, {
  foreignKey: "routeId",
  as: "route",
});
MenuItemModel.belongsTo(MenuItemModel, {
  foreignKey: "parentId",
  as: "parent",
});
MenuItemModel.hasMany(MenuItemModel, {
  foreignKey: "parentId",
  as: "children",
});

// Registro de accesos de usuario
AccessLogModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.hasMany(AccessLogModel, { foreignKey: "userId", as: "accessLogs" });

// Relaciones entre usuarios y roles
UserModel.belongsToMany(RoleModel, {
  through: "core_user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
RoleModel.belongsToMany(PermissionModel, {
  through: "role_permissions",
  foreignKey: "roleId",
});
PermissionModel.belongsToMany(RoleModel, {
  through: "role_permissions",
  foreignKey: "permissionId",
});

// Seguimiento de tiempo
TimeTrackerModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
UserModel.hasMany(TimeTrackerModel, {
  foreignKey: "user_id",
  as: "timeTrackers",
});

// Relación de módulos personalizados con módulos y organizaciones
CustomModuleModel.belongsTo(ModuleModel, {
  foreignKey: "module_id",
  as: "module",
});
ModuleModel.hasMany(CustomModuleModel, {
  foreignKey: "module_id",
  as: "customModules",
});

CustomModuleModel.belongsTo(OrganizationModel, {
  foreignKey: "organization_id",
  as: "organization",
});

// Relación de organizaciones con módulos
OrganizationModuleModel.belongsTo(OrganizationModel, {
  foreignKey: "organization_id",
  as: "organization",
});
OrganizationModel.hasMany(OrganizationModuleModel, {
  foreignKey: "organization_id",
  as: "organizationModules",
});

OrganizationModuleModel.belongsTo(ModuleModel, {
  foreignKey: "module_id",
  as: "module",
});
ModuleModel.hasMany(OrganizationModuleModel, {
  foreignKey: "module_id",
  as: "moduleOrganizations",
});

// Relación de pagos con suscripciones
PlanModel.hasMany(PlanFeatureModel, {
  foreignKey: "plan_id",
  as: "features",
});
PlanFeatureModel.belongsTo(PlanModel, {
  foreignKey: "plan_id",
  as: "plan",
});
PaymentModel.belongsTo(SubscriptionModel, {
  foreignKey: "subscription_id",
  as: "subscription",
});
SubscriptionModel.hasMany(PaymentModel, {
  foreignKey: "subscription_id",
  as: "payments",
});

export {
  UserModel,
  TimeTrackerModel,
  ApplicationModel,
  RoleModel,
  UserInfoModel,
  MenuItemModel,
  UserRoleModel,
  AccessLogModel,
  PermissionModel,
  UserWorkInfoModel,
  DynamicRouteModel,
  CustomModuleModel,
  ModuleModel,
  PlanModel,
  PlanFeatureModel,
  SubscriptionModel,
  PaymentModel,
  OrganizationModuleModel,
  OrganizationModel,
};

export default sequelize.models;
