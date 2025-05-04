import * as OrganizationRepository from "../repositories/organizationRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

/**
 * Obtener organización por ID
 * @param {number} id - ID de la organización
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la organización
 */
export const getOrganizationByIdService = async (id) => {
    const organization = await OrganizationRepository.getOrganizationById(id);
    if (!organization) {
        throw new NotFoundError(`Organization with ID ${id} not found`);
    }
    return organization;
};

/**
 * Crear una nueva organización
 * @param {object} data - Datos de la organización
 * @returns {Promise<object>}
 */
export const createOrganizationService = async (data) => {
    const newOrganization = await OrganizationRepository.createOrganization(data);
    return newOrganization;
};

/**
 * Actualizar organización
 * @param {number} id - ID de la organización
 * @param {object} data - Datos a actualizar
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la organización
 */
export const updateOrganizationService = async (id, data) => {
    const updatedOrganization = await OrganizationRepository.updateOrganization(id, data);
    if (!updatedOrganization) {
        throw new NotFoundError(`Organization with ID ${id} not found`);
    }
    return updatedOrganization;
};

/**
 * Eliminar (desactivar) una organización
 * @param {number} id - ID de la organización
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la organización
 */
export const deleteOrganizationService = async (id) => {
    const deleted = await OrganizationRepository.deleteOrganization(id);
    if (!deleted) {
        throw new NotFoundError(`Organization with ID ${id} not found`);
    }
    return { message: "Organization deleted successfully" };
};

/**
 * Obtener todas las organizaciones activas
 * @returns {Promise<Array<object>>}
 */
export const getAllOrganizationsService = async () => {
    return await OrganizationRepository.getAllOrganizations();
};
