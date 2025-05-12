import { sequelize } from "../config/db.js";

const setupAssociations = () => {
  //models domain user
  const { UserModel, UserInfoModel, UserWorkInfoModel } = sequelize.models;
  //models domain access
  const { RoleModel, PermissionModel, AccessLogModel } = sequelize.models;
  //models domain application
  const { MenuItemModel, DynamicRouteModel, ApplicationModel } =
    sequelize.models;
  //models domain modules
  const { CustomModuleModel, ModuleModel, OrganizationModuleModel } =
    sequelize.models;
  //models domain organization
  const { OrganizationModel } = sequelize.models;
  //models domain payments
  const { PaymentModel, PlanFeatureModel, PlanModel, SubscriptionModel } =
    sequelize.models;
  //models domain time
  const { TimeTrackerModel } = sequelize.models;

  // User Relations
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
  // 📦 Una suscripción tiene muchos pagos
  SubscriptionModel.hasMany(PaymentModel, {
    foreignKey: "subscription_id",
    as: "payments",
  });
  // 📦 Cada pago pertenece a una suscripción
  PaymentModel.belongsTo(SubscriptionModel, {
    foreignKey: "subscription_id",
    as: "subscription",
  });

};

export default setupAssociations;
