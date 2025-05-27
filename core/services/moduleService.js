import { ModuleRepository } from "../repositories/moduleRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

export const getModulesService = async () => {
  const modules = await ModuleRepository.getModules();
  if (modules.length === 0) {
    throw new NotFoundError("No modules found");
  }
  return modules;
};
