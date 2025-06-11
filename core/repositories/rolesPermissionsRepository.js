import models from "../models/index.js";
import { NotFoundError } from "../helpers/errorHandler.js";
import { Sequelize } from "sequelize";
const {
  RoleModel,
  PermissionModel,
  ModuleModel,
  SubModuleModel,
  RolePermissionsModel,
} = models;
class RolesPermissionsRepository {
  constructor() {
    this.roleModel = RoleModel;
    this.permissionModel = PermissionModel;
    this.rolePermissionsModel = RolePermissionsModel;
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

  async findRoleById(id) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundError("Role not found");
    }
    return role;
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
    return await this.permissionModel.findAll({
      attributes: [
        "id",
        "name",
        "codename",
        "module",
        [Sequelize.col("moduleData.name"), "module_name"],
        "sub_module",
        [Sequelize.col("subModuleData.name"), "submodule_name"],
        "type",
        "is_active",
      ],
      include: [
        {
          model: ModuleModel,
          as: "moduleData",
          attributes: [],
        },
        {
          model: SubModuleModel,
          as: "subModuleData",
          attributes: [],
        },
      ],
      raw: true,
    });
  }

  async findPermissionById(id) {
    const permission = await this.permissionModel.findByPk(id);
    if (!permission) {
      throw new NotFoundError("Permission not found");
    }
    return permission;
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
        as: "permissions",
      },
    });

    if (!role) {
      throw new NotFoundError("Role not found");
    }

    return role;
  }
  async getRolePermissions(role_id) {
    const roles = await this.rolePermissionsModel.findAll({
      where: { role_id },
      include: {
        model: this.permissionModel,
        as: "permission",
      },
    });

    if (!roles) {
      throw new NotFoundError("Roles not found");
    }

    return roles;
  }

  async toggleOrCreateRolePermission(role_id, permission_id, is_active = null) {
    // Busca registro
    const existingRecord = await this.rolePermissionsModel.findOne({
      where: { role_id, permission_id },
      attributes: ['role_id', 'permission_id', 'is_active'],
      raw: true,
    });

    if (!existingRecord) {
      const newRecord = await this.rolePermissionsModel.create({
        role_id,
        permission_id,
        is_active: false,
      });
      console.log("🎉 Registro creado con is_active:", newRecord.is_active);
      return newRecord;
    }

    const newValue = is_active !== null ? is_active : !existingRecord.is_active;

    await this.rolePermissionsModel.update(
      { is_active: newValue },
      { where: { role_id, permission_id } }
    );

    const updatedRecord = await this.rolePermissionsModel.findOne({
      where: { role_id, permission_id },
      attributes: ['role_id', 'permission_id', 'is_active'],
      raw: true,
    });

    console.log("✅ is_active actualizado a:", updatedRecord.is_active);

    return updatedRecord;
  }




}

export { RolesPermissionsRepository };
