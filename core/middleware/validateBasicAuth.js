// middlewares/authMiddleware.js
import { decrypt } from "../helpers/encryption.js";
import { ResponseHelper } from "../helpers/response.js";

export const authMiddleware = (event) => {
  const authHeader = event.headers.Authorization || event.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return ResponseHelper.unauthorized("Credenciales requeridas");
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );

  const parts = credentials.split(":");
  const username = parts[0];
  const encryptedPassword = parts.slice(1).join(":");

  /*   
    console.log("Base64 Credentials:", base64Credentials);
    console.log("Decoded credentials:", credentials);
    console.log("Username:", username);
    console.log("Encrypted password:", encryptedPassword);
 */

  if (username !== process.env.BASIC_AUTH_USERNAME) {
    return ResponseHelper.unauthorized("Usuario inválido");
  }

  try {
    const decryptedPassword = decrypt(
      encryptedPassword,
      process.env.BASIC_AUTH_PASSWORD_SECRET
    );

    if (!decryptedPassword) {
      return ResponseHelper.unauthorized("Error al desencriptar la contraseña");
    }

    // console.log("Decrypted password:", decryptedPassword);

    if (decryptedPassword !== process.env.BASIC_AUTH_PASSWORD) {
      return ResponseHelper.unauthorized("Credenciales inválidas");
    }

    return null;
  } catch (error) {
    console.error("Error desencriptando password:", error);
    return ResponseHelper.unauthorized("Error al desencriptar credenciales");
  }
};
