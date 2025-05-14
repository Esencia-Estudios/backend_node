import * as PlanFeatureRepository from "../repositories/planFeatureRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

/**
 * Obtener característica de plan por ID
 * @param {string} id - ID de la característica
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la característica
 */
export const getPlanFeatureByIdService = async (id) => {
    const feature = await PlanFeatureRepository.getPlanFeatureById(id);
    if (!feature) {
        throw new NotFoundError(`Plan feature with ID ${id} not found`);
    }
    return feature;
};

/**
 * Obtener todas las características de plan
 * @returns {Promise<Array<object>>}
 */
export const getAllPlanFeaturesService = async () => {
    return await PlanFeatureRepository.getAllPlanFeatures();
};

/**
 * Crear una nueva característica de plan
 * @param {object} data - Datos de la característica
 * @returns {Promise<object>}
 */
export const createPlanFeatureService = async (data) => {
    const newFeature = await PlanFeatureRepository.createPlanFeature(data);
    return newFeature;
};

/**
 * Actualizar característica de plan
 * @param {string} id - ID de la característica
 * @param {object} data - Datos a actualizar
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la característica
 */
export const updatePlanFeatureService = async (id, data) => {
    const updatedFeature = await PlanFeatureRepository.updatePlanFeature(id, data);
    if (!updatedFeature) {
        throw new NotFoundError(`Plan feature with ID ${id} not found`);
    }
    return updatedFeature;
};
