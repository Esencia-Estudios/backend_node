import models from "../models/index.js";
import bcrypt from "bcryptjs";
import { ValidationError } from "../helpers/errorHandler.js";
import { findOrganization } from "./organizationRepository.js";

export const checkUserInDatabase = async ({ username, password }) => {
  const user = await models?.UserModel.findOne({
    where: { username },
    include: [
      {
        model: models?.RoleModel,
        through: { attributes: [] },
        as: "roles",
        include: {
          model: models?.PermissionModel,
          through: { attributes: [] },
          as: "permissions",
        },
      },
      {
        model: models?.UserInfoModel,
        as: "userInfo",
      },
      {
        model: models?.UserWorkInfoModel,
        as: "userWorkInfo",
      },
    ],
  });

  if (!user) throw new ValidationError("User does not exist in database");
  if (password) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ValidationError("Password is incorrect");
  }

  if (user || (password && isPasswordValid && user)) {
    let response = {};
    const user_organization = user?.roles?.find(
      (x) => x?.name === "organization_owner"
    );

    const is_organization_owner = Boolean(user_organization?.id);
    const organization = await findOrganization({ email: user?.email });

    response = {
      is_organization_owner,
      organization,
      ...user.dataValues,
    };

    return response;
  }
};

export const changePasswordInDB = async ({ username, newPassword }) => {
  try {
    const user = await models?.UserModel.findOne({ where: { username } });
    await user.update({ password: newPassword });
    await models?.UserModel.findOne({ where: { username } });
  } catch (error) {
    console.error("Error changing password in database");
    throw error;
  }
};
