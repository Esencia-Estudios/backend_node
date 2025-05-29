import * as OrganizationModuleRepository from "../repositories/organizationModuleRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

/**
 * Obtener módulo de organización por ID
 * @param {number} id - ID del módulo
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el módulo
 */
export const getOrganizationModuleByIdService = async (id) => {
    const module = await OrganizationModuleRepository.getOrganizationModuleById(id);
    if (!module) {
        throw new NotFoundError(`Organization Module with ID ${id} not found`);
    }
    return module;
};

/**
 * Crear un nuevo módulo de organización
 * @param {object} data - Datos del módulo
 * @returns {Promise<object>}
 */
export const createOrganizationModuleService = async (data) => {
    const newModule = await OrganizationModuleRepository.createOrganizationModule(data);
    return newModule;
};

/**
 * Actualizar módulo de organización
 * @param {number} id - ID del módulo
 * @param {object} data - Datos a actualizar
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el módulo
 */
export const updateOrganizationModuleService = async (id, data) => {
    const updatedModule = await OrganizationModuleRepository.updateOrganizationModule(id, data);
    if (!updatedModule) {
        throw new NotFoundError(`Organization Module with ID ${id} not found`);
    }
    return updatedModule;
};

/**
 * Eliminar (desactivar) un módulo de organización
 * @param {number} id - ID del módulo
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el módulo
 */
export const deleteOrganizationModuleService = async (id) => {
    const deleted = await OrganizationModuleRepository.deleteOrganizationModule(id);
    if (!deleted) {
        throw new NotFoundError(`Organization Module with ID ${id} not found`);
    }
    return { message: "Organization Module deleted successfully" };
};

/**
 * Obtener todos los módulos de una organización
 * @param {number} organizationId - ID de la organización
 * @returns {Promise<Array<object>>}
 */
export const getModulesByOrganizationIdService = async (organizationId) => {
    const modules = await OrganizationModuleRepository.findOrganizationModules({
        organization_id: organizationId,
    });
    return modules;
};

/**
 * Obtener todos los módulos activos
 * @returns {Promise<Array<object>>}
 */
export const getAllOrganizationModulesService = async () => {
    return await OrganizationModuleRepository.getAllOrganizationModules();
};
