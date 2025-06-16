import { ResponseHelper as response } from "../helpers/response.js";
import * as rolesPermissionsService from "../services/rolesPermissionsService.js";
import {
  validateRoleSchema,
  validatePermissionSchema,
} from "../validations/rolesPermissionsValidations.js";

//Roles CRUD

//✓ check
const getRoles = async () => {
  try {
    return await rolesPermissionsService.getRoles();
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const createRole = async (event) => {
  try {
    const roleData = JSON.parse(event.body);
    await validateRoleSchema(roleData);
    return await rolesPermissionsService.createRole(roleData);
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const updateRole = async (event) => {
  try {
    const { id } = event.pathParameters;
    const roleData = JSON.parse(event.body);
    return await rolesPermissionsService.updateRole(id, roleData);
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const deleteRole = async (event) => {
  try {
    const { id } = event.pathParameters;
    return await rolesPermissionsService.deleteRole(id);
  } catch (error) {
    return response.handleError(error);
  }
};

const getPermissions = async () => {
  try {
    return await rolesPermissionsService.getPermissions();
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const createPermission = async (event) => {
  try {
    const { body } = event;
    const permissionData = JSON.parse(body);
    await validatePermissionSchema(permissionData);
    return await rolesPermissionsService.createPermission(permissionData);
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const updatePermission = async (event) => {
  try {
    const { id } = event.pathParameters;
    const permissionData = JSON.parse(event.body);
    return await rolesPermissionsService.updatePermission(id, permissionData);
  } catch (error) {
    return response.handleError(error);
  }
};

//✓ check
const deletePermission = async (event) => {
  try {
    const { id } = event.pathParameters;
    return await rolesPermissionsService.deletePermission(id);
  } catch (error) {
    return response.handleError(error);
  }
};

//assign permissions to roles

const assignPermissionsToRole = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { permissionIds } = JSON.parse(event.body);
    return await rolesPermissionsService.assignPermissionsToRole(
      id,
      permissionIds
    );
  } catch (error) {
    return response.handleError(error);
  }
};

//get role with permissions
const getRoleWithPermissions = async (event) => {
  try {
    const { id } = event.pathParameters;
    return await rolesPermissionsService.getRoleWithPermissions(id);
  } catch (error) {
    return response.handleError(error);
  }
};

//get permission by role
const getPermissionsByRole = async (event) => {
  try {
    const { id } = event.pathParameters;
    return await rolesPermissionsService.getPermissionByRole(id);
  } catch (error) {
    return response.handleError(error);
  }
};

const toggleOrCreatePermissionsForRole = async (event) => {
  try {
    const { id } = event.pathParameters;

    // Ahora recibimos un arreglo de objetos { permission_id, is_active }
    const permissionsData = JSON.parse(event.body);

    // Extraemos los permissionIds y armamos un arreglo con permisos y estados
    // O directamente enviamos el arreglo completo al servicio
    return await rolesPermissionsService.toggleOrCreatePermissionsForRole(
      id,
      permissionsData // Pasamos el arreglo tal cual
    );
  } catch (error) {
    return response.handleError(error);
  }
};



export {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  assignPermissionsToRole,
  getRoleWithPermissions,
  toggleOrCreatePermissionsForRole,
  getPermissionsByRole
};
