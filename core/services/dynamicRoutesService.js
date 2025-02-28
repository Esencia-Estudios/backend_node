import * as dynamicRoutesRepository from '../repositories/dynamicRoutesRepository.js';
import { NotFoundError } from '../helpers/errorHandler.js';
import { ResponseHelper } from '../helpers/response.js';

export const getDynamicRoutes = async () => {
    try {
        const dynamicRoutes = await dynamicRoutesRepository.getDynamicRoutes();
        if (!dynamicRoutes) throw new NotFoundError('Dynamic routes not found');
        return ResponseHelper.success(dynamicRoutes);
    } catch (err) {
        throw err;
    }
}

export const createDynamicRoute = async (dynamicRouteData) => {
    try {
        const dynamicRoute = await dynamicRoutesRepository.createDynamicRoute(dynamicRouteData);
        if (!dynamicRoute) throw new Error('Dynamic route cannot be created');
        return ResponseHelper.success(dynamicRoute);
    } catch (err) {
        throw err;
    }
}

export const updateDynamicRoute = async (id, dynamicRouteData) => {
    try {
        const dynamicRoute = await dynamicRoutesRepository.updateDynamicRoute(id, dynamicRouteData);
        if (!dynamicRoute) throw new Error('Dynamic route cannot be updated');
        return ResponseHelper.success(dynamicRoute);
    } catch (err) {
        throw err;
    }
}

export const deleteDynamicRoute = async (id) => {
    try {
        await dynamicRoutesRepository.deleteDynamicRoute(id);
        return ResponseHelper.success(null, "Dynamic route deleted");
    } catch (err) {
        throw err;
    }
}