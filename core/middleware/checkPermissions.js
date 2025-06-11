import { getPermissionsEffectiveService } from "../services/organizationUserService.js";

export const checkPermissions = async ({
  userId,
  organizationId,
  requiredPermissions = [],
}) => {
  const effectivePermissions = await getPermissionsEffectiveService(
    userId,
    organizationId
  );

  const hasAllPermissions = requiredPermissions.every((permission) =>
    effectivePermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    const error = new Error("No autorizado");
    error.statusCode = 403;
    throw error;
  }
};
