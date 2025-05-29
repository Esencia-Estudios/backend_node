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

    return Object.values(modules.reduce((acc, { module }) => {
        if (!module?.application) return acc;

        acc[module.application.id] = acc[module.application.id] || {
            id: module.application.id,
            key: `${module.application.id}-${module.application.name}`,
            label: module.application.name,
            name: module.application.name,
            application_name: module.application.name,
            route_name: "",
            parent_name: null,
            icon: module.application.icon,
            required_permission: [],
            is_parent: false,
            children: [],
        };

        acc[module.application.id].children.push({
            id: module.id,
            key: `${module.id}-${module.dynamicRoute?.name}`,
            label: module.name,
            name: module.name,
            application_name: module.application.name,
            route_name: module.dynamicRoute?.name || "",
            parent_name: module.application.name,
            icon: module.icon,
            required_permission: module.required_permissions || [],
            is_parent: false,
            application: module.application.id,
            route: module.dynamicRoute?.id || null,
            parent: module.application.id,
        });

        return acc;
    }, {}));
};

/**
 * Obtener todos los módulos activos
 * @returns {Promise<Array<object>>}
 */
export const getAllOrganizationModulesService = async () => {
    return await OrganizationModuleRepository.getAllOrganizationModules();
};
