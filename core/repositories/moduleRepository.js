import models from "../models/index.js";

const { ModuleModel } = models;
export class ModuleRepository {
  static async getModules() {
    return await ModuleModel.findAll();
  }
}
