import { NotFoundError } from "../helpers/errorHandler.js";
import { findOrganizationUser } from "../repositories/organizationUserRepository.js";
import { RolesPermissionsRepository } from "../repositories/rolesPermissionsRepository.js";
import { getUserPermissions } from "../repositories/userRepository.js";

/**
 * Obtener todos los permisos efectivos del usuario por organización
 * @param {number} orgId - ID de la organización
 * @param {string} userId - ID del usuario
 * @returns {Promise<object>}
 * @throws {NotFoundError} Si no se encuentra la organización
 */
export const getPermissionsEffectiveService = async (orgId, userId) => {
  const where = {
    user_id: userId,
    organization_id: orgId,
  };
  const orgUser = await findOrganizationUser(where);
  if (!orgUser) {
    throw new NotFoundError("Usuario no pertenece a la organización.");
  }

  const roleId = orgUser?.role_id;

  const rolesPermissionsRepository = new RolesPermissionsRepository();
  const rolePermissions = await rolesPermissionsRepository.getRolePermissions(
    roleId
  );

  const effectivePermissions = new Set();

  rolePermissions.forEach((rp) => {
    if (rp.permission && rp.permission.codename) {
      effectivePermissions.add(rp.permission.codename);
    }
  });

  const userOverrides = await getUserPermissions(userId);

  userOverrides.forEach((override) => {
    const key = override.permission && override.permission.key;
    if (!key) return;

    if (override.granted) {
      effectivePermissions.add(key);
    } else {
      effectivePermissions.delete(key);
    }
  });

  return Array.from(effectivePermissions);
};
