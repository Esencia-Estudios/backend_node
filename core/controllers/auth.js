import dotenv from 'dotenv';
import { ResponseHelper as response } from "../helpers/response.js";
import * as authService from '../services/authService.js';
import { validateLogin } from "../validations/authValidations.js";

dotenv.config();

export const loginUser = async (event) => {
  try {
    const loginData = JSON.parse(event.body);
    await validateLogin(loginData)
    const login =  await authService.login(loginData);
    return response.success(login);
  } catch (error) {
    return response.handleError(error);
  }
};

export const forceChangePassword = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const res = await authService.forceChangePassword(data);
    return response.success(res);
  } catch (error) {
    return response.handleError(error);
  }
};