import { sendEmail } from "../helpers/mailer.js";
import { newRequirementTemplate } from "../helpers/templateRequest.js";
import * as requirementRepository from "../repositories/requestRepository.js";

export const createRequirement = async (requirementData) => {
    const newRequirement = await requirementRepository.createRequirement(requirementData);;
    if (newRequirement) {
        await sendEmail("soporteesenciaestudio@gmail.com",
            "Nueva solicitud",
            newRequirementTemplate({
                companyName: newRequirement.company,
                clientName: newRequirement.fullName,
                clientEmail: newRequirement.email,
                clientPhone: newRequirement.phoneNumber,
                budget: newRequirement.estimatedBudget,
                estimatedTime: newRequirement.projectSchedule,
                clientMessage: newRequirement.requirementDetails,
            }));
    }
    return newRequirement
};

export const updateRequirement = async (id, requirementData) => {
    return await requirementRepository.updateRequirement(id, requirementData);
};

export const getRequirements = async () => {
    return await requirementRepository.getRequirements();
};

export const getRequirementById = async (id) => {
    return await requirementRepository.getRequirementById(id);
};

export const deleteRequirement = async (id) => {
    return await requirementRepository.deleteRequirement(id);
};

export const findByCompany = async (company) => {
    return await requirementRepository.findByCompany(company);
};

export const findByEmail = async (email) => {
    return await requirementRepository.findByEmail(email);
};
