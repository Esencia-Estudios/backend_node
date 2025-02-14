import { ResponseHelper as response } from "../helpers/response.js";
import { UserModel } from "../models/index.js";

const getUsers = async (event) => {
  try {
    const users = await UserModel.findAll();
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

    // Crear el nuevo usuario de forma dinámica
    const newUser = await UserModel.create(userData);

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

    const user = await UserModel.findByPk(id);
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

    return response.success({
      message: `Usuario con id ${id} actualizado`,
      user
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
