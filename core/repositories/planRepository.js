import { ValidationError } from "../helpers/errorHandler.js";
import { PlanModel, PlanFeatureModel } from "../models/index.js";

class PlanRepository {
  constructor() {
    this.model = PlanModel;
  }

  static async getPlans() {
    try {
      const plans = await PlanModel.findAll({
        where: { is_active: true },
        attributes: [
          "id",
          "name",
          "slug",
          "price",
          "billing_cycle",
          "description",
        ],
        include: [
          {
            model: PlanFeatureModel,
            as: "features",
            attributes: ["feature"],
          },
        ],
      });

      if (!plans.length) return [];

      return plans.map((plan) => ({
        ...plan.toJSON(),
        features: plan?.features?.map((f) => f.feature),
      }));
    } catch (e) {
      throw e;
    }
  }
}

export { PlanRepository };
