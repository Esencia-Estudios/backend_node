import { ResponseHelper as response } from "../helpers/response.js";
import { UserModel, RoleModel, PermissionModel } from "../models/index.js";

const getUsers = async (event) => {
  try {
    const users = await UserModel.findAll({
      include: [
        {
          model: RoleModel,
          through: { attributes: [] },
          include: {
            model: PermissionModel,
            through: { attributes: [] }
          }
        }
      ]
    });

    return response.success(users);
  } catch (error) {
    return response.badRequest(error);
  }
};

const getUserById = async (event) => {
  try {
    const { id } = event.pathParameters;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return response.notFound("Usuario no encontrado");
    }

    return response.success(user);
  } catch (error) {
    return response.badRequest(error);
  }
};

const createUser = async (event) => {
  try {
    const userData = JSON.parse(event.body);
    const roleIds = userData.role_ids;
    delete userData.role_ids;

    const newUser = await UserModel.create(userData);

    if (roleIds && roleIds.length > 0) {
      const roles = await RoleModel.findAll({
        where: {
          id: roleIds
        }
      });

      if (roles.length === 0) {
        return response.notFound("Roles no encontrados");
      }

      await newUser.addRoles(roles);
    }

    return response.success({
      message: "Usuario creado exitosamente",
      user: newUser
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

const updateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const userData = JSON.parse(event.body);
    const roleIds = userData.role_ids;

    // Eliminar el campo role_ids de los datos del usuario antes de hacer la actualización
    delete userData.role_ids;

    const user = await UserModel.findByPk(id, {
      include: {
        model: RoleModel,
        through: { attributes: [] },
        include: {
          model: PermissionModel,
          through: { attributes: [] }
        }
      }
    });

    if (!user) {
      return response.notFound("Usuario no encontrado");
    }

    const updatedFields = {};
    for (const [key, value] of Object.entries(userData)) {
      if (value !== undefined) {
        updatedFields[key] = value;
      }
    }

    await user.update(updatedFields);

    if (roleIds !== undefined) {
      if (roleIds.length === 0) {
        await user.setRoles([]);
      } else {
        const roles = await RoleModel.findAll({
          where: {
            id: roleIds
          }
        });

        if (roles.length === 0) {
          return response.notFound("Roles no encontrados");
        }

        await user.setRoles(roles);
      }
    }

    const updatedUser = await UserModel.findByPk(id, {
      include: {
        model: RoleModel,
        through: { attributes: [] },
        include: {
          model: PermissionModel,
          through: { attributes: [] }
        }
      }
    });

    return response.success({
      message: `Usuario con id ${id} actualizado`,
      user: updatedUser
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

const deleteUser = async (event) => {
  try {
    const { id } = event.pathParameters;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return response.notFound({ message: "Usuario no encontrado" });
    }

    await user.destroy();

    return response.success({
      message: `Usuario con id ${id} eliminado`
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

const activateUser = async (event) => {
  try {
    const { id } = event.pathParameters;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return response.notFound({ message: "Usuario no encontrado" });
    }

    user.is_active = true;
    await user.save();

    return response.success({
      message: `Usuario con id ${id} activado`,
      user
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

const deactivateUser = async (event) => {
  try {
    const { id } = event.pathParameters;

    const user = await UserModel.findByPk(id);
    if (!user) {
      return response.notFound({ message: "Usuario no encontrado" });
    }

    user.is_active = false;
    await user.save();

    return response.success({
      message: `Usuario con id ${id} desactivado`,
      user
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  activateUser,
  deactivateUser
};
