import * as dynamicRoutesRepository from '../repositories/dynamicRoutesRepository.js';
import { NotFoundError } from '../helpers/errorHandler.js';

export const validateDynamicRoute = async (id) => {
    const dynamicRoute = await dynamicRoutesRepository.findDynamicRouteById(id);
    if (!dynamicRoute) throw new NotFoundError('Dynamic route with id ' + id + ' not found');
    return true;
};