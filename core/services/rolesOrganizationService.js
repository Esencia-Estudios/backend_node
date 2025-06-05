import * as RoleRepository from "../repositories/rolesOrganizationRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";

/**
 * Obtener rol por ID
 * @param {number} id - ID del rol
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el rol
 */
export const getRoleByIdService = async (id) => {
    const role = await RoleRepository.getRoleById(id);
    if (!role) {
        throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return role;
};


/**
 * Obtener todos los roles activos
 * @returns {Promise<Array<object>>}
 */
export const getAllRolesService = async () => {
    return await RoleRepository.getAllRoles();
};

/**
 * Crear un nuevo rol
 * @param {object} data - Datos del rol
 * @returns {Promise<object>}
 */
export const createRoleService = async (data) => {
    const newRole = await RoleRepository.createRole(data);
    return newRole;
};

/**
 * Actualizar rol
 * @param {number} id - ID del rol
 * @param {object} data - Datos a actualizar
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el rol
 */
export const updateRoleService = async (id, data) => {
    const updatedRole = await RoleRepository.updateRole(id, data);
    if (!updatedRole) {
        throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return updatedRole;
};

/**
 * Eliminar (desactivar) un rol
 * @param {number} id - ID del rol
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra el rol
 */
export const deleteRoleService = async (id) => {
    const deleted = await RoleRepository.inactiveRole(id);
    if (!deleted) {
        throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return { message: "Role deleted successfully" };
};

