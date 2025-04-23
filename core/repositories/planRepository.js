import models from "../models/index.js";

class PlanRepository {
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
