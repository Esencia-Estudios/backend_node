export function generateCredentials(customer) {
  if (!customer.name) {
    throw new Error(
      "El nombre del cliente es requerido para generar credenciales."
    );
  }

  const nameParts = customer.name.trim().toLowerCase().split(" ");

  // Ej: Carlos García → cgarcia
  const firstInitial = nameParts[0].charAt(0);
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];
  const username = `${firstInitial}${lastName}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Generar una contraseña segura: al menos 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
  const capitalized = username.charAt(0).toUpperCase() + username.slice(1);
  const password = `${capitalized}@123A`; // cumpliendo: minúsculas, mayúsculas, símbolo, número

  return {
    username,
    password,
  };
}

export function generateUserCode(length) {
  return (length || 0 + 1).toString().padStart(4, "0");
}
