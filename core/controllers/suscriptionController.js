import { getPlanService } from "../services/suscriptionService.js";
import { getModulesService } from "../services/moduleService.js";
import { ResponseHelper } from "../helpers/response.js";

export const getPlans = async (event) => {
  try {
    const plans = await getPlanService();
    return ResponseHelper.success(plans);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

export const getModules = async (event) => {
  try {
    const modules = await getModulesService();
    return ResponseHelper.success(modules);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};
