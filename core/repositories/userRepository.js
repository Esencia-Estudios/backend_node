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
  UserInfoModel,
  UserWorkInfoModel,
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
  return await UserModel.findByPk(id, {
    include: [
      {
        model: RoleModel,
        through: { attributes: [] },
        as: "roles",
        include: {
          model: PermissionModel,
          through: { attributes: [] },
          as: "permissions",
        },
      },
      {
        model: UserInfoModel,
        as: "userInfo",
      },
      {
        model: UserWorkInfoModel,
        as: "userWorkInfo",
      },
    ],
  });
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
