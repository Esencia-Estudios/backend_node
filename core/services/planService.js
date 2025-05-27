import { PlanRepository } from "../repositories/planRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

export const getPlanService = async () => {
  const plans = await PlanRepository.getPlans();
  if (plans.length === 0) {
    throw new NotFoundError("No plans found");
  }
  return plans;
};

export const findPlanService = async (where) => {
  return await PlanRepository.findPlan(where);
};
