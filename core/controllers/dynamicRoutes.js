import { ResponseHelper } from "../helpers/response.js";
import * as dynamicRoutesService from "../services/dynamicRoutesService.js";
import { validateDynamicRouteSchema } from "../validations/dynamicRoutesValidations.js";
import { validateDynamicRoute } from "../validators/dynamicRoutesValidators.js"


export const getDynamicRoutes = async () => {
    try {
        return await dynamicRoutesService.getDynamicRoutes();
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const createDynamicRoute = async (event) => {
    try {
        const { body } = event;
        const dynamicRouteData = JSON.parse(body);
        await validateDynamicRouteSchema(dynamicRouteData);
        return await dynamicRoutesService.createDynamicRoute(dynamicRouteData);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const updateDynamicRoute = async (event) => {
    try {
        const { id } = event.pathParameters;
        await validateDynamicRoute(id)
        const { body } = event;
        const dynamicRouteData = JSON.parse(body);
        await validateDynamicRouteSchema(dynamicRouteData);
        return await dynamicRoutesService.updateDynamicRoute(id, dynamicRouteData);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}

export const deleteDynamicRoute = async (event) => {
    try {
        const { id } = event.pathParameters;
        await validateDynamicRoute(id)
        return await dynamicRoutesService.deleteDynamicRoute(id);
    } catch (error) {
        return ResponseHelper.handleError(error);
    }
}