import { ResponseHelper as response } from "../helpers/response.js";

const loginUser = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    if (username === "admin" && password === "admin123") {
      return response.success({
        message: "Login exitoso",
        token: "some-jwt-token"
      });
    }

    return response.unauthorized({
      message: "Credenciales incorrectas"
    });
  } catch (error) {
    return response.badRequest(error);
  }
};

export {
  loginUser
};
