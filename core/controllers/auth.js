import bcrypt from 'bcrypt';
import { UserModel } from "../models/index.js";
import { ResponseHelper as response } from "../helpers/response.js";

const loginUser = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    const user = await UserModel.findOne({
      where: { username }
    });

    if (!user) {
      return response.unauthorized({
        message: "Credenciales incorrectas"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.unauthorized({
        message: "Credenciales incorrectas"
      });
    }

    return response.success("Login successful");

  } catch (error) {
    return response.badRequest("ERROR:" + error);
  }
};

export {
  loginUser
};
