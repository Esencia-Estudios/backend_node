import models from "../models/index.js";

class PlanRepository {
  static async findPlan(where) {
    const plans = await models?.PlanModel.findAll({
      where: { is_active: true, ...where },
      attributes: [
        "id",
        "name",
        "slug",
        "price",
        "billing_cycle",
        "description",
      ],
    });

    return plans.length ? plans[0] : {};
  }
  static async getPlans() {
    const plans = await models?.PlanModel.findAll({
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
          model: models?.PlanFeatureModel,
          as: "features",
          attributes: ["feature"],
        },
      ],
    });

    return plans.length
      ? plans.map((plan) => ({
          ...plan.toJSON(),
          features: plan.features?.map((f) => f.feature),
        }))
      : [];
  }
}

export { PlanRepository };
