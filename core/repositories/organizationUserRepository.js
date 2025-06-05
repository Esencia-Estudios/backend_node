import models from "../models/index.js";

const { OrganizationUserModel } = models;

export const findOrganizationUser = async (where) => {
  const orgUser = await OrganizationUserModel?.findOne({
    where: { is_active: true, ...where },
  });

  return orgUser;
};
