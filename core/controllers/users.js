import { ResponseHelper as response } from "../helpers/response.js";
import dotenv from 'dotenv';
import { validateUserIdParameters, validateUserParameters, validateUserUpdateParameters } from "../validations/userValidations.js";
import * as userService from "../services/userService.js";
import { ValidationError } from "yup";

dotenv.config();

//✓ check
export const getUsers = async () => {
  try {
    const users = await userService.getUsers();
    return response.success(users);
  } catch (error) {
    return response.badRequest(error);
  }
};

//✓ check
export const getUserById = async (event) => {
  try {
    const { id } = event.pathParameters;

    await validateUserIdParameters({ id });
    const user = await userService.getUserById(id);
    if (!user) {
      return response.notFound("Usuario no encontrado");
    }

    return response.success(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest(error);
  }
};

//✓ check
export const createUser = async (event) => {
  try {
    const userData = JSON.parse(event.body);

    await validateUserParameters(userData);
    const newUser = await userService.createUser(userData);

    return response.success({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest("Error creating user: " + error.message);
  }
}

//✓ check
export const updateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const userData = JSON.parse(event.body);
    await validateUserIdParameters({ id });
    await validateUserUpdateParameters(userData);

    const updatedUser = await userService.updateUser(id, userData);

    return response.success({ message: `Usuario con id ${id} actualizado`, user: updatedUser });

  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest("Error al actualizar usuario: " + error.message);
  }
};

//✓ check
export const deleteUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    await validateUserIdParameters({ id });
    await userService.deleteUser(id);
    return response.success({ message: `Usuario con id ${id} eliminado` });

  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest("Error al eliminar usuario: " + error.message);
  }
};

//✓ check
export const activateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    await validateUserIdParameters({ id });

    const user = await userService.activateOrDisableUser(id, true);

    return response.success({
      message: `Usuario con id ${id} activado`,
      user
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest(error);
  }
};

//✓ check
export const deactivateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    await validateUserIdParameters({ id });

    const user = await userService.activateOrDisableUser(id, false);

    return response.success({
      message: `Usuario con id ${id} desactivado`,
      user
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest(error);
  }
};
