import models from "../models/index.js";

const { RoleModel } = models;

/**
 * Obtiene todos los roles
 */
export const getAllRoles = async () => {
    return await RoleModel.findAll();
};

/**
 * Obtiene un rol por su ID (solo si está activo)
 * @param {number} id
 */
export const getRoleById = async (id) => {
    return await RoleModel.findByPk(id, {
        where: { is_active: true },
    });
};

/**
 * Crea un nuevo rol
 * @param {object} roleData
 */
export const createRole = async (roleData) => {
    const role = await RoleModel.create(roleData);
    return role;
};

/**
 * Actualiza un rol por su ID (solo si está activo)
 * @param {number} id
 * @param {object} updateData
 */
export const updateRole = async (id, updateData) => {
    const role = await RoleModel.findByPk(id, {
        where: { is_active: true },
    });
    if (!role) return null;
    await role.update(updateData);
    return role;
};

/**
 * Inactiva un rol (soft delete)
 * @param {number} id
 */
export const inactiveRole = async (id) => {
    const role = await RoleModel.findByPk(id, {
        where: { is_active: true },
    });
    if (!role) throw new Error("Role not found");

    role.is_active = 0;
    await role.save();

    return role;
};
