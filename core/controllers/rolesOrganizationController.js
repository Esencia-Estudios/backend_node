import {
    getAllRolesService,
    getRoleByIdService,
    createRoleService,
    updateRoleService,
    deleteRoleService,
} from "../services/rolesOrganizationService.js";
import { ResponseHelper } from "../helpers/response.js";

/**
 * Obtener todos los roles
 */
export const getRoles = async (event) => {

    try {
        const roles = await getAllRolesService();
        return ResponseHelper.success(roles);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Obtener rol por ID
 */
export const getRoleById = async (event) => {

    try {
        const { id } = event.pathParameters;
        const role = await getRoleByIdService(id);
        return ResponseHelper.success(role);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Crear nuevo rol
 */
export const createRole = async (event) => {

    try {
        const data = JSON.parse(event.body);
        const newRole = await createRoleService(data);
        return ResponseHelper.success(newRole);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Actualizar rol
 */
export const updateRole = async (event) => {

    try {
        const { id } = event.pathParameters;
        const data = JSON.parse(event.body);
        const updatedRole = await updateRoleService(id, data);
        return ResponseHelper.success(updatedRole);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Eliminar (desactivar) rol
 */
export const deleteRole = async (event) => {

    try {
        const { id } = event.pathParameters;
        const result = await deleteRoleService(id);
        return ResponseHelper.success(result);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
