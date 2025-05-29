import models from "../models/index.js";

const { OrganizationModuleModel } = models;

/**
 * Buscar un módulo de organización por condición
 * @param {object} where - Condiciones de búsqueda
 * @returns {Promise<OrganizationModuleModel|{}>}
 */
export const findOrganizationModules = async (where) => {
  const modules = await OrganizationModuleModel.findAll({
    where: { is_active: true, ...where },
  });

  return modules;
};

/**
 * Obtener módulo de organización por su ID
 * @param {number} id - ID del registro
 * @returns {Promise<OrganizationModuleModel|null>}
 */
export const getOrganizationModuleById = async (id) => {
  return await OrganizationModuleModel.findByPk(id, {
    where: { is_active: true },
  });
};

/**
 * Crear un nuevo módulo de organización
 * @param {object} data - Datos del nuevo registro
 * @returns {Promise<OrganizationModuleModel>}
 */
export const createOrganizationModule = async (data) => {
  const newModule = await OrganizationModuleModel.create(data);
  return await getOrganizationModuleById(newModule.id);
};

/**
 * Obtener todos los módulos de organización activos
 * @returns {Promise<Array<OrganizationModuleModel>>}
 */
export const getAllOrganizationModules = async () => {
  return await OrganizationModuleModel.findAll({
    where: { is_active: true },
  });
};

/**
 * Actualizar un módulo de organización
 * @param {number} id - ID del registro
 * @param {object} updateData - Datos a actualizar
 * @returns {Promise<OrganizationModuleModel|null>}
 */
export const updateOrganizationModule = async (id, updateData) => {
  const module = await OrganizationModuleModel.findByPk(id, {
    where: { is_active: true },
  });
  if (!module) return null;

  await module.update(updateData);
  return module;
};

/**
 * Eliminar (desactivar) un módulo de organización
 * @param {number} id - ID del registro
 * @returns {Promise<OrganizationModuleModel>}
 * @throws {Error} Si no se encuentra el registro
 */
export const deleteOrganizationModule = async (id) => {
  const module = await OrganizationModuleModel.findByPk(id, {
    where: { is_active: true },
  });
  if (!module) throw new Error("Organization Module not found");

  module.is_active = false;
  await module.save();

  return module;
};
