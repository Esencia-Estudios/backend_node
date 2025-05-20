import models from "../models/index.js";
import { NotFoundError } from "../helpers/errorHandler.js";
const { RoleModel, PermissionModel } = models;
class RolesPermissionsRepository {
  constructor() {
    this.roleModel = RoleModel;
    this.permissionModel = PermissionModel;
  }

  async findRoles(where) {
    return await this.roleModel.findAll({
      where,
    });
  }
  //Roles
  async getRoles() {
    return await this.roleModel.findAll();
  }

  async createRole(roleData) {
    return await this.roleModel.create(roleData);
  }

  async updateRole(id, roleData) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new Error("Role not found");
    }

    const updatedFields = {};
    for (const [key, value] of Object.entries(roleData)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }

    return await role.update(updatedFields);
  }

  async deleteRole(id) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return await role.destroy();
  }

  //Permissions
  async getPermissions() {
    return await this.permissionModel.findAll();
  }

  async createPermission(permissionData) {
    return await this.permissionModel.create(permissionData);
  }

  async updatePermission(id, permissionData) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }

    const updatedFields = {};
    for (const [key, value] of Object.entries(permissionData)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }
    return await permission.update(updatedFields);
  }

  async deletePermission(id) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }
    return await permission.destroy();
  }

  //assign permissions to roles

  async assignPermissionsToRole(id, permissionIds) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundError("Role not found");
    }

    const permissions = await this.permissionModel.findAll({
      where: { id: permissionIds },
    });

    if (permissions.length !== permissionIds.length) {
      throw new NotFoundError("Some permissions not found");
    }

    await role.setPermissions(permissions);

    return role;
  }

  //get role with permissions
  async getRoleWithPermissions(id) {
    const role = await this.roleModel.findByPk(id, {
      include: {
        model: this.permissionModel,
        through: { attributes: [] },
      },
    });

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return role;
  }
}

export { RolesPermissionsRepository };
