import CryptoJS from "crypto-js";
import { ResponseHelper } from "../helpers/response.js";

export const authMiddleware = (event) => {
    const authHeader = event.headers["Authorization"] || event.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return ResponseHelper.unauthorized("Credenciales requeridas");
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, encryptedPassword] = credentials.split(":");

    console.log("Base64 Credentials:", base64Credentials);
    console.log("Decoded credentials:", credentials);
    console.log("Username:", username);
    console.log("Encrypted password:", encryptedPassword);

    if (username !== process.env.BASIC_AUTH_USERNAME) {
        return ResponseHelper.unauthorized("Usuario inválido");
    }

    // Desencriptar la contraseña recibida
    try {
        // Desencriptamos utilizando la misma clave secreta que usamos al encriptar
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.BASIC_AUTH_PASSWORD_SECRET);

        // Convertimos el resultado desencriptado a texto (UTF-8) correctamente
        const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedPassword) {
            return ResponseHelper.unauthorized("Error al desencriptar la contraseña");
        }

        console.log("Decrypted password:", decryptedPassword);

        // Si la contraseña desencriptada no es la correcta, retorna error
        if (decryptedPassword !== process.env.BASIC_AUTH_PASSWORD) {
            return ResponseHelper.unauthorized("Credenciales inválidas");
        }

        return null;

    } catch (error) {
        console.error("Error desencriptando password:", error);
        return ResponseHelper.unauthorized("Error al desencriptar credenciales");
    }
};
