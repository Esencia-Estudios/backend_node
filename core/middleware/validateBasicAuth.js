import { ResponseHelper } from "../helpers/response.js";

export const authMiddleware = (event) => {
    const authHeader = event.headers["Authorization"] || event.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return ResponseHelper.unauthorized("Credenciales requeridas");
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    if (username !== process.env.BASIC_AUTH_USERNAME || password !== process.env.BASIC_AUTH_PASSWORD_HASH) {
        return ResponseHelper.unauthorized("Credenciales inválidas");
    }

    // Si todo bien, retornar null para indicar que no hay error
    return null;
};
