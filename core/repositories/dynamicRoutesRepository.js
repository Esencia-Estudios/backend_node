import models from "../models/index.js";

export const getDynamicRoutes = async () => {
  return await models?.DynamicRouteModel.findAll();
};

export const createDynamicRoute = async (dynamicRouteData) => {
  return await models?.DynamicRouteModel.create(dynamicRouteData);
};

export const updateDynamicRoute = async (id, dynamicRouteData) => {
  const updatedFields = Object.fromEntries(
    Object.entries(dynamicRouteData).filter(([_, value]) => value !== undefined)
  );

  await models?.DynamicRouteModel.update(updatedFields, {
    where: { id },
  });

  return await models?.DynamicRouteModel.findByPk(id);
};

export const deleteDynamicRoute = async (id) => {
  return await models?.DynamicRouteModel.destroy({
    where: { id },
  });
};

export const findDynamicRouteById = async (id) => {
  return await models?.DynamicRouteModel.findByPk(id);
};
