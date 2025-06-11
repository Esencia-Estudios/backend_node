import { NotFoundError } from "../helpers/errorHandler.js";
import { findOrganizationUser } from "../repositories/organizationUserRepository.js";
import { RolesPermissionsRepository } from "../repositories/rolesPermissionsRepository.js";
import { getUserPermissions } from "../repositories/userRepository.js";

/**
 * Obtener todos los permisos efectivos del usuario por organización
 * @param {number} orgId - ID de la organización
 * @param {string} userId - ID del usuario
 * @param {boolean} [returnFullObjects=false] - Si `true`, devuelve objetos completos de permisos. Si `false` (por defecto), devuelve solo los `codename`.
 * @returns {Promise<Array<string> | Array<object>>}
 * @throws {NotFoundError} Si no se encuentra la organización
 */
export const getPermissionsEffectiveService = async (
  orgId,
  userId,
  returnFullObjects = false
) => {
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
    if (rp.permission) {
      if (returnFullObjects) {
        effectivePermissions.add(rp.permission);
      } else if (rp.permission.codename) {
        effectivePermissions.add(rp.permission.codename);
      }
    }
  });

  const userOverrides = await getUserPermissions(userId);

  userOverrides.forEach((override) => {
    const permission = override.permission;
    if (!permission) return;

    if (override.granted) {
      if (returnFullObjects) {
        effectivePermissions.add(permission);
      } else if (permission.codename) {
        effectivePermissions.add(permission.codename);
      }
    } else {
      if (returnFullObjects) {
        const permToRemove = Array.from(effectivePermissions).find(
          (p) => p.id === permission.id
        );
        if (permToRemove) effectivePermissions.delete(permToRemove);
      } else if (permission.codename) {
        effectivePermissions.delete(permission.codename);
      }
    }
  });

  return Array.from(effectivePermissions);
};

/**
 * Agrupa permisos por módulo y submódulo
 * @param {Array} permissions - Lista de permisos (ejemplo: [{ id: 8, name: "...", codename: "...", module: 1, sub_module: null }, ...])
 * @returns {Object} - Estructura agrupada { moduleId: { name?: string, submodules: { subModuleId?: { permissions: Array } } } }
 */
export const groupPermissionsByModule = (permissions) => {
  const grouped = {};

  permissions.forEach((perm) => {
    const moduleId = perm.module;
    const subModuleId = perm.sub_module;

    if (!grouped[moduleId]) {
      grouped[moduleId] = {
        name: `Módulo ${moduleId}`, // Puedes reemplazar con el nombre real si lo tienes
        submodules: {},
      };
    }

    // Agrupar por submódulo (si existe)
    const submoduleKey = subModuleId || "root"; // "root" para permisos sin submódulo
    if (!grouped[moduleId].submodules[submoduleKey]) {
      grouped[moduleId].submodules[submoduleKey] = {
        name: subModuleId ? `Submódulo ${subModuleId}` : "General",
        permissions: [],
      };
    }

    grouped[moduleId].submodules[submoduleKey].permissions.push(perm);
  });

  return grouped;
};
