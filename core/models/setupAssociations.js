import { sequelize } from "../config/db.js";

const setupAssociations = () => {
  //models domain user
  const { UserModel, UserInfoModel, UserWorkInfoModel, UserPermissionModel } =
    sequelize.models;
  //models domain access
  const { RoleModel, PermissionModel, AccessLogModel, RolePermissionsModel } =
    sequelize.models;
  //models domain application
  const { MenuItemModel, DynamicRouteModel, ApplicationModel } =
    sequelize.models;
  //models domain modules
  const {
    CustomModuleModel,
    ModuleModel,
    OrganizationModuleModel,
    OrganizationModuleDetailModel,
    SubModuleModel,
  } = sequelize.models;
  //models domain organization
  const {
    OrganizationModel,
    OrganizationsSettingModel,
    OrganizationUserModel,
  } = sequelize.models;
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

  /* // Relaciones entre usuarios y roles
  UserModel.belongsToMany(RoleModel, {
    through: "core_user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles",
  }); */

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

  // 📦 Un Módulo tiene muchos Sub módulos
  ModuleModel.hasMany(SubModuleModel, {
    foreignKey: "module_id",
    as: "submodules",
  });

  // 📦 Cada Sub módulo pertenece a un Módulo
  SubModuleModel.belongsTo(ModuleModel, {
    foreignKey: "module_id",
    as: "module",
  });

  // 📦 Un OrganizationModule tiene muchos detalles
  OrganizationModuleModel.hasMany(OrganizationModuleDetailModel, {
    foreignKey: "organization_module_id",
    as: "organizationModuleDetail",
  });

  // 📦 Cada detalle pertenece a un OrganizationModule
  OrganizationModuleDetailModel.belongsTo(OrganizationModuleModel, {
    foreignKey: "organization_module_id",
    as: "organizationModule",
  });

  // 📦 Un Module pertenece a una Application
  ModuleModel.belongsTo(ApplicationModel, {
    foreignKey: "application_id",
    as: "application",
  });

  // 📦 Un Module pertenece a una DynamicRoute
  ModuleModel.belongsTo(DynamicRouteModel, {
    foreignKey: "route",
    as: "dynamicRoute",
  });

  // Rol permission
  RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionsModel,
    foreignKey: "role_id",
    otherKey: "permission_id",
    as: "permissions",
  });

  PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionsModel,
    foreignKey: "permission_id",
    otherKey: "role_id",
    as: "roles",
  });

  // 📦 Relación muchos a muchos entre User y Permission a través de UserPermission
  UserModel.belongsToMany(PermissionModel, {
    through: UserPermissionModel,
    foreignKey: "user_id",
    otherKey: "permission_id",
    as: "permissions",
  });

  PermissionModel.belongsToMany(UserModel, {
    through: UserPermissionModel,
    foreignKey: "permission_id",
    otherKey: "user_id",
    as: "users",
  });

  // 📦 Un UserPermission pertenece a un User
  UserPermissionModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user",
  });

  // 📦 Un UserPermission pertenece a un Permission
  UserPermissionModel.belongsTo(PermissionModel, {
    foreignKey: "permission_id",
    as: "permission",
  });

  UserModel.hasMany(OrganizationUserModel, {
    foreignKey: "user_id",
    as: "organizations",
  });

  OrganizationModel.hasMany(OrganizationUserModel, {
    foreignKey: "organization_id",
    as: "members",
  });

  OrganizationModel.hasMany(OrganizationsSettingModel, {
    foreignKey: "organization_id",
    as: "settings",
  });

  OrganizationUserModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user",
  });

  OrganizationUserModel.belongsTo(OrganizationModel, {
    foreignKey: "organization_id",
    as: "organization",
  });

  OrganizationUserModel.belongsTo(RoleModel, {
    foreignKey: "role_id",
    as: "role",
  });

  // 📦 Un Rol pertenece a una Organización
  RoleModel.belongsTo(OrganizationModel, {
    foreignKey: "organization_id",
    as: "organization",
  });

  // 📦 Una Organización tiene muchos Roles
  OrganizationModel.hasMany(RoleModel, {
    foreignKey: "organization_id",
    as: "roles",
  });
  // 📦 Un permiso pertenece a un módulo
  PermissionModel.belongsTo(ModuleModel, {
    foreignKey: "module",
    as: "moduleData",
  });

  // 📦 Un módulo tiene muchos permisos
  ModuleModel.hasMany(PermissionModel, {
    foreignKey: "module",
    as: "permissions",
  });

  // 📦 Un permiso pertenece a un submódulo
  PermissionModel.belongsTo(SubModuleModel, {
    foreignKey: "sub_module",
    as: "subModuleData",
  });

  // 📦 Un submódulo tiene muchos permisos
  SubModuleModel.hasMany(PermissionModel, {
    foreignKey: "sub_module",
    as: "permissions",
  });
};

export default setupAssociations;
