import { DynamicRouteModel } from "../models/index.js"


export const getDynamicRoutes = async () => {
    return await DynamicRouteModel.findAll()
}

export const createDynamicRoute = async (dynamicRouteData) => {
    return await DynamicRouteModel.create(dynamicRouteData);
}

export const updateDynamicRoute = async (id, dynamicRouteData) => {

    const updatedFields = Object.fromEntries(
        Object.entries(dynamicRouteData).filter(([_, value]) => value !== undefined)
    );

    await DynamicRouteModel.update(updatedFields, {
        where: { id },
    });

    return await DynamicRouteModel.findByPk(id);
}

export const deleteDynamicRoute = async (id) => {
    return await DynamicRouteModel.destroy({
        where: { id },
    });
}

export const findDynamicRouteById = async (id) => {
    return await DynamicRouteModel.findByPk(id);
}