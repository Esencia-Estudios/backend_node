import {
    getAllPlanFeaturesService,
    getPlanFeatureByIdService,
    createPlanFeatureService,
    updatePlanFeatureService,
} from "../services/planFeatureService.js";
import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { ResponseHelper } from "../helpers/response.js";

/**
 * Obtener todas las características de planes
 */
export const getPlanFeatures = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const planFeatures = await getAllPlanFeaturesService();
        return ResponseHelper.success(planFeatures);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Obtener característica de plan por ID
 */
export const getPlanFeatureById = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const planFeature = await getPlanFeatureByIdService(id);
        return ResponseHelper.success(planFeature);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Crear nueva característica de plan
 */
export const createPlanFeature = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const data = JSON.parse(event.body);
        const newPlanFeature = await createPlanFeatureService(data);
        return ResponseHelper.success(newPlanFeature);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Actualizar característica de plan
 */
export const updatePlanFeature = async (event) => {
    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const data = JSON.parse(event.body);
        const updatedPlanFeature = await updatePlanFeatureService(id, data);
        return ResponseHelper.success(updatedPlanFeature);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
