import { getRoles, getPermissionsByRole, createRole, updateRole, deleteRole, getPermissions, createPermission, updatePermission, deletePermission, getRoleWithPermissions, assignPermissionsToRole, toggleOrCreatePermissionsForRole } from "../controllers/rolesPermissions.js";

export {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission,
    getPermissionsByRole,
    getRoleWithPermissions,
    assignPermissionsToRole,
    toggleOrCreatePermissionsForRole,
};
