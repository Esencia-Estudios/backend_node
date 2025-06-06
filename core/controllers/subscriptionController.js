import { getPlanService } from "../services/planService.js";
import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { getModulesService } from "../services/moduleService.js";
import { ResponseHelper } from "../helpers/response.js";
import {
  getSubscriptionsService,
  getSubscriptionByIdService,
  createSubscriptionService,
  updateSubscriptionService,
  deleteSubscriptionService,
} from "../services/subscriptionService.js";

export const getPlans = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;

  try {
    const plans = await getPlanService();
    return ResponseHelper.success(plans);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

export const getModules = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const modules = await getModulesService();
    return ResponseHelper.success(modules);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

// Obtener todas las suscripciones
export const getSubscriptions = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const subscriptions = await getSubscriptionsService();
    return ResponseHelper.success(subscriptions);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

// Obtener suscripción por ID
export const getSubscriptionById = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const { id } = event.pathParameters;
    const subscription = await getSubscriptionByIdService(id);
    return ResponseHelper.success(subscription);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

// Crear nueva suscripción
export const createSubscription = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const data = JSON.parse(event.body);
    const newSubscription = await createSubscriptionService(data);
    return ResponseHelper.success(newSubscription);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

// Actualizar suscripción
export const updateSubscription = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    const updatedSubscription = await updateSubscriptionService(id, data);
    return ResponseHelper.success(updatedSubscription);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

// Eliminar suscripción
export const deleteSubscription = async (event) => {
  const authError = authMiddleware(event);
  if (authError) return authError;
  try {
    const { id } = event.pathParameters;
    const result = await deleteSubscriptionService(id);
    return ResponseHelper.success(result);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};
