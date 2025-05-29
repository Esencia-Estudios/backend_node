import {
  getAllOrganizationModulesService,
  getOrganizationModuleByIdService,
  createOrganizationModuleService,
  updateOrganizationModuleService,
  deleteOrganizationModuleService,
  getModulesByOrganizationIdService,
} from "../services/organizationModuleService.js";
// import { authMiddleware } from "../middleware/validateBasicAuth.js";
import { ResponseHelper } from "../helpers/response.js";

/**
 * Obtener todos los módulos de organización
 */
export const getOrganizationModules = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const modules = await getAllOrganizationModulesService();
    return ResponseHelper.success(modules);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

/**
 * Obtener módulo de organización por ID
 */
export const getOrganizationModuleById = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const { id } = event.pathParameters;
    const module = await getOrganizationModuleByIdService(id);
    return ResponseHelper.success(module);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

/**
 * Crear nuevo módulo de organización
 */
export const createOrganizationModule = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const data = JSON.parse(event.body);
    const newModule = await createOrganizationModuleService(data);
    return ResponseHelper.success(newModule);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

/**
 * Actualizar módulo de organización
 */
export const updateOrganizationModule = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const { id } = event.pathParameters;
    const data = JSON.parse(event.body);
    const updatedModule = await updateOrganizationModuleService(id, data);
    return ResponseHelper.success(updatedModule);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

/**
 * Eliminar (desactivar) módulo de organización
 */
export const deleteOrganizationModule = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const { id } = event.pathParameters;
    const result = await deleteOrganizationModuleService(id);
    return ResponseHelper.success(result);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};

/**
 * Obtener todos los módulos por ID de organización
 */
export const getModulesByOrganizationId = async (event) => {
  // const authError = authMiddleware(event);
  // if (authError) return authError;

  try {
    const { organization_id } = event.pathParameters;
    const modules = await getModulesByOrganizationIdService(organization_id);
    return ResponseHelper.success(modules);
  } catch (error) {
    return ResponseHelper.handleError(error);
  }
};
