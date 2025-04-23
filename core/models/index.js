import { sequelize } from "../config/db.js";
import { initializeModelGroup } from "../helpers/modelHelper.js";

import * as userModels from "./user/index.js";
import * as accessModels from "./access/index.js";
import * as appModels from "./application/index.js";
import * as moduleModels from "./modules/index.js";
import * as orgModels from "./organization/index.js";
import * as paymentModels from "./payments/index.js";
import * as timeModels from "./time/index.js";

const setupModels = () => {
  initializeModelGroup(userModels, sequelize);
  initializeModelGroup(accessModels, sequelize);
  initializeModelGroup(appModels, sequelize);
  initializeModelGroup(moduleModels, sequelize);
  initializeModelGroup(orgModels, sequelize);
  initializeModelGroup(paymentModels, sequelize);
  initializeModelGroup(timeModels, sequelize);
};

setupModels();

console.log("sequelize.models ------ ", sequelize.models);
import setupAssociations from "./setupAssociations.js";
setupAssociations();

export default sequelize.models;
