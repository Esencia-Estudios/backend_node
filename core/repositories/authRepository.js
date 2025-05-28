import models from "../models/index.js";
import bcrypt from "bcryptjs";
import { ValidationError } from "../helpers/errorHandler.js";

export const checkUserInDatabase = async ({ username, password }) => {
  const validUser = await models?.UserModel.findOne({
    where: { username },
  });

  if (!validUser) throw new ValidationError("User does not exist in database");
  if (password) {
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) throw new ValidationError("Password is incorrect");
  }

  if (validUser || (password && isPasswordValid && validUser)) {
    const user = await models?.UserModel.findByPk(validUser?.id, {
      include: [
        {
          model: models?.UserInfoModel,
          as: "userInfo",
        },
        {
          model: models?.UserWorkInfoModel,
          as: "userWorkInfo",
        },
        {
          model: models.OrganizationUserModel,
          as: "organizations",
          where: { is_active: true },
          attributes: ["id", "organization_id"],
          include: [
            {
              model: models.OrganizationModel,
              as: "organization",
              attributes: ["id", "name", "email", "is_active", "created_at"],
              include: [
                {
                  model: models.OrganizationsSettingModel,
                  as: "settings",
                  attributes: ["key", "value"],
                },
              ],
            },
            {
              model: models.RoleModel,
              as: "role",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    const organizations = user.organizations.map((o) => {
      const org = o.organization.toJSON();

      return {
        id: org.id,
        name: org.name,
        email: org.email,
        is_active: org.is_active,
        created_at: org.created_at,
        role: o.role,
        settings: Object.fromEntries(
          org.settings.map((setting) => [setting.key, setting.value])
        ),
      };
    });

    return {
      ...user.toJSON(),
      organizations,
    };
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
