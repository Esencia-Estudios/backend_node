import { RolesPermissionsRepository } from '../repositories/rolesPermissionsRepository.js';
import { NotFoundError } from '../helpers/errorHandler.js';
import { ResponseHelper } from '../helpers/response.js';

const rolesPermissionsRepository = new RolesPermissionsRepository();


// Roles
export const getRoles = async () => {
    try {
        const roles = await rolesPermissionsRepository.getRoles();
        if (!roles) {
            throw new NotFoundError('Roles not found');
        }
        return ResponseHelper.success(roles);
    } catch (error) {
        throw error
    }

};

export const createRole = async (roleData) => {
    try {
        const role = await rolesPermissionsRepository.createRole(roleData);
        if (!role) {
            throw new Error('Role cannot be created');
        }
        return ResponseHelper.success(role);
    } catch (error) {
        throw error;
    }

};

export const updateRole = async (id, roleData) => {
    try {
        const role = await rolesPermissionsRepository.updateRole(id, roleData);
        if (!role) {
            throw new NotFoundError('Role not found');
        }
        return ResponseHelper.success(role);
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id) => {
    try {
        await rolesPermissionsRepository.deleteRole(id);
        return ResponseHelper.success(null, "Role deleted");
    } catch (error) {
        throw error;
    }
};

// Permissions
export const getPermissions = async () => {
    try {
        const permissions = await rolesPermissionsRepository.getPermissions();
        if (!permissions) {
            throw new NotFoundError('Permissions not found');
        }
        return ResponseHelper.success(permissions);
    } catch (error) {
        throw error;
    }
};

export const createPermission = async (permissionData) => {
    try {
        const permission = await rolesPermissionsRepository.createPermission(permissionData);
        if (!permission) {
            throw new Error('Permission cannot be created');
        }
        return ResponseHelper.success(permission);
    } catch (error) {
        throw error;
    }
};

export const updatePermission = async (id, permissionData) => {
    try {
        const permission = await rolesPermissionsRepository.updatePermission(id, permissionData);
        if (!permission) {
            throw new NotFoundError('Permission not found');
        }
        return ResponseHelper.success(permission);
    } catch (error) {
        throw error;
    }
};

export const deletePermission = async (id) => {
    try {
        await rolesPermissionsRepository.deletePermission(id);
        return ResponseHelper.success(null, "Permission deleted");
    } catch (error) {
        throw error;
    }
};


//assign permissions to roles

export const assignPermissionsToRole = async (id, permissionIds) => {
    try {
        const role = await rolesPermissionsRepository.assignPermissionsToRole(id, permissionIds);
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        console.log(role);
        return ResponseHelper.success({
            message: `Permissions assigned to role ${role.name}`,
            role,
            assignedPermissions: permissionIds
        });
    } catch (error) {
        throw error;
    }
};

//get role with permissions
export const getRoleWithPermissions = async (id) => {
    try {
        const role = await rolesPermissionsRepository.getRoleWithPermissions(id);
        if (!role) {
            throw new NotFoundError('Role not found');
        }
        return ResponseHelper.success(role);
    } catch (error) {
        throw error;
    }
};