import models from "../models/index.js";
import { CORE_PERMISSIONS } from "@esenciaestudios/shared-package";

const { OrganizationUserModel } = models;

export const findOrganizationUser = async (where) => {
  const data = CORE_PERMISSIONS;
  console.log("data quiero ver que llego", data);

  const orgUser = await OrganizationUserModel?.findOne({
    where: { is_active: true, ...where },
  });

  return orgUser;
};
