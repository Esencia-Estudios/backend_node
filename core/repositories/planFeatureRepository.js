import models from "../models/index.js";

const { PlanFeatureModel } = models;

/**
 * Obtener una característica de plan por su ID
 * @param {string} id - UUID de la característica de plan
 * @returns {Promise<PlanFeatureModel|null>} - La característica de plan o null si no existe
 */
export const getPlanFeatureById = async (id) => {
    const feature = await PlanFeatureModel.findByPk(id);
    return feature;
};

/**
 * Obtener todas las características de planes
 * @returns {Promise<Array<PlanFeatureModel>>} - Lista de todas las características de planes
 */
export const getAllPlanFeatures = async () => {
    return await PlanFeatureModel.findAll();
};

/**
 * Crear una nueva característica de plan
 * @param {object} featureData - Datos de la nueva característica
 * @returns {Promise<PlanFeatureModel>} - La nueva característica de plan creada
 */
export const createPlanFeature = async (featureData) => {
    const newFeature = await PlanFeatureModel.create(featureData);
    return newFeature;
};

/**
 * Actualizar una característica de plan existente
 * @param {string} id - UUID de la característica de plan
 * @param {object} updateData - Datos a actualizar
 * @returns {Promise<PlanFeatureModel|null>} - La característica de plan actualizada o null si no existe
 */
export const updatePlanFeature = async (id, updateData) => {
    const feature = await PlanFeatureModel.findByPk(id);
    if (!feature) return null;
    await feature.update(updateData);
    return feature;
};
