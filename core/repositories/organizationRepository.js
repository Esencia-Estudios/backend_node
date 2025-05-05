import models from "../models/index.js";

const { OrganizationModel } = models;

/**
 * Obtener organización por su ID
 * @param {number} id - ID de la organización
 * @returns {Promise<OrganizationModel|null>}
 */
export const getOrganizationById = async (id) => {
    return await OrganizationModel.findByPk(id, {
        where: { isActive: true },
    });
};

/**
 * Crear una nueva organización
 * @param {object} organizationData - Datos de la nueva organización
 * @returns {Promise<OrganizationModel>}
 */
export const createOrganization = async (organizationData) => {
    const newOrganization = await OrganizationModel.create(organizationData);
    return await getOrganizationById(newOrganization.id);
};

/**
 * Obtener todas las organizaciones activas
 * @returns {Promise<Array<OrganizationModel>>}
 */
export const getAllOrganizations = async () => {
    return await OrganizationModel.findAll({
        where: { isActive: true },
    });
};

/**
 * Actualizar una organización existente
 * @param {number} id - ID de la organización
 * @param {object} updateData - Datos a actualizar
 * @returns {Promise<OrganizationModel|null>}
 */
export const updateOrganization = async (id, updateData) => {
    const organization = await OrganizationModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!organization) return null;
    await organization.update(updateData);
    return organization;
};

/**
 * Eliminar (desactivar) una organización
 * @param {number} id - ID de la organización
 * @returns {Promise<OrganizationModel>}
 * @throws {Error} Si no se encuentra la organización
 */
export const deleteOrganization = async (id) => {
    const organization = await OrganizationModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!organization) throw new Error("Organization not found");

    organization.isActive = false;
    await organization.save();

    return organization;
};
