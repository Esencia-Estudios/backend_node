import models from "../models/index.js";
import {
  createUserInCognito,
  updateUserInCognito,
  deleteUserInCognito,
  enableOrDisableUserInCognito,
} from "../helpers/aws.js";

const {
  UserModel,
  RoleModel,
  PermissionModel,
  UserPermissionModel,
  UserInfoModel,
  UserWorkInfoModel,
  OrganizationUserModel,
  OrganizationModel,
  OrganizationsSettingModel,
  ModuleModel,
  SubModuleModel,
} = models;

export const getUsersCount = async () => {
  const count = await UserModel.count();
  return count;
};

export const getUsers = async () => {
  return await UserModel.findAll({
    include: [
      {
        model: RoleModel,
        through: { attributes: [] },
        as: "roles", // ✅ alias definido en la asociación
        include: {
          model: PermissionModel,
          through: { attributes: [] },
          as: "permissions", // ✅ alias definido en la asociación
        },
      },
    ],
  });
};

export const getUserById = async (id) => {
  const user = await UserModel.findByPk(id, {
    include: [
      {
        model: UserInfoModel,
        as: "userInfo",
      },
      {
        model: UserWorkInfoModel,
        as: "userWorkInfo",
      },
      {
        model: OrganizationUserModel,
        as: "organizations",
        where: { is_active: true },
        attributes: ["id", "organization_id"],
        include: [
          {
            model: OrganizationModel,
            as: "organization",
            attributes: ["id", "name", "email", "is_active", "created_at"],
            include: [
              {
                model: OrganizationsSettingModel,
                as: "settings",
                attributes: ["key_option", "value_option"],
              },
            ],
          },
          {
            model: RoleModel,
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
        org.settings.map((setting) => [
          setting.key_option,
          setting.value_option,
        ])
      ),
    };
  });

  return {
    ...user.toJSON(),
    organizations,
  };
};

export const createUser = async (userData) => {
  const { email, password, username, role_ids } = userData;

  const cognitoUser = await createUserInCognito({ email, password, username });
  if (!cognitoUser) throw new Error("Error creating user in Cognito");

  const newUser = await UserModel.create({ ...userData });
  if (role_ids && role_ids.length > 0) {
    await assignRoles(newUser, role_ids);
  }

  return await getUserById(newUser.id);
};

export const updateUser = async (id, userData) => {
  const { role_ids, ...userFields } = userData;

  const user = await UserModel.findByPk(id, {
    include: {
      model: RoleModel,
      through: { attributes: [] },
      as: "roles",
      include: {
        model: PermissionModel,
        through: { attributes: [] },
        as: "permissions",
      },
    },
  });

  if (!user) throw new Error("User not found");

  const { email, password, username, is_active } = userData;
  if (email || password || username || typeof is_active === "boolean") {
    const updatedUserCognito = await updateUserInCognito({
      currentUsername: user.username,
      newUsername: username,
      email,
      password,
      is_active,
    });

    if (!updatedUserCognito) throw new Error("Error updating user in Cognito");
  }

  if (role_ids) {
    if (role_ids.length > 0) {
      await user.setRoles(role_ids);
    } else {
      await user.setRoles([]);
    }
  }

  await user.update(userFields);

  return getUserById(id);
};

export const assignRoles = async (user, rolesIds) => {
  const roles = await RoleModel.findAll({ where: { id: rolesIds } });
  if (roles.length === 0) throw new Error("No roles found");
  await user.addRoles(roles);
};

export const deleteUser = async (id) => {
  const user = await UserModel.findByPk(id);

  if (!user) throw new Error("User not found");

  const deletedFromCognito = await deleteUserInCognito(user.username);
  if (!deletedFromCognito)
    return response.badRequest("Error al eliminar usuario en Cognito");

  await user.destroy();

  return user;
};

export const activateOrDisableUser = async (id, is_active) => {
  const user = await UserModel.findByPk(id);

  if (!user) throw new Error("User not found");

  await enableOrDisableUserInCognito({ username: user.username, is_active });

  user.is_active = is_active;
  await user.save();

  return user;
};

export const findByUserCode = async (user_code) => {
  return await UserModel.findOne({ where: { user_code } });
};

export const findByEmail = async (email) => {
  return await UserModel.findOne({ where: { email } });
};

export const findByUsername = async (username) => {
  return await UserModel.findOne({ where: { username } });
};

export const getUserPermissions = async (user_id) => {
  return await UserPermissionModel.findAll({
    where: {
      user_id,
    },
    include: [
      {
        model: PermissionModel,
        as: "permissionUser",
      },
    ],
  });
};
