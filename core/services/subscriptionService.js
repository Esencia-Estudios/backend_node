import * as SubscriptionRepository from "../repositories/subscriptionRepository.js";
import { PlanRepository } from "../repositories/planRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

export const getPlanService = async () => {
  const plans = await PlanRepository.getPlans();
  if (plans.length === 0) {
    throw new NotFoundError("No plans found");
  }
  return plans;
};

// Obtener todas las suscripciones
export const getSubscriptionsService = async () => {
  const subscriptions = await SubscriptionRepository.getAllSubscriptions();
  if (subscriptions.length === 0) {
    throw new NotFoundError("No subscriptions found");
  }
  return subscriptions;
};

// Obtener suscripción por ID
export const getSubscriptionByIdService = async (id) => {
  const subscription = await SubscriptionRepository.getSubscriptionById(id);
  if (!subscription) {
    throw new NotFoundError(`Subscription with ID ${id} not found`);
  }
  return subscription;
};

// Crear una nueva suscripción
export const createSubscriptionService = async (data) => {
  const newSubscription = await SubscriptionRepository.createSubscription(data);
  return newSubscription;
};

// Actualizar suscripción
export const updateSubscriptionService = async (id, data) => {
  const updatedSubscription = await SubscriptionRepository.updateSubscription(id, data);
  if (!updatedSubscription) {
    throw new NotFoundError(`Subscription with ID ${id} not found`);
  }
  return updatedSubscription;
};

// Eliminar suscripción
export const deleteSubscriptionService = async (id) => {
  const deleted = await SubscriptionRepository.deleteSubscription(id);
  if (!deleted) {
    throw new NotFoundError(`Subscription with ID ${id} not found`);
  }
  return { message: "Subscription deleted successfully" };
};
