import { ResponseHelper as response } from "../helpers/response.js";
import { RoleModel, PermissionModel } from "../models/index.js";


//Roles CRUD
const getRoles = async () => {
    try {
        const roles = await RoleModel.findAll();
        return response.success(roles);
    } catch (error) {
        return response.badRequest(error);
    }
};

const createRole = async (event) => {
    try {
        const roleData = JSON.parse(event.body);
        const role = await RoleModel.create(roleData);
        return response.success(role);
    } catch (error) {
        return response.badRequest(error);
    }
};

const updateRole = async (event) => {
    try {
        const { id } = event.pathParameters;
        const roleData = JSON.parse(event.body);

        const role = await RoleModel.findByPk(id);
        const lastRoleName = role.name;
        if (!role) {
            return response.notFound("Role no encontrado");
        }

        const updatedFields = {};
        for (const [key, value] of Object.entries(roleData)) {
            if (value !== undefined) {
                updatedFields[key] = value;
            }
        }

        await role.update(updatedFields);

        return response.success({
            message: `Role: ${lastRoleName}, has been updated.`,
            role
        });
    } catch (error) {
        return response.badRequest(error);
    }
};

const deleteRole = async (event) => {
    try {
        const { id } = event.pathParameters;
        const role = await RoleModel.findByPk(id);
        if (!role) {
            return response.notFound("Role not found");
        }
        await role.destroy();
        return response.success("Role deleted");
    } catch (error) {
        return response.badRequest(error);
    }
};

//Permissions CRUD
const getPermissions = async () => {
    try {
        const permissions = await PermissionModel.findAll();
        return response.success(permissions);
    } catch (error) {
        return response.badRequest(error);
    }
};

const createPermission = async (event) => {
    try {
        const permissionData = JSON.parse(event.body);
        const permission = await PermissionModel.create(permissionData);
        return response.success(permission);
    } catch (error) {
        return response.badRequest(error);
    }
};

const updatePermission = async (event) => {
    try {
        const { id } = event.pathParameters;
        const permissionData = JSON.parse(event.body);

        const permission = await PermissionModel.findByPk(id);
        if (!permission) {
            return response.notFound("Permission no encontrado");
        }

        const updatedFields = {};
        for (const [key, value] of Object.entries(permissionData)) {
            if (value !== undefined) {
                updatedFields[key] = value;
            }
        }

        await permission.update(updatedFields);

        return response.success({
            message: `Permission: ${permission.name}, has been updated.`,
            permission
        });
    } catch (error) {
        return response.badRequest(error);
    }
};

const deletePermission = async (event) => {
    try {
        const { id } = event.pathParameters;
        const permission = await PermissionModel.findByPk(id);
        if (!permission) {
            return response.notFound("Permission no encontrado");
        }
        await permission.destroy();
        return response.success("Permission deleted");
    } catch (error) {
        return response.badRequest(error);
    }
};


//assign permissions to roles

const assignPermissionsToRole = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { permissionIds } = JSON.parse(event.body);

        const role = await RoleModel.findByPk(id);
        if (!role) {
            return response.notFound("Role no encontrado");
        }

        const permissions = await PermissionModel.findAll({
            where: { id: permissionIds }
        });

        if (permissions.length !== permissionIds.length) {
            return response.badRequest("Algunos permisos no existen");
        }

        await role.setPermissions(permissions);

        return response.success({
            message: `Permisos asignados al rol ${role.name}`,
            role,
            assignedPermissions: permissions
        });
    } catch (error) {
        return response.badRequest(error);
    }
};

//get role with permissions
const getRoleWithPermissions = async (event) => {
    try {
        const { id } = event.pathParameters;

        const role = await RoleModel.findByPk(id, {
            include: {
                model: PermissionModel,
                through: { attributes: [] }
            }
        });

        if (!role) {
            return response.notFound("Role no encontrado");
        }

        return response.success(role);
    } catch (error) {
        return response.badRequest(error);
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
    getRoleWithPermissions
}