import { RolesPermissionsRepository } from "../repositories/rolesPermissionsRepository.js";
import { NotFoundError } from "../helpers/errorHandler.js";
import { ResponseHelper } from "../helpers/response.js";

const rolesPermissionsRepository = new RolesPermissionsRepository();

// Roles
export const findRole = async (where) => {
  const role = await rolesPermissionsRepository.findRoles(where);
  if (!role) {
    throw new NotFoundError("Role not found");
  }

  return role[0];
};

export const getRoles = async () => {
  const roles = await rolesPermissionsRepository.getRoles();
  if (!roles) {
    throw new NotFoundError("Roles not found");
  }
  return ResponseHelper.success(roles);
};

export const createRole = async (roleData) => {
  const role = await rolesPermissionsRepository.createRole(roleData);
  if (!role) {
    throw new Error("Role cannot be created");
  }
  return ResponseHelper.success(role);
};

export const updateRole = async (id, roleData) => {
  const role = await rolesPermissionsRepository.updateRole(id, roleData);
  if (!role) {
    throw new NotFoundError("Role not found");
  }
  return ResponseHelper.success(role);
};

export const deleteRole = async (id) => {
  await rolesPermissionsRepository.deleteRole(id);
  return ResponseHelper.success(null, "Role deleted");
};

// Permissions
export const getPermissions = async () => {
  const permissions = await rolesPermissionsRepository.getPermissions();
  if (!permissions) {
    throw new NotFoundError("Permissions not found");
  }
  return ResponseHelper.success(permissions);
};

export const createPermission = async (permissionData) => {
  const permission = await rolesPermissionsRepository.createPermission(
    permissionData
  );
  if (!permission) {
    throw new Error("Permission cannot be created");
  }
  return ResponseHelper.success(permission);
};

export const updatePermission = async (id, permissionData) => {
  const permission = await rolesPermissionsRepository.updatePermission(
    id,
    permissionData
  );
  if (!permission) {
    throw new NotFoundError("Permission not found");
  }
  return ResponseHelper.success(permission);
};

export const deletePermission = async (id) => {
  await rolesPermissionsRepository.deletePermission(id);
  return ResponseHelper.success(null, "Permission deleted");
};

//assign permissions to roles

export const assignPermissionsToRole = async (id, permissionIds) => {
  const role = await rolesPermissionsRepository.assignPermissionsToRole(
    id,
    permissionIds
  );
  if (!role) {
    throw new NotFoundError("Role not found");
  }

  console.log(role);
  return ResponseHelper.success({
    message: `Permissions assigned to role ${role.name}`,
    role,
    assignedPermissions: permissionIds,
  });
};

//get role with permissions
export const getRoleWithPermissions = async (id) => {
  const role = await rolesPermissionsRepository.getRoleWithPermissions(id);
  if (!role) {
    throw new NotFoundError("Role not found");
  }
  return ResponseHelper.success(role);
};

export const toggleOrCreatePermissionsForRole = async (role_id, permissionsData) => {
  // Validar existencia del rol
  const role = await rolesPermissionsRepository.findRoleById(role_id);
  if (!role) {
    throw new NotFoundError("Role not found");
  }

  if (!permissionsData || !Array.isArray(permissionsData) || permissionsData.length === 0) {
    throw new Error("At least one permission data must be provided");
  }

  // Procesar cada permiso con su estado is_active específico
  const results = await Promise.all(
    permissionsData.map(async ({ permission_id, is_active }) => {
      // Validar permiso
      const permission = await rolesPermissionsRepository.findPermissionById(permission_id);
      if (!permission) {
        throw new NotFoundError(`Permission with ID ${permission_id} not found`);
      }

      // Toggle o crear con is_active específico
      const result = await rolesPermissionsRepository.toggleOrCreateRolePermission(
        role_id,
        permission_id,
        is_active
      );

      return result;
    })
  );

  return ResponseHelper.success({
    message: "Permissions toggled/created for role",
    role,
    updatedPermissions: results,
  });
}

//get role with permissions
export const getPermissionByRole = async (id) => {
  const permissionRole = await rolesPermissionsRepository.getRolePermissions(id);
  if (!permissionRole) {
    throw new NotFoundError("Role not found");
  }
  return ResponseHelper.success(permissionRole);
};