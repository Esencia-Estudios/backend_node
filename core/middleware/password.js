import CryptoJS from "crypto-js";

// Función para encriptar el valor (por ejemplo, la contraseña) con una clave secreta
function encriptarClave(clave, claveSecreta) {
    const claveEncriptada = CryptoJS.AES.encrypt(clave, claveSecreta).toString();
    return claveEncriptada;
}

// Ejemplo de uso:

const passwordAEncriptar = "";  // El valor que deseas encriptar
const claveSecreta = "";  // La clave secreta debe ser la misma que usas en el backend

const valorEncriptado = encriptarClave(passwordAEncriptar, claveSecreta);
console.log("Valor encriptado:", valorEncriptado);
