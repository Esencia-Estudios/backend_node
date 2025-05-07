import * as requirementService from "../services/requestService.js";
import { ResponseHelper } from "../helpers/response.js";

export const getRequirements = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const requirements = await requirementService.getRequirements();
        return ResponseHelper.success(requirements);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const getRequirementById = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const requirement = await requirementService.getRequirementById(id);
        return ResponseHelper.success(requirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const createRequirement = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const requirementData = JSON.parse(event.body);
        const newRequirement = await requirementService.createRequirement(requirementData);
        return ResponseHelper.success(newRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const updateRequirement = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const requirementData = JSON.parse(event.body);
        const updatedRequirement = await requirementService.updateRequirement(id, requirementData);
        return ResponseHelper.success(updatedRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const deleteRequirement = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { id } = event.pathParameters;
        const deletedRequirement = await requirementService.deleteRequirement(id);
        return ResponseHelper.success(deletedRequirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const findByCompany = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { company } = event.pathParameters;
        const requirements = await requirementService.findByCompany(company);
        return ResponseHelper.success(requirements);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};

export const findByEmail = async (event) => {

    const authError = authMiddleware(event);
    if (authError) return authError;

    try {
        const { email } = event.pathParameters;
        const requirement = await requirementService.findByEmail(email);
        return ResponseHelper.success(requirement);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
};
