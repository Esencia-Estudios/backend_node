import {
    getAllOrganizationsService,
    getOrganizationByIdService,
    createOrganizationService,
    updateOrganizationService,
    deleteOrganizationService,
} from "../services/organizationService.js";
import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { ResponseHelper } from "../helpers/response.js";

/**
 * Obtener todas las organizaciones
 */
export const getOrganizations = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const organizations = await getAllOrganizationsService();
        return ResponseHelper.success(organizations);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Obtener organización por ID
 */
export const getOrganizationById = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const organization = await getOrganizationByIdService(id);
        return ResponseHelper.success(organization);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Crear nueva organización
 */
export const createOrganization = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const data = JSON.parse(event.body);
        const newOrganization = await createOrganizationService(data);
        return ResponseHelper.success(newOrganization);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Actualizar organización
 */
export const updateOrganization = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const data = JSON.parse(event.body);
        const updatedOrganization = await updateOrganizationService(id, data);
        return ResponseHelper.success(updatedOrganization);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

/**
 * Eliminar (desactivar) organización
 */
export const deleteOrganization = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const result = await deleteOrganizationService(id);
        return ResponseHelper.success(result);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
