import * as requirementRepository from "../repositories/requestRepository.js";

// Crear un nuevo requerimiento
export const createRequirement = async (requirementData) => {
    return await requirementRepository.createRequirement(requirementData);
};

// Actualizar requerimiento
export const updateRequirement = async (id, requirementData) => {
    return await requirementRepository.updateRequirement(id, requirementData);
};

// Obtener todos los requerimientos
export const getRequirements = async () => {
    return await requirementRepository.getRequirements();
};

// Obtener requerimiento por ID
export const getRequirementById = async (id) => {
    return await requirementRepository.getRequirementById(id);
};

// Eliminar requerimiento
export const deleteRequirement = async (id) => {
    return await requirementRepository.deleteRequirement(id);
};

// Buscar requerimientos por empresa
export const findByCompany = async (company) => {
    return await requirementRepository.findByCompany(company);
};

// Buscar requerimiento por correo
export const findByEmail = async (email) => {
    return await requirementRepository.findByEmail(email);
};
