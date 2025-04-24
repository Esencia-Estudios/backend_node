import models from "../models/index.js";
import bcrypt from "bcryptjs";
import { ValidationError } from "../helpers/errorHandler.js";

export const checkUserInDatabase = async ({ username, password }) => {
  const user = await models?.UserModel.findOne({ where: { username } });
  if (!user) throw new ValidationError("User does not exist in database");
  if (password) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ValidationError("Password is incorrect");
  }
  if (user || (password && isPasswordValid && user)) return user;
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
