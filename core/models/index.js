import { UserFields, UserModel } from "./UserModel.js";
import { ApplicationFields, ApplicationModel } from "./ApplicationModel.js";
import { DynamicRouteFields, DynamicRouteModel } from "./DynamicRouteModel.js";
import { MenuItemFields, MenuItemModel } from "./MenuItemModel.js";
import { AccessLogFields, AccessLogModel } from "./AccessLogModel.js";
import { sequelize } from "../config/db.js";

const setupModels = () => {
    UserModel.init(UserFields, UserModel.config(sequelize));
    ApplicationModel.init(ApplicationFields, ApplicationModel.config(sequelize));
    DynamicRouteModel.init(DynamicRouteFields, DynamicRouteModel.config(sequelize));
    MenuItemModel.init(MenuItemFields, MenuItemModel.config(sequelize));
    AccessLogModel.init(AccessLogFields, AccessLogModel.config(sequelize));
}

setupModels()

// Definir relaciones
MenuItemModel.belongsTo(ApplicationModel, { foreignKey: "applicationId", as: "application" });
MenuItemModel.belongsTo(DynamicRouteModel, { foreignKey: "routeId", as: "route" });
MenuItemModel.belongsTo(MenuItemModel, { foreignKey: "parentId", as: "parent" });
MenuItemModel.hasMany(MenuItemModel, { foreignKey: "parentId", as: "children" });

AccessLogModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.hasMany(AccessLogModel, { foreignKey: "userId", as: "accessLogs" });

export { UserModel, ApplicationModel, DynamicRouteModel, MenuItemModel, AccessLogModel };
export default sequelize.models