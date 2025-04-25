import models from "../models/index.js";

const { RequirementModel } = models;

// Obtener todos los requerimientos
export const getRequirements = async () => {
    return await RequirementModel.findAll({
        where: { isActive: true },
    });
};

export const getRequirementById = async (id) => {
    return await RequirementModel.findByPk(id, {
        where: { isActive: true },
    });
};

export const createRequirement = async (requirementData) => {
    const newRequirement = await RequirementModel.create(requirementData);
    return await getRequirementById(newRequirement.id);
};

export const updateRequirement = async (id, requirementData) => {
    const requirement = await RequirementModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!requirement) throw new Error("Requirement not found");

    await requirement.update(requirementData);
    return await getRequirementById(id);
};

export const deleteRequirement = async (id) => {
    const requirement = await RequirementModel.findByPk(id, {
        where: { isActive: true },
    });
    if (!requirement) throw new Error("Requirement not found");

    requirement.isActive = 0;
    await requirement.save();

    return requirement;
};

export const findByCompany = async (company) => {
    return await RequirementModel.findAll({
        where: { company, isActive: true },
    });
};

export const findByEmail = async (email) => {
    return await RequirementModel.findOne({
        where: { email, isActive: true },
    });
};

