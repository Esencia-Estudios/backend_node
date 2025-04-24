import * as requirementService from "../services/requestService.js";
import { ResponseHelper } from "../helpers/response.js";

// Obtener todos los requerimientos
export const getRequirements = async (event) => {
    try {
        const requirements = await requirementService.getRequirements();
        return ResponseHelper.success(requirements);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Obtener requerimiento por ID
export const getRequirementById = async (event) => {
    try {
        const { id } = event.pathParameters;
        const requirement = await requirementService.getRequirementById(id);
        return ResponseHelper.success(requirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Crear nuevo requerimiento
export const createRequirement = async (event) => {
    try {
        const requirementData = JSON.parse(event.body);
        const newRequirement = await requirementService.createRequirement(requirementData);
        return ResponseHelper.success(newRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Actualizar requerimiento
export const updateRequirement = async (event) => {
    try {
        const { id } = event.pathParameters;
        const requirementData = JSON.parse(event.body);
        const updatedRequirement = await requirementService.updateRequirement(id, requirementData);
        return ResponseHelper.success(updatedRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Eliminar requerimiento
export const deleteRequirement = async (event) => {
    try {
        const { id } = event.pathParameters;
        const deletedRequirement = await requirementService.deleteRequirement(id);
        return ResponseHelper.success(deletedRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Buscar requerimientos por empresa
export const findByCompany = async (event) => {
    try {
        const { company } = event.pathParameters;
        const requirements = await requirementService.findByCompany(company);
        return ResponseHelper.success(requirements);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Buscar requerimiento por correo
export const findByEmail = async (event) => {
    try {
        const { email } = event.pathParameters;
        const requirement = await requirementService.findByEmail(email);
        return ResponseHelper.success(requirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

// Obtener solo requerimientos activos
export const getActiveRequirements = async (event) => {
    try {
        const requirements = await requirementService.getActiveRequirements();
        return ResponseHelper.success(requirements);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
