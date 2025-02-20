import bcrypt from 'bcryptjs';
import { UserModel } from "../models/index.js";
import dotenv from 'dotenv';
import { ResponseHelper as response } from "../helpers/response.js";
import { loginUserHelper, checkUserInCognito, changePasswordHelper } from "../helpers/aws.js";

dotenv.config();

const checkUserInDatabase = async ({ username, password }) => {

  const user = await UserModel.findOne({
    where: { username }
  });


  if (!user) {
    return false
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return false
  }

  if (user && isPasswordValid) {
    return user
  }

};

const checkUser = async ({ username }) => {

  const user = await UserModel.findOne({
    where: { username }
  });


  if (!user) {
    return false
  }

  return user

};

const changePasswordInDB = async ({ username, newPassword }) => {
  try {

    const user = await UserModel.findOne({ where: { username } });

    await user.update({ password: newPassword });

    const updatedUser = await UserModel.findOne({ where: { username } });

    console.log("CAMBIADA LA CONTRASEÑA: ", updatedUser)
    if (updatedUser) {
      return true
    }

  } catch (error) {
    return response.badRequest("Error al actualizar usuario: " + error.message);
  }
}

const loginUser = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    // Verificar usuario en Cognito
    const userExistsInCognito = await checkUserInCognito(username);
    if (!userExistsInCognito) {
      return response.notFound("Usuario no registrado en Cognito");
    }

    // Verificar usuario en la base de datos
    const userExistsInDB = await checkUserInDatabase({ username, password });
    if (!userExistsInDB) {
      return response.notFound("Usuario no encontrado en la base de datos");
    } else {
      const authResponse = await loginUserHelper(username, password);
      if (authResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        return response.badRequest({ message: "New Password Required", session: authResponse.Session })
      } else {
        const result = {
          token: authResponse.AuthenticationResult,
          user: userExistsInDB,
        }
        return response.success(result);
      }

    }
  } catch (error) {
    return response.badRequest("ERROR: " + error.message);
  }
};

const changePassword = async (event) => {
  try {
    const { username, session, newPassword } = JSON.parse(event.body);
    const user = await checkUser({ username });
    if (!user) {
      return response.notFound("Usuario no encontrado en la base de datos");
    } else {
      const authResponse = await changePasswordHelper({ username, newPassword, session });
      if (!authResponse) {
        response.badRequest("error al cambiar contraseña")
      } else {
        const changePassword = await changePasswordInDB({ username, newPassword });
        if (!changePassword) {
          response.badRequest("error al cambiar contraseña en la base de datos")
        }
      }
      return response.success({ message: "Contraseña cambiada correctamente", user: authResponse });
    }
  } catch (error) {
    return response.badRequest("ERROR: " + error.message);
  }
};

export {
  loginUser,
  changePassword
};