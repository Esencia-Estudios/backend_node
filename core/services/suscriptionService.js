import { PlanRepository } from "../repositories/planRepository.js";

export const getPlanService = async () => {
  try {
    return await PlanRepository.getPlans();
  } catch (error) {
    throw error;
  }
};
