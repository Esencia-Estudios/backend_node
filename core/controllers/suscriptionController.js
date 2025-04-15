import { getPlanService } from "../services/suscriptionService.js";
import { ResponseHelper } from "../helpers/response.js";

export const getPlans = async (event) => {
  try {
    const plans = await getPlanService();
    return ResponseHelper.success(plans);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};
