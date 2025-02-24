import dotenv from 'dotenv';
import { ResponseHelper as response } from "../helpers/response.js";
import * as authService from '../services/authService.js';
import { validateLogin } from "../validations/authValidations.js";
import { ValidationError } from "yup";

dotenv.config();


//✓ check
export const loginUser = async (event) => {
  try {
    const loginData = JSON.parse(event.body);

    await validateLogin(loginData)

    return await authService.login(loginData);

  } catch (error) {
    if (error instanceof ValidationError) {
      return response.badRequest({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    return response.badRequest(error.message);
  }
};

//✓ check
export const forceChangePassword = async (event) => {
  try {
    const data = JSON.parse(event.body);
    return await authService.forceChangePassword(data);
  } catch (error) {
    return response.badRequest(error.message);
  }
};